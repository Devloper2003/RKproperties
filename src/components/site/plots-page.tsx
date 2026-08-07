"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Maximize, Compass, IndianRupee, Heart, GitCompare, Check, Loader2, BookOpen, MessageCircle } from "lucide-react";
import { navigate } from "@/lib/router";
import { InnerNavbar } from "./inner-navbar";
import { useApp } from "@/lib/store";
import { formatINRFull, PLOT_STATUS_CONFIG, type Plot, type Project } from "@/lib/types";

const FACINGS = ["all", "north", "south", "east", "west", "ne", "nw", "se", "sw"];
const STATUSES = ["all", "available", "reserved", "booked", "sold"];

export function PlotsPage() {
  const { openBooking, toggleWishlist, isWishlisted, togglePlotCompare, isPlotComparing } = useApp();
  const [projectFilter, setProjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [facingFilter, setFacingFilter] = useState("all");
  const [sizeRange, setSizeRange] = useState<[number, number]>([80, 400]);

  const { data: projects = [] } = useQuery<Project[]>({ queryKey: ["projects"], queryFn: async () => (await fetch("/api/projects")).json().then((j) => j.data) });
  const activeProjectId = projectFilter === "all" ? "" : projects.find((p) => p.slug === projectFilter)?.id || "";

  const { data: plots = [], isLoading } = useQuery<Plot[]>({
    queryKey: ["plots-page", activeProjectId, statusFilter, facingFilter, sizeRange],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeProjectId) params.set("projectId", activeProjectId);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (facingFilter !== "all") params.set("facing", facingFilter);
      params.set("minSize", String(sizeRange[0])); params.set("maxSize", String(sizeRange[1]));
      return (await fetch(`/api/plots?${params}`)).json().then((j) => j.data);
    },
  });

  return (
    <div className="min-h-screen bg-cream">
      <InnerNavbar title="Plot Inventory" />

      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-indigo-deep to-[#2d1b3d] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream mb-2">Available Plots</h1>
          <p className="text-sm text-cream/70 max-w-lg mx-auto">Real-time plot availability across all townships · Filter by project, size, facing, and status</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <Card className="card-luxury rounded-2xl p-5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Project</label>
              <Select value={projectFilter} onValueChange={setProjectFilter}><SelectTrigger className="bg-white border-gold/25"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Projects</SelectItem>{projects.map((p) => <SelectItem key={p.id} value={p.slug}>{p.name}</SelectItem>)}</SelectContent></Select>
            </div>
            <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="bg-white border-gold/25 capitalize"><SelectValue /></SelectTrigger><SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s} className="capitalize">{s === "all" ? "All Status" : s}</SelectItem>)}</SelectContent></Select>
            </div>
            <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Facing</label>
              <Select value={facingFilter} onValueChange={setFacingFilter}><SelectTrigger className="bg-white border-gold/25 capitalize"><SelectValue /></SelectTrigger><SelectContent>{FACINGS.map((f) => <SelectItem key={f} value={f} className="capitalize">{f === "all" ? "All Directions" : f.toUpperCase()}</SelectItem>)}</SelectContent></Select>
            </div>
            <div><label className="text-xs font-medium text-muted-foreground mb-1.5 block">Size: {sizeRange[0]}–{sizeRange[1]} sq.yd</label>
              <Slider value={sizeRange} onValueChange={(v) => setSizeRange([v[0], v[1]] as [number, number])} min={80} max={400} step={10} className="mt-3" />
            </div>
          </div>
        </Card>

        {/* Plots grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin text-gold mr-2" /> Loading plots...</div>
        ) : plots.length === 0 ? (
          <div className="text-center py-20"><div className="text-5xl mb-4">🪔</div><p className="text-muted-foreground">No plots match your filters.</p></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {plots.slice(0, 60).map((plot, i) => {
              const cfg = PLOT_STATUS_CONFIG[plot.status] || PLOT_STATUS_CONFIG.available;
              const isAvailable = plot.status === "available";
              return (
                <motion.div key={plot.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.4) }}>
                  <Card className={`relative overflow-hidden rounded-xl border-2 ${cfg.border} bg-white hover:shadow-lg transition-all ${!isAvailable ? "opacity-75" : ""}`}>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-sm font-bold text-indigo-deep">{plot.plotNumber}</span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => toggleWishlist(plot.id)} className={`p-1 rounded transition-colors ${isWishlisted(plot.id) ? "text-temple-red" : "text-muted-foreground hover:text-temple-red"}`}>
                            <Heart className={`w-3.5 h-3.5 ${isWishlisted(plot.id) ? "fill-current" : ""}`} />
                          </button>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full text-white ${cfg.bg}`}>{cfg.label}</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground"><Maximize className="w-3 h-3" /> {plot.sizeSqyd} sq.yd</div>
                        <div className="flex items-center gap-1 text-muted-foreground"><Compass className="w-3 h-3" /> {plot.dimensions} · {plot.facing.toUpperCase()}</div>
                        <div className="flex items-center gap-1 font-semibold text-gold"><IndianRupee className="w-3 h-3" /> {formatINRFull(plot.price)}</div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gold/10 flex gap-1">
                        <Button size="sm" disabled={!isAvailable} onClick={() => openBooking(plot.id)} className="flex-1 h-7 text-[11px] gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep disabled:opacity-40">
                          {isAvailable ? "Book" : "View"}
                        </Button>
                        <button onClick={() => togglePlotCompare(plot.id)} className={`px-2 h-7 rounded-md text-[10px] font-medium border ${isPlotComparing(plot.id) ? "bg-gold/15 border-gold/50 text-gold" : "bg-white border-gold/20 text-muted-foreground hover:text-gold"}`}>
                          {isPlotComparing(plot.id) ? <Check className="w-3 h-3" /> : <GitCompare className="w-3 h-3" />}
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
        {plots.length > 60 && <div className="p-3 text-center text-xs text-muted-foreground mt-4">Showing first 60 of {plots.length} plots. Refine filters to see more.</div>}
      </div>
    </div>
  );
}
