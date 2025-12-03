import complaintModel from "@/app/Models/complaintModel";
import { connectDB } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

interface MyJwtPayload extends JwtPayload {
  id: string;
  email: string;
  state: string;
  city: string;
  role: string;
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;

    const myCity = decoded.city;
    const myState = decoded.state;

    const complaints = await complaintModel
      .find({ city: myCity, state: myState })
      .select("_id title area category urgency status upvotedUsers")
      .sort({ createdAt: -1 });

    if (!complaints || complaints.length === 0) {
      return NextResponse.json(
        { message: "No complaints found" },
        { status: 200 }
      );
    }

    const complaintsWithCount = complaints.map(c => ({
      id: c._id,
      title: c.title,
      area: c.area,
      category: c.category,
      urgency: c.urgency,
      status: c.status,
      upvoteCount: c.upvotedUsers?.length || 0,
    }));

    return NextResponse.json(
      { complaints: complaintsWithCount },
      { status: 200 }
    );

  } catch (error) {
    console.error("GET complaints error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
