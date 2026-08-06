"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { FESTIVALS } from "@/lib/types";

export function FestivalBanner() {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  // Show the nearest upcoming festival
  const nextFestival = FESTIVALS[0];

  return (
    <>
      {/* Top banner */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-gradient-to-r from-gold-dark via-gold to-gold-light text-indigo-deep z-40"
      >
        <div className="festival-shimmer absolute inset-0 pointer-events-none" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 relative flex items-center justify-between gap-3">
          <button
            onClick={() => setExpanded(true)}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium flex-1 min-w-0 text-left"
          >
            <span className="text-base flex-shrink-0">{nextFestival.emoji}</span>
            <span className="truncate">
              <span className="font-bold">{nextFestival.name}</span>
              <span className="hidden sm:inline"> · {nextFestival.date}</span>
              <span className="hidden md:inline opacity-80"> · Special celebrations at all Braj townships</span>
            </span>
            <span className="hidden sm:inline text-[10px] underline opacity-70 ml-1">View all festivals →</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="p-1 rounded hover:bg-indigo-deep/10 flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Expanded modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-indigo-deep/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto scroll-luxury shadow-2xl"
            >
              <div className="bg-spiritual-temple p-6 relative">
                <button
                  onClick={() => setExpanded(false)}
                  className="absolute top-4 right-4 text-cream/60 hover:text-gold"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-gold" />
                  <span className="text-xs uppercase tracking-[0.25em] text-gold">Braj Festival Calendar</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                  Sacred Celebrations in Braj Dham
                </h2>
                <p className="text-cream/60 text-sm mt-1">
                  Join us in celebrating the divine festivals of Braj at our townships.
                </p>
              </div>

              <div className="p-6 space-y-3">
                {FESTIVALS.map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="card-luxury rounded-xl p-4 flex items-start gap-4"
                  >
                    <div className="text-4xl flex-shrink-0">{f.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-display text-base font-bold text-indigo-deep">{f.name}</h3>
                        <span className="text-xs font-medium text-gold whitespace-nowrap">{f.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="px-6 pb-6">
                <div className="rounded-xl bg-gold/10 border border-gold/20 p-4 text-center">
                  <p className="text-sm text-indigo-deep">
                    🙏 All festival celebrations are complimentary for BrajProperty residents and their families.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
