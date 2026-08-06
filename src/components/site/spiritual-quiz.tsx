"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import { SPIRITUAL_QUIZ, QUIZ_RESULTS } from "@/lib/types";
import { ChevronRight, RotateCcw, Sparkles, MapPin, ArrowRight, Check } from "lucide-react";

type Phase = "intro" | "quiz" | "result";

export function SpiritualQuiz() {
  const { setSelectedProjectSlug, openLeadForm } = useApp();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({ Mathura: 0, Vrindavan: 0, Govardhan: 0 });

  const startQuiz = () => {
    setPhase("quiz");
    setCurrentQ(0);
    setAnswers([]);
    setScores({ Mathura: 0, Vrindavan: 0, Govardhan: 0 });
  };

  const selectAnswer = (optionIdx: number) => {
    const option = SPIRITUAL_QUIZ[currentQ].options[optionIdx];
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([city, pts]) => {
      newScores[city] = (newScores[city] || 0) + pts;
    });
    setScores(newScores);
    setAnswers([...answers, optionIdx]);

    if (currentQ < SPIRITUAL_QUIZ.length - 1) {
      setTimeout(() => setCurrentQ((q) => q + 1), 300);
    } else {
      setTimeout(() => setPhase("result"), 300);
    }
  };

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "Vrindavan";
  const result = QUIZ_RESULTS[winner];
  const projectSlug =
    winner === "Mathura" ? "bankey-bihari-orchid" :
    winner === "Govardhan" ? "braj-lotus-greens" :
    "bankey-bihari-kunj";

  const progress = phase === "quiz" ? ((currentQ + 1) / SPIRITUAL_QUIZ.length) * 100 : phase === "result" ? 100 : 0;

  return (
    <section className="py-20 lg:py-28 bg-spiritual-temple relative overflow-hidden">
      {/* Decorative floating emojis */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {["🦚", "🪈", "🪔", "🌸", "⛰️", "🕉️"].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-6xl"
            style={{
              left: `${(i * 17 + 5) % 90}%`,
              top: `${(i * 23 + 10) % 80}%`,
              animation: `float-up ${8 + i}s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Discover Your Path"
          title="Find Your"
          highlight="Spiritual Home"
          subtitle="Not sure which Braj city is right for you? Take this 5-question quiz inspired by Krishna's pastimes and we'll guide you to your ideal sacred address."
          light
        />

        <div className="mt-8">
          {/* Progress bar */}
          {phase !== "intro" && (
            <div className="mb-6 max-w-md mx-auto">
              <div className="flex items-center justify-between text-xs text-cream/60 mb-2">
                <span>{phase === "result" ? "Complete" : `Question ${currentQ + 1} of ${SPIRITUAL_QUIZ.length}`}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1.5 bg-cream/20 [&>div]:bg-gold" />
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Intro */}
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Card className="bg-cream/5 backdrop-blur-sm border-gold/25 rounded-2xl">
                  <CardContent className="p-8 sm:p-10 text-center">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="text-7xl mb-4"
                    >
                      🦚
                    </motion.div>
                    <h3 className="font-display text-2xl font-bold text-cream mb-2">
                      Which Braj city calls to your soul?
                    </h3>
                    <p className="text-sm text-cream/70 max-w-md mx-auto mb-6">
                      Answer 5 simple questions about your spiritual preferences, lifestyle, and goals. We'll match you with the perfect Braj Dham city.
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {[
                        { emoji: "👶", label: "Mathura" },
                        { emoji: "🦚", label: "Vrindavan" },
                        { emoji: "⛰️", label: "Govardhan" },
                      ].map((c) => (
                        <div key={c.label} className="p-3 rounded-lg bg-cream/5 border border-gold/15">
                          <div className="text-2xl mb-1">{c.emoji}</div>
                          <div className="text-xs text-cream/70">{c.label}</div>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={startQuiz}
                      size="lg"
                      className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold rounded-full px-8"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Begin the Journey
                    </Button>
                    <p className="text-[10px] text-cream/40 mt-3">Takes 60 seconds · 5 questions</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Quiz questions */}
            {phase === "quiz" && (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <Card className="bg-cream/5 backdrop-blur-sm border-gold/25 rounded-2xl">
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-xs uppercase tracking-[0.25em] text-gold mb-2">
                      Question {currentQ + 1}
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-cream mb-5 leading-snug">
                      {SPIRITUAL_QUIZ[currentQ].question}
                    </h3>
                    <div className="space-y-2.5">
                      {SPIRITUAL_QUIZ[currentQ].options.map((opt, i) => {
                        const isSelected = answers[currentQ] === i;
                        return (
                          <button
                            key={i}
                            onClick={() => selectAnswer(i)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3 ${
                              isSelected
                                ? "border-gold bg-gold/15 text-cream"
                                : "border-cream/15 bg-cream/5 text-cream/80 hover:border-gold/40 hover:bg-cream/10"
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected ? "border-gold bg-gold" : "border-cream/30"
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 text-indigo-deep" />}
                            </div>
                            <span className="text-sm">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Result */}
            {phase === "result" && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className={`rounded-2xl overflow-hidden bg-gradient-to-br ${result.gradient} border-gold/30`}>
                  <CardContent className="p-0">
                    <div className="bg-spiritual-temple/40 backdrop-blur-sm p-6 sm:p-8 text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="text-7xl mb-3"
                      >
                        {result.emoji}
                      </motion.div>
                      <div className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Your Spiritual Home is</div>
                      <h3 className="font-display text-4xl sm:text-5xl font-bold text-cream mb-1">{result.title}</h3>
                      <p className="text-sm text-gold italic">{result.subtitle}</p>
                    </div>

                    <div className="p-6 sm:p-8 bg-cream">
                      <p className="text-sm text-indigo-deep/80 leading-relaxed mb-5">
                        {result.description}
                      </p>

                      {/* Score breakdown */}
                      <div className="space-y-2 mb-5">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Your Match Scores</div>
                        {Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([city, score], i) => {
                          const maxScore = Object.values(scores).reduce((a, b) => Math.max(a, b), 0);
                          const pct = (score / maxScore) * 100;
                          return (
                            <div key={city} className="flex items-center gap-3">
                              <span className="text-xs font-medium text-indigo-deep w-20">{city}</span>
                              <div className="flex-1 h-2 rounded-full bg-marble overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                                  className={`h-full ${i === 0 ? "bg-gradient-to-r from-gold-light to-gold" : "bg-sandstone"}`}
                                />
                              </div>
                              <span className="text-xs font-semibold text-indigo-deep w-8 text-right">{score}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          onClick={() => setSelectedProjectSlug(projectSlug)}
                          className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          View Your Match Project
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                          onClick={() => openLeadForm()}
                          variant="outline"
                          className="flex-1 border-green-deep/30 text-green-deep hover:bg-green-light/10 h-11"
                        >
                          Discuss with Advisor
                        </Button>
                      </div>

                      <button
                        onClick={startQuiz}
                        className="mt-3 text-xs text-muted-foreground hover:text-gold flex items-center gap-1 mx-auto"
                      >
                        <RotateCcw className="w-3 h-3" /> Retake Quiz
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
