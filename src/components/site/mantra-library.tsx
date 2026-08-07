"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Clock, Target, BarChart3 } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { KRISHNA_MANTRAS } from "@/lib/types";
import { toast } from "sonner";

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "bg-green-light/15 text-green-deep border-green-light/30",
  Intermediate: "bg-gold/15 text-gold border-gold/30",
  Advanced: "bg-temple-red/15 text-temple-red border-temple-red/30",
};

export function MantraLibrary() {
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  const mantra = KRISHNA_MANTRAS[selected];

  const increment = () => {
    setCount((c) => c + 1);
    if ((count + 1) === mantra.count) {
      toast.success(`🎉 ${mantra.name} complete! ${mantra.count} recitations done. Krishna blessings 🙏`);
    }
  };

  const reset = () => {
    setCount(0);
    toast.info("Counter reset");
  };

  const navigate = (dir: number) => {
    setCount(0);
    setSelected((s) => (s + dir + KRISHNA_MANTRAS.length) % KRISHNA_MANTRAS.length);
  };

  const progress = mantra.count > 0 ? (count / mantra.count) * 100 : 0;

  return (
    <section className="py-20 lg:py-28 bg-spiritual-temple relative overflow-hidden">
      {/* Decorative OM symbols */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute font-devanagari text-gold text-5xl"
            style={{
              left: `${(i * 11 + 3) % 95}%`,
              top: `${(i * 17 + 5) % 90}%`,
              animation: `float-up ${8 + i % 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            ॐ
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Sacred Sound Vibrations"
          title="Krishna"
          highlight="Mantra Library"
          subtitle="Discover and practice the most powerful Krishna mantras. Each mantra serves a specific spiritual purpose — from daily japa to festival special. Chant with devotion and transform your consciousness."
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mantra selector */}
          <div className="lg:col-span-1 space-y-2">
            {KRISHNA_MANTRAS.map((m, i) => (
              <motion.button
                key={m.id}
                onClick={() => { setSelected(i); setCount(0); }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  i === selected ? "border-gold bg-gold/10" : "border-cream/10 bg-cream/5 hover:border-gold/30"
                }`}
              >
                <span className="text-2xl flex-shrink-0">{m.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className={`font-display text-sm font-bold leading-tight ${i === selected ? "text-gold" : "text-cream"}`}>
                    {m.name}
                  </div>
                  <div className="text-[10px] text-cream/50 mt-0.5">{m.purpose}</div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Active mantra */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-cream/5 backdrop-blur-sm border-gold/25 rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="p-5 border-b border-gold/15">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{mantra.emoji}</span>
                        <div>
                          <h3 className="font-display text-lg font-bold text-cream">{mantra.name}</h3>
                          <p className="text-xs text-gold">{mantra.purpose}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-[10px] ${DIFFICULTY_COLORS[mantra.difficulty] || "border-gold/30 text-gold"}`}>
                        {mantra.difficulty}
                      </Badge>
                    </div>
                    <p className="text-xs text-cream/70 leading-relaxed">{mantra.desc}</p>
                  </div>

                  {/* Sanskrit + transliteration */}
                  <CardContent className="p-5">
                    <div className="text-center mb-4">
                      <div className="text-[10px] uppercase tracking-wider text-gold mb-2">Sanskrit</div>
                      <p className="font-devanagari text-xl text-cream leading-relaxed mb-3">
                        {mantra.sanskrit}
                      </p>
                      <div className="text-[10px] uppercase tracking-wider text-gold mb-1">Transliteration</div>
                      <p className="text-sm text-cream/80 italic">{mantra.transliteration}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-2.5 rounded-lg bg-cream/5 text-center">
                        <Target className="w-4 h-4 text-gold mx-auto mb-1" />
                        <div className="text-[10px] text-cream/60">Target Count</div>
                        <div className="font-display text-lg font-bold text-cream">{mantra.count}x</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-cream/5 text-center">
                        <Clock className="w-4 h-4 text-gold mx-auto mb-1" />
                        <div className="text-[10px] text-cream/60">Duration</div>
                        <div className="font-display text-lg font-bold text-cream">{mantra.duration}</div>
                      </div>
                    </div>

                    {/* Counter */}
                    <div className="rounded-xl bg-gold/10 border border-gold/20 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-cream/70 flex items-center gap-1">
                          <BarChart3 className="w-3 h-3 text-gold" /> Your Count
                        </span>
                        <span className="text-xs text-cream/50">{count} / {mantra.count}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-cream/10 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-gold-light to-gold"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <span className="font-display text-xl font-bold text-gold w-8 text-right">{count}</span>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-center gap-2 mt-4">
                        <Button
                          onClick={increment}
                          size="sm"
                          className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-9 px-5 rounded-full"
                        >
                          🕉️ Chant +1
                        </Button>
                        <Button
                          onClick={reset}
                          size="sm"
                          variant="ghost"
                          className="text-cream/60 hover:text-temple-red hover:bg-temple-red/10 h-9 w-9 p-0 rounded-full"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>

                  {/* Navigation */}
                  <div className="px-5 py-3 bg-cream/5 border-t border-gold/10 flex items-center justify-between">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(-1)}
                      className="text-cream/60 hover:text-gold hover:bg-cream/10 h-8"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                    </Button>
                    <div className="flex gap-1.5">
                      {KRISHNA_MANTRAS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => { setSelected(i); setCount(0); }}
                          aria-label={`Mantra ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all ${i === selected ? "w-6 bg-gold" : "w-1.5 bg-cream/30"}`}
                        />
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(1)}
                      className="text-cream/60 hover:text-gold hover:bg-cream/10 h-8"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Tip */}
            <div className="mt-4 p-3 rounded-lg bg-gold/5 border border-gold/15 text-center">
              <p className="text-xs text-cream/60 italic">
                📿 Use a 108-bead tulsi mala for counting. One full mala = 108 chants. Chant with pure devotion for maximum spiritual benefit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
