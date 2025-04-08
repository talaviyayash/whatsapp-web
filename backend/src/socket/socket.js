import Message from "../modal/message.modal.js";

const messageSocketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    socket.on("join-user", (userId) => {
      socket.join(`user:${userId}`);
      socket.userId = userId;
    });

    socket.on(
      "send-message",
      async ({ chatId, content, messageType = "text", fileUrl = null }) => {
        const newMessage = await Message.create({
          sender: socket?.userId,
          chat: chatId,
          content,
          messageType,
          fileUrl,
          readBy: [socket?.userId],
        });
        const populatedMessage = await Message.findById(newMessage._id)
          .populate("sender", "name email")
          .populate("chat");

        populatedMessage.chat.members.forEach((memberId) => {
          io.to(`user:${memberId.toString()}`).emit(
            "message",
            populatedMessage
          );
        });
        return populatedMessage;
      }
    );

    socket.on("disconnect", () => {
      console.log("❎ User disconnected:", socket.id);
    });
  });
};

export default messageSocketHandler;
