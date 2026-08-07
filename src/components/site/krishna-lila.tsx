"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";
import { KRISHNA_LILAS } from "@/lib/types";

export function KrishnaLilaSection() {
  const [active, setActive] = useState(0);

  const lila = KRISHNA_LILAS[active];

  return (
    <section className="py-20 lg:py-28 bg-spiritual-temple relative overflow-hidden">
      {/* Decorative stars / sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-gold/20"
            style={{
              left: `${(i * 13.7 + 3) % 96}%`,
              top: `${(i * 19.3 + 5) % 92}%`,
              fontSize: `${8 + (i % 4) * 3}px`,
              animation: `twinkle ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i % 5) * 0.6}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
      `}</style>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Divine Pastimes"
          title="Krishna's"
          highlight="Sacred Leelas"
          subtitle="The land where you'll build your home is the same land where Lord Krishna performed His divine pastimes 5,000 years ago. Every inch of Braj Dham resonates with His leelas."
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Lila selector */}
          <div className="lg:col-span-4 space-y-2">
            {KRISHNA_LILAS.map((l, i) => (
              <motion.button
                key={l.title}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                  i === active
                    ? "bg-gold/15 border-gold/50 shadow-[0_0_20px_rgba(197,162,62,0.2)]"
                    : "bg-cream/5 border-cream/10 hover:bg-cream/10 hover:border-gold/30"
                }`}
              >
                <span className="text-2xl flex-shrink-0">{l.emoji}</span>
                <div className="min-w-0">
                  <div className={`font-display text-sm font-bold ${i === active ? "text-gold" : "text-cream/90"}`}>
                    {l.title}
                  </div>
                  <div className="text-[11px] text-cream/50 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5" /> {l.place}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Active lila display */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="bg-cream/5 backdrop-blur-sm border-gold/20 rounded-2xl overflow-hidden">
                  <div className="relative h-40 bg-gradient-to-br from-indigo-deep via-[#2d1b3d] to-gold-dark flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <svg viewBox="0 0 400 200" className="w-full h-full">
                        <defs>
                          <radialGradient id="lilaGlow">
                            <stop offset="0%" stopColor="#C5A23E" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#C5A23E" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <circle cx="200" cy="100" r="80" fill="url(#lilaGlow)" />
                      </svg>
                    </div>
                    <div className="relative text-center">
                      <div className="text-6xl mb-2 lotus-bloom" key={`emoji-${active}`}>{lila.emoji}</div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Leela {active + 1} of {KRISHNA_LILAS.length}</div>
                    </div>
                  </div>
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">{lila.title}</h3>
                      <span className="text-xs text-gold flex items-center gap-1 flex-shrink-0 mt-2">
                        <MapPin className="w-3 h-3" /> {lila.place}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-cream/80 leading-relaxed mb-5">
                      {lila.summary}
                    </p>
                    <div className="p-4 rounded-xl bg-gold/10 border border-gold/20">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-gold font-semibold mb-1">Spiritual Lesson</div>
                          <p className="text-sm text-cream/90 italic leading-relaxed">{lila.lesson}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActive((a) => (a - 1 + KRISHNA_LILAS.length) % KRISHNA_LILAS.length)}
                className="text-cream/70 hover:text-gold hover:bg-cream/10"
              >
                ← Previous Leela
              </Button>
              <div className="flex gap-1.5">
                {KRISHNA_LILAS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Leela ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-gold" : "w-1.5 bg-cream/30 hover:bg-cream/50"}`}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActive((a) => (a + 1) % KRISHNA_LILAS.length)}
                className="text-cream/70 hover:text-gold hover:bg-cream/10"
              >
                Next Leela →
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom spiritual note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs text-cream/70 italic">
              &ldquo;Braj Bhumi is not just land — it is Krishna's own playground, eternally sacred.&rdquo;
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
