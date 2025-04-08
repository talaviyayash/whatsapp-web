import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import ChatSideBar from "./ChatSideBar";
import AddChat from "./AddChat";
import { AttachFile, Send } from "@mui/icons-material";
import { Chat, UserInfo } from "@/types/chat";
import { useSelector } from "react-redux";
import { getStateData } from "@/utils/customFunc";
import { MessageType } from "@/types/messgae";

interface ChatPresentationProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  messages: MessageType[] | null;
  userInfo: UserInfo;
}

const ChatPresentation: React.FC<ChatPresentationProps> = ({
  message,
  setMessage,
  sendMessage,
  messages,
  userInfo,
}) => {
  const selectedChat = useSelector(getStateData("selectedChat")) as Chat | null;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Stack
        direction="row"
        height="100vh"
        sx={{ backgroundColor: "background.default", color: "text.primary" }}
      >
        <ChatSideBar />

        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          sx={{ backgroundColor: "background.default", color: "text.primary" }}
        >
          <Box
            p={2}
            sx={{
              borderBottom: "1px solid #444",
              position: "sticky",
              top: 0,
              backgroundColor: "background.paper",
            }}
          >
            <Typography variant="h6">{selectedChat?.user?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {/* {selectedChat?.lastSeen} */}1 Hour ago
            </Typography>
          </Box>

          <Stack spacing={1} flex={1} p={2} overflow="auto">
            {messages?.map((msg, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  maxWidth: "75%",
                  alignSelf:
                    msg?.sender?._id === userInfo?._id
                      ? "flex-end"
                      : "flex-start",
                  backgroundColor:
                    msg?.sender?._id === userInfo?._id ? "#0b93f6" : "#444",
                  color: "#fff",
                  borderRadius:
                    msg?.sender?._id === userInfo?._id
                      ? "10px 10px 0px 10px"
                      : "10px 10px 10px 0px",
                }}
              >
                <Typography variant="body1">{msg.content}</Typography>
              </Paper>
            ))}
            <Box ref={messagesEndRef} />
          </Stack>

          <Box
            p={2}
            sx={{
              borderTop: "1px solid #444",
              position: "sticky",
              bottom: 0,
              backgroundColor: "background.paper",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <AttachFile />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={sendMessage}>
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ input: { color: "text.primary" } }}
            />
          </Box>
        </Box>
        <AddChat />
      </Stack>
    </>
  );
};

export default ChatPresentation;
