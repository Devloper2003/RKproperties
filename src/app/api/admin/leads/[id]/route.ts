import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const lead = await db.lead.update({
      where: { id },
      data: {
        ...(body.stage ? { stage: body.stage } : {}),
        ...(body.score !== undefined ? { score: Number(body.score) } : {}),
        ...(body.assignedTo !== undefined ? { assignedTo: body.assignedTo } : {}),
        ...(body.notes !== undefined ? { notes: body.notes } : {}),
        ...(body.budgetRange !== undefined ? { budgetRange: body.budgetRange } : {}),
        ...(body.name ? { name: body.name } : {}),
        ...(body.phone ? { phone: body.phone } : {}),
        ...(body.email !== undefined ? { email: body.email } : {}),
        ...(body.lastContactedAt ? { lastContactedAt: new Date(body.lastContactedAt) } : {}),
      },
    });
    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error("Update lead failed:", error);
    return NextResponse.json(
      { success: false, error: { code: "UPDATE_ERROR", message: "Failed to update lead" } },
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
    await db.lead.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete lead failed:", error);
    return NextResponse.json(
      { success: false, error: { code: "DELETE_ERROR", message: "Failed to delete lead" } },
      { status: 500 }
    );
  }
}
