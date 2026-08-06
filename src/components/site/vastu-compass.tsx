"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, Check, X, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { VASTU_DIRECTIONS } from "@/lib/types";
import { useApp } from "@/lib/store";

export function VastuCompass() {
  const [selected, setSelected] = useState(1); // North-East default (most auspicious)
  const dir = VASTU_DIRECTIONS[selected];

  return (
    <section className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Vedic Architecture"
          title="Vastu"
          highlight="Directional Guide"
          subtitle="Every plot direction carries divine significance. Choose your plot facing based on Vastu Shastra — the ancient science of sacred architecture. See what's favorable and what to avoid for each direction."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Compass rose */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square max-w-md mx-auto w-full"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/10 to-transparent blur-2xl" />

            {/* Compass SVG */}
            <svg viewBox="0 0 400 400" className="relative w-full h-full">
              {/* Outer ring */}
              <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(197,162,62,0.3)" strokeWidth="2" />
              <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(197,162,62,0.2)" strokeWidth="1" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(197,162,62,0.15)" strokeWidth="1" />

              {/* Direction segments */}
              {VASTU_DIRECTIONS.map((d, i) => {
                const angle = d.degree - 90; // adjust for SVG (0deg = right, we want 0deg = top)
                const rad = (angle * Math.PI) / 180;
                const isActive = i === selected;
                const x1 = 200 + 80 * Math.cos(rad);
                const y1 = 200 + 80 * Math.sin(rad);
                const x2 = 200 + 180 * Math.cos(rad);
                const y2 = 200 + 180 * Math.sin(rad);
                return (
                  <g key={d.direction} onClick={() => setSelected(i)} className="cursor-pointer">
                    {/* Segment line */}
                    <line
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={isActive ? "#C5A23E" : "rgba(197,162,62,0.2)"}
                      strokeWidth={isActive ? 4 : 1.5}
                      strokeLinecap="round"
                    />
                    {/* Direction label */}
                    {(() => {
                      const labelRad = ((d.degree - 90) * Math.PI) / 180;
                      const labelR = 195;
                      const lx = 200 + labelR * Math.cos(labelRad);
                      const ly = 200 + labelR * Math.sin(labelRad);
                      return (
                        <g>
                          <text
                            x={lx} y={ly}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={isActive ? "#C5A23E" : "#1A1A2E"}
                            fontSize={isActive ? "14" : "11"}
                            fontWeight={isActive ? "700" : "500"}
                            fontFamily="Playfair Display, serif"
                          >
                            {d.direction}
                          </text>
                          <text
                            x={lx} y={ly + 12}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={isActive ? "#C5A23E" : "rgba(26,26,46,0.4)"}
                            fontSize="9"
                            fontFamily="Noto Serif SC, serif"
                          >
                            {d.sanskrit}
                          </text>
                        </g>
                      );
                    })()}
                  </g>
                );
              })}

              {/* Center compass needle */}
              <motion.g
                animate={{ rotate: dir.degree }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                style={{ transformOrigin: "200px 200px" }}
              >
                {/* Needle */}
                <polygon points="200,110 195,200 205,200" fill="#8B2500" />
                <polygon points="200,290 195,200 205,200" fill="#C5A23E" />
                {/* Center hub */}
                <circle cx="200" cy="200" r="12" fill="#1A1A2E" stroke="#C5A23E" strokeWidth="2" />
                <circle cx="200" cy="200" r="5" fill="#C5A23E" />
              </motion.g>

              {/* Center N marker */}
              <text x="200" y="100" textAnchor="middle" fill="#C5A23E" fontSize="16" fontWeight="bold" fontFamily="Playfair Display">N</text>
              <text x="200" y="310" textAnchor="middle" fill="rgba(26,26,46,0.4)" fontSize="14" fontWeight="bold">S</text>
              <text x="100" y="205" textAnchor="middle" fill="rgba(26,26,46,0.4)" fontSize="14" fontWeight="bold">W</text>
              <text x="300" y="205" textAnchor="middle" fill="rgba(26,26,46,0.4)" fontSize="14" fontWeight="bold">E</text>
            </svg>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground flex items-center gap-1">
              <Compass className="w-3 h-3 text-gold" /> Click any direction to explore
            </div>
          </motion.div>

          {/* Direction details */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <Card className={`card-luxury rounded-2xl overflow-hidden`}>
                  <div className={`bg-gradient-to-br ${dir.color} p-5`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Facing Direction</div>
                        <h3 className="font-display text-2xl font-bold text-indigo-deep">{dir.direction}</h3>
                        <p className="font-devanagari text-sm text-gold">{dir.sanskrit}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Deity</div>
                        <div className="font-display text-sm font-bold text-indigo-deep">{dir.deity}</div>
                        <Badge className="mt-1 bg-gold/20 text-gold border-0 text-[10px]">{dir.element}</Badge>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-4">
                    {/* Favorable */}
                    <div>
                      <h4 className="text-xs font-bold text-green-deep flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                        <Check className="w-3.5 h-3.5" /> Favorable For
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {dir.favorable.map((f) => (
                          <span key={f} className="px-2.5 py-1 rounded-full bg-green-light/10 border border-green-light/30 text-xs text-green-deep">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Avoid */}
                    <div>
                      <h4 className="text-xs font-bold text-temple-red flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                        <X className="w-3.5 h-3.5" /> Avoid Placing
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {dir.avoid.map((a) => (
                          <span key={a} className="px-2.5 py-1 rounded-full bg-temple-red/10 border border-temple-red/30 text-xs text-temple-red">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tip */}
                    <div className="p-3 rounded-lg bg-gold/10 border border-gold/20 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-indigo-deep/80 leading-relaxed">
                        {selected === 1 ? "🏆 Most auspicious direction for Pooja room and meditation — the Ishana corner brings divine energy and prosperity."
                        : selected === 3 ? "🔥 Ideal for kitchen — the Agni corner ensures health and vitality for your family."
                        : selected === 5 ? "🏔️ Best for master bedroom — the Nairutya corner brings stability and restful sleep."
                        : "Choose this direction for the rooms listed above to align your home with cosmic energies."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Direction selector */}
            <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
              {VASTU_DIRECTIONS.map((d, i) => (
                <button
                  key={d.direction}
                  onClick={() => setSelected(i)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${
                    i === selected
                      ? "bg-gold text-indigo-deep border-gold"
                      : "bg-white border-gold/20 text-indigo-deep hover:border-gold/40"
                  }`}
                >
                  {d.direction}
                </button>
              ))}
            </div>

            {/* CTA: Book Vastu Consultation */}
            <button
              onClick={() => useApp.getState().openVastu()}
              className="mt-4 w-full p-3 rounded-xl bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 hover:border-gold/40 transition-all flex items-center justify-center gap-2 text-sm text-indigo-deep"
            >
              <Compass className="w-4 h-4 text-gold" />
              <span>Need personalized Vastu advice? <strong className="text-gold">Book Expert Consultation →</strong></span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
