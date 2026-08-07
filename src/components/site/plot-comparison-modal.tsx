"use client";

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
import { X, GitCompare, Trophy, Check, X as XIcon } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINRFull, PLOT_STATUS_CONFIG, PLOT_COMPARISON_DIMENSIONS, type Plot } from "@/lib/types";

export function PlotComparisonModal() {
  const { plotCompareOpen, setPlotCompareOpen, comparePlotIds, togglePlotCompare, openBooking } = useApp();

  const { data: allPlots = [] } = useQuery<Plot[]>({
    queryKey: ["all-plots-compare"],
    queryFn: async () => (await fetch("/api/plots")).json().then((j) => j.data),
    enabled: plotCompareOpen,
  });

  const plots = allPlots.filter((p) => comparePlotIds.includes(p.id));

  // Find best value per numeric dimension
  const getBest = (key: string): string | null => {
    if (plots.length < 2) return null;
    if (key === "sizeSqyd") {
      const max = Math.max(...plots.map((p) => p.sizeSqyd));
      return plots.find((p) => p.sizeSqyd === max)?.id || null;
    }
    if (key === "pricePerSqyd") {
      // Lower price per sq.yd = better value
      const vals = plots.map((p) => ({ id: p.id, v: p.price / p.sizeSqyd }));
      const min = Math.min(...vals.map((v) => v.v));
      return vals.find((v) => v.v === min)?.id || null;
    }
    if (key === "price") {
      // Lower price = more accessible
      const min = Math.min(...plots.map((p) => p.price));
      return plots.find((p) => p.price === min)?.id || null;
    }
    return null;
  };

  const renderCell = (plot: Plot, key: string) => {
    let value: string | React.ReactNode = "";
    let isBest = false;
    switch (key) {
      case "plotNumber":
        value = <span className="font-mono font-bold">{plot.plotNumber}</span>;
        break;
      case "project":
        value = plot.project?.name || "—";
        break;
      case "sizeSqyd":
        value = `${plot.sizeSqyd} sq.yd`;
        isBest = getBest("sizeSqyd") === plot.id;
        break;
      case "dimensions":
        value = plot.dimensions;
        break;
      case "facing":
        value = <span className="uppercase">{plot.facing}</span>;
        break;
      case "price":
        value = <span className="font-semibold text-gold">{formatINRFull(plot.price)}</span>;
        isBest = getBest("price") === plot.id;
        break;
      case "status":
        const cfg = PLOT_STATUS_CONFIG[plot.status];
        value = <Badge variant="outline" className={`${cfg.border} ${cfg.color} text-[10px]`}>{cfg.label}</Badge>;
        break;
      case "isCorner":
        value = plot.isCorner ? <Check className="w-4 h-4 text-green-deep" /> : <XIcon className="w-4 h-4 text-muted-foreground/40" />;
        break;
      case "isRoadFacing":
        value = plot.isRoadFacing ? <Check className="w-4 h-4 text-green-deep" /> : <XIcon className="w-4 h-4 text-muted-foreground/40" />;
        break;
      case "pricePerSqyd":
        const ppq = Math.round(plot.price / plot.sizeSqyd);
        value = formatINRFull(ppq);
        isBest = getBest("pricePerSqyd") === plot.id;
        break;
    }
    return { value, isBest };
  };

  return (
    <Dialog open={plotCompareOpen} onOpenChange={(o) => !o && setPlotCompareOpen(false)}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[92vh] p-0 gap-0 overflow-hidden bg-cream rounded-2xl">
        <ScrollArea className="max-h-[92vh] scroll-luxury">
          <div className="bg-spiritual-temple p-6 relative">
            <button onClick={() => setPlotCompareOpen(false)} className="absolute top-4 right-4 text-cream/60 hover:text-gold" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <GitCompare className="w-5 h-5 text-gold" />
                <span className="text-xs uppercase tracking-[0.25em] text-gold">Side-by-side</span>
              </div>
              <DialogTitle className="font-display text-2xl sm:text-3xl font-bold text-cream">
                Compare Plots
              </DialogTitle>
              <DialogDescription className="text-cream/70">
                {plots.length === 0
                  ? "Select up to 3 plots to compare."
                  : `Comparing ${plots.length} ${plots.length === 1 ? "plot" : "plots"} — 🏆 marks the best value.`}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-6">
            {plots.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">⚖️</div>
                <h3 className="font-display text-lg font-bold text-indigo-deep mb-2">No plots selected</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Use the &quot;Compare&quot; buttons on plot cards in the inventory explorer.
                </p>
                <Button onClick={() => setPlotCompareOpen(false)} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">
                  Browse Plots
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto scroll-luxury">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="sticky left-0 bg-cream z-10 text-left p-3 min-w-[120px]">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">Attribute</span>
                      </th>
                      {plots.map((p) => (
                        <th key={p.id} className="p-3 min-w-[160px] align-top">
                          <div className="relative">
                            <button
                              onClick={() => togglePlotCompare(p.id)}
                              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-temple-red/10 text-temple-red hover:bg-temple-red/20 flex items-center justify-center"
                              aria-label="Remove"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center mx-auto mb-2">
                              <span className="font-mono text-xs font-bold text-indigo-deep">{p.plotNumber}</span>
                            </div>
                            <h4 className="font-display text-sm font-bold text-indigo-deep text-center">{p.project?.name || "Plot"}</h4>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PLOT_COMPARISON_DIMENSIONS.map((dim, rowIdx) => (
                      <tr key={dim.key} className={rowIdx % 2 === 0 ? "bg-marble/40" : "bg-cream"}>
                        <td className="sticky left-0 z-10 p-3 bg-inherit">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-deep">
                            <span>{dim.icon}</span>
                            {dim.label}
                          </div>
                        </td>
                        {plots.map((p) => {
                          const { value, isBest } = renderCell(p, dim.key);
                          return (
                            <td key={p.id} className="p-3 align-middle">
                              <div className={`text-sm text-indigo-deep ${isBest ? "font-semibold" : ""}`}>
                                {value}
                                {isBest && <Trophy className="inline-block w-3.5 h-3.5 text-gold ml-1.5" />}
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
                      {plots.map((p) => (
                        <td key={p.id} className="p-3 text-center">
                          <Button
                            size="sm"
                            disabled={p.status !== "available"}
                            onClick={() => {
                              setPlotCompareOpen(false);
                              openBooking(p.id);
                            }}
                            className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-8 text-xs disabled:opacity-40"
                          >
                            {p.status === "available" ? "Book This" : "Unavailable"}
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

// Floating bar for plot comparison
export function PlotCompareBar() {
  const { comparePlotIds, setPlotCompareOpen } = useApp();

  if (comparePlotIds.length === 0) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 max-w-sm w-[calc(100vw-2rem)]"
    >
      <div className="bg-spiritual-temple border border-gold/30 rounded-2xl shadow-2xl p-3 flex items-center gap-3">
        <GitCompare className="w-4 h-4 text-gold flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-xs text-cream">
            <span className="font-bold text-gold">{comparePlotIds.length}</span> plots selected to compare
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => setPlotCompareOpen(true)}
          disabled={comparePlotIds.length < 2}
          className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-8 text-xs disabled:opacity-50"
        >
          {comparePlotIds.length < 2 ? `Add ${2 - comparePlotIds.length} more` : "Compare Now"}
        </Button>
      </div>
    </motion.div>
  );
}
