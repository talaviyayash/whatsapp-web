import User from "../modal/user.modal.js";
import { generateOTP } from "../utils/otp.js";
import { sendEmail } from "../utils/mail.js";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

const handleGoogleAuth = async (req, res) => {
  try {
    const { name, email, profileImage } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists - Handle Sign In
      const token = await user.generateAccessToken();

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: SEVEN_DAYS,
      });

      return res.status(200).json({
        success: true,
        message: "Google sign in successful",
        data: {
          user,
        },
      });
    }

    // User doesn't exist - Handle Sign Up
    user = await User.create({
      name,
      email,
      profileImage,
    });

    const token = await user.generateAccessToken();

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: SEVEN_DAYS,
    });

    res.status(201).json({
      success: true,
      message: "Google sign up successful",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const signupWithEmail = async (req, res) => {
  try {
    const { email, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const otp = generateOTP();

    await User.create({
      name,
      email,
      verificationCode: {
        otp,
        sendedAt: new Date(),
      },
    });

    await sendEmail({
      to: email,
      subject: "Email Verification",
      text: `Your OTP for verification is: ${otp}`,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      data: {
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otpAge = (new Date() - user.verificationCode.sendedAt) / 1000 / 60;
    if (otpAge > 5 || user.verificationCode.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    user.verificationCode = undefined;
    await user.save();

    const token = await user.generateAccessToken();

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: SEVEN_DAYS,
    });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const signinWithEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first",
      });
    }

    // Generate OTP for signin
    const otp = generateOTP();

    // Update user with new OTP
    user.verificationCode = {
      otp,
      sendedAt: new Date(),
    };
    await user.save();

    // Send OTP email
    await sendEmail({
      to: email,
      subject: "Login OTP",
      text: `Your OTP for login is: ${otp}`,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      data: {
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    user.verificationCode = {
      otp,
      sendedAt: new Date(),
    };
    await user.save();

    // Send OTP email
    await sendEmail({
      to: email,
      subject: "Resend OTP",
      text: `Your new OTP for verification is: ${otp}`,
    });

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
      data: {
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export {
  handleGoogleAuth,
  signupWithEmail,
  verifyOTP,
  signinWithEmail,
  resendOTP,
};
