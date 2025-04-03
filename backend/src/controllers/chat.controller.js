import Chat from "../modal/chat.modal.js";
import User from "../modal/user.modal.js";

const createChat = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const chat = await Chat.create({ members: [user._id, req.user.id] });
    res
      .status(201)
      .json({ message: "Chat get Successfully", data: chat, success: true });
  } catch (error) {
    res.status(500).json({ message: "Error creating chat", error });
  }
};

const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.user._id })
      .populate("members", "email name")
      .populate("lastMessage");
    res
      .status(200)
      .json({ data: chats, message: "Chat get Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error fetching chats", error });
  }
};

export { createChat, getAllChats };
