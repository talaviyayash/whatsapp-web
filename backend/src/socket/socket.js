import Chat from "../modal/chat.modal.js";
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
      async ({
        chatId,
        content,
        messageType = "text",
        fileUrl = null,
        nanoId,
      }) => {
        const newMessage = await Message.create({
          sender: socket?.userId,
          chat: chatId,
          content,
          messageType,
          fileUrl,
          readBy: [socket?.userId],
        });
        const populatedMessage = await Message.findById(
          newMessage._id
        ).populate("chat");
        const plainMessage = populatedMessage?.toObject();

        const updatedChat = await Chat.findByIdAndUpdate(
          chatId,
          { lastMessage: newMessage._id },
          { new: true }
        )
          .populate("members", "email name")
          .populate("lastMessage");

        plainMessage.chat.members.forEach((memberId) => {
          io.to(`user:${memberId.toString()}`).emit("message", {
            chat: updatedChat,
            message: {
              ...plainMessage,
              chat: plainMessage?.chat?._id,
              nanoId,
            },
          });
        });
        return plainMessage;
      }
    );

    socket.on("disconnect", () => {
      console.log("❎ User disconnected:", socket.id);
    });
  });
};

export default messageSocketHandler;
