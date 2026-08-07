"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Grid3x3, Users, IndianRupee, TrendingUp, ArrowUpRight, Clock } from "lucide-react";
import type { DashboardData, formatINR } from "@/lib/types";
import { formatINR as fmtINR } from "@/lib/types";
import { LEAD_STAGES } from "@/lib/types";

const PLOT_COLORS: Record<string, string> = {
  available: "#4A7A2E",
  reserved: "#C5A23E",
  booked: "#1A1A2E",
  sold: "#8B2500",
};

export function Dashboard() {
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => (await fetch("/api/dashboard")).json().then((j) => j.data),
  });

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="card-luxury rounded-xl animate-pulse"><CardContent className="p-6 h-32" /></Card>
        ))}
      </div>
    );
  }

  const kpis = [
    { label: "Total Projects", value: data.counts.projects, icon: Building2, color: "text-gold", bg: "bg-gold/10", change: "+1 this quarter" },
    { label: "Total Plots", value: data.counts.plots, icon: Grid3x3, color: "text-green-deep", bg: "bg-green-light/10", change: `${data.plotStatusBreakdown.find(p => p.status === "available")?.count || 0} available` },
    { label: "Total Leads", value: data.counts.leads, icon: Users, color: "text-temple-red", bg: "bg-temple-red/10", change: "+8 this week" },
    { label: "Inventory Value", value: fmtINR(data.totalInventoryValue), icon: IndianRupee, color: "text-indigo-deep", bg: "bg-indigo-deep/10", change: "+12% YoY" },
  ];

  const plotChartData = data.plotStatusBreakdown.map((p) => ({
    name: p.status.charAt(0).toUpperCase() + p.status.slice(1),
    count: p.count,
    fill: PLOT_COLORS[p.status] || "#C5A23E",
  }));

  const leadChartData = data.leadStageBreakdown.map((l) => {
    const stage = LEAD_STAGES.find((s) => s.id === l.stage);
    return {
      name: stage?.label || l.stage,
      value: l.count,
      fill: stage?.color?.replace("bg-", "").replace("-500", "") || "#C5A23E",
    };
  });

  // Mock 7-day lead trend
  const trendData = Array.from({ length: 7 }).map((_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    leads: Math.floor(Math.random() * 15) + 5,
    bookings: Math.floor(Math.random() * 4) + 1,
  }));

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="card-luxury rounded-xl">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                    <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-green-deep" />
                </div>
                <div className="mt-3 font-display text-2xl font-bold text-indigo-deep">{kpi.value}</div>
                <div className="text-xs text-muted-foreground">{kpi.label}</div>
                <div className="text-[11px] text-gold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {kpi.change}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-luxury rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base font-bold text-indigo-deep">Plots by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={plotChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(197,162,62,0.1)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b6557" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6b6557" }} />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a2e",
                    border: "1px solid rgba(197,162,62,0.3)",
                    borderRadius: "8px",
                    color: "#FFF8E7",
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-luxury rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base font-bold text-indigo-deep">Leads by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={leadChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {leadChartData.map((entry, i) => {
                    const colorMap: Record<string, string> = {
                      blue: "#3b82f6", amber: "#f59e0b", purple: "#a855f7",
                      pink: "#ec4899", orange: "#f97316", green: "#16a34a", gray: "#6b7280",
                    };
                    return <Cell key={i} fill={colorMap[entry.fill] || "#C5A23E"} />;
                  })}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1a1a2e",
                    border: "1px solid rgba(197,162,62,0.3)",
                    borderRadius: "8px",
                    color: "#FFF8E7",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend + Recent leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="card-luxury rounded-xl lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base font-bold text-indigo-deep">Leads & Bookings — Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5A23E" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#C5A23E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D5016" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#2D5016" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(197,162,62,0.1)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6b6557" }} />
                <YAxis tick={{ fontSize: 11, fill: "#6b6557" }} />
                <Tooltip
                  contentStyle={{
                    background: "#1a1a2e",
                    border: "1px solid rgba(197,162,62,0.3)",
                    borderRadius: "8px",
                    color: "#FFF8E7",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="leads" stroke="#C5A23E" fill="url(#leadsGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="bookings" stroke="#2D5016" fill="url(#bookGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-luxury rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base font-bold text-indigo-deep flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" /> Recent Leads
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[280px] overflow-y-auto scroll-luxury">
            {data.recentLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No leads yet</p>
            ) : (
              data.recentLeads.map((lead) => {
                const stage = LEAD_STAGES.find((s) => s.id === lead.stage);
                return (
                  <div key={lead.id} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gold/5">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-indigo-deep truncate">{lead.name}</div>
                      <div className="text-[11px] text-muted-foreground truncate">
                        {lead.project?.name || "General"} · {lead.source}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full text-white ${stage?.color || "bg-gray-500"}`}>
                        {stage?.label || lead.stage}
                      </span>
                      <span className="text-[11px] font-semibold text-gold">{lead.score}</span>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>

      {/* Projects overview */}
      <Card className="card-luxury rounded-xl">
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-base font-bold text-indigo-deep">Projects Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-gold/15">
                  <th className="pb-2 font-medium">Project</th>
                  <th className="pb-2 font-medium">City</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium text-right">Plots</th>
                  <th className="pb-2 font-medium text-right">Leads</th>
                </tr>
              </thead>
              <tbody>
                {data.topProjects.map((p) => (
                  <tr key={p.id} className="border-b border-gold/8 hover:bg-gold/5">
                    <td className="py-3 font-medium text-indigo-deep">{p.name}</td>
                    <td className="py-3 text-muted-foreground">{p.city}</td>
                    <td className="py-3">
                      <Badge variant="outline" className={
                        p.status === "selling" ? "border-green-light/40 text-green-deep" :
                        p.status === "pre-launch" ? "border-temple-red/40 text-temple-red" :
                        "border-muted-foreground/40 text-muted-foreground"
                      }>
                        {p.status === "selling" ? "Selling" : p.status === "pre-launch" ? "Pre-Launch" : "Sold Out"}
                      </Badge>
                    </td>
                    <td className="py-3 text-right font-semibold text-indigo-deep">{p.plotCount}</td>
                    <td className="py-3 text-right font-semibold text-gold">{p.leadCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
