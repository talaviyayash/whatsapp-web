import useApiHook from "@/hooks/useApiHook";
import { addMessage } from "@/redux/slice/dataSlice";
import { Chat, UserInfo } from "@/types/chat";
import { MessageType } from "@/types/messgae";
import { getChatData, getStateData, getUserInfo } from "@/utils/customFunc";
import { AttachFile, Send } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { socket } from "../Chat";

// type Props = {
//   index: number;
//   style: React.CSSProperties;
// };

const ChatWindow = () => {
  const userInfo = useSelector(getUserInfo()) as UserInfo;
  const selectedChat = useSelector(getStateData("selectedChat")) as Chat | null;
  const messages = useSelector(getChatData(selectedChat?._id || "")) as
    | MessageType[]
    | null;
  const { api } = useApiHook();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(false);

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
  };

  useEffect(() => {
    if (scrollToBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollToBottom]);

  const getChat = async () => {
    const result = await api({
      endPoint: `chat/${selectedChat?._id}/messages`,
      method: "GET",
    });
    if (result?.success) {
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

        <Box flex={1} p={2} overflow="hidden">
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={messages?.length || 0}
                itemSize={70}
                width={width}
                // onScroll={({ scrollOffset }) => {
                //   // Optional: Handle scroll events if needed
                // }}
              >
                {({
                  index,
                  style,
                }: {
                  index: number;
                  style: React.CSSProperties;
                }) => {
                  const msg = messages?.[index];
                  return (
                    <Box
                      key={index}
                      sx={{
                        ...style,
                        display: "flex",
                        flexDirection: "column",
                        alignItems:
                          msg?.sender === userInfo?._id
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          maxWidth: "75%",
                          backgroundColor:
                            msg?.sender === userInfo?._id ? "#0b93f6" : "#444",
                          color: "#fff",
                          borderRadius:
                            msg?.sender === userInfo?._id
                              ? "10px 10px 0px 10px"
                              : "10px 10px 10px 0px",
                        }}
                      >
                        <Typography variant="body1">{msg?.content}</Typography>
                      </Paper>

                      {msg?.sender === userInfo?._id && !msg?._id && (
                        <AccessTimeIcon
                          sx={{ fontSize: 14, color: "#ccc", mt: 0.5, mr: 1 }}
                        />
                      )}
                    </Box>
                  );
                }}
              </List>
            )}
          </AutoSizer>
          <Box ref={messagesEndRef} style={{ height: 0 }} />
        </Box>

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
                  <IconButton
                    onClick={() => {
                      sendMessage();
                      //   setScrollToBottom(true);
                    }}
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ input: { color: "text.primary" } }}
          />
        </Box>
      </Box>
    </>
  );
};

export default ChatWindow;
