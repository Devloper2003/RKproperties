"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OmSymbol } from "@/components/shared/brand";
import { KRISHNA_QUOTES } from "@/lib/types";

export function QuoteRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % KRISHNA_QUOTES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const quote = KRISHNA_QUOTES[index];

  return (
    <section className="py-14 bg-spiritual-temple relative overflow-hidden">
      {/* Decorative diya flames */}
      <div className="absolute top-8 left-8 text-2xl diya-flicker" aria-hidden>🪔</div>
      <div className="absolute top-8 right-8 text-2xl diya-flicker" style={{ animationDelay: "0.7s" }} aria-hidden>🪔</div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xl diya-flicker" style={{ animationDelay: "1.3s" }} aria-hidden>🪔</div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-12 bg-gold/40" />
            <OmSymbol className="text-gold text-lg" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gold">
              Words of the Divine
            </span>
            <OmSymbol className="text-gold text-lg" />
            <span className="h-px w-12 bg-gold/40" />
          </div>

          <div className="min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                <p className="font-display text-xl sm:text-2xl lg:text-3xl text-cream leading-relaxed italic font-medium">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <footer className="mt-5 text-gold text-sm tracking-wider">
                  — {quote.source}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {KRISHNA_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Quote ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-gold" : "w-1.5 bg-cream/30 hover:bg-cream/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
