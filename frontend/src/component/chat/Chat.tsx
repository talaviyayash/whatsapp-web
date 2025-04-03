"use client";
import useApiHook from "@/hooks/useApiHook";
import { addData } from "@/redux/slice/apiSlice";
import { Chat, UserInfo } from "@/types/chat";
import { getOtherUser, getUserInfo } from "@/utils/customFunc";
import { Add, AttachFile, Send } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import AddChat from "./AddChat";
import ChatList from "./ChatList";
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const ChatApp: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { api } = useApiHook();
  const userInfo = useSelector(getUserInfo()) as UserInfo;
  console.log("selectedChat", selectedChat);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("message", (message) => {
      console.log("message", message);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const result = await api({
        endPoint: "chat",
        method: "GET",
      });

      if (result?.success) {
        const checkListToSet = result?.data?.map((item: Chat) => ({
          ...item,
          user: getOtherUser(item?.members, userInfo?._id),
        }));
        setSelectedChat(checkListToSet[0]);
        dispatch(
          addData({
            data: checkListToSet,
            name: "chatList",
          })
        );
      }
    };
    getData();
  }, []);

  return (
    <Stack
      direction="row"
      height="100vh"
      sx={{ backgroundColor: "background.default", color: "text.primary" }}
    >
      {/* Chat Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 308,
          flexShrink: 0,
          backgroundColor: "background.paper",
          color: "text.primary",
        }}
      >
        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              input: { color: "text.primary" },
              label: { color: "text.secondary" },
            }}
          />
          <IconButton onClick={() => setOpenModal(true)}>
            <Add />
          </IconButton>
        </Box>
        <Stack>
          <ChatList />
        </Stack>
      </Drawer>

      {/* Chat Window */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        sx={{ backgroundColor: "background.default", color: "text.primary" }}
        // ml="308px"
      >
        {/* Header */}
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

        {/* Chat Messages */}
        <Stack spacing={1} flex={1} p={2} overflow="auto">
          {/* {selectedChat.messages.map((msg, index) => (
            <Paper
              key={index}
              sx={{
                p: 2,
                maxWidth: "75%",
                alignSelf: msg.sender === "Me" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "Me" ? "#0b93f6" : "#444",
                color: "#fff",
                borderRadius:
                  msg.sender === "Me"
                    ? "10px 10px 0px 10px"
                    : "10px 10px 10px 0px",
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
            </Paper>
          ))} */}
        </Stack>

        {/* Message Input and File Upload */}
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
                  <IconButton>
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ input: { color: "text.primary" } }}
          />
        </Box>
      </Box>

      <AddChat {...{ openModal, setOpenModal }} />
    </Stack>
  );
};

export default ChatApp;
