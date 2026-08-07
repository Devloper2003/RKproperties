"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, X, Trophy, RotateCcw, Sparkles, Brain, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { KRISHNA_QUIZ_QUESTIONS } from "@/lib/types";
import { toast } from "sonner";

export function KrishnaQuiz() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const start = () => {
    setPhase("quiz");
    setCurrentQ(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
  };

  const selectAnswer = (idx: number) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    const correct = idx === KRISHNA_QUIZ_QUESTIONS[currentQ].answer;
    if (correct) {
      setScore((s) => s + 1);
      toast.success("✅ Correct! Krishna blessings 🙏");
    } else {
      toast.error("❌ Not quite — see the explanation below");
    }
    setAnswers([...answers, idx]);
  };

  const next = () => {
    if (currentQ < KRISHNA_QUIZ_QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setPhase("result");
      if (score >= 8) toast.success("🏆 Krishna Leela Expert! Outstanding!");
      else if (score >= 6) toast.success("🌟 Great job! You know your Krishna!");
      else toast.info("📖 Keep studying Krishna's leelas!");
    }
  };

  const question = KRISHNA_QUIZ_QUESTIONS[currentQ];
  const progress = phase === "quiz" ? ((currentQ + 1) / KRISHNA_QUIZ_QUESTIONS.length) * 100 : phase === "result" ? 100 : 0;

  const getRating = () => {
    const pct = (score / KRISHNA_QUIZ_QUESTIONS.length) * 100;
    if (pct >= 90) return { title: "Krishna Leela Expert! 🏆", emoji: "🏆", color: "text-gold", desc: "Outstanding! You possess deep knowledge of Krishna's divine pastimes." };
    if (pct >= 70) return { title: "Devotee Scholar! 🌟", emoji: "🌟", color: "text-gold", desc: "Excellent! Your devotion shines through your knowledge." };
    if (pct >= 50) return { title: "Seeker of Krishna 🙏", emoji: "🙏", color: "text-green-deep", desc: "Good effort! Keep reading Krishna's stories to deepen your understanding." };
    return { title: "Begin Your Journey 📖", emoji: "📖", color: "text-temple-red", desc: "Every devotee starts somewhere. Read our Krishna Stories section to learn more!" };
  };

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Test Your Devotion"
          title="Krishna"
          highlight="Leela Quiz"
          subtitle="How well do you know Krishna's divine pastimes? Take this 10-question quiz and discover your spiritual knowledge level. Each answer comes with a detailed explanation."
        />

        {phase !== "intro" && (
          <div className="mb-6 max-w-md mx-auto">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>{phase === "result" ? "Complete" : `Question ${currentQ + 1} of ${KRISHNA_QUIZ_QUESTIONS.length}`}</span>
              <span>Score: {score}/{KRISHNA_QUIZ_QUESTIONS.length}</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-marble [&>div]:bg-gold" />
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Intro */}
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <Card className="card-luxury rounded-2xl">
                <CardContent className="p-8 text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-7xl mb-4"
                  >
                    🧠
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-indigo-deep mb-2">Test Your Krishna Knowledge</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                    10 questions about Krishna's birth, pastimes, devotees, and teachings. Each answer includes a spiritual explanation.
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-6 max-w-sm mx-auto">
                    <div className="p-3 rounded-lg bg-marble"><div className="text-2xl mb-1">📖</div><div className="text-[10px] text-muted-foreground">10 Questions</div></div>
                    <div className="p-3 rounded-lg bg-marble"><div className="text-2xl mb-1">⚡</div><div className="text-[10px] text-muted-foreground">~3 minutes</div></div>
                    <div className="p-3 rounded-lg bg-marble"><div className="text-2xl mb-1">🏆</div><div className="text-[10px] text-muted-foreground">Get Rated</div></div>
                  </div>
                  <Button onClick={start} size="lg" className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold rounded-full px-8">
                    <Brain className="w-4 h-4 mr-2" /> Start Quiz
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Quiz */}
          {phase === "quiz" && (
            <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Card className="card-luxury rounded-2xl">
                <CardContent className="p-6">
                  <div className="text-xs uppercase tracking-[0.25em] text-gold mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Question {currentQ + 1}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-indigo-deep mb-5 leading-snug">
                    {question.question}
                  </h3>

                  <div className="space-y-2.5">
                    {question.options.map((opt, i) => {
                      const isCorrect = i === question.answer;
                      const isSelected = selected === i;
                      let style = "border-gold/15 bg-white hover:border-gold/40 text-indigo-deep";
                      if (showExplanation) {
                        if (isCorrect) style = "border-green-light/50 bg-green-light/10 text-green-deep";
                        else if (isSelected) style = "border-temple-red/50 bg-temple-red/10 text-temple-red";
                        else style = "border-gold/10 bg-marble/50 text-muted-foreground";
                      }
                      return (
                        <button
                          key={i}
                          onClick={() => selectAnswer(i)}
                          disabled={showExplanation}
                          className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center gap-3 ${style}`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                            showExplanation && isCorrect ? "border-green-light bg-green-light text-white" :
                            showExplanation && isSelected ? "border-temple-red bg-temple-red text-white" :
                            "border-gold/30 text-gold"
                          }`}>
                            {showExplanation && isCorrect ? <Check className="w-3.5 h-3.5" /> :
                             showExplanation && isSelected ? <X className="w-3.5 h-3.5" /> :
                             String.fromCharCode(65 + i)}
                          </div>
                          <span className="text-sm">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 p-4 rounded-xl bg-gold/10 border border-gold/20">
                          <div className="text-[10px] uppercase tracking-wider text-gold font-semibold mb-1">Spiritual Explanation</div>
                          <p className="text-xs text-indigo-deep/80 leading-relaxed">{question.explanation}</p>
                        </div>
                        <Button
                          onClick={next}
                          className="w-full mt-4 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11"
                        >
                          {currentQ < KRISHNA_QUIZ_QUESTIONS.length - 1 ? "Next Question" : "See Results"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Result */}
          {phase === "result" && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              {(() => {
                const rating = getRating();
                return (
                  <Card className="card-luxury-dark rounded-2xl bg-spiritual-temple overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="text-7xl mb-4"
                      >
                        {rating.emoji}
                      </motion.div>
                      <Badge className="bg-gold/20 text-gold border-0 mb-3">Quiz Complete</Badge>
                      <h3 className={`font-display text-2xl font-bold mb-2 ${rating.color === "text-gold" ? "text-gold" : rating.color === "text-green-deep" ? "text-green-light" : "text-temple-red"}`}>
                        {rating.title}
                      </h3>
                      <div className="font-display text-5xl font-bold text-gold mb-2">
                        {score}/{KRISHNA_QUIZ_QUESTIONS.length}
                      </div>
                      <p className="text-sm text-cream/70 max-w-md mx-auto mb-6">{rating.desc}</p>

                      {/* Score visualization */}
                      <div className="flex justify-center gap-1 mb-6">
                        {answers.map((ans, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.05 }}
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                              ans === KRISHNA_QUIZ_QUESTIONS[i].answer
                                ? "bg-green-light/20 text-green-light"
                                : "bg-temple-red/20 text-temple-red"
                            }`}
                          >
                            {ans === KRISHNA_QUIZ_QUESTIONS[i].answer ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button onClick={start} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">
                          <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
