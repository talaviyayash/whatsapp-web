import { modalToggle } from "@/utils/customFunc";
import { Add } from "@mui/icons-material";
import { Box, Drawer, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ChatList from "./ChatList";

const ChatSideBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const toggleAddChatModal = () => {
    modalToggle({ dispatch, name: "addChat" });
  };

  return (
    <>
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
          <IconButton onClick={toggleAddChatModal}>
            <Add />
          </IconButton>
        </Box>
        <Stack>
          <ChatList />
        </Stack>
      </Drawer>
    </>
  );
};

export default ChatSideBar;
