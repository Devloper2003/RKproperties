"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Cloud, CloudRain, CloudLightning, CloudSun, Thermometer, Users, Clock, MapPin } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { BRAJ_WEATHER } from "@/lib/types";

const DARSHAN_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: any }> = {
  excellent: { label: "Excellent", color: "text-green-light", bg: "bg-green-light/15", border: "border-green-light/40", icon: Sun },
  good: { label: "Good", color: "text-gold", bg: "bg-gold/15", border: "border-gold/40", icon: CloudSun },
  moderate: { label: "Moderate", color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-500/40", icon: Cloud },
  avoid: { label: "Avoid", color: "text-temple-red", bg: "bg-temple-red/15", border: "border-temple-red/40", icon: CloudLightning },
};

export function BrajWeather() {
  const [selected, setSelected] = useState(0);
  const today = BRAJ_WEATHER[selected];
  const cfg = DARSHAN_CONFIG[today.darshan];

  return (
    <section className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Plan Your Visit"
          title="Braj"
          highlight="Darshan Weather"
          subtitle="Real-time weather with darshan-suitability forecast — plan your temple visits and parikrama around Braj's monsoon and heat patterns for the most blessed spiritual experience."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's weather (left, 1 col) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className={`card-luxury-dark rounded-2xl bg-spiritual-temple border-2 ${cfg.border}`}>
              <CardContent className="p-6 text-center">
                <div className="text-xs uppercase tracking-wider text-cream/60 mb-2">{today.day}</div>
                <motion.div
                  key={selected}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-7xl mb-3"
                >
                  {today.icon}
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-cream mb-1">{today.condition}</h3>
                <p className="text-sm text-cream/70 mb-4">{today.temp}</p>

                {/* Darshan rating */}
                <div className={`p-3 rounded-xl ${cfg.bg} border ${cfg.border} mb-3`}>
                  <div className="text-[10px] uppercase tracking-wider text-cream/60 mb-1">Darshan Suitability</div>
                  <div className={`font-display text-lg font-bold ${cfg.color} flex items-center justify-center gap-1.5`}>
                    <cfg.icon className="w-5 h-5" />
                    {cfg.label}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cream/60 flex items-center gap-1"><Users className="w-3 h-3 text-gold" /> Expected Crowd</span>
                    <span className="text-cream font-medium">{today.crowd}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cream/60 flex items-center gap-1"><Clock className="w-3 h-3 text-gold" /> Best Time</span>
                    <span className="text-cream font-medium">{today.bestTime}</span>
                  </div>
                </div>

                <p className="text-[11px] text-cream/70 italic mt-3 leading-relaxed">
                  {today.darshanNote}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* 7-day forecast (right, 2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="card-luxury rounded-2xl h-full">
              <CardContent className="p-6">
                <h3 className="font-display text-base font-bold text-indigo-deep mb-4 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-gold" /> 7-Day Forecast
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {BRAJ_WEATHER.map((w, i) => {
                    const w_cfg = DARSHAN_CONFIG[w.darshan];
                    const active = i === selected;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`p-3 rounded-xl border transition-all text-center ${
                          active ? `${w_cfg.bg} ${w_cfg.border} border-2` : "bg-white border-gold/15 hover:border-gold/30"
                        }`}
                      >
                        <div className={`text-[10px] uppercase tracking-wider font-medium ${active ? w_cfg.color : "text-muted-foreground"}`}>
                          {w.day === "Today" ? "Today" : w.date.split(" ")[0]}
                        </div>
                        <div className="text-3xl my-2">{w.icon}</div>
                        <div className={`text-[11px] font-medium ${active ? "text-indigo-deep" : "text-muted-foreground"}`}>
                          {w.temp.split(" / ")[0]}
                        </div>
                        <div className={`text-[9px] mt-1 ${w_cfg.color} font-medium`}>{w_cfg.label}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Darshan tips */}
                <div className="mt-6 pt-6 border-t border-gold/10">
                  <h4 className="font-display text-sm font-bold text-indigo-deep mb-3">Darshan Tips by Weather</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-green-light/10 border border-green-light/20 flex items-start gap-2">
                      <Sun className="w-3.5 h-3.5 text-green-deep flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-green-deep">Sunny/Clear:</strong> Best for outdoor parikrama, Govardhan Hill visits. Start at sunrise.
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gold/10 border border-gold/20 flex items-start gap-2">
                      <CloudSun className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gold">Cloudy:</strong> Ideal — cool and comfortable. Best for all-day temple hopping.
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
                      <Cloud className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-700">Light Rain:</strong> Indoor temple darshan. Avoid Yamuna ghats, steps slippery.
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-temple-red/10 border border-temple-red/20 flex items-start gap-2">
                      <CloudLightning className="w-3.5 h-3.5 text-temple-red flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-temple-red">Storm:</strong> Stay indoors. Use our virtual tour. Reschedule site visits.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live location note */}
                <div className="mt-4 p-3 rounded-lg bg-marble flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Forecast for Vrindavan, Mathura & Govardhan region · Updated every 3 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
