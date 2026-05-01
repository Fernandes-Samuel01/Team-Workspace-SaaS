import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { useAuthStore } from '../store/authStore'
import { formatDate } from '../utils/date'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {

	const { user, logout } = useAuthStore();
	const navigate = useNavigate();

	const [workspaces, setWorkspaces] = useState([]);

	const handleLogout = () => {
		logout();
	};

	// ✅ Fetch workspaces
	const fetchWorkspaces = async () => {
		try {
			const res = await axios.get("http://localhost:5000/api/workspaces", {
				withCredentials: true,
			});

			console.log("Workspaces API response:", res.data);

			if (Array.isArray(res.data)) {
				setWorkspaces(res.data);
			} else if (Array.isArray(res.data.workspaces)) {
				setWorkspaces(res.data.workspaces);
			} else {
				setWorkspaces([]);
			}

		} catch (error) {
			console.log("Error fetching workspaces:", error);
			setWorkspaces([]);
		}
	};

	// ✅ Create workspace
	const createWorkspace = async () => {
		const name = prompt("Enter workspace name");

		if (!name) return;

		try {
			await axios.post(
				"http://localhost:5000/api/workspaces",
				{ name },
				{ withCredentials: true }
			);
			fetchWorkspaces();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteWorkspace = async (id) => {
		const confirmDelete = window.confirm("Delete this workspace?");

		if (!confirmDelete) return;

		try {
			await axios.delete(
				`http://localhost:5000/api/workspaces/${id}`,
				{ withCredentials: true }
			);

			fetchWorkspaces(); // refresh list
		} catch (error) {
			alert(error.response?.data?.message || "Error deleting workspace");
		}
	};

	useEffect(() => {
		fetchWorkspaces();
	}, []);

	// ✅ Prevent crash
	if (!user) return <div className="text-white text-center mt-10">Loading...</div>;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
		>
			<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
				Dashboard
			</h2>

			<div className='space-y-6'>

				{/* Profile Info */}
				<div className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
					<p className='text-gray-300'>Name: {user.name}</p>
					<p className='text-gray-300'>Email: {user.email}</p>
				</div>

				{/* Account Activity */}
				<div className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'>
					<h3 className='text-xl font-semibold text-green-400 mb-3'>Account Activity</h3>
					<p className='text-gray-300'>
						<span className='font-bold'>Joined: </span>
						{new Date(user.createdAt).toLocaleDateString()}
					</p>
					<p className='text-gray-300'>
						<span className='font-bold'>Last Login: </span>
						{formatDate(user.lastLogin)}
					</p>
				</div>

				{/* Workspaces */}
				<div className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'>
					<h3 className='text-xl font-semibold text-blue-400 mb-3'>Workspaces</h3>

					<button
						onClick={createWorkspace}
						className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg mb-4 hover:bg-blue-700"
					>
						Create Workspace
					</button>

					<div className="space-y-2">
						{workspaces.length > 0 ? (
							workspaces.map((ws) => (
								<div
									key={ws._id}
									onClick={() => navigate(`/workspace/${ws._id}`)}
									className="p-3 bg-gray-700 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-600 transition"
								>
									<div className="flex justify-between items-center">
										<span>{ws.name}</span>

										<button
											onClick={() => deleteWorkspace(ws._id)}
											className="bg-red-600 px-2 py-1 rounded text-sm"
										>
											Delete
										</button>
									</div>
								</div>
							))
						) : (
							<p className="text-gray-400 text-sm">No workspaces yet</p>
						)}
					</div>
				</div>

			</div>

			{/* Logout */}
			<div className='mt-4'>
				<button
					onClick={handleLogout}
					className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg'
				>
					Logout
				</button>
			</div>

		</motion.div>
	)
}

export default Dashboard;