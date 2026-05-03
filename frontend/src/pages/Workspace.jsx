import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Workspace = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");       // ✅ NEW
  const [inviteEmail, setInviteEmail] = useState("");   // ✅ NEW

  // ✅ FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks/${id}`, {
        withCredentials: true,
      });

      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Fetch error:", error);
      setTasks([]);
    }
  };

  // ✅ CREATE TASK (NO PROMPT)
  const createTask = async () => {
    if (!taskTitle.trim()) return;

    try {
      await axios.post(
        `${API_URL}/tasks`,
        { title: taskTitle, workspaceId: id },
        { withCredentials: true }
      );

      setTaskTitle(""); // clear input
      fetchTasks();
    } catch (error) {
      console.log("Create error:", error);
    }
  };

  // ✅ UPDATE STATUS
  const updateStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/tasks/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  // ✅ DELETE TASK
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        withCredentials: true,
      });
      fetchTasks();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // ✅ INVITE USER (NO PROMPT)
  const inviteUser = async () => {
    if (!inviteEmail.trim()) return;

    try {
      await axios.post(
        `${API_URL}/workspaces/${id}/invite`,
        { email: inviteEmail },
        { withCredentials: true }
      );

      setInviteEmail(""); // clear input
      alert("User added!");
    } catch (error) {
      alert(error.response?.data?.message || "Error inviting user");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🧠 split tasks
  const todo = tasks.filter((t) => t.status === "todo");
  const inProgress = tasks.filter((t) => t.status === "in-progress");
  const done = tasks.filter((t) => t.status === "done");

  const renderColumn = (title, data, status) => (
    <div className="bg-gray-800 p-4 rounded w-80 min-h-[400px]">
      <h2 className="text-lg font-bold mb-4 text-center">{title}</h2>

      <div className="space-y-3">
        {data.map((task) => (
          <div key={task._id} className="bg-gray-700 p-3 rounded shadow">
            <p className="font-semibold">{task.title}</p>

            <div className="flex justify-between mt-2 text-sm">
              <div className="flex gap-1">
                {status !== "todo" && (
                  <button
                    onClick={() => updateStatus(task._id, "todo")}
                    className="bg-gray-600 px-2 rounded"
                  >
                    ←
                  </button>
                )}
                {status !== "done" && (
                  <button
                    onClick={() =>
                      updateStatus(
                        task._id,
                        status === "todo" ? "in-progress" : "done"
                      )
                    }
                    className="bg-gray-600 px-2 rounded"
                  >
                    →
                  </button>
                )}
              </div>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-600 px-2 rounded"
              >
                X
              </button>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <p className="text-gray-400 text-sm text-center">No tasks</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="text-white p-6">

      {/* 🔥 TOP BAR */}
      <div className="max-w-5xl mx-auto mb-6 space-y-3">

        <h1 className="text-2xl font-bold text-center">
          Workspace Board
        </h1>

        {/* ✅ TASK INPUT */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New task..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-gray-700 outline-none"
          />
          <button
            onClick={createTask}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>

        {/* ✅ INVITE INPUT */}
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Invite user by email..."
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 px-3 py-2 rounded bg-gray-700 outline-none"
          />
          <button
            onClick={inviteUser}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Invite
          </button>
        </div>

      </div>

      {/* BOARD */}
      <div className="flex gap-6 justify-center flex-wrap">
        {renderColumn("Todo", todo, "todo")}
        {renderColumn("In Progress", inProgress, "in-progress")}
        {renderColumn("Done", done, "done")}
      </div>
    </div>
  );
};

export default Workspace;