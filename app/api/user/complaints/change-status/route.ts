import complaintModel from "@/app/Models/complaintModel";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const problemId = url.searchParams.get("id");

    if (!problemId) {
      return NextResponse.json({ error: "Problem ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const newStatusRaw = body.status;

    const allowedStatuses = ["Pending", "In-Progress", "Resolved"] as const;
    type StatusType = typeof allowedStatuses[number];

    if (!newStatusRaw || !allowedStatuses.includes(newStatusRaw as StatusType)) {
      return NextResponse.json({ error: "Valid status is required" }, { status: 400 });
    }

    const newStatus = newStatusRaw as StatusType;

    const problem = await complaintModel.findById(problemId);

    if (!problem) {
      return NextResponse.json({ message: "Problem not found" }, { status: 404 });
    }

    problem.status = newStatus;
    await problem.save();

    return NextResponse.json(
      { message: "Status updated successfully", problem },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating problem status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
