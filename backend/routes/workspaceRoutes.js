import express from "express";
import Workspace from "../models/Workspace.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

// Create workspace
router.post("/", verifyToken, async (req, res) => {
  const workspace = new Workspace({
    name: req.body.name,
    owner: req.userId,
    members: [{ user: req.userId, role: "admin" }],
  });

  await workspace.save();
  res.json(workspace);
});

// Get user workspaces
router.get("/", verifyToken, async (req, res) => {
  const workspaces = await Workspace.find({
    "members.user": req.user.id,
  });
  res.json(workspaces);
});

export default router;