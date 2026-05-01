import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // ✅ better data cleanliness
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ✅ ensure ownership always exists
    },

    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Workspace", workspaceSchema);