import express from "express";
import Task from "../models/Task.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// ✅ CREATE TASK
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, workspace, workspaceId } = req.body;

    // 🔥 support BOTH (safe fix)
    const finalWorkspace = workspace || workspaceId;

    if (!title || !finalWorkspace) {
      return res.status(400).json({ message: "Title and workspace required" });
    }

    const task = new Task({
      title,
      description: description || "",
      workspace: finalWorkspace,
      assignedTo: req.userId,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.log("Create task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET TASKS BY WORKSPACE
router.get("/:workspaceId", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({
      workspace: req.params.workspaceId,
      assignedTo: req.userId,
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.log("Fetch task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATE TASK STATUS
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, assignedTo: req.userId },
      { status },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    console.log("Update task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE TASK
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      assignedTo: req.userId,
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.log("Delete task error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;