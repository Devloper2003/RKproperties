import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (id.includes("..") || id.includes("/") || id.includes("\\")) {
      return NextResponse.json({ ok: false, error: "Invalid filename" }, { status: 400 });
    }

    const filePath = join(process.cwd(), "public", "uploads", "media", id);

    try {
      await unlink(filePath);
    } catch {
      return NextResponse.json({ ok: false, error: "File not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Delete failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
