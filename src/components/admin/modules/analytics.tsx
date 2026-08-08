"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend, RadialBarChart, RadialBar } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Target, Zap } from "lucide-react";
import type { DashboardData } from "@/lib/types";

const SOURCE_COLORS = ["#C5A23E", "#2D5016", "#8B2500", "#1A1A2E", "#4A7A2E"];

export function Analytics() {
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => (await fetch("/api/dashboard")).json().then((j) => j.data),
  });

  if (isLoading || !data) return <div className="text-center py-12 text-muted-foreground">Loading analytics...</div>;

  // Lead sources distribution (mock from recent leads + breakdown)
  const sourceData = [
    { name: "Website", value: 45, fill: SOURCE_COLORS[0] },
    { name: "WhatsApp", value: 28, fill: SOURCE_COLORS[1] },
    { name: "Referral", value: 12, fill: SOURCE_COLORS[2] },
    { name: "Ads", value: 10, fill: SOURCE_COLORS[3] },
    { name: "Walk-in", value: 5, fill: SOURCE_COLORS[4] },
  ];

  // Project performance
  const projectPerf = data.topProjects.map((p) => ({
    name: p.name.split(" ").slice(-1)[0] === "Dham" ? "B.B. Dham" : p.name.split(" ").slice(-1)[0] === "Kunj" ? "B.B. Kunj" : p.name.split(" ").slice(-1)[0] === "Orchid" ? "B.B. Orchid" : "Lotus Greens",
    leads: p.leadCount,
    plots: p.plotCount,
  }));

  // 12-week trend
  const trend = Array.from({ length: 12 }).map((_, i) => ({
    week: `W${i + 1}`,
    leads: Math.floor(Math.random() * 30) + 10,
    conversions: Math.floor(Math.random() * 6) + 1,
  }));

  const conversionRate = ((data.leadStageBreakdown.find(l => l.stage === "won")?.count || 0) / data.counts.leads * 100 || 8).toFixed(1);

  return (
    <div className="space-y-6">
      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Conversion Rate", value: `${conversionRate}%`, icon: Target, color: "text-gold", bg: "bg-gold/10" },
          { label: "Avg Deal Size", value: "₹8.5L", icon: TrendingUp, color: "text-green-deep", bg: "bg-green-light/10" },
          { label: "Response Time", value: "23 min", icon: Zap, color: "text-temple-red", bg: "bg-temple-red/10" },
          { label: "Active Leads", value: data.counts.leads, icon: Users, color: "text-indigo-deep", bg: "bg-indigo-deep/10" },
        ].map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="card-luxury rounded-xl">
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-lg ${k.bg} flex items-center justify-center mb-2`}><k.icon className={`w-4 h-4 ${k.color}`} /></div>
                <div className="font-display text-xl font-bold text-indigo-deep">{k.value}</div>
                <div className="text-xs text-muted-foreground">{k.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Lead sources pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-luxury rounded-xl">
          <CardHeader className="pb-2"><CardTitle className="font-display text-base font-bold text-indigo-deep">Lead Sources</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" outerRadius={95} dataKey="value" label={(e: any) => `${e.name}: ${e.value}%`}>
                  {sourceData.map((_, i) => <Cell key={i} fill={SOURCE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(197,162,62,0.3)", borderRadius: "8px", color: "#FFF8E7" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-luxury rounded-xl">
          <CardHeader className="pb-2"><CardTitle className="font-display text-base font-bold text-indigo-deep">Project Performance</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={projectPerf}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(197,162,62,0.1)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b6557" }} />
                <YAxis tick={{ fontSize: 11, fill: "#6b6557" }} />
                <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(197,162,62,0.3)", borderRadius: "8px", color: "#FFF8E7" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="plots" name="Total Plots" fill="#D4C5A0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="leads" name="Leads" fill="#C5A23E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 12-week trend */}
      <Card className="card-luxury rounded-xl">
        <CardHeader className="pb-2"><CardTitle className="font-display text-base font-bold text-indigo-deep">12-Week Lead & Conversion Trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(197,162,62,0.1)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#6b6557" }} />
              <YAxis tick={{ fontSize: 11, fill: "#6b6557" }} />
              <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(197,162,62,0.3)", borderRadius: "8px", color: "#FFF8E7" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="leads" stroke="#C5A23E" strokeWidth={2.5} dot={{ r: 3, fill: "#C5A23E" }} />
              <Line type="monotone" dataKey="conversions" stroke="#2D5016" strokeWidth={2.5} dot={{ r: 3, fill: "#2D5016" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
