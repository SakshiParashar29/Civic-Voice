import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user"
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
