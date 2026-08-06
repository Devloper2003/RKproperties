"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, User, Users, Check, Calendar } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { SATSANG_SCHEDULE } from "@/lib/types";
import { toast } from "sonner";

const DAY_COLORS: Record<string, string> = {
  Monday: "border-gold/30 text-gold",
  Tuesday: "border-temple-red/30 text-temple-red",
  Wednesday: "border-green-light/30 text-green-deep",
  Thursday: "border-indigo-deep/30 text-indigo-deep",
  Friday: "border-purple-500/30 text-purple-700",
  Saturday: "border-amber-500/30 text-amber-700",
  Sunday: "border-blue-500/30 text-blue-700",
};

export function SatsangSchedule() {
  const [rsvped, setRsvped] = useState<Set<string>>(new Set());

  const toggleRsvp = (key: string) => {
    const newSet = new Set(rsvped);
    if (newSet.has(key)) {
      newSet.delete(key);
      toast.info("RSVP cancelled");
    } else {
      newSet.add(key);
      toast.success("🎉 RSVP confirmed! See you at satsang. Prasad awaits.");
    }
    setRsvped(newSet);
  };

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Weekly Community"
          title="Satsang"
          highlight="Schedule"
          subtitle="Join our resident community for weekly satsang — kirtan, Gita path, bhajan sandhya, discourses, and children's programs. All sessions are free and open to BrajProperty residents & visitors."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SATSANG_SCHEDULE.map((satsang, i) => {
            const key = `${satsang.day}-${satsang.type}`;
            const isRsvped = rsvped.has(key);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className={`card-luxury rounded-2xl h-full flex flex-col transition-all ${isRsvped ? "ring-gold-glow" : ""}`}>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    {/* Day + emoji header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{satsang.emoji}</span>
                        <div>
                          <Badge variant="outline" className={`text-[10px] ${DAY_COLORS[satsang.day] || "border-gold/30 text-gold"}`}>
                            {satsang.day}
                          </Badge>
                          <h3 className="font-display text-base font-bold text-indigo-deep mt-1">{satsang.type}</h3>
                        </div>
                      </div>
                      {isRsvped && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-green-light/20 flex items-center justify-center"
                        >
                          <Check className="w-3.5 h-3.5 text-green-deep" />
                        </motion.div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{satsang.desc}</p>

                    {/* Details */}
                    <div className="space-y-1.5 text-xs mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3 h-3 text-gold flex-shrink-0" />
                        <span className="text-indigo-deep">{satsang.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-3 h-3 text-gold flex-shrink-0" />
                        <span className="text-indigo-deep truncate">{satsang.temple}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-3 h-3 text-gold flex-shrink-0" />
                        <span className="text-indigo-deep truncate">{satsang.leader}</span>
                      </div>
                      <div className="flex items-center justify-between text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3 text-gold flex-shrink-0" />
                          <span className="text-indigo-deep">{satsang.capacity}</span>
                        </div>
                        <Badge variant="outline" className="text-[9px] border-green-light/30 text-green-deep">
                          {satsang.fee}
                        </Badge>
                      </div>
                    </div>

                    {/* RSVP button */}
                    <Button
                      onClick={() => toggleRsvp(key)}
                      size="sm"
                      className={`w-full h-8 text-xs font-semibold ${
                        isRsvped
                          ? "bg-green-light/20 text-green-deep border border-green-light/30 hover:bg-green-light/30"
                          : "gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep"
                      }`}
                    >
                      {isRsvped ? (
                        <><Check className="w-3 h-3 mr-1" /> RSVP Confirmed</>
                      ) : (
                        <><Calendar className="w-3 h-3 mr-1" /> RSVP</>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: "7", label: "Weekly Sessions", emoji: "📅" },
            { value: "100%", label: "Free for All", emoji: "🆓" },
            { value: `${rsvped.size}`, label: "Your RSVPs", emoji: "✅" },
            { value: "500+", label: "Prasad Plates", emoji: "🍽️" },
          ].map((stat) => (
            <Card key={stat.label} className="card-luxury rounded-xl text-center">
              <CardContent className="p-4">
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="font-display text-xl font-bold text-gold">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Note */}
        <p className="text-center text-xs text-muted-foreground mt-6 italic">
          🙏 All satsang sessions are held at our township temple complex & community hall. Open to residents, visitors, and spiritual seekers of all backgrounds.
        </p>
      </div>
    </section>
  );
}
