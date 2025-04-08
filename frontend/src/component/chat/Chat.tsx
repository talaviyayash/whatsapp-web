"use client";
import useApiHook from "@/hooks/useApiHook";
import { addData } from "@/redux/slice/apiSlice";
import { addPayloadData } from "@/redux/slice/dataSlice";
import { Chat, UserInfo } from "@/types/chat";
import { MessageType } from "@/types/messgae";
import { getOtherUser, getStateData, getUserInfo } from "@/utils/customFunc";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import ChatPresentation from "./ChatPresentation";
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const ChatApp: React.FC = () => {
  const dispatch = useDispatch();
  const { api } = useApiHook();
  const userInfo = useSelector(getUserInfo()) as UserInfo;
  const [message, setMessage] = useState("");
  const selectedChat = useSelector(getStateData("selectedChat")) as Chat | null;
  const messages = useSelector(getStateData("message")) as MessageType[] | null;

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.emit("join-user", userInfo?._id);

    socket.on("message", (message) => {
      console.log("message", message);
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
    setMessage("");
    socket.emit("send-message", {
      chatId: selectedChat?._id,
      content: message,
    });
  };

  const getChatData = async () => {
    const result = await api({
      endPoint: `chat/${selectedChat?._id}/messages`,
      method: "GET",
    });
    console.log("result", result);
    if (result?.success) {
      dispatch(
        addPayloadData({
          data: result?.data,
          name: "message",
        })
      );
    }
  };

  useEffect(() => {
    if (selectedChat?._id) {
      const timeId = setTimeout(() => {
        getChatData();
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
        }}
      />
    </>
  );
};

export default ChatApp;
