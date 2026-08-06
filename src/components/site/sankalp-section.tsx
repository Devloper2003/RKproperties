"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Check, Heart, Flame, X } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import { SANKALP_TYPES } from "@/lib/types";
import { toast } from "sonner";

export function SankalpSection() {
  const { openLeadForm } = useApp();
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [sankalpText, setSankalpText] = useState("");
  const [committed, setCommitted] = useState(false);

  const commit = () => {
    if (!selected || !name) {
      toast.error("Please select a Sankalp and enter your name");
      return;
    }
    setCommitted(true);
    toast.success("🙏 Your Sankalp has been offered to the Divine. May Krishna bless your spiritual journey!");
  };

  const reset = () => {
    setCommitted(false);
    setSelected(null);
    setName("");
    setSankalpText("");
  };

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      {/* Decorative flame/diya */}
      <div className="absolute top-10 left-10 text-5xl opacity-10 diya-flicker">🪔</div>
      <div className="absolute bottom-10 right-10 text-5xl opacity-10 diya-flicker" style={{ animationDelay: "1s" }}>🪔</div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Spiritual Commitment"
          title="Make Your"
          highlight="Sacred Sankalp"
          subtitle="A Sankalp is a heartfelt spiritual resolution offered to the Divine. When you book your plot in Braj Dham, seal your commitment with a personal sankalp — a promise to Krishna that will guide your spiritual journey in your new home."
        />

        <AnimatePresence mode="wait">
          {!committed ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Sankalp type selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {SANKALP_TYPES.map((s, i) => (
                  <motion.button
                    key={s.id}
                    onClick={() => setSelected(s.id)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      selected === s.id
                        ? "border-gold bg-gold/5 ring-gold-glow"
                        : "border-gold/15 bg-white hover:border-gold/30"
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-2xl">{s.emoji}</span>
                      <div className="flex-1">
                        <h3 className="font-display text-sm font-bold text-indigo-deep">{s.title}</h3>
                        <span className="font-devanagari text-xs text-gold">{s.sanskrit}</span>
                      </div>
                      {selected === s.id && <Check className="w-4 h-4 text-gold flex-shrink-0" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{s.desc}</p>
                  </motion.button>
                ))}
              </div>

              {/* Personal details */}
              <Card className="card-luxury rounded-2xl">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-xs text-indigo-deep flex items-center gap-1">
                        <Heart className="w-3 h-3 text-gold" /> Your Name (Devotee)
                      </Label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Gopal Das"
                        className="bg-white border-gold/25 mt-1 h-10"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-indigo-deep">Gotra (optional)</Label>
                      <Input
                        placeholder="e.g., Kashyapa"
                        className="bg-white border-gold/25 mt-1 h-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-indigo-deep flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-gold" /> Your Sankalp Resolution (in your words)
                    </Label>
                    <Textarea
                      value={sankalpText}
                      onChange={(e) => setSankalpText(e.target.value)}
                      placeholder="e.g., I, Gopal Das, resolve to perform Govardhan Parikrama every Purnima and serve the sacred cows at our goshala with devotion. May Krishna bless my spiritual home in Braj Dham."
                      className="bg-white border-gold/25 mt-1 min-h-[100px]"
                    />
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-gold/10 border border-gold/20">
                    <p className="text-xs text-indigo-deep/70 italic">
                      📜 Your Sankalp will be inscribed on a copper plate and placed at our township temple. A digital copy will be sent to you and stored in your resident portal.
                    </p>
                  </div>

                  <Button
                    onClick={commit}
                    disabled={!selected || !name}
                    className="w-full mt-4 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12 disabled:opacity-50"
                  >
                    <Flame className="w-4 h-4 mr-2" />
                    Offer My Sankalp to Krishna
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="committed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-md mx-auto"
            >
              <Card className="card-luxury-dark rounded-2xl bg-spiritual-temple overflow-hidden">
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-6xl mb-4"
                  >
                    🪔
                  </motion.div>
                  <Badge className="bg-gold/20 text-gold border-0 mb-3">Sankalp Accepted</Badge>
                  <h3 className="font-display text-2xl font-bold text-cream mb-2">
                    🙏 Your Sankalp is Offered
                  </h3>
                  <p className="text-sm text-cream/70 mb-4">
                    {name}, your resolution has been received with devotion.
                  </p>
                  <div className="p-4 rounded-lg bg-cream/5 border border-gold/20 text-left mb-4">
                    <div className="text-[10px] uppercase tracking-wider text-gold mb-1">Your Sankalp</div>
                    <p className="text-xs text-cream/90 italic leading-relaxed">
                      {sankalpText || SANKALP_TYPES.find((s) => s.id === selected)?.desc}
                    </p>
                  </div>
                  <p className="text-[11px] text-cream/50 mb-5">
                    Sankalp ID: SKP-{Date.now().toString().slice(-6)}<br />
                    Will be inscribed on copper plate at township temple
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() => openLeadForm()}
                      className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"
                    >
                      Continue to Booking
                    </Button>
                    <Button
                      onClick={reset}
                      variant="outline"
                      className="border-cream/30 text-cream hover:bg-cream/10"
                    >
                      <X className="w-4 h-4 mr-1" /> Reset
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
