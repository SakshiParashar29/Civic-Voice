import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserModel from "@/app/Models/UserModel";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Authorization header missing" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Token missing" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
    if (!decoded || decoded.role.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userId = decoded.id;

    const adminUser = await UserModel.findById(userId).select("-password"); 

    if (!adminUser) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    return NextResponse.json({ admin: adminUser }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
