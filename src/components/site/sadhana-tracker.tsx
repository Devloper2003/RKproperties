"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Minus, RotateCcw, Trophy, Flame, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { SADHANA_ACTIVITIES } from "@/lib/types";
import { toast } from "sonner";

const STORAGE_KEY = "braj_sadhana";

type SadhanaState = Record<string, number>;

function loadSadhana(): SadhanaState {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveSadhana(state: SadhanaState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function SadhanaTracker() {
  const [counts, setCounts] = useState<SadhanaState>(() => {
    if (typeof window === "undefined") return {};
    return loadSadhana();
  });
  const [streak, setStreak] = useState(() => {
    if (typeof window === "undefined") return 7;
    const saved = localStorage.getItem("braj_sadhana_streak");
    return saved ? parseInt(saved) : 7;
  });

  const updateCount = (id: string, delta: number) => {
    const newCounts = { ...counts, [id]: Math.max(0, (counts[id] || 0) + delta) };
    setCounts(newCounts);
    saveSadhana(newCounts);

    const activity = SADHANA_ACTIVITIES.find((a) => a.id === id);
    if (activity && newCounts[id] >= activity.target && delta > 0) {
      toast.success(`🎯 ${activity.name} target completed! Krishna blessings 🙏`);
    }
  };

  const resetDay = () => {
    setCounts({});
    saveSadhana({});
    toast.info("🔄 Sadhana tracker reset for new day");
  };

  const completedCount = SADHANA_ACTIVITIES.filter((a) => (counts[a.id] || 0) >= a.target).length;
  const totalProgress = (completedCount / SADHANA_ACTIVITIES.length) * 100;

  return (
    <section className="py-20 lg:py-28 bg-spiritual-temple relative overflow-hidden">
      {/* Decorative malas */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {["📿", "🪔", "🌿", "🕉️"].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-5xl"
            style={{ left: `${(i * 25 + 5) % 90}%`, top: `${(i * 30 + 10) % 85}%` }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Daily Spiritual Practice"
          title="Your"
          highlight="Sadhana Tracker"
          subtitle="Track your daily spiritual practice in Braj Dham. Set your targets, count your rounds, and build your devotion streak. Your sadhana is saved on this device — return daily to maintain your streak."
          light
        />

        {/* Streak + progress header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <Card className="bg-cream/5 backdrop-blur-sm border-gold/25 rounded-2xl">
            <CardContent className="p-5 text-center">
              <Flame className="w-7 h-7 text-temple-red mx-auto mb-2" />
              <div className="font-display text-3xl font-bold text-gold">{streak}</div>
              <div className="text-xs text-cream/60">Day Streak 🔥</div>
            </CardContent>
          </Card>
          <Card className="bg-cream/5 backdrop-blur-sm border-gold/25 rounded-2xl">
            <CardContent className="p-5 text-center">
              <Trophy className="w-7 h-7 text-gold mx-auto mb-2" />
              <div className="font-display text-3xl font-bold text-gold">{completedCount}/{SADHANA_ACTIVITIES.length}</div>
              <div className="text-xs text-cream/60">Goals Today</div>
            </CardContent>
          </Card>
          <Card className="bg-cream/5 backdrop-blur-sm border-gold/25 rounded-2xl">
            <CardContent className="p-5 text-center">
              <Sparkles className="w-7 h-7 text-green-light mx-auto mb-2" />
              <div className="font-display text-3xl font-bold text-green-light">{Math.round(totalProgress)}%</div>
              <div className="text-xs text-cream/60">Day Complete</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <Progress value={totalProgress} className="h-2 bg-cream/10 [&>div]:bg-gradient-to-r [&>div]:from-gold-light [&>div]:via-gold [&>div]:to-gold-dark" />
        </div>

        {/* Activities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SADHANA_ACTIVITIES.map((activity, i) => {
            const count = counts[activity.id] || 0;
            const isComplete = count >= activity.target;
            const progress = Math.min((count / activity.target) * 100, 100);

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={`bg-cream/5 backdrop-blur-sm border rounded-2xl transition-all ${
                  isComplete ? "border-green-light/50 ring-gold-glow" : "border-cream/15 hover:border-gold/30"
                }`}>
                  <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{activity.icon}</span>
                        <div>
                          <h3 className="font-display text-sm font-bold text-cream">{activity.name}</h3>
                          <span className="font-devanagari text-xs text-gold">{activity.sanskrit}</span>
                        </div>
                      </div>
                      {isComplete && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-green-light/20 flex items-center justify-center"
                        >
                          <Trophy className="w-3.5 h-3.5 text-green-light" />
                        </motion.div>
                      )}
                    </div>

                    {/* Count display */}
                    <div className="flex items-center justify-between mb-3">
                      <button
                        onClick={() => updateCount(activity.id, -1)}
                        className="w-8 h-8 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center text-cream/70 transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <div className="text-center">
                        <span className={`font-display text-3xl font-bold ${isComplete ? "text-green-light" : "text-gold"}`}>
                          {count}
                        </span>
                        <span className="text-cream/50 text-sm"> / {activity.target}</span>
                        <div className="text-[10px] text-cream/50">{activity.unit}</div>
                      </div>
                      <button
                        onClick={() => updateCount(activity.id, 1)}
                        className="w-8 h-8 rounded-full bg-gold/20 hover:bg-gold/30 flex items-center justify-center text-gold transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Progress bar */}
                    <Progress value={progress} className={`h-1.5 bg-cream/10 [&>div]:${isComplete ? "bg-green-light" : "bg-gold"}`} />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={resetDay}
            variant="outline"
            className="border-cream/30 text-cream/70 hover:bg-cream/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Reset Today's Sadhana
          </Button>
          <p className="text-xs text-cream/40">
            📱 Your sadhana is saved on this device. Return daily to maintain your streak!
          </p>
        </div>

        {/* Completion celebration */}
        <AnimatePresence>
          {completedCount === SADHANA_ACTIVITIES.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-6 p-4 rounded-xl bg-gradient-to-r from-gold/20 to-green-light/20 border border-gold/30 text-center"
            >
              <div className="text-3xl mb-2">🎉🪔🎉</div>
              <p className="font-display text-lg font-bold text-cream mb-1">All Sadhana Complete!</p>
              <p className="text-xs text-cream/70 italic">
                &ldquo;One who performs their daily sadhana with devotion, Krishna resides in their heart forever.&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
