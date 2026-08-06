import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const status = searchParams.get("status");

    const projects = await db.project.findMany({
      where: {
        isPublished: true,
        ...(city && city !== "all" ? { city: { equals: city } } : {}),
        ...(status && status !== "all" ? { status } : {}),
      },
      orderBy: { sortOrder: "asc" },
      include: {
        _count: { select: { plots: true } },
      },
    });

    const formatted = projects.map((p) => ({
      ...p,
      galleryImages: JSON.parse(p.galleryImages || "[]"),
      amenities: JSON.parse(p.amenities || "[]"),
      nearbyTemples: JSON.parse(p.nearbyTemples || "[]"),
      plotCount: p._count.plots,
      _count: undefined,
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch projects" } },
      { status: 500 }
    );
  }
}
