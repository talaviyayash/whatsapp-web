import { UserInfo } from "@/types/chat";
import { MessageType } from "@/types/messgae";
import { Stack } from "@mui/material";
import React, { useEffect, useRef } from "react";
import AddChat from "./AddChat";
import ChatSideBar from "./ChatSideBar";
import ChatWindow from "./chatWindow/ChatWindow";

interface ChatPresentationProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messages: MessageType[] | null;
  userInfo: UserInfo;
  scrollToBottom: boolean;
  setScrollToBottom: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatPresentation: React.FC<ChatPresentationProps> = ({
  scrollToBottom,
  setScrollToBottom,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollToBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setScrollToBottom(false);
    }
  }, [scrollToBottom]);

  return (
    <>
      <Stack
        direction="row"
        height="100vh"
        sx={{ backgroundColor: "background.default", color: "text.primary" }}
      >
        <ChatSideBar />
        <ChatWindow />
        <AddChat />
      </Stack>
    </>
  );
};

export default ChatPresentation;
