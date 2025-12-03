import complaintModel from "@/app/Models/complaintModel";
import { connectDB } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

interface MyJwtPayload extends JwtPayload {
  id: string;
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const complaintId = url.searchParams.get("id");

    if (!complaintId) {
      return NextResponse.json(
        { error: "Complaint ID missing" },
        { status: 400 }
      );
    }

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
    const userId = new mongoose.Types.ObjectId(decoded.id);

    const complaint = await complaintModel.findById(complaintId);
    if (!complaint) {
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      );
    }

    const alreadyUpvotedIndex = complaint.upvotedUsers.findIndex(id => id.equals(userId));

    if (alreadyUpvotedIndex !== -1) {
      complaint.upvotedUsers.splice(alreadyUpvotedIndex, 1);
    } else {
      complaint.upvotedUsers.push(userId);
    }

    await complaint.save();

    return NextResponse.json(
      {
        message: alreadyUpvotedIndex !== -1 ? "Upvote removed" : "Upvote added",
        upvotes: complaint.upvotedUsers.length,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Upvote error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


