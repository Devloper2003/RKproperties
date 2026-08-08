"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Navigation } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { BRAJ_DHAM_PLACES } from "@/lib/types";

const TYPE_COLORS: Record<string, string> = {
  Temple: "text-gold",
  Ghat: "text-blue-600",
  Parikrama: "text-green-deep",
  Kund: "text-cyan-600",
  Sarovar: "text-pink-600",
  Grove: "text-green-deep",
  Village: "text-amber-700",
  Forest: "text-green-800",
  River: "text-blue-500",
};

const FILTER_TYPES = ["All", "Temple", "Ghat", "Parikrama", "Kund", "Village", "Grove"];

export function BrajDhamMap() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof BRAJ_DHAM_PLACES[0] | null>(null);

  const filtered = filter === "All" ? BRAJ_DHAM_PLACES : BRAJ_DHAM_PLACES.filter((p) => p.type === filter);

  return (
    <section className="py-20 lg:py-28 bg-spiritual-temple relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="absolute text-gold text-xs" style={{ left: `${(i*7+3)%95}%`, top: `${(i*11+5)%90}%`, animation: `twinkle ${2+i%3}s infinite`, animationDelay: `${i*0.4}s` }}>✦</div>
        ))}
      </div>
      <style jsx>{`@keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:0.8} }`}</style>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Sacred Geography"
          title="Explore"
          highlight="Braj Dham Map"
          subtitle="16 sacred places across Braj Dham — temples, ghats, kunds, villages, and forests where Krishna performed His divine pastimes. Click any pin to explore."
          light
        />

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FILTER_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === t
                  ? "bg-gold text-indigo-deep"
                  : "bg-cream/10 text-cream/70 hover:bg-cream/20 border border-cream/15"
              }`}
            >
              {t} {t !== "All" && `(${BRAJ_DHAM_PLACES.filter(p => p.type === t).length})`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map (left, 2 cols) */}
          <div className="lg:col-span-2">
            <Card className="card-luxury-dark rounded-2xl bg-gradient-to-br from-indigo-deep to-[#0f0f1a] border-gold/25 overflow-hidden">
              <CardContent className="p-6">
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Yamuna river curve */}
                  <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
                    {/* Background grid */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(197,162,62,0.05)" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="400" height="400" fill="url(#grid)" />

                    {/* Yamuna river */}
                    <path d="M 80 60 Q 150 150 160 220 T 280 380" stroke="#3b82f6" strokeWidth="4" fill="none" opacity="0.4" strokeLinecap="round" />
                    <text x="90" y="55" fill="#3b82f6" fontSize="10" opacity="0.7" fontStyle="italic" fontFamily="serif">Yamuna Ji</text>

                    {/* Govardhan Hill arc */}
                    <path d="M 40 280 Q 90 240 140 290" stroke="#4A7A2E" strokeWidth="5" fill="none" opacity="0.5" strokeLinecap="round" />
                    <text x="50" y="320" fill="#4A7A2E" fontSize="10" opacity="0.8" fontStyle="italic">Giriraj</text>

                    {/* City labels */}
                    <text x="128" y="200" textAnchor="middle" fill="#FFF8E7" fontSize="11" fontWeight="bold" opacity="0.4" fontFamily="serif">Mathura</text>
                    <text x="192" y="170" textAnchor="middle" fill="#FFF8E7" fontSize="11" fontWeight="bold" opacity="0.4" fontFamily="serif">Vrindavan</text>
                    <text x="88" y="280" textAnchor="middle" fill="#FFF8E7" fontSize="11" fontWeight="bold" opacity="0.4" fontFamily="serif">Govardhan</text>

                    {/* Place pins */}
                    {filtered.map((p, i) => (
                      <g
                        key={p.name}
                        onClick={() => setSelected(p)}
                        className="cursor-pointer"
                      >
                        {/* Pulse ring */}
                        <circle cx={p.x * 4} cy={p.y * 4} r="12" fill={TYPE_COLORS[p.type]?.replace("text-", "#") || "#C5A23E"} opacity="0.15">
                          <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                        </circle>
                        {/* Pin dot */}
                        <circle cx={p.x * 4} cy={p.y * 4} r="6" fill={TYPE_COLORS[p.type]?.replace("text-", "#") || "#C5A23E"} stroke="#FFF8E7" strokeWidth="1.5" />
                        {/* Emoji above pin */}
                        <text x={p.x * 4} y={p.y * 4 - 10} textAnchor="middle" fontSize="14">{p.emoji}</text>
                        {/* Name label */}
                        <text x={p.x * 4} y={p.y * 4 + 20} textAnchor="middle" fill="#FFF8E7" fontSize="8" opacity="0.7">{p.name.split(" ")[0]}</text>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-2 mt-4 pt-4 border-t border-gold/15">
                  {Object.entries(TYPE_COLORS).filter(([t]) => FILTER_TYPES.includes(t)).map(([type, color]) => (
                    <span key={type} className="flex items-center gap-1 text-[10px] text-cream/60">
                      <span className={`w-2 h-2 rounded-full ${color.replace("text-", "bg-")}`} /> {type}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Places list (right) */}
          <div>
            <h3 className="font-display text-base font-bold text-cream mb-3 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-gold" /> Sacred Places ({filtered.length})
            </h3>
            <div className="space-y-2 max-h-[480px] overflow-y-auto scroll-luxury pr-1">
              {filtered.map((p, i) => (
                <motion.button
                  key={p.name}
                  onClick={() => setSelected(p)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="w-full text-left p-3 rounded-xl bg-cream/5 backdrop-blur-sm border border-cream/10 hover:border-gold/30 hover:bg-cream/10 transition-all flex items-center gap-3"
                >
                  <span className="text-2xl flex-shrink-0">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-bold text-cream truncate">{p.name}</span>
                    </div>
                    <p className="text-[11px] text-cream/60 truncate">{p.significance}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Badge variant="outline" className={`text-[9px] border-current ${TYPE_COLORS[p.type]}`}>{p.type}</Badge>
                      <span className="text-[10px] text-cream/40">📍 {p.city}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-indigo-deep/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
            >
              <div className="bg-spiritual-temple p-6 relative">
                <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-cream/60 hover:text-gold" aria-label="Close">
                  <X className="w-5 h-5" />
                </button>
                <div className="text-5xl mb-2">{selected.emoji}</div>
                <Badge variant="outline" className={`border-current ${TYPE_COLORS[selected.type]} text-[10px] mb-1`}>{selected.type}</Badge>
                <h3 className="font-display text-2xl font-bold text-cream">{selected.name}</h3>
                <p className="text-xs text-cream/60 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-gold" /> {selected.city}
                </p>
              </div>
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Spiritual Significance</div>
                <p className="text-sm text-indigo-deep/80 leading-relaxed mb-4">{selected.significance}</p>
                <div className="p-3 rounded-lg bg-gold/10 border border-gold/20">
                  <p className="text-xs text-indigo-deep/70 italic">
                    ✨ This sacred place is accessible from our RK Properties townships. Ask our property advisor about visiting arrangements during your site visit.
                  </p>
                </div>
                <a
                  href={`https://wa.me/918923944689?text=Namaste! I want to know more about visiting ${selected.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1da851]"
                >
                  Plan a Visit
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
