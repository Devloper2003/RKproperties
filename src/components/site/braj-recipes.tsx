"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { BRAJ_RECIPES } from "@/lib/types";

export function BrajRecipes() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      {/* Decorative food emojis */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {["🧈", "🥛", "🌰", "🍯", "🌿", "🪔"].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-5xl"
            style={{ left: `${(i * 17 + 5) % 95}%`, top: `${(i * 23 + 8) % 88}%` }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Devotional Cooking"
          title="Braj"
          highlight="Prasad Recipes"
          subtitle="Prepare sacred prasad offerings just as they've been made in Braj temples for centuries. Each recipe carries Krishna's blessings — cook with devotion and offer to the Divine before partaking."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BRAJ_RECIPES.map((recipe, i) => {
            const isOpen = expanded === i;
            return (
              <motion.div
                key={recipe.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`card-luxury rounded-2xl overflow-hidden transition-all ${isOpen ? "ring-gold-glow" : ""}`}>
                  {/* Header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : i)}
                    className="w-full text-left p-5 hover:bg-gold/5 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="text-4xl flex-shrink-0">{recipe.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-display text-lg font-bold text-indigo-deep">{recipe.name}</h3>
                            <span className="font-devanagari text-sm text-gold">{recipe.sanskrit}</span>
                          </div>
                          <Badge variant="outline" className="text-[10px] border-gold/30 text-gold mb-2">
                            {recipe.occasion}
                          </Badge>
                          <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{recipe.time}</span>
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{recipe.servings} servings</span>
                            <span className="flex items-center gap-1"><ChefHat className="w-3 h-3" />{recipe.difficulty}</span>
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
                        <CardContent className="px-5 pb-5">
                          {/* Significance */}
                          <div className="p-3 rounded-lg bg-gold/10 border border-gold/20 mb-4">
                            <div className="flex items-start gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-indigo-deep/80 italic leading-relaxed">{recipe.significance}</p>
                            </div>
                          </div>

                          {/* Ingredients */}
                          <div className="mb-4">
                            <h4 className="font-display text-sm font-bold text-indigo-deep mb-2 flex items-center gap-1.5">
                              <span className="w-4 h-1 bg-gold rounded-full" /> Ingredients
                            </h4>
                            <ul className="space-y-1">
                              {recipe.ingredients.map((ing, idx) => (
                                <li key={idx} className="text-xs text-indigo-deep/80 flex items-start gap-2">
                                  <span className="text-gold mt-0.5">•</span> {ing}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Steps */}
                          <div>
                            <h4 className="font-display text-sm font-bold text-indigo-deep mb-2 flex items-center gap-1.5">
                              <span className="w-4 h-1 bg-gold rounded-full" /> Preparation Steps
                            </h4>
                            <ol className="space-y-2">
                              {recipe.steps.map((step, idx) => (
                                <li key={idx} className="text-xs text-indigo-deep/80 flex items-start gap-2.5">
                                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/15 text-gold text-[10px] font-bold flex items-center justify-center">
                                    {idx + 1}
                                  </span>
                                  <span className="leading-relaxed pt-0.5">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Tip */}
                          <div className="mt-4 p-2.5 rounded-lg bg-marble text-center">
                            <p className="text-[11px] text-muted-foreground italic">
                              🙏 Always offer prepared prasad to Krishna with devotion before consuming. <br />
                              <strong className="text-gold">"Patram Pushpam Phalam Toyam"</strong> — Bhagavad Gita 9.26
                            </p>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
            <span className="text-xs text-indigo-deep italic">
              🍯 Our township temples prepare these prasad recipes daily. Residents receive fresh prasad every morning.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
