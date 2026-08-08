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

// PUT — update admin user (name, role, or password)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { email, name, role, password } = body;

    const existing = await db.adminUser.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "User not found" },
        { status: 404 }
      );
    }

    // If email is being changed, check uniqueness
    if (email && email !== existing.email) {
      const emailTaken = await db.adminUser.findUnique({ where: { email } });
      if (emailTaken) {
        return NextResponse.json(
          { ok: false, error: "Email already exists" },
          { status: 409 }
        );
      }
    }

    const updateData: Record<string, string> = {};
    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (email) updateData.email = email;
    if (password) updateData.password = await sha256(password);

    const user = await db.adminUser.update({
      where: { id },
      data: updateData,
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

// DELETE — remove admin user
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.adminUser.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "User not found" },
        { status: 404 }
      );
    }

    await db.adminUser.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
