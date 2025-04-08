import Message from "../modal/message.modal.js"; // Ensure this import is present

const getMessagesByChatId = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ message: "Chat ID is required" });
  }

  try {
    const messages = await Message.find({ chat: chatId })
      .sort({ createdAt: -1 }) // Newest messages first
      .populate("sender", "email name")
      .populate("chat");

    console.log("messages", messages);

    res.status(200).json({
      data: messages,
      message: "Messages fetched successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

export { getMessagesByChatId };
