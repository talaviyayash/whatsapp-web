import jwt from "jsonwebtoken";
import User from "../modal/user.modal.js";

const verifyAccessToken = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decoded._id).select("-verificationCode");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      // Handle expired token
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired, please login again",
        });
      }

      // Handle invalid token
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token, please login again",
        });
      }

      // Handle other token errors
      return res.status(401).json({
        success: false,
        message: "Token verification failed, please login again",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default verifyAccessToken;
