import { addPayloadData } from "@/redux/slice/dataSlice";
import { Chat } from "@/types/chat";
import { getApiData, getStateData } from "@/utils/customFunc";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatList = () => {
  const chatLists = useSelector(getApiData<Chat[]>("chatList")) || [];
  const selectedChat = useSelector(getStateData("selectedChat")) as Chat | null;
  const dispatch = useDispatch();
  const onSelect = (chat: Chat) => {
    dispatch(addPayloadData({ name: "selectedChat", data: chat }));
  };

  return (
    <>
      {chatLists?.map((chat, index) => {
        return (
          <Box
            key={index}
            p={2}
            sx={{
              cursor: "pointer",
              color: "text.primary",
              backgroundColor:
                selectedChat?._id === chat?._id ? "#444" : "#1E1E1E",
              "&:hover": { backgroundColor: "#444" },
            }}
            onClick={() => onSelect(chat)}
          >
            <Typography variant="subtitle1">{chat.user.name}</Typography>
          </Box>
        );
      })}
    </>
  );
};

export default ChatList;
