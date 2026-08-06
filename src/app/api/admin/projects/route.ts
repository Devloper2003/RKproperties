import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const projects = await db.project.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { plots: true, leads: true, bookings: true } } },
  });
  return NextResponse.json({ success: true, data: projects });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const project = await db.project.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, "-"),
        tagline: body.tagline || "",
        location: body.location,
        city: body.city,
        latitude: body.latitude ? Number(body.latitude) : 0,
        longitude: body.longitude ? Number(body.longitude) : 0,
        totalAreaAcres: Number(body.totalAreaAcres) || 0,
        minPlotSize: Number(body.minPlotSize) || 0,
        maxPlotSize: Number(body.maxPlotSize) || 0,
        priceRangeMin: Number(body.priceRangeMin) || 0,
        priceRangeMax: Number(body.priceRangeMax) || 0,
        status: body.status || "selling",
        reraNumber: body.reraNumber || null,
        mvdaNumber: body.mvdaNumber || null,
        possessionDate: body.possessionDate || null,
        heroImage: body.heroImage || "",
        galleryImages: JSON.stringify(body.galleryImages || []),
        amenities: JSON.stringify(body.amenities || []),
        nearbyTemples: JSON.stringify(body.nearbyTemples || []),
        usp: body.usp || "",
        description: body.description || "",
        longDescription: body.longDescription || "",
        isPublished: body.isPublished ?? true,
        isFeatured: body.isFeatured ?? false,
      },
    });
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Create project failed:", error);
    return NextResponse.json(
      { success: false, error: { code: "CREATE_ERROR", message: "Failed to create project" } },
      { status: 500 }
    );
  }
}
