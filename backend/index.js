import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "./src/config/env.config.js";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./src/db/db.js";
import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import chatRoutes from "./src/routes/chat.route.js";
import messageRoutes from "./src/routes/message.route.js";
import messageSocketHandler from "./src/socket/socket.js";

connectDB();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  methods: ["GET", "POST"],
});
messageSocketHandler(io);
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
