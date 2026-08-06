"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Users, Award, Share2, Copy, Check, Sparkles, Heart } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { REFERRAL_TIERS } from "@/lib/types";
import { toast } from "sonner";

const STEPS = [
  { icon: Share2, title: "Share Your Code", desc: "Get a unique referral code. Share with friends, family, spiritual community." },
  { icon: Users, title: "They Book a Plot", desc: "Your referral books any BrajProperty plot using your code at checkout." },
  { icon: Gift, title: "You Both Earn", desc: "They get ₹5,000 off. You earn rewards based on your tier — up to ₹1 lakh." },
];

export function ReferralProgram() {
  const [code, setCode] = useState("BRJ-GOPAL-2026");
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");

  const generateCode = () => {
    if (!name) {
      toast.error("Please enter your name first");
      return;
    }
    const slug = name.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8);
    const num = Math.floor(1000 + Math.random() * 9000);
    setCode(`BRJ-${slug || "DEVOTEE"}-${num}`);
    toast.success("🎉 Your referral code is ready!");
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Referral code copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Please copy manually: " + code);
    }
  };

  return (
    <section id="referral" className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      {/* Decorative gift pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #c5a23e 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Resident Rewards"
          title="BrajProperty"
          highlight="Referral Program"
          subtitle="Share the blessing of a spiritual home. When your referrals book a plot, you both earn — up to ₹1 lakh per referral cycle. The more you share, the higher your tier."
        />

        {/* How it works */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <Card className="card-luxury rounded-2xl h-full relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-gold/5" />
                  <div className="absolute -top-3 -right-3 w-16 h-16 flex items-center justify-center text-3xl font-display font-bold text-gold/20">
                    {i + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                    <step.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-base font-bold text-indigo-deep mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Tier cards */}
          <div>
            <h3 className="font-display text-lg font-bold text-indigo-deep mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" /> Reward Tiers
            </h3>
            <div className="space-y-3">
              {REFERRAL_TIERS.map((tier, i) => (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`rounded-xl overflow-hidden border-gold/20 bg-gradient-to-r ${tier.color}`}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-cream/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border-2 border-gold/30">
                        <span className="font-display text-sm font-bold text-indigo-deep">{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-devanagari text-xs text-gold">{tier.tier === "Sevak" ? "सेवक" : tier.tier === "Bhakta" ? "भक्त" : tier.tier === "Priya" ? "प्रिय" : "परिजन"}</span>
                          <h4 className="font-display text-base font-bold text-indigo-deep">{tier.tier}</h4>
                          <span className="text-[10px] text-muted-foreground">({tier.referrals} referrals)</span>
                        </div>
                        <p className="text-xs text-indigo-deep/70">{tier.perk}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Reward</div>
                        <div className="font-display text-base font-bold text-gold">{tier.reward}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Generate code */}
          <div>
            <Card className="card-luxury-dark rounded-2xl bg-spiritual-temple">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-5 h-5 text-gold" />
                  <span className="text-xs uppercase tracking-[0.25em] text-gold">Get Your Code</span>
                </div>
                <h3 className="font-display text-xl font-bold text-cream mb-1">
                  Start Earning Today
                </h3>
                <p className="text-sm text-cream/60 mb-5">
                  Generate your unique referral code and share the gift of a spiritual home.
                </p>

                <div className="space-y-3 mb-5">
                  <div>
                    <Label className="text-xs text-cream/80">Your Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Gopal Das"
                      className="bg-cream/10 border-gold/25 text-cream placeholder:text-cream/40 mt-1 h-10"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-cream/80">Your Referral Code</Label>
                    <div className="flex gap-2 mt-1">
                      <div className="flex-1 px-3 h-10 rounded-md bg-cream/10 border border-gold/25 flex items-center font-mono text-gold font-bold tracking-wider">
                        {code}
                      </div>
                      <Button
                        onClick={copyCode}
                        size="icon"
                        className="bg-gold text-indigo-deep hover:bg-gold-dark h-10 w-10 flex-shrink-0"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={generateCode}
                  className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11 mb-3"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate My Code
                </Button>

                {/* Share row */}
                <div className="pt-4 border-t border-gold/15">
                  <div className="text-[11px] text-cream/60 mb-2 text-center">Share via</div>
                  <div className="flex justify-center gap-2">
                    <a
                      href={`https://wa.me/?text=Namaste! 🙏 I found my spiritual home at BrajProperty.in. Use my referral code ${code} for ₹5,000 off your plot in Braj Dham. Explore: https://brajproperty.in`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 flex items-center justify-center text-[#25D366] transition-colors"
                      aria-label="Share on WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=https://brajproperty.in&quote=Found my spiritual home at BrajProperty.in! Use code ${code} for ₹5000 off.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-blue-500/20 hover:bg-blue-500/30 flex items-center justify-center text-blue-400 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073"/></svg>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=Found my spiritual home at BrajProperty.in! Use my code ${code} for ₹5000 off plots in Braj Dham. 🙏✨&url=https://brajproperty.in`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-sky-500/20 hover:bg-sky-500/30 flex items-center justify-center text-sky-400 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-gold/10 border border-gold/20 flex items-start gap-2">
                  <Heart className="w-3.5 h-3.5 text-temple-red flex-shrink-0 mt-0.5 fill-temple-red" />
                  <p className="text-[11px] text-cream/70 leading-relaxed">
                    <strong className="text-gold">Referee gets ₹5,000 off</strong> their plot booking when they use your code. You earn rewards per tier. Win-win.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
