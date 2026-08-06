import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const project = await db.project.update({
      where: { id },
      data: {
        ...(body.name ? { name: body.name } : {}),
        ...(body.slug ? { slug: body.slug } : {}),
        ...(body.tagline !== undefined ? { tagline: body.tagline } : {}),
        ...(body.location ? { location: body.location } : {}),
        ...(body.city ? { city: body.city } : {}),
        ...(body.latitude !== undefined ? { latitude: Number(body.latitude) } : {}),
        ...(body.longitude !== undefined ? { longitude: Number(body.longitude) } : {}),
        ...(body.totalAreaAcres !== undefined ? { totalAreaAcres: Number(body.totalAreaAcres) } : {}),
        ...(body.minPlotSize !== undefined ? { minPlotSize: Number(body.minPlotSize) } : {}),
        ...(body.maxPlotSize !== undefined ? { maxPlotSize: Number(body.maxPlotSize) } : {}),
        ...(body.priceRangeMin !== undefined ? { priceRangeMin: Number(body.priceRangeMin) } : {}),
        ...(body.priceRangeMax !== undefined ? { priceRangeMax: Number(body.priceRangeMax) } : {}),
        ...(body.status ? { status: body.status } : {}),
        ...(body.reraNumber !== undefined ? { reraNumber: body.reraNumber } : {}),
        ...(body.mvdaNumber !== undefined ? { mvdaNumber: body.mvdaNumber } : {}),
        ...(body.possessionDate !== undefined ? { possessionDate: body.possessionDate } : {}),
        ...(body.heroImage !== undefined ? { heroImage: body.heroImage } : {}),
        ...(body.amenities ? { amenities: JSON.stringify(body.amenities) } : {}),
        ...(body.nearbyTemples ? { nearbyTemples: JSON.stringify(body.nearbyTemples) } : {}),
        ...(body.usp !== undefined ? { usp: body.usp } : {}),
        ...(body.description !== undefined ? { description: body.description } : {}),
        ...(body.longDescription !== undefined ? { longDescription: body.longDescription } : {}),
        ...(body.isPublished !== undefined ? { isPublished: body.isPublished } : {}),
        ...(body.isFeatured !== undefined ? { isFeatured: body.isFeatured } : {}),
      },
    });
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Update project failed:", error);
    return NextResponse.json(
      { success: false, error: { code: "UPDATE_ERROR", message: "Failed to update project" } },
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
    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete project failed:", error);
    return NextResponse.json(
      { success: false, error: { code: "DELETE_ERROR", message: "Failed to delete project" } },
      { status: 500 }
    );
  }
}
