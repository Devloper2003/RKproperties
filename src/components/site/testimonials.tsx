"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import type { Testimonial } from "@/lib/types";

export function Testimonials() {
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => (await fetch("/api/testimonials")).json().then((j) => j.data),
  });

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Devotee Voices"
          title="Voices from our"
          highlight="Devotee-Residents"
          subtitle="Real stories from families who found their spiritual home with BrajProperty. Their journeys inspire our mission every day."
        />

        {testimonials.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Loading testimonials...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}
              >
                <Card className="card-luxury rounded-2xl h-full flex flex-col">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="w-8 h-8 text-gold/40 mb-3" />
                    <p className="text-sm text-indigo-deep/80 leading-relaxed flex-1 italic">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-1 mt-4 mb-4">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`w-4 h-4 ${idx < t.rating ? "fill-gold text-gold" : "text-gold/30"}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-gold/10">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center text-cream font-display font-bold flex-shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-indigo-deep text-sm">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.designation}</div>
                        {t.project?.name && (
                          <div className="text-[11px] text-gold mt-0.5">📍 {t.project.name}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
