"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Check, Sparkles, Calendar, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { NEWSLETTER_SERIES } from "@/lib/types";
import { toast } from "sonner";

const CATEGORY_COLORS: Record<string, string> = {
  Welcome: "bg-gold/15 text-gold border-gold/30",
  Spiritual: "bg-temple-red/15 text-temple-red border-temple-red/30",
  Investment: "bg-green-light/15 text-green-deep border-green-light/30",
  Guide: "bg-indigo-deep/10 text-indigo-deep border-indigo-deep/30",
  NRI: "bg-blue-500/15 text-blue-700 border-blue-500/30",
  Festival: "bg-purple-500/15 text-purple-700 border-purple-500/30",
};

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setSubscribed(true);
    toast.success("🎉 Subscribed! Check your email for a warm Braj welcome.");
  };

  return (
    <section className="py-20 lg:py-28 bg-spiritual-temple relative overflow-hidden">
      {/* Decorative mail/envelope pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-gold text-4xl"
            style={{
              left: `${(i * 13 + 5) % 95}%`,
              top: `${(i * 19 + 8) % 88}%`,
              animation: `float-up ${7 + i % 3}s ease-in-out infinite`,
              animationDelay: `${i * 0.9}s`,
            }}
          >
            ✉️
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Spiritual Content Drip"
          title="Braj Dham"
          highlight="Newsletter Series"
          subtitle="Receive a carefully curated 14-day spiritual journey in your inbox — from Krishna's pastimes to investment guides to festival celebrations. One email every few days, no spam."
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Signup form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="bg-cream/5 backdrop-blur-sm border-gold/25 rounded-2xl">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-5 h-5 text-gold" />
                        <span className="text-xs uppercase tracking-[0.25em] text-gold">Subscribe Free</span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-cream mb-1">
                        Begin Your 14-Day Journey
                      </h3>
                      <p className="text-sm text-cream/60 mb-5">
                        Join 10,000+ devotees receiving Krishna's blessings in their inbox.
                      </p>

                      <div className="space-y-3">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="bg-cream/10 border-gold/25 text-cream placeholder:text-cream/40 h-12 text-center"
                          onKeyDown={(e) => e.key === "Enter" && subscribe()}
                        />
                        <Button
                          onClick={subscribe}
                          className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Start My Spiritual Journey
                        </Button>
                      </div>

                      <div className="mt-5 pt-5 border-t border-gold/15 space-y-2 text-xs text-cream/60">
                        <div className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-green-light" /> 6 emails over 14 days
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-green-light" /> No spam — unsubscribe anytime
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-green-light" /> Exclusive festival content
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-3 h-3 text-green-light" /> Investment tips for NRIs
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="bg-cream/5 backdrop-blur-sm border-gold/25 rounded-2xl">
                    <CardContent className="p-6 sm:p-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-16 h-16 rounded-full bg-green-light/20 flex items-center justify-center mx-auto mb-3"
                      >
                        <Check className="w-8 h-8 text-green-light" />
                      </motion.div>
                      <h3 className="font-display text-xl font-bold text-cream mb-2">
                        🎉 You're Subscribed!
                      </h3>
                      <p className="text-sm text-cream/70 mb-4">
                        Welcome to our spiritual family. <strong className="text-gold">Day 1 email</strong> is on its way to {email}.
                      </p>
                      <div className="p-3 rounded-lg bg-gold/10 border border-gold/20 text-left">
                        <p className="text-xs text-cream/70 italic">
                          📩 Check your inbox (and spam folder, just in case). Add us to your contacts so you don't miss Krishna's blessings.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email series preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-base font-bold text-cream mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold" /> What You'll Receive
            </h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto scroll-luxury pr-1">
              {NEWSLETTER_SERIES.map((email, i) => (
                <motion.div
                  key={email.day}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-3 rounded-xl bg-cream/5 backdrop-blur-sm border border-cream/10 hover:border-gold/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-gold uppercase tracking-wider">Day {email.day}</span>
                        <Badge variant="outline" className={`text-[9px] ${CATEGORY_COLORS[email.category] || "border-gold/30 text-gold"}`}>
                          {email.category}
                        </Badge>
                      </div>
                      <h4 className="font-display text-sm font-bold text-cream leading-snug">{email.subject}</h4>
                      <p className="text-[11px] text-cream/60 mt-0.5 line-clamp-2">{email.preview}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
