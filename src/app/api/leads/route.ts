import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Detect if the lead is likely an NRI based on timezone
function detectNRI(request: NextRequest): boolean {
  const tz = request.headers.get("x-vercel-ip-timezone") || "";
  // Indian timezone is Asia/Kolkata — anything else suggests NRI
  if (tz && !tz.includes("Kolkata") && !tz.includes("Calcutta")) {
    return true;
  }
  return false;
}

// Detect lead source quality
function scoreSource(source: string): number {
  const scoreMap: Record<string, number> = {
    whatsapp: 20,
    website: 10,
    referral: 25,
    ads: 15,
    "walk-in": 30,
  };
  return scoreMap[source] || 10;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stage = searchParams.get("stage");
    const projectId = searchParams.get("projectId");
    const minScore = searchParams.get("minScore");

    const leads = await db.lead.findMany({
      where: {
        ...(stage && stage !== "all" ? { stage } : {}),
        ...(projectId ? { projectId } : {}),
        ...(minScore ? { score: { gte: parseInt(minScore) } } : {}),
      },
      include: { project: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json(
      { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch leads" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, source, projectId, budgetRange, notes } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "Name and phone are required" } },
        { status: 400 }
      );
    }

    // === Lead Scoring Automation ===
    let score = scoreSource(source || "website");

    // NRI detection (+15 points)
    const isNRI = detectNRI(request);
    if (isNRI) score += 15;

    // Budget-based scoring
    if (budgetRange) {
      if (budgetRange.includes("20+")) score += 25;
      else if (budgetRange.includes("15-20")) score += 20;
      else if (budgetRange.includes("10-15")) score += 15;
      else if (budgetRange.includes("5-10")) score += 10;
    }

    // Project-specific interest (+5 — indicates deeper engagement)
    if (projectId) score += 5;

    // Email provided (+5 — more complete profile)
    if (email) score += 5;

    // Notes mentioning specific intent (+8)
    if (notes) {
      const intentKeywords = ["book", "visit", "buy", "invest", "schedule", "callback", "urgent"];
      const hasIntent = intentKeywords.some((k) => notes.toLowerCase().includes(k));
      if (hasIntent) score += 8;
    }

    // Cap at 100
    score = Math.min(score, 100);

    // Determine initial stage based on score
    let stage = "new";
    if (score >= 60) stage = "qualified";
    else if (score >= 35) stage = "contacted";

    // Build notes with scoring breakdown
    const scoringNotes = [
      notes || "",
      "",
      "--- Lead Scoring Breakdown ---",
      `Source: ${source || "website"} (+${scoreSource(source || "website")})`,
      `NRI detected: ${isNRI ? "Yes (+15)" : "No"}`,
      `Budget: ${budgetRange || "Not specified"}`,
      `Project interest: ${projectId ? "Yes (+5)" : "No"}`,
      `Email provided: ${email ? "Yes (+5)" : "No"}`,
      `Total score: ${score}/100`,
      `Auto-stage: ${stage}`,
    ].filter(Boolean).join("\n");

    const lead = await db.lead.create({
      data: {
        name,
        phone,
        email: email || null,
        source: source || "website",
        projectId: projectId || null,
        budgetRange: budgetRange || null,
        notes: scoringNotes,
        score,
        stage,
        lastContactedAt: null,
      },
    });

    return NextResponse.json({
      success: true,
      data: lead,
      meta: {
        score,
        stage,
        isNRI,
        scoringBreakdown: {
          source: scoreSource(source || "website"),
          nri: isNRI ? 15 : 0,
          budget: budgetRange ? (budgetRange.includes("20+") ? 25 : budgetRange.includes("15-20") ? 20 : budgetRange.includes("10-15") ? 15 : 10) : 0,
          projectInterest: projectId ? 5 : 0,
          emailProvided: email ? 5 : 0,
        },
      },
    });
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json(
      { success: false, error: { code: "CREATE_ERROR", message: "Failed to create lead" } },
      { status: 500 }
    );
  }
}
