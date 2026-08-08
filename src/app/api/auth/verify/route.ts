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

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const user = await db.adminUser.findFirst({ where: { email } });

    if (!user) {
      await new Promise((r) => setTimeout(r, 300));
      return NextResponse.json({ ok: false });
    }

    let isMatch: boolean;

    if (user.password.length === 64 && /^[0-9a-f]{64}$/.test(user.password)) {
      const hash = await sha256(password);
      isMatch = hash === user.password;
    } else {
      isMatch = password === user.password;
      if (isMatch) {
        const hashed = await sha256(password);
        await db.adminUser.update({
          where: { id: user.id },
          data: { password: hashed },
        });
      }
    }

    if (!isMatch) {
      await new Promise((r) => setTimeout(r, 300));
      return NextResponse.json({ ok: false });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
