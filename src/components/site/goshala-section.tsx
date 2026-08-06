"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Check, Sparkles, MapPin } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { GOSHALA_COWS, GOSHALA_STATS } from "@/lib/types";
import { toast } from "sonner";
import { formatINRFull } from "@/lib/types";

export function GoshalaSection() {
  const [sponsored, setSponsored] = useState<Set<string>>(new Set());

  const toggleSponsor = (id: string) => {
    const newSet = new Set(sponsored);
    if (newSet.has(id)) {
      newSet.delete(id);
      toast.info("Sponsorship removed");
    } else {
      newSet.add(id);
      const cow = GOSHALA_COWS.find((c) => c.id === id);
      toast.success(`🐄 You're now sponsoring ${cow?.name}! Krishna's blessings for your go-seva 🙏`);
    }
    setSponsored(newSet);
  };

  return (
    <section className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      {/* Decorative cows */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="absolute text-7xl" style={{ left: `${(i * 17 + 5) % 95}%`, top: `${(i * 23 + 8) % 88}%` }}>🐄</div>
        ))}
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Go Seva · Sacred Cow Protection"
          title="Our"
          highlight="Goshala"
          subtitle="In Braj, the cow (Go Mata) is sacred — Krishna Himself was a cowherd. Our goshala protects 47 rescued cows. Sponsor a cow's care and receive her milk prasad, or simply visit during your site visit."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {GOSHALA_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="card-luxury rounded-xl text-center">
                <CardContent className="p-4">
                  <div className="text-2xl mb-1">{stat.emoji}</div>
                  <div className="font-display text-xl font-bold text-gold">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Cow cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GOSHALA_COWS.map((cow, i) => {
            const isSponsored = sponsored.has(cow.id) || cow.sponsored;
            return (
              <motion.div
                key={cow.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={`card-luxury rounded-2xl h-full flex flex-col transition-all ${isSponsored ? "ring-gold-glow" : ""}`}>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    {/* Cow avatar */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-green-light/10 flex items-center justify-center text-3xl border-2 border-gold/20">
                          {cow.emoji}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-indigo-deep">{cow.name}</h3>
                          <span className="font-devanagari text-xs text-gold">{cow.sanskrit}</span>
                        </div>
                      </div>
                      {isSponsored && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-2 py-1 rounded-full bg-temple-red/10 text-temple-red text-[10px] font-bold flex items-center gap-1"
                        >
                          <Heart className="w-2.5 h-2.5 fill-current" /> Sponsored
                        </motion.div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div><span className="text-muted-foreground">Breed: </span><span className="font-medium text-indigo-deep">{cow.breed}</span></div>
                      <div><span className="text-muted-foreground">Age: </span><span className="font-medium text-indigo-deep">{cow.age}</span></div>
                      <div className="col-span-2"><span className="text-muted-foreground">Temperament: </span><span className="font-medium text-indigo-deep">{cow.temperament}</span></div>
                    </div>

                    {/* Story */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1 italic">
                      &ldquo;{cow.story}&rdquo;
                    </p>

                    {/* Sponsorship */}
                    <div className="pt-3 border-t border-gold/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Monthly Sponsorship</span>
                        <span className="font-display text-lg font-bold text-gold">{formatINRFull(cow.sponsorshipPerMonth)}</span>
                      </div>
                      <Button
                        onClick={() => toggleSponsor(cow.id)}
                        disabled={cow.sponsored && !sponsored.has(cow.id)}
                        size="sm"
                        className={`w-full h-8 text-xs font-semibold ${
                          isSponsored
                            ? "bg-temple-red/10 text-temple-red border border-temple-red/30 hover:bg-temple-red/20"
                            : "gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep"
                        } disabled:opacity-60`}
                      >
                        {cow.sponsored && !sponsored.has(cow.id) ? (
                          <><Check className="w-3 h-3 mr-1" /> Already Sponsored</>
                        ) : isSponsored ? (
                          <><Heart className="w-3 h-3 mr-1 fill-current" /> Sponsoring — Remove</>
                        ) : (
                          <><Heart className="w-3 h-3 mr-1" /> Sponsor {cow.name}</>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Card className="card-luxury rounded-xl">
            <CardContent className="p-4 flex items-center gap-3">
              <span className="text-2xl">🥛</span>
              <div>
                <h4 className="font-display text-sm font-bold text-indigo-deep">Milk Prasad</h4>
                <p className="text-[11px] text-muted-foreground">Sponsors receive monthly milk prasad from their cow</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-luxury rounded-xl">
            <CardContent className="p-4 flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <h4 className="font-display text-sm font-bold text-indigo-deep">Visit Your Cow</h4>
                <p className="text-[11px] text-muted-foreground">Sponsors can visit & feed their cow at the goshala</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-luxury rounded-xl">
            <CardContent className="p-4 flex items-center gap-3">
              <span className="text-2xl">📜</span>
              <div>
                <h4 className="font-display text-sm font-bold text-indigo-deep">Tax Benefit</h4>
                <p className="text-[11px] text-muted-foreground">80G tax exemption certificate provided</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-6 italic">
          🐄 Krishna says: "Among cows I am the wish-fulfilling cow (Kamadhenu)." — Bhagavad Gita 10.28. Go-seva is among the highest forms of devotional service.
        </p>
      </div>
    </section>
  );
}
