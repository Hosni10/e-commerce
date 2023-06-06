import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
      minLength: [2, "user name too short"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      minLength: [2, "email too short"],
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "minLength 6 characters"],
    },
    phone: {
      type: String,
      required: [true, "phone number required"],
    },
    profilePic: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
