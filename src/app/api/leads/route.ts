import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get("stage");
    const projectId = searchParams.get("projectId");

    const leads = await db.lead.findMany({
      where: {
        ...(stage && stage !== "all" ? { stage } : {}),
        ...(projectId ? { projectId } : {}),
      },
      include: { project: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json(
      { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch leads" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, source, projectId, budgetRange, notes } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "Name and phone are required" } },
        { status: 400 }
      );
    }

    // Auto scoring based on source
    const scoreMap: Record<string, number> = {
      whatsapp: 20,
      website: 10,
      referral: 25,
      ads: 15,
      "walk-in": 30,
    };

    const lead = await db.lead.create({
      data: {
        name,
        phone,
        email: email || null,
        source: source || "website",
        projectId: projectId || null,
        budgetRange: budgetRange || null,
        notes: notes || null,
        score: scoreMap[source || "website"] || 10,
        stage: "new",
      },
    });

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json(
      { success: false, error: { code: "CREATE_ERROR", message: "Failed to create lead" } },
      { status: 500 }
    );
  }
}
