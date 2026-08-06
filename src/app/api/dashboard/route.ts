import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [projects, plots, leads, bookings, testimonials, blogPosts, contacts] = await Promise.all([
      db.project.count(),
      db.plot.count(),
      db.lead.count(),
      db.booking.count(),
      db.testimonial.count(),
      db.blogPost.count(),
      db.contactMessage.count(),
    ]);

    // Status breakdowns
    const plotStatusBreakdown = await db.plot.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    const leadStageBreakdown = await db.lead.groupBy({
      by: ["stage"],
      _count: { stage: true },
    });

    const projectCityBreakdown = await db.project.groupBy({
      by: ["city"],
      _count: { city: true },
    });

    // Total plot value
    const plotValueAgg = await db.plot.aggregate({ _sum: { price: true } });
    const totalInventoryValue = plotValueAgg._sum.price || 0;

    // Recent leads
    const recentLeads = await db.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { project: { select: { name: true } } },
    });

    // Top projects by plots
    const topProjects = await db.project.findMany({
      include: { _count: { select: { plots: true, leads: true } } },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: {
        counts: {
          projects,
          plots,
          leads,
          bookings,
          testimonials,
          blogPosts,
          contacts,
        },
        plotStatusBreakdown: plotStatusBreakdown.map((p) => ({ status: p.status, count: p._count.status })),
        leadStageBreakdown: leadStageBreakdown.map((l) => ({ stage: l.stage, count: l._count.stage })),
        projectCityBreakdown: projectCityBreakdown.map((c) => ({ city: c.city, count: c._count.city })),
        totalInventoryValue,
        recentLeads,
        topProjects: topProjects.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          city: p.city,
          status: p.status,
          plotCount: p._count.plots,
          leadCount: p._count.leads,
        })),
      },
    });
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
    return NextResponse.json(
      { success: false, error: { code: "FETCH_ERROR", message: "Failed to fetch dashboard data" } },
      { status: 500 }
    );
  }
}
