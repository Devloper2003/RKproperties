import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const plot = await db.plot.create({
      data: {
        projectId: body.projectId,
        plotNumber: body.plotNumber,
        sizeSqyd: Number(body.sizeSqyd),
        facing: body.facing || "north",
        dimensions: body.dimensions || "",
        price: Number(body.price),
        status: body.status || "available",
        isCorner: body.isCorner ?? false,
        isRoadFacing: body.isRoadFacing ?? false,
      },
    });
    return NextResponse.json({ success: true, data: plot });
  } catch (error) {
    console.error("Create plot failed:", error);
    return NextResponse.json(
      { success: false, error: { code: "CREATE_ERROR", message: "Failed to create plot" } },
      { status: 500 }
    );
  }
}
