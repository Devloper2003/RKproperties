import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const status = searchParams.get("status");
    const facing = searchParams.get("facing");
    const minSize = searchParams.get("minSize");
    const maxSize = searchParams.get("maxSize");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const plots = await db.plot.findMany({
      where: {
        ...(projectId ? { projectId } : {}),
        ...(status && status !== "all" ? { status } : {}),
        ...(facing && facing !== "all" ? { facing } : {}),
        ...(minSize ? { sizeSqyd: { gte: parseInt(minSize) } } : {}),
        ...(maxSize ? { sizeSqyd: { lte: parseInt(maxSize) } } : {}),
        ...(minPrice ? { price: { gte: parseInt(minPrice) } } : {}),
        ...(maxPrice ? { price: { lte: parseInt(maxPrice) } } : {}),
      },
      include: { project: { select: { name: true, slug: true, city: true } } },
      orderBy: [{ projectId: "asc" }, { plotNumber: "asc" }],
      take: 500,
    });

    return NextResponse.json({ success: true, data: plots });
  } catch (error) {
    console.error("Failed to fetch plots:", error);
    return NextResponse.json(
      { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch plots" } },
      { status: 500 }
    );
  }
}
