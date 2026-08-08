"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Heart, Trash2, MessageCircle, BookOpen, Maximize, Compass, IndianRupee, Send } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINRFull, PLOT_STATUS_CONFIG, type Plot } from "@/lib/types";

export function WishlistPanel() {
  const { wishlistOpen, setWishlistOpen, wishlistPlotIds, toggleWishlist, clearWishlist, openBooking } = useApp();

  const { data: allPlots = [] } = useQuery<Plot[]>({
    queryKey: ["all-plots-for-wishlist"],
    queryFn: async () => (await fetch("/api/plots")).json().then((j) => j.data),
    enabled: wishlistOpen,
  });

  const wishlistedPlots = allPlots.filter((p) => wishlistPlotIds.includes(p.id));
  const totalValue = wishlistedPlots.reduce((sum, p) => sum + p.price, 0);

  return (
    <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-cream p-0 overflow-y-auto">
        {/* Header */}
        <div className="bg-spiritual-temple p-5 text-cream">
          <SheetHeader>
            <SheetTitle className="font-display text-xl font-bold text-cream flex items-center gap-2">
              <Heart className="w-5 h-5 text-temple-red fill-temple-red" /> Your Sacred Wishlist
            </SheetTitle>
            <SheetDescription className="text-cream/70">
              {wishlistedPlots.length === 0
                ? "Save plots you love to revisit them later."
                : `${wishlistedPlots.length} ${wishlistedPlots.length === 1 ? "plot" : "plots"} saved · Total value ${formatINRFull(totalValue)}`}
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="p-5">
          {wishlistedPlots.length === 0 ? (
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-temple-red/10 flex items-center justify-center mx-auto mb-4"
              >
                <Heart className="w-10 h-10 text-temple-red/40" />
              </motion.div>
              <h3 className="font-display text-lg font-bold text-indigo-deep mb-1">No favorites yet</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Tap the <Heart className="inline w-3 h-3 text-temple-red" /> on any plot to save it here for quick comparison.
              </p>
              <Button
                onClick={() => setWishlistOpen(false)}
                className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"
              >
                Browse Plots
              </Button>
            </div>
          ) : (
            <>
              {/* Total value summary */}
              <div className="card-luxury rounded-xl p-4 mb-4 bg-gradient-to-br from-gold/10 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Total Wishlist Value</div>
                    <div className="font-display text-xl font-bold text-gold">{formatINRFull(totalValue)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Avg Price</div>
                    <div className="font-display text-base font-bold text-indigo-deep">
                      {formatINRFull(Math.round(totalValue / wishlistedPlots.length))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Plot list */}
              <div className="space-y-3">
                <AnimatePresence>
                  {wishlistedPlots.map((plot, i) => {
                    const cfg = PLOT_STATUS_CONFIG[plot.status] || PLOT_STATUS_CONFIG.available;
                    return (
                      <motion.div
                        key={plot.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
                        transition={{ delay: i * 0.05 }}
                        className="card-luxury rounded-xl p-3 relative"
                      >
                        <button
                          onClick={() => toggleWishlist(plot.id)}
                          aria-label="Remove from wishlist"
                          className="absolute top-2 right-2 p-1 rounded text-temple-red hover:bg-temple-red/10"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-12 rounded-full ${cfg.bg} flex-shrink-0`} />
                          <div className="flex-1 min-w-0 pr-6">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-sm font-bold text-indigo-deep">{plot.plotNumber}</span>
                              <Badge variant="outline" className={`${cfg.border} ${cfg.color} text-[10px] h-5`}>
                                {cfg.label}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mb-1">{plot.project?.name}</div>
                            <div className="grid grid-cols-3 gap-1 text-[11px] text-muted-foreground mb-2">
                              <span className="flex items-center gap-1"><Maximize className="w-2.5 h-2.5" />{plot.sizeSqyd}sq</span>
                              <span className="flex items-center gap-1"><Compass className="w-2.5 h-2.5" />{plot.facing.slice(0,2).toUpperCase()}</span>
                              <span className="flex items-center gap-1 font-semibold text-gold"><IndianRupee className="w-2.5 h-2.5" />{formatINRFull(plot.price)}</span>
                            </div>
                            <div className="flex gap-1.5">
                              {plot.status === "available" && (
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setWishlistOpen(false);
                                    openBooking(plot.id);
                                  }}
                                  className="flex-1 h-7 text-[11px] gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"
                                >
                                  <BookOpen className="w-3 h-3 mr-1" /> Book
                                </Button>
                              )}
                              <a
                                href={`https://wa.me/918923944689?text=Namaste! I'm interested in plot ${plot.plotNumber} at ${plot.project?.name} (${formatINRFull(plot.price)})`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-1 h-7 px-2 rounded-md bg-[#25D366]/10 text-[#1a8e3b] text-[11px] font-medium hover:bg-[#25D366]/20"
                              >
                                <MessageCircle className="w-3 h-3" /> WhatsApp
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Actions footer */}
              <div className="mt-5 pt-5 border-t border-gold/15 space-y-2">
                <a
                  href={`https://wa.me/918923944689?text=Namaste! I've shortlisted ${wishlistedPlots.length} plots: ${wishlistedPlots.map(p => p.plotNumber).join(", ")}. Please help me choose.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-md bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1da851]"
                >
                  <Send className="w-4 h-4" /> Send Wishlist to Advisor
                </a>
                <Button
                  variant="outline"
                  onClick={clearWishlist}
                  className="w-full border-temple-red/30 text-temple-red hover:bg-temple-red/10"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Clear Wishlist
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
