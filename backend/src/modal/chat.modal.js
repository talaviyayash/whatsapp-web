import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    isGroupChat: { type: Boolean, default: false },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    groupAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    groupName: { type: String },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "message" },
  },
  { timestamps: true }
);

export default mongoose.model("chat", chatSchema);
