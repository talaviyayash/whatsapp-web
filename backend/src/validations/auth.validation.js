import Joi from "joi";

const googleAuthSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().trim().messages({
    "string.email": "Please provide a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  profileImage: Joi.string().uri().allow("").optional().messages({
    "string.uri": "Profile image must be a valid URL",
  }),
});

const emailSignupSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().trim().messages({
    "string.email": "Please provide a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
});

const emailSigninSchema = Joi.object({
  email: Joi.string().email().required().trim().messages({
    "string.email": "Please provide a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
});

const verifyOTPSchema = Joi.object({
  email: Joi.string().email().required().trim().messages({
    "string.email": "Please provide a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  otp: Joi.string().length(6).required().messages({
    "string.length": "OTP must be 6 characters long",
    "string.empty": "OTP is required",
    "any.required": "OTP is required",
  }),
});

export {
  googleAuthSchema,
  emailSignupSchema,
  emailSigninSchema,
  verifyOTPSchema,
};
