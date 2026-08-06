import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Use z-ai-web-dev-sdk for the Braj Assist AI chatbot
export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION", message: "Message is required" } },
        { status: 400 }
      );
    }

    // Fetch live context from DB
    const projects = await db.project.findMany({
      where: { isPublished: true },
      select: {
        name: true,
        slug: true,
        city: true,
        location: true,
        minPlotSize: true,
        maxPlotSize: true,
        priceRangeMin: true,
        priceRangeMax: true,
        status: true,
        usp: true,
        reraNumber: true,
        mvdaNumber: true,
        _count: { select: { plots: true } },
      },
    });

    const availablePlotsByProject = await db.plot.groupBy({
      by: ["projectId"],
      where: { status: "available" },
      _count: { status: true },
    });

    const knowledgeContext = projects
      .map((p) => {
        const available = availablePlotsByProject.find((a) => a.projectId === p.id)?._count.status || 0;
        return `${p.name} (${p.city}) — ${p.location}. Plot sizes: ${p.minPlotSize}-${p.maxPlotSize} sq.yd. Price: ₹${(p.priceRangeMin / 100000).toFixed(0)}-${(p.priceRangeMax / 100000).toFixed(0)} Lakh. Status: ${p.status}. ${available} plots available. USP: ${p.usp} RERA: ${p.reraNumber || "N/A"}, MVDA: ${p.mvdaNumber || "N/A"}.`;
      })
      .join("\n");

    const SYSTEM_PROMPT = `You are "Braj Assist", the AI sales assistant for BrajProperty.in, a premium plotted development company in the sacred Braj Dham region (Vrindavan, Mathura, Govardhan).

YOUR PERSONALITY:
- Warm, respectful, and reverent — you understand the spiritual significance of Braj Dham and speak with devotion
- Professional and knowledgeable about real estate specifics
- Helpful but never pushy — guide, don't sell
- Conversational Hinglish by default (Hindi + English mix), but respond in the language the user uses

YOUR CAPABILITIES:
- Answer questions about 4 projects listed below
- Check plot availability (numbers provided in context)
- Explain pricing ranges
- Provide information about nearby temples
- Explain MVDA approval and legal clarity benefits
- Guide users toward WhatsApp +91 98370 123456 for human assistance

CURRENT PROJECT DATA (live from database):
${knowledgeContext}

YOUR LIMITATIONS (CRITICAL):
- NEVER quote exact legal document text — direct to human agent
- NEVER make financial guarantees or ROI promises
- NEVER share other customer personal information
- If unsure about any factual detail, say "Let me connect you with our property advisor" and offer WhatsApp transfer to +91 98370 123456
- Keep responses under 150 words unless specifically asked for detailed information
- Always be respectful of the spiritual nature of Braj Dham

BOOKING: To book a plot, users can visit any project page and use the "Book Now" button, or WhatsApp us directly. Booking amounts range from ₹10,000 to ₹50,000.

Remember: You are assisting devotees and investors in finding their spiritual home in Braj. Every response should reflect warmth, devotion, and professionalism.`;

    // Dynamically import to keep it server-side only
    const ZAI = (await import("z-ai-web-dev-sdk")).default;
    const zai = await ZAI.create();

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-6).map((h: { role: string; content: string }) => ({
        role: h.role === "assistant" ? "assistant" : "user",
        content: h.content,
      })),
      { role: "user", content: message },
    ];

    const completion = await zai.chat.completions.create({
      messages,
      temperature: 0.7,
      maxTokens: 400,
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "I apologize, I couldn't process that. Please WhatsApp us at +91 98370 123456 for immediate assistance. 🙏";

    return NextResponse.json({ success: true, data: { reply } });
  } catch (error) {
    console.error("Chat API error:", error);
    // Graceful fallback
    return NextResponse.json({
      success: true,
      data: {
        reply:
          "Namaste 🙏 I'm here to help you find your spiritual home in Braj Dham. For detailed assistance, please WhatsApp our property advisor at +91 98370 123456. We have 4 premium townships across Vrindavan, Mathura, and Govardhan — all MVDA-approved with clear legal titles.",
      },
    });
  }
}
