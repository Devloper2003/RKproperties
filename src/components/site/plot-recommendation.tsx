"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Trophy, RotateCcw, ArrowRight, MapPin, IndianRupee, Check } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import { RECOMMENDATION_CRITERIA, formatINR, type Project } from "@/lib/types";
import { toast } from "sonner";

export function PlotRecommendation() {
  const { setSelectedProjectSlug, openLeadForm } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => (await fetch("/api/projects")).json().then((j) => j.data),
  });

  const selectOption = (criterionId: string, optionValue: string) => {
    const newAnswers = { ...answers, [criterionId]: optionValue };
    setAnswers(newAnswers);

    if (step < RECOMMENDATION_CRITERIA.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const calculateResults = () => {
    const scores: Record<string, number> = {
      "bankey-bihari-orchid": 0,
      "braj-lotus-greens": 0,
      "bankey-bihari-kunj": 0,
      "bankey-bihari-dham": 0,
    };

    RECOMMENDATION_CRITERIA.forEach((criterion) => {
      const answer = answers[criterion.id];
      if (answer) {
        const option = criterion.options.find((o) => o.value === answer);
        if (option) {
          Object.entries(option.weight).forEach(([slug, weight]) => {
            scores[slug] = (scores[slug] || 0) + weight;
          });
        }
      }
    });

    const maxScore = Math.max(...Object.values(scores));
    const ranked = Object.entries(scores)
      .map(([slug, score]) => ({
        project: projects.find((p) => p.slug === slug),
        score,
        percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
      }))
      .filter((r) => r.project)
      .sort((a, b) => b.score - a.score);

    return ranked;
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const results = showResult ? calculateResults() : [];
  const topMatch = results[0];

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI-Powered Matching"
          title="Find Your Perfect"
          highlight="Braj Plot"
          subtitle="Not sure which township is right for you? Answer 4 quick questions about your budget, location preference, and priorities — our recommendation engine will match you with your ideal RK Properties plot."
        />

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="card-luxury rounded-2xl overflow-hidden">
                {/* Progress header */}
                <div className="bg-spiritual-temple p-5">
                  <div className="flex items-center justify-between text-xs text-cream/60 mb-2">
                    <span>Question {step + 1} of {RECOMMENDATION_CRITERIA.length}</span>
                    <span>{Math.round(((step + 1) / RECOMMENDATION_CRITERIA.length) * 100)}%</span>
                  </div>
                  <Progress value={((step + 1) / RECOMMENDATION_CRITERIA.length) * 100} className="h-1.5 bg-cream/20 [&>div]:bg-gold" />
                </div>

                <CardContent className="p-6 sm:p-8">
                  <div className="text-xs uppercase tracking-[0.25em] text-gold mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Question {step + 1}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-indigo-deep mb-6 leading-snug">
                    {RECOMMENDATION_CRITERIA[step].question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {RECOMMENDATION_CRITERIA[step].options.map((opt) => {
                      const isSelected = answers[RECOMMENDATION_CRITERIA[step].id] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => selectOption(RECOMMENDATION_CRITERIA[step].id, opt.value)}
                          className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                            isSelected
                              ? "border-gold bg-gold/5 ring-gold-glow"
                              : "border-gold/15 bg-white hover:border-gold/40 hover:bg-gold/5"
                          }`}
                        >
                          <span className="text-3xl flex-shrink-0">{opt.emoji}</span>
                          <div className="flex-1">
                            <span className="font-display text-sm font-bold text-indigo-deep block">{opt.label}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-gold flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {step > 0 && (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="mt-5 text-xs text-muted-foreground hover:text-gold flex items-center gap-1"
                    >
                      ← Previous question
                    </button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {topMatch && topMatch.project && (
                <>
                  {/* Top match card */}
                  <Card className="card-luxury-dark rounded-2xl overflow-hidden bg-spiritual-temple mb-6">
                    <CardContent className="p-6 sm:p-8 text-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="text-6xl mb-3"
                      >
                        🏆
                      </motion.div>
                      <div className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Your Perfect Match</div>
                      <h3 className="font-display text-3xl sm:text-4xl font-bold text-cream mb-2">{topMatch.project.name}</h3>
                      <p className="text-gold italic mb-4">{topMatch.project.tagline}</p>
                      <p className="text-sm text-cream/70 max-w-lg mx-auto mb-6">{topMatch.project.usp}</p>

                      {/* Match score */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/15 border border-gold/30">
                        <Trophy className="w-4 h-4 text-gold" />
                        <span className="text-sm font-bold text-gold">{topMatch.percentage}% Match</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top match details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    <Card className="card-luxury rounded-xl">
                      <CardContent className="p-4 text-center">
                        <MapPin className="w-5 h-5 text-gold mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">Location</div>
                        <div className="font-display text-sm font-bold text-indigo-deep">{topMatch.project.city}</div>
                      </CardContent>
                    </Card>
                    <Card className="card-luxury rounded-xl">
                      <CardContent className="p-4 text-center">
                        <IndianRupee className="w-5 h-5 text-gold mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">Price Range</div>
                        <div className="font-display text-sm font-bold text-gold">
                          {formatINR(topMatch.project.priceRangeMin)} - {formatINR(topMatch.project.priceRangeMax)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="card-luxury rounded-xl">
                      <CardContent className="p-4 text-center">
                        <Sparkles className="w-5 h-5 text-gold mx-auto mb-1" />
                        <div className="text-xs text-muted-foreground">Plot Size</div>
                        <div className="font-display text-sm font-bold text-indigo-deep">
                          {topMatch.project.minPlotSize}-{topMatch.project.maxPlotSize} sq.yd
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* All matches ranked */}
                  <Card className="card-luxury rounded-2xl mb-6">
                    <CardContent className="p-5">
                      <h4 className="font-display text-sm font-bold text-indigo-deep mb-3">All Matches Ranked</h4>
                      <div className="space-y-3">
                        {results.map((r, i) => (
                          <div key={r.project?.slug} className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              i === 0 ? "bg-gold text-indigo-deep" : "bg-marble text-muted-foreground"
                            }`}>{i + 1}</span>
                            <span className="text-sm font-medium text-indigo-deep w-32 truncate flex-shrink-0">{r.project?.name}</span>
                            <div className="flex-1 h-2 rounded-full bg-marble overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${r.percentage}%` }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                                className={`h-full ${i === 0 ? "bg-gradient-to-r from-gold-light to-gold" : "bg-sandstone"}`}
                              />
                            </div>
                            <span className="text-xs font-semibold text-indigo-deep w-10 text-right">{r.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => {
                        setSelectedProjectSlug(topMatch.project.slug);
                        toast.success(`Opening ${topMatch.project.name} details...`);
                      }}
                      className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12"
                    >
                      View {topMatch.project.name} Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                      onClick={() => openLeadForm(topMatch.project.id)}
                      variant="outline"
                      className="flex-1 border-gold/30 text-indigo-deep hover:bg-gold/10 h-12"
                    >
                      Book a Visit
                    </Button>
                    <Button
                      onClick={reset}
                      variant="ghost"
                      className="text-muted-foreground hover:text-gold"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" /> Retake
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
