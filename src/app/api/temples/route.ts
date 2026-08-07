import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const temples = await db.temple.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json({ success: true, data: temples });
  } catch (error) {
    console.error("Failed to fetch temples:", error);
    return NextResponse.json(
      { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch temples" } },
      { status: 500 }
    );
  }
}
