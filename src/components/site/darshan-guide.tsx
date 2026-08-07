"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Shirt, Sparkles, Check, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { DARSHAN_GUIDE } from "@/lib/types";

const CITY_COLORS: Record<string, string> = {
  Vrindavan: "border-gold/30 text-gold",
  Mathura: "border-temple-red/30 text-temple-red",
  Govardhan: "border-green-light/30 text-green-deep",
};

export function DarshanGuide() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Temple Visitor Guide"
          title="Braj"
          highlight="Darshan Guide"
          subtitle="Plan your temple visits with our comprehensive guide — exact timings, aarti schedules, dress code, and etiquette for each major Braj Dham temple. Be prepared, be respectful, be blessed."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DARSHAN_GUIDE.map((temple, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={temple.temple}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={`card-luxury rounded-2xl overflow-hidden transition-all ${isOpen ? "ring-gold-glow" : ""}`}>
                  {/* Header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : i)}
                    className="w-full text-left p-4 hover:bg-gold/5 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="text-3xl flex-shrink-0">{temple.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-base font-bold text-indigo-deep leading-tight">{temple.temple}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={`text-[9px] ${CITY_COLORS[temple.city] || "border-gold/30 text-gold"}`}>
                              <MapPin className="w-2.5 h-2.5 mr-0.5" />{temple.city}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                              <Calendar className="w-2.5 h-2.5" /> {temple.bestDay}
                            </span>
                          </div>
                        </div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </button>

                  {/* Expandable content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <CardContent className="px-4 pb-4 space-y-3">
                          {/* Timing */}
                          <div className="p-3 rounded-lg bg-marble">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Clock className="w-3.5 h-3.5 text-gold" />
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Darshan Timing</span>
                            </div>
                            <p className="text-xs text-indigo-deep leading-relaxed">{temple.timing}</p>
                          </div>

                          {/* Aarti */}
                          <div className="p-3 rounded-lg bg-gold/5 border border-gold/15">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Sparkles className="w-3.5 h-3.5 text-gold" />
                              <span className="text-[10px] uppercase tracking-wider text-gold font-medium">Aarti Schedule</span>
                            </div>
                            <p className="text-xs text-indigo-deep">{temple.aarti}</p>
                          </div>

                          {/* Dress code */}
                          <div className="p-3 rounded-lg bg-marble">
                            <div className="flex items-center gap-1.5 mb-1">
                              <Shirt className="w-3.5 h-3.5 text-gold" />
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Dress Code</span>
                            </div>
                            <p className="text-xs text-indigo-deep/80">{temple.dress}</p>
                          </div>

                          {/* Etiquette */}
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">Temple Etiquette</div>
                            <ul className="space-y-1.5">
                              {temple.etiquette.map((e, idx) => (
                                <li key={idx} className="text-xs text-indigo-deep/80 flex items-start gap-2">
                                  <Check className="w-3 h-3 text-green-deep flex-shrink-0 mt-0.5" />
                                  {e}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* CTA */}
                          <a
                            href={`https://wa.me/919837012345?text=Namaste! I want guidance for visiting ${temple.temple}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-2 rounded-md bg-[#25D366]/10 text-[#1a8e3b] text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
                          >
                            💬 Ask about visiting {temple.temple}
                          </a>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* General tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="card-luxury-dark rounded-2xl bg-spiritual-temple">
            <CardContent className="p-6">
              <h3 className="font-display text-base font-bold text-cream mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" /> General Braj Temple Tips
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  "🙏 Greet with 'Radhe Radhe' or 'Jai Shri Krishna'",
                  "🥾 Carry sock bags — many temples require shoe removal",
                  "💧 Stay hydrated — Braj heat is intense Apr-Jun",
                  "📵 Most inner sanctums prohibit phones/cameras",
                  "🌸 Carry flowers/prasad for offering (or buy at temple)",
                  "🚫 No leather items in Banke Bihari & Janmabhoomi",
                  "🧒 Watch belongings in crowds — festival days are very busy",
                  "🌅 Early morning darshan = most peaceful & spiritual",
                ].map((tip, i) => (
                  <div key={i} className="p-2 rounded-lg bg-cream/5 text-cream/80">{tip}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
