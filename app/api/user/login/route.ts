import { connectDB } from "@/lib/db";
import UserModel from "@/app/Models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 

export async function POST(req: Request) {
  await connectDB();

  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const isEmail = identifier.includes("@");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let searchValue = identifier.trim();

    if (isEmail) {
      searchValue = searchValue.toLowerCase();

      if (!emailRegex.test(searchValue)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        );
      }
    }

    const user = isEmail
      ? await UserModel.findOne({ email: searchValue })
      : await UserModel.findOne({ username: searchValue });

    if (!user)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, state: user.state, city: user.city },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
