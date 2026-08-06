import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const project = await db.project.findUnique({
      where: { slug },
      include: {
        plots: { orderBy: { plotNumber: "asc" } },
        testimonials: { where: { isPublished: true } },
      },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Project not found" } },
        { status: 404 }
      );
    }

    const formatted = {
      ...project,
      galleryImages: JSON.parse(project.galleryImages || "[]"),
      amenities: JSON.parse(project.amenities || "[]"),
      nearbyTemples: JSON.parse(project.nearbyTemples || "[]"),
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return NextResponse.json(
      { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch project" } },
      { status: 500 }
    );
  }
}
