import express from "express";
import { createChat, getAllChats } from "../controllers/chat.controller.js";
import verifyAccessToken from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create-chat", verifyAccessToken, createChat);
router.get("/", verifyAccessToken, getAllChats);

export default router;
