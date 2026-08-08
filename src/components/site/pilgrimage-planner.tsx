"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sunrise, Sunset, Sun, MapPin, Clock, Lightbulb, Download, RotateCcw } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { PILGRIMAGE_DURATIONS, PILGRIMAGE_ITINERARIES } from "@/lib/types";
import { toast } from "sonner";

const INTENSITY_COLORS: Record<string, string> = {
  relaxed: "bg-green-light/15 text-green-deep border-green-light/30",
  moderate: "bg-gold/15 text-gold border-gold/30",
  intensive: "bg-temple-red/15 text-temple-red border-temple-red/30",
};

const TIME_ICONS: Record<string, any> = {
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
};

export function PilgrimagePlanner() {
  const [selectedDays, setSelectedDays] = useState<number>(3);
  const itinerary = PILGRIMAGE_ITINERARIES[selectedDays] || [];

  return (
    <section className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      {/* Decorative path */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
          <path d="M 0 200 Q 200 100 400 200 T 800 200" stroke="#C5A23E" strokeWidth="3" fill="none" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Spiritual Journey Planner"
          title="Braj"
          highlight="Pilgrimage Planner"
          subtitle="Plan your Braj Dham pilgrimage with our curated itineraries. Choose 1, 2, 3, or 7 days — we'll generate a complete temple-by-temple schedule with timings, tips, and sacred site visits."
        />

        {/* Duration selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {PILGRIMAGE_DURATIONS.map((dur) => (
            <motion.button
              key={dur.days}
              onClick={() => setSelectedDays(dur.days)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                selectedDays === dur.days
                  ? "border-gold bg-gold/5 ring-gold-glow"
                  : "border-gold/15 bg-white hover:border-gold/30"
              }`}
            >
              <div className="text-3xl mb-1">{dur.emoji}</div>
              <div className={`font-display text-lg font-bold ${selectedDays === dur.days ? "text-gold" : "text-indigo-deep"}`}>
                {dur.days} {dur.days === 1 ? "Day" : "Days"}
              </div>
              <div className="text-[11px] text-muted-foreground font-medium">{dur.title}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{dur.subtitle}</div>
              <Badge variant="outline" className={`mt-2 text-[9px] ${INTENSITY_COLORS[dur.intensity]}`}>
                {dur.intensity}
              </Badge>
            </motion.button>
          ))}
        </div>

        {/* Itinerary display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDays}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="card-luxury-dark rounded-2xl bg-spiritual-temple overflow-hidden">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-gold/15">
                  <div>
                    <h3 className="font-display text-xl font-bold text-cream">
                      {selectedDays}-Day Itinerary
                    </h3>
                    <p className="text-xs text-cream/60">
                      {PILGRIMAGE_DURATIONS.find((d) => d.days === selectedDays)?.subtitle}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast.success("📅 Itinerary downloaded! Check your downloads folder.")}
                      className="border-cream/30 text-cream hover:bg-cream/10 h-8 text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" /> PDF
                    </Button>
                  </div>
                </div>

                {/* Day-by-day schedule */}
                <div className="space-y-4">
                  {itinerary.map((day, i) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-xl bg-cream/5 backdrop-blur-sm border border-cream/10 overflow-hidden"
                    >
                      {/* Day header */}
                      <div className="px-4 py-2.5 bg-gold/10 border-b border-gold/15 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gold text-indigo-deep flex items-center justify-center font-display font-bold text-xs">
                            {day.day}
                          </div>
                          <span className="font-display text-sm font-bold text-cream">Day {day.day}</span>
                        </div>
                        <span className="text-[10px] text-cream/50">{selectedDays === 1 ? "Divine Day" : `Day ${day.day} of ${selectedDays}`}</span>
                      </div>

                      {/* Time slots */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
                        {(["morning", "afternoon", "evening"] as const).map((slot) => {
                          const data = day[slot];
                          const Icon = TIME_ICONS[slot];
                          return (
                            <div key={slot} className="p-3 border-b sm:border-b-0 sm:border-r last:border-r-0 border-cream/10">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <Icon className="w-3.5 h-3.5 text-gold" />
                                <span className="text-[10px] uppercase tracking-wider text-gold font-medium">{slot}</span>
                                <span className="text-[10px] text-cream/40 ml-auto flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" /> {data.time}
                                </span>
                              </div>
                              <h4 className="font-display text-sm font-bold text-cream mb-0.5">{data.temple}</h4>
                              <p className="text-[11px] text-cream/70 leading-snug">{data.activity}</p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Tip */}
                      <div className="px-4 py-2.5 bg-gold/5 border-t border-gold/10 flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] text-cream/70 italic">{day.tip}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer note */}
                <div className="mt-5 pt-4 border-t border-gold/15 text-center">
                  <p className="text-xs text-cream/60 italic">
                    🙏 All itineraries are suggestions — customize based on your pace and spiritual interests. Our team can arrange guides, transport, and accommodation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href={`https://wa.me/918923944689?text=Namaste! I want to plan a ${selectedDays}-day Braj pilgrimage. Please help.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1da851] transition-colors"
          >
            <MapPin className="w-4 h-4" /> Plan My Pilgrimage via WhatsApp
          </a>
          <p className="text-xs text-muted-foreground">
            Free consultation · Custom itineraries · Guide arrangement
          </p>
        </motion.div>
      </div>
    </section>
  );
}
