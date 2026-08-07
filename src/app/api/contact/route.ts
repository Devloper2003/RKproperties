import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message, projectId } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "Name, phone and message are required" } },
        { status: 400 }
      );
    }

    const contact = await db.contactMessage.create({
      data: { name, phone, email: email || null, subject: subject || "General Inquiry", message, projectId: projectId || null },
    });

    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    console.error("Failed to create contact message:", error);
    return NextResponse.json(
      { success: false, error: { code: "CREATE_ERROR", message: "Failed to submit message" } },
      { status: 500 }
    );
  }
}
