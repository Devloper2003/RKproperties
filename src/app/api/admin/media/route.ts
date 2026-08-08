import { NextResponse } from "next/server";
import { readdirSync, statSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const uploadDir = join(process.cwd(), "public", "uploads", "media");
    let filenames: string[] = [];

    try {
      filenames = readdirSync(uploadDir).filter((f: string) =>
        /\.(jpe?g|png|webp|gif|svg)$/i.test(f)
      );
    } catch {
      return NextResponse.json({ ok: true, data: [] });
    }

    const images = filenames
      .map((f: string) => {
        try {
          const stat = statSync(join(uploadDir, f));
          return {
            url: `/uploads/media/${f}`,
            filename: f,
            size: stat.size,
            createdAt: stat.mtime.toISOString(),
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ ok: true, data: images });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
