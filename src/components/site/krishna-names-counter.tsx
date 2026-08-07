"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Play, Pause } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { KRISHNA_108_NAMES } from "@/lib/types";

const TARGET = 108;

export function KrishnaNamesCounter() {
  const [count, setCount] = useState(0);
  const [currentName, setCurrentName] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [autoMode, setAutoMode] = useState(false);

  // Loop through 18 names repeatedly to reach 108
  const nameIdx = count % KRISHNA_108_NAMES.length;
  const name = KRISHNA_108_NAMES[nameIdx];

  const increment = () => {
    if (count >= TARGET) return;
    const newCount = count + 1;
    setCount(newCount);
    setCurrentName(newCount % KRISHNA_108_NAMES.length);
    if (newCount === TARGET) {
      setCompleted(true);
      setAutoMode(false);
    }
  };

  const reset = () => {
    setCount(0);
    setCurrentName(0);
    setCompleted(false);
    setAutoMode(false);
  };

  // Auto mode: chant every 2 seconds
  useEffect(() => {
    if (!autoMode) return;
    const timer = setInterval(() => {
      if (count < TARGET) {
        increment();
      } else {
        setAutoMode(false);
      }
    }, 2000);
    return () => clearInterval(timer);
  }, [autoMode, count]);

  const progress = (count / TARGET) * 100;
  const rounds = Math.floor(count / KRISHNA_108_NAMES.length);

  return (
    <section className="py-20 lg:py-28 bg-spiritual-temple relative overflow-hidden">
      {/* Decorative lotus petals */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-gold text-3xl"
            style={{
              left: `${(i * 8 + 4) % 96}%`,
              top: `${(i * 13 + 6) % 90}%`,
              animation: `float-up ${6 + i % 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            🪷
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Sacred Chanting"
          title="Krishna"
          highlight="108 Names Japa"
          subtitle="Chant Krishna's 108 holy names (Ashtottara Shatanamavali) with our interactive counter. Each recitation purifies the heart and connects you to the Divine. Complete 108 chants for a full spiritual round."
          light
        />

        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key="chanting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="bg-cream/5 backdrop-blur-sm border-gold/25 rounded-2xl overflow-hidden">
                {/* Counter display */}
                <div className="relative p-8 text-center">
                  {/* Progress ring */}
                  <div className="relative inline-flex items-center justify-center mb-4">
                    <svg className="w-48 h-48 -rotate-90" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(197,162,62,0.15)" strokeWidth="6" />
                      <motion.circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="#C5A23E"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 90}
                        animate={{ strokeDashoffset: 2 * Math.PI * 90 * (1 - progress / 100) }}
                        transition={{ duration: 0.3 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <motion.div
                        key={count}
                        initial={{ scale: 1.3, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="font-display text-5xl font-bold text-gold"
                      >
                        {count}
                      </motion.div>
                      <div className="text-xs text-cream/60 mt-1">of {TARGET}</div>
                    </div>
                  </div>

                  {/* Current name */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={nameIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="mb-4"
                    >
                      <div className="font-devanagari text-2xl sm:text-3xl text-cream mb-2">
                        {name.sanskrit}
                      </div>
                      <div className="text-sm text-gold italic mb-1">{name.transliteration}</div>
                      <div className="text-xs text-cream/60">{name.meaning}</div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Name navigation */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setCurrentName((n) => (n - 1 + KRISHNA_108_NAMES.length) % KRISHNA_108_NAMES.length)}
                      className="text-cream/60 hover:text-gold hover:bg-cream/10"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Badge variant="outline" className="border-gold/30 text-gold">
                      Name {(count % KRISHNA_108_NAMES.length) + 1} of {KRISHNA_108_NAMES.length}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setCurrentName((n) => (n + 1) % KRISHNA_108_NAMES.length)}
                      className="text-cream/60 hover:text-gold hover:bg-cream/10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Chant button */}
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      onClick={increment}
                      size="lg"
                      className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-bold text-lg h-14 px-10 rounded-full hover:shadow-[0_8px_28px_rgba(197,162,62,0.5)]"
                    >
                      🕉️ Chant +1
                    </Button>
                    <Button
                      onClick={() => setAutoMode(!autoMode)}
                      size="lg"
                      variant="outline"
                      className="border-cream/30 text-cream hover:bg-cream/10 h-14 w-14 rounded-full p-0"
                    >
                      {autoMode ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </Button>
                    <Button
                      onClick={reset}
                      size="lg"
                      variant="ghost"
                      className="text-cream/60 hover:text-temple-red hover:bg-temple-red/10 h-14 w-14 rounded-full p-0"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </Button>
                  </div>

                  {autoMode && (
                    <p className="text-xs text-cream/50 mt-3">
                      🎵 Auto-chanting every 2 seconds — meditate and click along
                    </p>
                  )}

                  {/* Rounds completed */}
                  {rounds > 0 && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span className="text-xs text-cream/70">{rounds} round{rounds > 1 ? "s" : ""} completed 🙏</span>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="px-8 pb-6">
                  <div className="flex items-center justify-between text-xs text-cream/50 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-cream/10 [&>div]:bg-gradient-to-r [&>div]:from-gold-light [&>div]:to-gold" />
                </div>
              </Card>

              {/* Info */}
              <div className="mt-4 p-4 rounded-xl bg-gold/5 border border-gold/15 text-center">
                <p className="text-xs text-cream/60 italic">
                  📿 Chanting 108 names purifies the heart, removes obstacles, and invokes Krishna's blessings. 
                  Traditionally chanted with tulsi mala beads. One round = 108 chants.
                </p>
              </div>
            </motion.div>
          ) : (
            /* Completion celebration */
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Card className="bg-cream/5 backdrop-blur-sm border-gold/25 rounded-2xl p-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="text-7xl mb-4"
                >
                  🪷
                </motion.div>
                <Badge className="bg-gold/20 text-gold border-0 mb-3">Round Complete</Badge>
                <h3 className="font-display text-3xl font-bold text-cream mb-2">
                  🎉 108 Names Completed!
                </h3>
                <p className="text-sm text-cream/70 mb-4">
                  You have completed one full round of Krishna's Ashtottara Shatanamavali.<br />
                  May Krishna's blessings shower upon you and your spiritual home in Braj Dham.
                </p>
                <div className="p-4 rounded-lg bg-gold/10 border border-gold/20 mb-4">
                  <p className="text-xs text-cream/80 italic">
                    &ldquo;Whoever chants My names with devotion, I protect them in all dangers and grant what they lack.&rdquo;
                    <br />— Lord Krishna, Bhagavad Gita
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button onClick={reset} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">
                    <RotateCcw className="w-4 h-4 mr-2" /> Start Another Round
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
