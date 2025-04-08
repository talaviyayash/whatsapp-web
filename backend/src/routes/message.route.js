import express from "express";
import { getMessagesByChatId } from "../controllers/message.controller.js"; // Import the controller

const router = express.Router();

// router.get("/:chatId/messages", getMessagesByChatId);

export default router;
