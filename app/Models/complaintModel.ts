import { TruckElectric } from "lucide-react";
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: null
    },
    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Resolved"],
      default: "Pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    urgency: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low"
    },
    upvotedUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: []
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
