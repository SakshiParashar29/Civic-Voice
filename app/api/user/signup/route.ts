import { connectDB } from "@/lib/db";
import UserModel from "@/app/Models/UserModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
    await connectDB();

    try {
        const { username, email, password, role, state, city } = await req.json();

        if (!username || !email || !role || !state || !city)
            throw new Error("Invalid Credentials.");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const normalizedemail = email.toLowerCase();

        if (!emailRegex.test(normalizedemail)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

        const isPresent = await UserModel.findOne({ email: normalizedemail });
        if (isPresent)
            return NextResponse.json(
                { Error: "user already present" },
                { status: 400 }
            );

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            username,
            email: normalizedemail,
            password: hashedPassword,
            state,
            city,
            role
        });

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
                state: user.state,
                city: user.city
            },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        return NextResponse.json(
            { message: "SignUp successfully!", token },
            { status: 200 }
        )
    } catch (error) {
        console.log("Signup error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

