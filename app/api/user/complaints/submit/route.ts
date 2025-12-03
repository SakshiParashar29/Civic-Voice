import complaintModel from "@/app/Models/complaintModel";
import { connectDB } from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
  id: string;
  email: string;
  state: string;
  city: string;
  role: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { title, description, area, category, urgency } = await req.json();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "No or invalid token provided" }), { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;

    const complaint = await complaintModel.create({
      title,
      description,
      area,
      category,
      urgency,
      user: decoded.id,
      state: decoded.state,
      city: decoded.city,
    });

    return new Response(
      JSON.stringify({ message: "Complaint submitted", complaint }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Complaint submission error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
