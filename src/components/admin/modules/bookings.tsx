"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, IndianRupee, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { formatINRFull, type Lead } from "@/lib/types";

// Mock bookings derived from won leads + some sample data
const MOCK_BOOKINGS = [
  { id: "BRJ8472910", leadName: "Anita Desai", project: "Bankey Bihari Orchid", plot: "P045", amount: 750000, status: "completed", date: "2026-07-28", expiry: "2026-08-12" },
  { id: "BRJ8472911", leadName: "Rajesh Agrawal", project: "Bankey Bihari Orchid", plot: "P012", amount: 950000, status: "partial", date: "2026-07-15", expiry: "2026-07-30" },
  { id: "BRJ8472912", leadName: "Vikram Singh", project: "Braj Lotus Greens", plot: "P087", amount: 1450000, status: "pending", date: "2026-08-02", expiry: "2026-08-17" },
  { id: "BRJ8472913", leadName: "Meera Devi", project: "Braj Lotus Greens", plot: "P023", amount: 1100000, status: "completed", date: "2026-06-20", expiry: "2026-07-05" },
  { id: "BRJ8472914", leadName: "Suresh Sharma", project: "Bankey Bihari Kunj", plot: "P031", amount: 680000, status: "completed", date: "2026-06-10", expiry: "2026-06-25" },
  { id: "BRJ8472915", leadName: "Arjun Kapoor", project: "Bankey Bihari Orchid", plot: "P056", amount: 820000, status: "partial", date: "2026-08-04", expiry: "2026-08-19" },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  completed: { label: "Completed", color: "bg-green-light/15 text-green-deep border-green-light/30", icon: CheckCircle2 },
  partial: { label: "Partial", color: "bg-gold/15 text-gold border-gold/30", icon: Clock },
  pending: { label: "Pending", color: "bg-temple-red/15 text-temple-red border-temple-red/30", icon: AlertCircle },
};

export function Bookings() {
  const [filter, setFilter] = useState("all");
  const { data: leads = [] } = useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: async () => (await fetch("/api/leads")).json().then((j) => j.data),
  });

  const wonLeads = leads.filter((l) => l.stage === "won");
  const allBookings = [...MOCK_BOOKINGS, ...wonLeads.slice(0, 3).map((l, i) => ({
    id: `BRJ${Date.now() + i}`, leadName: l.name, project: l.project?.name || "General", plot: `P${100 + i}`, amount: 800000, status: "pending", date: new Date(l.createdAt).toISOString().slice(0, 10), expiry: new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10),
  }))];

  const filtered = filter === "all" ? allBookings : allBookings.filter((b) => b.status === filter);
  const totalRevenue = allBookings.filter(b => b.status === "completed").reduce((s, b) => s + b.amount, 0);
  const pendingCount = allBookings.filter(b => b.status === "pending").length;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="card-luxury rounded-xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Total Bookings</div>
              <div className="font-display text-2xl font-bold text-indigo-deep">{allBookings.length}</div>
            </div>
            <CalendarCheck className="w-8 h-8 text-gold" />
          </CardContent>
        </Card>
        <Card className="card-luxury rounded-xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Revenue (Completed)</div>
              <div className="font-display text-2xl font-bold text-green-deep">{formatINRFull(totalRevenue)}</div>
            </div>
            <IndianRupee className="w-8 h-8 text-green-deep" />
          </CardContent>
        </Card>
        <Card className="card-luxury rounded-xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">Pending Action</div>
              <div className="font-display text-2xl font-bold text-temple-red">{pendingCount}</div>
            </div>
            <Clock className="w-8 h-8 text-temple-red" />
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "pending", "partial", "completed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${filter === f ? "bg-gold text-indigo-deep" : "bg-marble text-muted-foreground hover:text-indigo-deep"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="card-luxury rounded-xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-marble">
                <tr className="text-left text-xs text-muted-foreground border-b border-gold/15">
                  <th className="px-4 py-3 font-medium">Booking ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Project / Plot</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => {
                  const cfg = STATUS_CONFIG[b.status];
                  return (
                    <tr key={b.id} className="border-b border-gold/8 hover:bg-gold/5">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-gold">{b.id}</td>
                      <td className="px-4 py-3 font-medium text-indigo-deep">{b.leadName}</td>
                      <td className="px-4 py-3 text-muted-foreground"><div>{b.project}</div><div className="text-xs font-mono">{b.plot}</div></td>
                      <td className="px-4 py-3 font-semibold text-indigo-deep">{formatINRFull(b.amount)}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(b.date).toLocaleDateString("en-IN")}</td>
                      <td className="px-4 py-3"><Badge variant="outline" className={cfg.color}>{cfg.label}</Badge></td>
                      <td className="px-4 py-3">
                        {b.status !== "completed" ? (
                          <Button size="sm" variant="outline" className="border-green-light/30 text-green-deep hover:bg-green-light/10 h-7 text-xs">Mark Complete</Button>
                        ) : (
                          <span className="text-xs text-green-deep flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Done</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
