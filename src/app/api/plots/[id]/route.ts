import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, price, isCorner, isRoadFacing } = body;

    const plot = await db.plot.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(price ? { price } : {}),
        ...(typeof isCorner === "boolean" ? { isCorner } : {}),
        ...(typeof isRoadFacing === "boolean" ? { isRoadFacing } : {}),
      },
    });

    return NextResponse.json({ success: true, data: plot });
  } catch (error) {
    console.error("Failed to update plot:", error);
    return NextResponse.json(
      { success: false, error: { code: "UPDATE_ERROR", message: "Failed to update plot" } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.plot.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete plot:", error);
    return NextResponse.json(
      { success: false, error: { code: "DELETE_ERROR", message: "Failed to delete plot" } },
      { status: 500 }
    );
  }
}
