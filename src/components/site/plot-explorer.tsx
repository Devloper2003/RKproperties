"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, MapPin, Compass, IndianRupee, Maximize, MessageCircle, BookOpen, Loader2, Heart, HeartCrack } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import { formatINRFull, PLOT_STATUS_CONFIG, type Plot, type Project } from "@/lib/types";

const FACINGS = ["all", "north", "south", "east", "west", "ne", "nw", "se", "sw"];
const STATUSES = ["all", "available", "reserved", "booked", "sold"];

export function PlotExplorer() {
  const { selectedProjectForPlots, setSelectedProjectForPlots, openBooking, toggleWishlist, isWishlisted, setWishlistOpen, wishlistPlotIds, initWishlist } = useApp();
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [facingFilter, setFacingFilter] = useState<string>("all");
  const [sizeRange, setSizeRange] = useState<[number, number]>([80, 400]);
  const [visibleCount, setVisibleCount] = useState(24);

  // Initialize wishlist from localStorage on mount
  useEffect(() => { initWishlist(); }, [initWishlist]);

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => (await fetch("/api/projects")).json().then((j) => j.data),
  });

  // Sync with selectedProjectForPlots via derived value
  const effectiveProjectFilter = selectedProjectForPlots || projectFilter;

  const activeProjectId = effectiveProjectFilter === "all"
    ? ""
    : projects.find((p) => p.slug === effectiveProjectFilter)?.id || "";

  const { data: plots = [], isLoading } = useQuery<Plot[]>({
    queryKey: ["plots", activeProjectId, statusFilter, facingFilter, sizeRange],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeProjectId) params.set("projectId", activeProjectId);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (facingFilter !== "all") params.set("facing", facingFilter);
      params.set("minSize", String(sizeRange[0]));
      params.set("maxSize", String(sizeRange[1]));
      const res = await fetch(`/api/plots?${params}`);
      return res.json().then((j) => j.data);
    },
  });

  const visiblePlots = plots.slice(0, visibleCount);
  const statusCounts: Record<string, number> = { available: 0, reserved: 0, booked: 0, sold: 0 };
  for (const p of plots) {
    statusCounts[p.status] = (statusCounts[p.status] || 0) + 1;
  }

  return (
    <section id="plots" className="py-20 lg:py-28 bg-marble relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Live Inventory"
          title="Find Your Perfect"
          highlight="Sacred Plot"
          subtitle="Real-time plot availability across all our townships. Filter by size, price, facing, and status. Each plot is MVDA-approved with clear legal title."
        />

        {/* Filters */}
        <Card className="card-luxury rounded-2xl p-5 sm:p-6 mb-8">
          <div className="flex items-center gap-2 mb-5 text-indigo-deep">
            <Filter className="w-4 h-4 text-gold" />
            <span className="font-display font-semibold">Filter Plots</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Project</label>
              <Select value={effectiveProjectFilter} onValueChange={(v) => { setSelectedProjectForPlots(null); setProjectFilter(v); setVisibleCount(24); }}>
                <SelectTrigger className="bg-white border-gold/25"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.slug}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status</label>
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setVisibleCount(24); }}>
                <SelectTrigger className="bg-white border-gold/25"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">{s === "all" ? "All Status" : s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Facing</label>
              <Select value={facingFilter} onValueChange={(v) => { setFacingFilter(v); setVisibleCount(24); }}>
                <SelectTrigger className="bg-white border-gold/25 capitalize"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FACINGS.map((f) => (
                    <SelectItem key={f} value={f} className="capitalize">{f === "all" ? "All Directions" : f.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Size: {sizeRange[0]}–{sizeRange[1]} sq.yd
              </label>
              <Slider
                value={sizeRange}
                onValueChange={(v) => setSizeRange([v[0], v[1]] as [number, number])}
                min={80}
                max={400}
                step={10}
                className="mt-3"
              />
            </div>
          </div>

          {/* Status summary + wishlist */}
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-gold/10">
            {Object.entries(statusCounts).map(([status, count]) => {
              const cfg = PLOT_STATUS_CONFIG[status];
              return (
                <Badge key={status} variant="outline" className={`${cfg.border} ${cfg.color} capitalize gap-1.5`}>
                  <span className={`w-2 h-2 rounded-full ${cfg.bg}`} />
                  {cfg.label}: {count}
                </Badge>
              );
            })}
            <button
              onClick={() => setWishlistOpen(true)}
              disabled={wishlistPlotIds.length === 0}
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-temple-red/30 text-temple-red hover:bg-temple-red/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Heart className={`w-3 h-3 ${wishlistPlotIds.length > 0 ? "fill-current" : ""}`} />
              Wishlist {wishlistPlotIds.length > 0 && <span className="font-bold">({wishlistPlotIds.length})</span>}
            </button>
          </div>
        </Card>

        {/* Plots grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin text-gold mr-2" /> Loading plots...
          </div>
        ) : visiblePlots.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🪔</div>
            <p className="text-muted-foreground">No plots match your filters. Try adjusting them.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {visiblePlots.map((plot, i) => {
                const cfg = PLOT_STATUS_CONFIG[plot.status] || PLOT_STATUS_CONFIG.available;
                const isAvailable = plot.status === "available";
                return (
                  <motion.div
                    key={plot.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.4) }}
                  >
                    <Card className={`relative overflow-hidden rounded-xl border-2 ${cfg.border} bg-white hover:shadow-lg transition-all ${!isAvailable ? "opacity-75" : ""}`}>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-sm font-bold text-indigo-deep">{plot.plotNumber}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => toggleWishlist(plot.id)}
                              aria-label={isWishlisted(plot.id) ? "Remove from wishlist" : "Add to wishlist"}
                              className={`p-1 rounded transition-colors ${isWishlisted(plot.id) ? "text-temple-red heart-pop" : "text-muted-foreground hover:text-temple-red"}`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isWishlisted(plot.id) ? "fill-current" : ""}`} />
                            </button>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full text-white ${cfg.bg}`}>{cfg.label}</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Maximize className="w-3 h-3" /> {plot.sizeSqyd} sq.yd
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Compass className="w-3 h-3" /> {plot.dimensions} · {plot.facing.toUpperCase()}
                          </div>
                          <div className="flex items-center gap-1 font-semibold text-gold">
                            <IndianRupee className="w-3 h-3" /> {formatINRFull(plot.price)}
                          </div>
                        </div>
                        {plot.isCorner && <span className="absolute top-1 right-1 text-[8px] text-gold">★</span>}
                        <div className="mt-2 pt-2 border-t border-gold/10">
                          <Button
                            size="sm"
                            disabled={!isAvailable}
                            onClick={() => openBooking(plot.id)}
                            className="w-full h-7 text-[11px] gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep disabled:opacity-40 disabled:bg-muted disabled:from-muted disabled:to-muted"
                          >
                            {isAvailable ? "Book Now" : "View"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {visibleCount < plots.length && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => setVisibleCount((c) => c + 24)}
                  variant="outline"
                  className="border-gold/40 text-indigo-deep hover:bg-gold/10"
                >
                  Load More ({plots.length - visibleCount} remaining)
                </Button>
              </div>
            )}
          </>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gold" /> Need help choosing? 
            <a href="https://wa.me/919837012345?text=Namaste! I need help choosing a plot" target="_blank" rel="noopener noreferrer" className="text-green-deep font-medium hover:underline flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
