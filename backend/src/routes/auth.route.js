import { Router } from "express";
import {
  handleGoogleAuth,
  signupWithEmail,
  signinWithEmail,
  verifyOTP,
  resendOTP,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import {
  googleAuthSchema,
  emailSignupSchema,
  emailSigninSchema,
  verifyOTPSchema,
} from "../validations/auth.validation.js";

const router = Router();

router.post("/google", validate(googleAuthSchema), handleGoogleAuth);
router.post("/signup", validate(emailSignupSchema), signupWithEmail);
router.post("/signin", validate(emailSigninSchema), signinWithEmail);
router.post("/verify-otp", validate(verifyOTPSchema), verifyOTP);
router.post("/resend-otp", validate(emailSigninSchema), resendOTP);

export default router;
