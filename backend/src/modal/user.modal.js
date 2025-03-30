import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    profileImage: {
      type: String,
    },
    description: {
      type: String,
      default: "",
    },
    verificationCode: {
      otp: {
        type: String,
      },
      sendedAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 4);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export default mongoose.model("user", userSchema);
