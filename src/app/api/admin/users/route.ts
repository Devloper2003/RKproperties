import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const SALT = "rk_props_2026_x";

async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str + SALT)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// GET — list all admin users (password hidden)
export async function GET() {
  try {
    const users = await db.adminUser.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ ok: true, data: users });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

// POST — create new admin user
export async function POST(req: NextRequest) {
  try {
    const { email, name, role, password } = await req.json();

    if (!email || !name || !password) {
      return NextResponse.json(
        { ok: false, error: "Email, name, and password are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await db.adminUser.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { ok: false, error: "Email already exists" },
        { status: 409 }
      );
    }

    // Hash password before saving
    const hashed = await sha256(password);

    const user = await db.adminUser.create({
      data: {
        email,
        name,
        role: role || "admin",
        password: hashed,
      },
    });

    return NextResponse.json({
      ok: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
