"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Sunrise, Sunset, Moon, Star } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { BRAJ_CALENDAR } from "@/lib/types";

const TYPE_CONFIG: Record<string, { color: string; bg: string; icon: any; label: string }> = {
  darshan: { color: "text-gold", bg: "bg-gold/10 border-gold/30", icon: Star, label: "Darshan" },
  festival: { color: "text-temple-red", bg: "bg-temple-red/10 border-temple-red/30", icon: Calendar, label: "Festival" },
  fasting: { color: "text-green-deep", bg: "bg-green-light/10 border-green-light/30", icon: Sunrise, label: "Fasting" },
  auspicious: { color: "text-indigo-deep", bg: "bg-indigo-deep/10 border-indigo-deep/30", icon: Moon, label: "Auspicious" },
};

export function BrajCalendar() {
  const [selected, setSelected] = useState(0);
  const item = BRAJ_CALENDAR[selected];
  const cfg = TYPE_CONFIG[item.type];

  const navigate = (dir: number) => {
    setSelected((s) => (s + dir + BRAJ_CALENDAR.length) % BRAJ_CALENDAR.length);
  };

  return (
    <section className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      {/* Decorative moon/sun */}
      <div className="absolute top-10 right-10 text-6xl opacity-10 animate-pulse">🌕</div>
      <div className="absolute bottom-10 left-10 text-5xl opacity-10">🪔</div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Sacred Timings"
          title="Braj"
          highlight="Spiritual Calendar"
          subtitle="Plan your spiritual journey with the Braj calendar — daily darshan timings, festival dates, fasting days, and auspicious moments for parikrama and seva."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar list (left) */}
          <div className="lg:col-span-1 space-y-2 max-h-[500px] overflow-y-auto scroll-luxury pr-1">
            {BRAJ_CALENDAR.map((c, i) => {
              const c_cfg = TYPE_CONFIG[c.type];
              const active = i === selected;
              return (
                <motion.button
                  key={i}
                  onClick={() => setSelected(i)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    active ? `${c_cfg.bg} border-current` : "bg-white border-gold/15 hover:border-gold/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? c_cfg.color : "text-muted-foreground"}`}>
                      {c.date}
                    </span>
                    <c_cfg.icon className={`w-3.5 h-3.5 ${active ? c_cfg.color : "text-muted-foreground"}`} />
                  </div>
                  <div className={`font-display text-sm font-bold leading-snug ${active ? c_cfg.color : "text-indigo-deep"}`}>
                    {c.event}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {c.temple}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Detail card (right) */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="card-luxury rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className={`${cfg.bg} p-5 relative`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={`${cfg.bg} ${cfg.color} border-current text-[10px]`}>
                            {cfg.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Tithi: {item.tithi}</span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-indigo-deep">
                          {item.event}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.date}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full ${cfg.bg} border ${cfg.color} flex items-center justify-center flex-shrink-0`}>
                        <cfg.icon className={`w-6 h-6 ${cfg.color}`} />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-4">
                    {/* Temple + timing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-marble">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gold" /> Temple
                        </div>
                        <div className="font-display text-sm font-bold text-indigo-deep">{item.temple}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-marble">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gold" /> Timing
                        </div>
                        <div className="font-display text-sm font-bold text-indigo-deep">{item.timing}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Significance</div>
                      <p className="text-sm text-indigo-deep/80 leading-relaxed">{item.description}</p>
                    </div>

                    {/* Tips based on type */}
                    {item.type === "darshan" && (
                      <div className="p-3 rounded-lg bg-gold/10 border border-gold/20 flex items-start gap-2">
                        <Star className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-indigo-deep/80">
                          <strong>Pro tip:</strong> Arrive 30 min before darshan opens. Free prasad distributed after morning aarti. Photography prohibited inside sanctum.
                        </p>
                      </div>
                    )}
                    {item.type === "festival" && (
                      <div className="p-3 rounded-lg bg-temple-red/10 border border-temple-red/20 flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-temple-red flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-indigo-deep/80">
                          <strong>RK Properties residents:</strong> Special community celebrations at township temples. Complimentary prasad + cultural programs. RSVP via resident portal.
                        </p>
                      </div>
                    )}
                    {item.type === "fasting" && (
                      <div className="p-3 rounded-lg bg-green-light/10 border border-green-light/20 flex items-start gap-2">
                        <Sunrise className="w-4 h-4 text-green-deep flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-indigo-deep/80">
                          <strong>Fasting rules:</strong> No grains, beans, or legumes. Fruits, milk, and nuts permitted. Break fast (parana) during the specified window tomorrow.
                        </p>
                      </div>
                    )}
                  </CardContent>

                  {/* Navigation */}
                  <div className="px-5 py-3 bg-marble border-t border-gold/10 flex items-center justify-between">
                    <button
                      onClick={() => navigate(-1)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-gold transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Previous
                    </button>
                    <div className="flex gap-1">
                      {BRAJ_CALENDAR.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSelected(i)}
                          aria-label={`Calendar item ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all ${i === selected ? "w-6 bg-gold" : "w-1.5 bg-gold/30"}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => navigate(1)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-gold transition-colors"
                    >
                      Next <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
