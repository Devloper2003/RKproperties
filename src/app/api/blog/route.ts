import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "10");

    const posts = await db.blogPost.findMany({
      where: {
        isPublished: true,
        ...(category && category !== "all" ? { category } : {}),
      },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    const formatted = posts.map((p) => ({
      ...p,
      tags: JSON.parse(p.tags || "[]"),
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return NextResponse.json(
      { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch blog posts" } },
      { status: 500 }
    );
  }
}
