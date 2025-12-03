import UserModel from "@/app/Models/UserModel";
import complaintModel from "@/app/Models/complaintModel";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface MyJwtPayload extends JwtPayload {
    id: String;
    email: String;
    city: String;
    state: String;
    role: String;
}
export async function GET(req: Request) {
    try {
        await connectDB();

        const token = req.headers.get("authorization")?.replace("Bearer ", "");
        if (!token)
            return NextResponse.json(
                { message: "No token provided" },
                { status: 401 }
            );

        const decode = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;

        const city = decode.city;
        const state = decode.state;

        const complaints = await complaintModel.aggregate([
            {
                $match: { city, state }
            },

            {
                $addFields: {
                    statusPriority: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$status", "Pending"] }, then: 1 },
                                { case: { $eq: ["$status", "In-Progress"] }, then: 2 },
                                { case: { $eq: ["$status", "Resolved"] }, then: 3 },
                            ],
                            default: 4
                        }
                    },
                    urgencyPriority: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$urgency", "Critical"] }, then: 1 },
                                { case: { $eq: ["$urgency", "High"] }, then: 2 },
                                { case: { $eq: ["$urgency", "Medium"] }, then: 3 },
                                { case: { $eq: ["$urgency", "Low"] }, then: 4 },
                            ],
                            default: 5
                        }
                    },

                    upvoteCount: { $size: "$upvotedUsers" }
                }
            },

            {
                $sort: {
                    urgencyPriority: 1,   
                    upvoteCount: -1 ,    
                    statusPriority: 1,     
                }
            },

            {
                $project: {
                    _id: 1,
                    title: 1,
                    area: 1,
                    category: 1,
                    urgency: 1,
                    status: 1,
                    upvoteCount: 1
                }
            }
        ]);


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
            upvoteCount: c.upvoteCount ?? 0
        }));

        return NextResponse.json(
            { complaints: complaintsWithCount },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: 500 }
        );
    }
}