import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import complaintModel from "@/app/Models/complaintModel";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
  id: string;
  city: string;
  state: string;
  role: string;
}

type Status = "Pending" | "In-Progress" | "Resolved";

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
    const { city, state } = decoded;

    // Aggregate complaint counts by status for user's city/state
    const stats = await complaintModel.aggregate([
      { $match: { city, state } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const statsObj: Record<Status | "total", number> = {
      total: 0,
      Pending: 0,
      "In-Progress": 0,
      Resolved: 0,
    };

    stats.forEach(({ _id, count }: { _id: Status; count: number }) => {
      if (_id in statsObj) {
        statsObj[_id] = count;
        statsObj.total += count;
      }
    });

    return NextResponse.json({ data: statsObj }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
