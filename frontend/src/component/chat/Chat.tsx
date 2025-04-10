"use client";
import useApiHook from "@/hooks/useApiHook";
import { addData } from "@/redux/slice/apiSlice";
import { addNewMessage, addPayloadData } from "@/redux/slice/dataSlice";
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
export const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

type SocketMessage = {
  message: MessageType;
  chat: Chat;
};

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

    socket.on("message", ({ message }: SocketMessage) => {
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

  return (
    <>
      <ChatPresentation
        {...{
          message,
          setMessage,
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
