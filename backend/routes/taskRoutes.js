import express from "express";
import Task from "../models/Task.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

// Create task
router.post("/", verifyToken, async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// Get tasks by workspace
router.get("/:workspaceId", verifyToken, async (req, res) => {
  const tasks = await Task.find({
    workspace: req.params.workspaceId,
  });
  res.json(tasks);
});

export default router;