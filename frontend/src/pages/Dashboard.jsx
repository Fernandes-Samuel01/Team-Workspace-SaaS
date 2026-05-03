import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceName, setWorkspaceName] = useState(""); // ✅ NEW

  const handleLogout = () => {
    logout();
  };

  // ✅ Fetch workspaces
  const fetchWorkspaces = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/workspaces`,
        { withCredentials: true }
      );

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

  // ✅ Create workspace (NO PROMPT)
  const createWorkspace = async () => {
    if (!workspaceName.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/workspaces`,
        { name: workspaceName },
        { withCredentials: true }
      );

      setWorkspaceName(""); // ✅ clear input
      fetchWorkspaces();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Delete workspace (clean confirm)
  const deleteWorkspace = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/workspaces/${id}`,
        { withCredentials: true }
      );
      fetchWorkspaces();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting workspace");
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  if (!user)
    return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        Dashboard
      </h2>

      <div className="space-y-6">
        {/* Profile */}
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: {user.name}</p>
          <p className="text-gray-300">Email: {user.email}</p>
        </div>

        {/* Activity */}
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Account Activity
          </h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Last Login: </span>
            {formatDate(user.lastLogin)}
          </p>
        </div>

        {/* Workspaces */}
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-blue-400 mb-3">
            Workspaces
          </h3>

          {/* 🔥 INPUT INSTEAD OF PROMPT */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter workspace name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="flex-1 px-3 py-2 rounded bg-gray-700 text-white outline-none"
            />

            <button
              onClick={createWorkspace}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {/* LIST */}
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

                    {/* prevent click bubbling */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteWorkspace(ws._id);
                      }}
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
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Dashboard;