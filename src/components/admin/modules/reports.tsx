"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, Calendar, FileSpreadsheet, FileBarChart, TrendingUp, Users, IndianRupee } from "lucide-react";

const REPORTS = [
  { id: "daily-leads", title: "Daily Lead Report", desc: "All leads captured today with source and score", icon: Users, color: "text-gold", bg: "bg-gold/10" },
  { id: "weekly-sales", title: "Weekly Sales Report", desc: "Bookings, revenue, and conversion metrics for the week", icon: IndianRupee, color: "text-green-deep", bg: "bg-green-light/10" },
  { id: "monthly-revenue", title: "Monthly Revenue Report", desc: "Complete financial summary with GST breakdown", icon: FileBarChart, color: "text-temple-red", bg: "bg-temple-red/10" },
  { id: "project-performance", title: "Project Performance", desc: "Plot inventory, lead distribution, and booking velocity by project", icon: TrendingUp, color: "text-indigo-deep", bg: "bg-indigo-deep/10" },
  { id: "lead-source", title: "Lead Source Analysis", desc: "Channel-wise ROI and cost-per-lead breakdown", icon: FileText, color: "text-gold", bg: "bg-gold/10" },
  { id: "inventory-status", title: "Inventory Status Report", desc: "Current plot availability, pricing, and projected sell-through", icon: FileSpreadsheet, color: "text-green-deep", bg: "bg-green-light/10" },
];

export function Reports() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const generate = (id: string, title: string) => {
    toast.success(`📊 ${title} generating... You'll receive it via email shortly.`);
  };

  return (
    <div className="space-y-5">
      {/* Date range */}
      <Card className="card-luxury rounded-xl">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div>
              <Label className="text-xs flex items-center gap-1 text-indigo-deep"><Calendar className="w-3 h-3 text-gold" /> From Date</Label>
              <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="bg-white border-gold/25 mt-1 w-full sm:w-44" />
            </div>
            <div>
              <Label className="text-xs flex items-center gap-1 text-indigo-deep"><Calendar className="w-3 h-3 text-gold" /> To Date</Label>
              <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="bg-white border-gold/25 mt-1 w-full sm:w-44" />
            </div>
            <Button onClick={() => toast.success("📅 Custom range applied")} variant="outline" className="border-gold/30 text-indigo-deep hover:bg-gold/10">Apply Range</Button>
          </div>
        </CardContent>
      </Card>

      {/* Report cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REPORTS.map((r) => (
          <Card key={r.id} className="card-luxury rounded-xl group">
            <CardContent className="p-5">
              <div className={`w-11 h-11 rounded-lg ${r.bg} flex items-center justify-center mb-3`}>
                <r.icon className={`w-5 h-5 ${r.color}`} />
              </div>
              <h3 className="font-display text-base font-bold text-indigo-deep mb-1">{r.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 min-h-[40px]">{r.desc}</p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => generate(r.id, r.title)} className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-8 text-xs">
                  Generate
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast.success(`📄 Downloading ${r.title}...`)} className="border-gold/30 text-indigo-deep hover:bg-gold/10 h-8 w-8 p-0">
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scheduled reports */}
      <Card className="card-luxury rounded-xl">
        <CardContent className="p-5">
          <h3 className="font-display text-base font-bold text-indigo-deep mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" /> Scheduled Reports
          </h3>
          <div className="space-y-2">
            {[
              { name: "Daily Lead Summary", schedule: "Every day at 9:00 AM", recipients: "sales@rkproperties.in" },
              { name: "Weekly Sales Snapshot", schedule: "Every Monday at 8:00 AM", recipients: "admin@rkproperties.in, director@rkproperties.in" },
              { name: "Monthly Board Report", schedule: "1st of every month", recipients: "board@rkproperties.in" },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-marble">
                <div>
                  <div className="text-sm font-medium text-indigo-deep">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.schedule} · {s.recipients}</div>
                </div>
                <Button size="sm" variant="ghost" className="text-gold hover:text-gold-dark hover:bg-gold/10 h-7 text-xs">Edit</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
