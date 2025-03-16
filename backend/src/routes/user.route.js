import { Router } from "express";
import { getSession } from "../controllers/user.controller.js";
import verifyAccessToken from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/session", verifyAccessToken, getSession);

export default router;
