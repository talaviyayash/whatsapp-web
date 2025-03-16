import "./src/config/env.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import connectDB from "./src/db/db.js";
import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
