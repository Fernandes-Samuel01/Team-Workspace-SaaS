import express from "express";
import Workspace from "../models/workspace.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// ✅ CREATE WORKSPACE
router.post("/", verifyToken, async (req, res) => {
  try {
    const workspace = new Workspace({
      name: req.body.name,
      owner: req.userId,
      members: [{ user: req.userId, role: "admin" }],
    });

    await workspace.save();
    res.status(201).json(workspace);
  } catch (error) {
    console.log("Create workspace error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET WORKSPACES
router.get("/", verifyToken, async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      "members.user": req.userId, // ✅ FIXED HERE
    });

    res.status(200).json(workspaces);
  } catch (error) {
    console.log("Fetch workspace error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE WORKSPACE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // ✅ check admin
    const isAdmin = workspace.members.find(
      (m) => m.user.toString() === req.userId && m.role === "admin"
    );

    if (!isAdmin) {
      return res.status(403).json({ message: "Only admin can delete" });
    }

    await workspace.deleteOne();

    res.json({ message: "Workspace deleted" });
  } catch (error) {
    console.log("Delete workspace error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ INVITE USER TO WORKSPACE
router.post("/:id/invite", verifyToken, async (req, res) => {
  try {
    const { email } = req.body;

    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // ✅ check if current user is admin
    const isAdmin = workspace.members.find(
      (m) => m.user.toString() === req.userId && m.role === "admin"
    );

    if (!isAdmin) {
      return res.status(403).json({ message: "Only admin can invite" });
    }

    // ✅ find user by email
    const User = (await import("../models/user.model.js")).default;
    const userToInvite = await User.findOne({ email });

    if (!userToInvite) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ prevent duplicate
    const alreadyMember = workspace.members.find(
      (m) => m.user.toString() === userToInvite._id.toString()
    );

    if (alreadyMember) {
      return res.status(400).json({ message: "User already in workspace" });
    }

    // ✅ add member
    workspace.members.push({
      user: userToInvite._id,
      role: "member",
    });

    await workspace.save();

    res.json({ message: "User added successfully" });
  } catch (error) {
    console.log("Invite error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;