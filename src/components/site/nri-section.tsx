"use client";

import { motion } from "framer-motion";
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Globe, ShieldCheck, Plane, FileCheck, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import { PRICE_APPRECIATION_DATA, NRI_STATS } from "@/lib/types";

const NRI_FEATURES = [
  { icon: Globe, title: "Global Access", desc: "Virtual site visits via video call. Complete documentation digital — buy from anywhere in the world." },
  { icon: ShieldCheck, title: "FEMA Compliant", desc: "NRI property purchases on Indian soil are permitted under FEMA without RBI approval for residential plots." },
  { icon: Plane, title: "Free Repatriation", desc: "Sale proceeds of up to 2 residential properties can be freely repatriated abroad, subject to FEMA limits." },
  { icon: FileCheck, title: "Power of Attorney", desc: "Complete the entire purchase via PoA — no need to travel. Our legal team handles end-to-end documentation." },
];

export function NriSection() {
  const { openLeadForm } = useApp();

  return (
    <section id="nri" className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute -right-40 top-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="NRI Investment"
          title="Braj Dham for"
          highlight="Global Devotees"
          subtitle="A complete investment ecosystem for Non-Resident Indians seeking a spiritual home in India — fully FEMA-compliant, digitally managed, and appreciating at 22% annually."
        />

        {/* NRI Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12"
        >
          {NRI_STATS.map((stat, i) => (
            <Card key={stat.label} className="card-luxury rounded-xl text-center">
              <CardContent className="p-4">
                <div className="font-display text-2xl sm:text-3xl font-bold text-shimmer-gold">
                  {stat.value}
                </div>
                <div className="text-xs text-indigo-deep font-medium mt-1">{stat.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{stat.sub}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Price appreciation chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="card-luxury-dark rounded-2xl h-full bg-spiritual-temple">
              <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display text-lg font-bold text-cream">Price Appreciation</h3>
                  <Badge className="bg-green-light/20 text-green-light border-0">
                    <TrendingUp className="w-3 h-3 mr-1" /> +158% in 5 yrs
                  </Badge>
                </div>
                <p className="text-xs text-cream/60 mb-5">
                  Indexed growth (2021 = 100) · Historical + projected
                </p>

                <div className="flex-1 min-h-[260px]">
                  <ResponsiveContainer width="100%" height={280}>
                    <ComposedChart data={PRICE_APPRECIATION_DATA}>
                      <defs>
                        <linearGradient id="brajGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C5A23E" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#C5A23E" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(197,162,62,0.1)" />
                      <XAxis dataKey="year" tick={{ fontSize: 11, fill: "rgba(255,248,231,0.6)" }} />
                      <YAxis tick={{ fontSize: 11, fill: "rgba(255,248,231,0.6)" }} />
                      <Tooltip
                        contentStyle={{
                          background: "#1a1a2e",
                          border: "1px solid rgba(197,162,62,0.4)",
                          borderRadius: "8px",
                          color: "#FFF8E7",
                        }}
                        formatter={(v: number) => `${v} (base 100)`}
                      />
                      <Legend wrapperStyle={{ fontSize: 11, color: "#FFF8E7" }} />
                      <Area type="monotone" dataKey="braj" name="Braj Avg" stroke="#C5A23E" fill="url(#brajGrad)" strokeWidth={2.5} />
                      <Line type="monotone" dataKey="vrindavan" name="Vrindavan" stroke="#4A7A2E" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="mathura" name="Mathura" stroke="#8B2500" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="govardhan" name="Govardhan" stroke="#D4C5A0" strokeWidth={2} dot={false} strokeDasharray="4 2" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-gold/10 border border-gold/20">
                  <p className="text-xs text-cream/80 leading-relaxed">
                    <span className="text-gold font-semibold">📈 Projected 2027:</span> Vrindavan premium plots
                    expected to reach 3.48× of 2021 baseline — outperforming Mathura & Govardhan on absolute appreciation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* NRI features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="card-luxury rounded-2xl h-full">
              <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                <h3 className="font-display text-lg font-bold text-indigo-deep mb-1 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-gold" /> Built for Global Investors
                </h3>
                <p className="text-xs text-muted-foreground mb-5">
                  Everything an NRI needs to invest with confidence.
                </p>

                <div className="space-y-4 flex-1">
                  {NRI_FEATURES.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <f.icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-indigo-deep">{f.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gold/15 grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-lg bg-marble">
                    <div className="font-display text-xl font-bold text-gold">2.5 hrs</div>
                    <div className="text-[11px] text-muted-foreground">Delhi to Mathura</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-marble">
                    <div className="font-display text-xl font-bold text-gold">Jewar Airport</div>
                    <div className="text-[11px] text-muted-foreground">45 min (opening 2026)</div>
                  </div>
                </div>

                <Button
                  onClick={() => openLeadForm()}
                  className="w-full mt-5 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12"
                >
                  Talk to NRI Specialist
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
