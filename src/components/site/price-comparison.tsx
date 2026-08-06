"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Check, X, TrendingUp, ShieldCheck, Building2, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { COMPETITORS } from "@/lib/types";

const DIMENSIONS = [
  { key: "type", label: "Type", icon: "🏷️" },
  { key: "avgPrice", label: "Avg Price", icon: "💰" },
  { key: "legalClarity", label: "Legal Clarity", icon: "📜" },
  { key: "amenities", label: "Amenities", icon: "✨" },
  { key: "spiritual", label: "Spiritual", icon: "🛕" },
  { key: "trustScore", label: "Trust Score", icon: "⭐" },
];

export function PriceComparison() {
  const [highlight, setHighlight] = useState<string | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Honest Comparison"
          title="How We"
          highlight="Compare to Others"
          subtitle="The Braj real estate market has many players — but only one combines divine location, legal security, and lifestyle luxury. See for yourself why BrajProperty.in stands apart."
        />

        {/* Trust score bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <Card className="card-luxury rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-display text-base font-bold text-indigo-deep mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gold" /> Trust Score Comparison (out of 100)
              </h3>
              <div className="space-y-3">
                {COMPETITORS.map((c, i) => {
                  const isUs = c.name === "BrajProperty.in";
                  return (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-32 sm:w-40 text-sm font-medium flex-shrink-0 ${isUs ? "text-gold font-bold" : "text-indigo-deep"}`}>
                        {c.name}
                        {isUs && <span className="ml-1">🏆</span>}
                      </div>
                      <div className="flex-1 h-7 rounded-full bg-marble overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${c.trustScore}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          className={`h-full flex items-center justify-end pr-2 ${
                            isUs
                              ? "bg-gradient-to-r from-gold-light via-gold to-gold-dark"
                              : c.trustScore >= 60
                              ? "bg-green-light/60"
                              : "bg-temple-red/50"
                          }`}
                        >
                          <span className="text-[10px] font-bold text-indigo-deep">{c.trustScore}</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="card-luxury rounded-2xl overflow-hidden">
            <div className="overflow-x-auto scroll-luxury">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-marble">
                    <th className="sticky left-0 bg-marble z-10 px-4 py-3 text-left text-xs font-medium text-muted-foreground min-w-[120px]">
                      Dimension
                    </th>
                    {COMPETITORS.map((c) => {
                      const isUs = c.name === "BrajProperty.in";
                      return (
                        <th
                          key={c.name}
                          className={`px-4 py-3 text-left min-w-[160px] ${isUs ? "bg-gold/10" : ""}`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className={`font-display text-sm font-bold ${isUs ? "text-gold" : "text-indigo-deep"}`}>
                              {c.name}
                            </span>
                            {isUs && <Trophy className="w-3.5 h-3.5 text-gold" />}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {DIMENSIONS.map((dim, rowIdx) => (
                    <tr
                      key={dim.key}
                      className={rowIdx % 2 === 0 ? "bg-cream" : "bg-marble/40"}
                      onMouseEnter={() => setHighlight(dim.key)}
                      onMouseLeave={() => setHighlight(null)}
                    >
                      <td className={`sticky left-0 z-10 px-4 py-3 bg-inherit ${highlight === dim.key ? "compare-row-highlight" : ""}`}>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-deep">
                          <span>{dim.icon}</span>
                          {dim.label}
                        </div>
                      </td>
                      {COMPETITORS.map((c) => {
                        const value = (c as any)[dim.key];
                        const isUs = c.name === "BrajProperty.in";
                        const isGood = isUs || (dim.key === "trustScore" && c.trustScore >= 65);
                        const isBad = !isUs && (dim.key === "legalClarity" && c.legalClarity.includes("Poor"));
                        return (
                          <td key={c.name} className={`px-4 py-3 align-top ${isUs ? "bg-gold/5" : ""} ${highlight === dim.key ? "compare-row-highlight" : ""}`}>
                            {dim.key === "trustScore" ? (
                              <div className="flex items-center gap-1.5">
                                <span className={`font-bold ${isUs ? "text-gold" : "text-indigo-deep"}`}>{value}/100</span>
                                {isUs && <Trophy className="w-3 h-3 text-gold" />}
                              </div>
                            ) : (
                              <div className="flex items-start gap-1">
                                <span className={`text-xs ${isGood ? "text-green-deep" : isBad ? "text-temple-red" : "text-indigo-deep/80"}`}>
                                  {value}
                                </span>
                                {isGood && <Check className="w-3 h-3 text-green-deep flex-shrink-0 mt-0.5" />}
                                {isBad && <X className="w-3 h-3 text-temple-red flex-shrink-0 mt-0.5" />}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {/* Our advantage row */}
                  <tr>
                    <td className="sticky left-0 z-10 bg-cream px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-deep">
                        <Sparkles className="w-3 h-3 text-gold" /> Our Edge
                      </div>
                    </td>
                    {COMPETITORS.map((c) => {
                      const isUs = c.name === "BrajProperty.in";
                      return (
                        <td key={c.name} className={`px-4 py-3 ${isUs ? "bg-gold/10" : ""}`}>
                          {isUs ? (
                            <Badge className="bg-gold/20 text-gold border-0 text-[10px]">
                              ✨ The Gold Standard
                            </Badge>
                          ) : (
                            <span className="text-[11px] text-muted-foreground italic">{c.ourAdvantage}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Bottom summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            { icon: ShieldCheck, title: "100% Legal Security", desc: "Only developer with both MVDA + RERA on every project", color: "text-green-deep" },
            { icon: Building2, title: "Temple Architecture", desc: "Only developer with Banke Bihari / ISKCON inspired gates", color: "text-gold" },
            { icon: Trophy, title: "95% Trust Score", desc: "Highest in the Braj region — verified by 500+ families", color: "text-temple-red" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="card-luxury rounded-xl text-center">
                <CardContent className="p-5">
                  <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-2`} />
                  <h4 className="font-display text-sm font-bold text-indigo-deep mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
