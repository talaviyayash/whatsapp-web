"use client";
import useApiHook from "@/hooks/useApiHook";
import { addData } from "@/redux/slice/apiSlice";
import {
  addMessage,
  addNewMessage,
  addPayloadData,
} from "@/redux/slice/dataSlice";
import { Chat, UserInfo } from "@/types/chat";
import { MessageType } from "@/types/messgae";
import {
  getChatData,
  getOtherUser,
  getStateData,
  getUserInfo,
} from "@/utils/customFunc";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import ChatPresentation from "./ChatPresentation";
import { nanoid } from "@reduxjs/toolkit";
export const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const ChatApp: React.FC = () => {
  const dispatch = useDispatch();
  const { api } = useApiHook();
  const userInfo = useSelector(getUserInfo()) as UserInfo;
  const [message, setMessage] = useState("");
  const selectedChat = useSelector(getStateData("selectedChat")) as Chat | null;
  const messages = useSelector(getChatData(selectedChat?._id || "")) as
    | MessageType[]
    | null;

  const [scrollToBottom, setScrollToBottom] = useState<boolean>(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.emit("join-user", userInfo?._id);

    socket.on("message", (message: MessageType) => {
      if (message?.sender === userInfo?._id) {
        setScrollToBottom(true);
      }
      dispatch(addNewMessage({ data: message, name: message?.chat }));
    });

    return () => {
      socket.disconnect();
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
        dispatch(
          addPayloadData({
            data: checkListToSet[0],
            name: "selectedChat",
          })
        );
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

  const sendMessage = () => {
    if (!selectedChat) return;
    setMessage("");
    const nanoId = nanoid();
    socket.emit("send-message", {
      chatId: selectedChat?._id,
      content: message,
      nanoId,
    });
    dispatch(
      addMessage({
        data: [
          {
            _id: "",
            content: message,
            nanoId,
            chat: selectedChat?._id,
            sender: userInfo?._id,
            createdAt: new Date().toISOString(),
            messageType: "text",
            readBy: [],
            updatedAt: new Date().toISOString(),
          },
        ],
        name: selectedChat?._id,
      })
    );
    setScrollToBottom(true);
    // dispatch(addMessage({ data: [{ _id: "",  chat }], name: message?.chat?._id }));
  };

  const getChat = async () => {
    const result = await api({
      endPoint: `chat/${selectedChat?._id}/messages`,
      method: "GET",
    });
    if (result?.success) {
      dispatch(
        addPayloadData({
          data: result?.data,
          name: "message",
        })
      );
      dispatch(
        addMessage({
          data: result?.data,
          name: selectedChat?._id || "",
        })
      );
      setScrollToBottom(true);
    }
  };

  useEffect(() => {
    if (selectedChat?._id) {
      const timeId = setTimeout(() => {
        getChat();
      }, 300);
      return () => clearTimeout(timeId);
    }
  }, [selectedChat?._id]);

  return (
    <>
      <ChatPresentation
        {...{
          message,
          setMessage,
          sendMessage,
          messages,
          userInfo,
          scrollToBottom,
          setScrollToBottom,
        }}
      />
    </>
  );
};

export default ChatApp;
