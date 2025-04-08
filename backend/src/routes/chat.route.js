import express from "express";
import { createChat, getAllChats } from "../controllers/chat.controller.js";
import verifyAccessToken from "../middlewares/auth.middleware.js";
import { getMessagesByChatId } from "../controllers/message.controller.js";
const router = express.Router();

router.post("/create-chat", verifyAccessToken, createChat);
router.get("/:chatId/messages", verifyAccessToken, getMessagesByChatId);
router.get("/", verifyAccessToken, getAllChats);

export default router;
