import { Chat } from "@/types/chat";
import { getApiData } from "@/utils/customFunc";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ChatList = () => {
  const chatLists = useSelector(getApiData<Chat[]>("chatList")) || [];
  console.log("chatList", chatLists);
  return (
    <>
      {chatLists?.map((chat, index) => {
        console.log("chat", chat);
        return (
          <Box
            key={index}
            p={2}
            sx={{
              cursor: "pointer",
              color: "text.primary",
              "&:hover": { backgroundColor: "#444" },
            }}
            //   onClick={() => setSelectedChat(chat)}
          >
            <Typography variant="subtitle1">{chat.user.name}</Typography>
          </Box>
        );
      })}
    </>
  );
};

export default ChatList;
