import express from "express";
import { createChat } from "../controllers/chat.controller.js";
import verifyAccessToken from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/create-chat", verifyAccessToken, createChat);

export default router;
