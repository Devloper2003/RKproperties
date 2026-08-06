"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft, ChevronRight, Lightbulb, Baby, X } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { KRISHNA_STORIES } from "@/lib/types";

export function KrishnaStories() {
  const [active, setActive] = useState(0);
  const [showFull, setShowFull] = useState(false);

  const story = KRISHNA_STORIES[active];

  const navigate = (dir: number) => {
    setShowFull(false);
    setActive((a) => (a + dir + KRISHNA_STORIES.length) % KRISHNA_STORIES.length);
  };

  return (
    <section className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      {/* Decorative kid-friendly elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        {["🦚", "🪈", "🦋", "🌸", "🌟", "🪔"].map((emoji, i) => (
          <div
            key={i}
            className="absolute text-6xl"
            style={{
              left: `${(i * 17 + 5) % 95}%`,
              top: `${(i * 23 + 8) % 88}%`,
              animation: `float-up ${8 + i % 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="For Little Devotees"
          title="Krishna"
          highlight="Bal Katha Stories"
          subtitle="Share the divine pastimes of Krishna with your children. Beautifully illustrated stories with timeless moral lessons — perfect for bedtime reading or Sunday school."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Story selector */}
          <div className="lg:col-span-1 space-y-2">
            {KRISHNA_STORIES.map((s, i) => (
              <motion.button
                key={s.title}
                onClick={() => { setActive(i); setShowFull(false); }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                  i === active
                    ? "border-gold bg-gold/5"
                    : "border-gold/15 bg-white hover:border-gold/30"
                }`}
              >
                <span className="text-2xl flex-shrink-0">{s.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className={`font-display text-sm font-bold leading-tight ${i === active ? "text-gold" : "text-indigo-deep"}`}>
                    {s.title}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Baby className="w-2.5 h-2.5" /> {s.ageGroup}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Active story */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="card-luxury rounded-2xl overflow-hidden">
                  {/* Story header */}
                  <div className="relative h-40 bg-gradient-to-br from-indigo-deep via-[#2d1b3d] to-gold-dark flex items-center justify-center overflow-hidden">
                    <motion.div
                      key={`emoji-${active}`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="text-7xl relative z-10"
                    >
                      {story.emoji}
                    </motion.div>
                    {/* Sparkles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute text-gold/40 text-sm"
                          style={{
                            left: `${(i * 13 + 5) % 95}%`,
                            top: `${(i * 17 + 10) % 90}%`,
                            animation: `twinkle ${2 + i % 2}s infinite`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        >
                          ✨
                        </div>
                      ))}
                    </div>
                    <style jsx>{`@keyframes twinkle { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.3)} }`}</style>
                  </div>

                  <CardContent className="p-6">
                    {/* Title + age */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-indigo-deep">{story.title}</h3>
                        <Badge variant="outline" className="mt-1.5 text-[10px] border-gold/30 text-gold">
                          <Baby className="w-2.5 h-2.5 mr-1" /> {story.ageGroup}
                        </Badge>
                      </div>
                      <BookOpen className="w-5 h-5 text-gold/40 flex-shrink-0" />
                    </div>

                    {/* Story text */}
                    <div className="relative">
                      <p className={`text-sm text-indigo-deep/80 leading-relaxed ${!showFull ? "line-clamp-4" : ""}`}>
                        {story.story}
                      </p>
                      {!showFull && (
                        <button
                          onClick={() => setShowFull(true)}
                          className="text-xs text-gold font-medium hover:text-gold-dark mt-1"
                        >
                          Read full story →
                        </button>
                      )}
                    </div>

                    {/* Moral */}
                    {showFull && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 rounded-xl bg-gold/10 border border-gold/20"
                      >
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[10px] uppercase tracking-wider text-gold font-semibold mb-1">Moral of the Story</div>
                            <p className="text-xs text-indigo-deep italic leading-relaxed">{story.moral}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-5 pt-5 border-t border-gold/10">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(-1)}
                        className="text-muted-foreground hover:text-gold"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                      </Button>
                      <div className="flex gap-1.5">
                        {KRISHNA_STORIES.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => { setActive(i); setShowFull(false); }}
                            aria-label={`Story ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-gold" : "w-1.5 bg-gold/30"}`}
                          />
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(1)}
                        className="text-muted-foreground hover:text-gold"
                      >
                        Next <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Parent tip */}
            <div className="mt-4 p-3 rounded-lg bg-cream border border-gold/15 flex items-start gap-2">
              <span className="text-lg">👨‍👩‍👧‍👦</span>
              <p className="text-xs text-muted-foreground">
                <strong className="text-indigo-deep">Parent Tip:</strong> Read these stories with your children at bedtime. Discuss the moral together. Soon they'll know Krishna's leelas by heart!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
