"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, GitCompare, Check, Trophy, Plus, Trash2 } from "lucide-react";
import { useApp } from "@/lib/store";
import {
  formatINR,
  PROJECT_STATUS_LABELS,
  COMPARISON_DIMENSIONS,
  type Project,
} from "@/lib/types";

export function ComparisonModal() {
  const { compareOpen, setCompareOpen, compareProjectSlugs, toggleCompare } = useApp();
  const { data: allProjects = [] } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => (await fetch("/api/projects")).json().then((j) => j.data),
    enabled: compareOpen,
  });

  const projects = allProjects.filter((p) => compareProjectSlugs.includes(p.slug));

  // Find "best" value per numeric dimension for the trophy highlight
  const getBest = (key: string): string | null => {
    if (projects.length < 2) return null;
    if (key === "totalAreaAcres") {
      const max = Math.max(...projects.map((p) => p.totalAreaAcres));
      return projects.find((p) => p.totalAreaAcres === max)?.slug || null;
    }
    if (key === "amenitiesCount") {
      const counts = projects.map((p) => p.amenities?.length || 0);
      const max = Math.max(...counts);
      return projects[counts.indexOf(max)]?.slug || null;
    }
    if (key === "priceRangeMax") {
      // Lower min price = more accessible (best for entry)
      const min = Math.min(...projects.map((p) => p.priceRangeMin));
      return projects.find((p) => p.priceRangeMin === min)?.slug || null;
    }
    return null;
  };

  const renderCell = (project: Project, key: string): { value: string; isBest: boolean } => {
    let value = "";
    let isBest = false;
    switch (key) {
      case "location":
        value = project.location;
        break;
      case "city":
        value = project.city;
        break;
      case "totalAreaAcres":
        value = `${project.totalAreaAcres} acres`;
        isBest = getBest("totalAreaAcres") === project.slug;
        break;
      case "plotSize":
        value = `${project.minPlotSize}–${project.maxPlotSize} sq.yd`;
        break;
      case "priceRange":
        value = `${formatINR(project.priceRangeMin)} – ${formatINR(project.priceRangeMax)}`;
        isBest = getBest("priceRangeMax") === project.slug;
        break;
      case "status":
        value = PROJECT_STATUS_LABELS[project.status]?.label || project.status;
        break;
      case "possessionDate":
        value = project.possessionDate || "TBA";
        break;
      case "reraNumber":
        value = project.reraNumber || "Verified";
        break;
      case "mvdaNumber":
        value = project.mvdaNumber || "Verified";
        break;
      case "amenitiesCount":
        value = `${project.amenities?.length || 0}+`;
        isBest = getBest("amenitiesCount") === project.slug;
        break;
      case "nearbyTemplesCount":
        value = `${project.nearbyTemples?.length || 0}`;
        break;
      case "usp":
        value = project.usp;
        break;
    }
    return { value, isBest };
  };

  return (
    <Dialog open={compareOpen} onOpenChange={(o) => !o && setCompareOpen(false)}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[92vh] p-0 gap-0 overflow-hidden bg-cream rounded-2xl">
        <ScrollArea className="max-h-[92vh] scroll-luxury">
          <div className="bg-spiritual-temple p-6 relative">
            <button
              onClick={() => setCompareOpen(false)}
              className="absolute top-4 right-4 text-cream/60 hover:text-gold"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <GitCompare className="w-5 h-5 text-gold" />
                <span className="text-xs uppercase tracking-[0.25em] text-gold">Side-by-side</span>
              </div>
              <DialogTitle className="font-display text-2xl sm:text-3xl font-bold text-cream">
                Compare Braj Townships
              </DialogTitle>
              <DialogDescription className="text-cream/70">
                {projects.length === 0
                  ? "Select up to 3 projects to compare."
                  : `Comparing ${projects.length} ${projects.length === 1 ? "project" : "projects"} — 🏆 marks the best value.`}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">⚖️</div>
                <h3 className="font-display text-lg font-bold text-indigo-deep mb-2">No projects selected</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Use the &quot;Compare&quot; buttons on project cards or the comparison section to add projects.
                </p>
                <Button onClick={() => setCompareOpen(false)} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">
                  Browse Projects
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto scroll-luxury">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="sticky left-0 bg-cream z-10 text-left p-3 min-w-[140px]">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Dimension</span>
                      </th>
                      {projects.map((p) => (
                        <th key={p.id} className="p-3 min-w-[180px] align-top">
                          <div className="relative">
                            <button
                              onClick={() => toggleCompare(p.slug)}
                              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-temple-red/10 text-temple-red hover:bg-temple-red/20 flex items-center justify-center"
                              aria-label="Remove from comparison"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="h-20 w-full rounded-lg overflow-hidden mb-2 border border-gold/20">
                              <img
                                src={p.heroImage}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="font-display text-sm font-bold text-indigo-deep leading-tight">{p.name}</h4>
                            <p className="text-[11px] text-gold italic mt-0.5">{p.tagline}</p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_DIMENSIONS.map((dim, rowIdx) => (
                      <tr
                        key={dim.key}
                        className={rowIdx % 2 === 0 ? "bg-marble/40" : "bg-cream"}
                      >
                        <td className="sticky left-0 z-10 p-3 bg-inherit">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-deep">
                            <span>{dim.icon}</span>
                            {dim.label}
                          </div>
                        </td>
                        {projects.map((p) => {
                          const { value, isBest } = renderCell(p, dim.key);
                          return (
                            <td key={p.id} className="p-3 align-top">
                              <div className={`text-sm ${dim.key === "usp" ? "italic text-muted-foreground leading-relaxed" : "text-indigo-deep"} ${isBest ? "font-semibold" : ""}`}>
                                {value}
                                {isBest && (
                                  <Trophy className="inline-block w-3.5 h-3.5 text-gold ml-1.5" aria-label="Best value" />
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {/* Action row */}
                    <tr>
                      <td className="sticky left-0 z-10 bg-cream p-3">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Action</span>
                      </td>
                      {projects.map((p) => (
                        <td key={p.id} className="p-3">
                          <Button
                            size="sm"
                            onClick={() => {
                              useApp.getState().openProjectPage(p.slug);
                              setCompareOpen(false);
                            }}
                            className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-8 text-xs"
                          >
                            View Details
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

// Compact comparison bar shown above projects
export function ComparisonBar() {
  const { compareProjectSlugs, setCompareOpen, toggleCompare, isComparing } = useApp();

  if (compareProjectSlugs.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-md w-[calc(100vw-2rem)]"
    >
      <div className="bg-spiritual-temple border border-gold/30 rounded-2xl shadow-2xl p-3 flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <GitCompare className="w-4 h-4 text-gold flex-shrink-0" />
          <span className="text-xs text-cream">
            <span className="font-bold text-gold">{compareProjectSlugs.length}</span> selected
          </span>
        </div>
        <Button
          size="sm"
          onClick={() => setCompareOpen(true)}
          disabled={compareProjectSlugs.length < 2}
          className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-8 text-xs disabled:opacity-50"
        >
          {compareProjectSlugs.length < 2 ? `Add ${2 - compareProjectSlugs.length} more` : "Compare Now"}
        </Button>
        <button
          onClick={() => compareProjectSlugs.forEach((s) => toggleCompare(s))}
          aria-label="Clear comparison"
          className="text-cream/50 hover:text-gold p-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
