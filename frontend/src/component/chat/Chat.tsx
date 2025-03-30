"use client";
import { Add, AttachFile, Send } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddChat from "./AdChat";

const chatList = [
  {
    id: 1,
    name: "Alice",
    lastSeen: "Online",
    messages: [
      { text: "Hey! How are you?", sender: "Alice" },
      { text: "I'm good, how about you?", sender: "Me" },
    ],
  },
  {
    id: 2,
    name: "Bob",
    lastSeen: "Last seen 5 minutes ago",
    messages: [
      { text: "Let's meet tomorrow.", sender: "Bob" },
      { text: "Sure, what time?", sender: "Me" },
    ],
  },
  {
    id: 3,
    name: "Charlie",
    lastSeen: "Last seen 1 hour ago",
    messages: [
      { text: "Check this out!", sender: "Charlie" },
      { text: "Wow, that's cool!", sender: "Me" },
    ],
  },
];

const ChatApp: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

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
          {chatList
            .filter((chat) =>
              chat.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((chat) => (
              <Box
                key={chat.id}
                p={2}
                sx={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedChat.id === chat.id ? "#333" : "transparent",
                  color: "text.primary",
                  "&:hover": { backgroundColor: "#444" },
                }}
                onClick={() => setSelectedChat(chat)}
              >
                <Typography variant="subtitle1">{chat.name}</Typography>
              </Box>
            ))}
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
          <Typography variant="h6">{selectedChat.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedChat.lastSeen}
          </Typography>
        </Box>

        {/* Chat Messages */}
        <Stack spacing={1} flex={1} p={2} overflow="auto">
          {selectedChat.messages.map((msg, index) => (
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
          ))}
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
