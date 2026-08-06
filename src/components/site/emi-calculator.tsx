"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IndianRupee, Calendar, Percent, TrendingUp, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import { formatINRFull } from "@/lib/types";

export function EmiCalculator() {
  const { openLeadForm } = useApp();
  const [principal, setPrincipal] = useState(800000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(10);

  const { emi, totalAmount, totalInterest, principalPercent, interestPercent } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const e = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = e * n;
    const interest = total - principal;
    return {
      emi: Math.round(e),
      totalAmount: Math.round(total),
      totalInterest: Math.round(interest),
      principalPercent: Math.round((principal / total) * 100),
      interestPercent: Math.round((interest / total) * 100),
    };
  }, [principal, rate, tenure]);

  const chartData = [
    { name: "Principal", value: principal, color: "#2D5016" },
    { name: "Interest", value: totalInterest, color: "#C5A23E" },
  ];

  return (
    <section id="invest" className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Smart Investment"
          title="Plan Your"
          highlight="Sacred Investment"
          subtitle="Calculate your monthly EMI and total investment in seconds. Flexible payment options available for all Braj Dham townships."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Calculator inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="card-luxury rounded-2xl h-full">
              <CardContent className="p-6 sm:p-8 space-y-7">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-indigo-deep flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-gold" /> Loan Amount
                    </label>
                    <span className="font-display text-xl font-bold text-gold">{formatINRFull(principal)}</span>
                  </div>
                  <Slider
                    value={[principal]}
                    onValueChange={(v) => setPrincipal(v[0])}
                    min={100000}
                    max={2000000}
                    step={50000}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                    <span>₹1 L</span>
                    <span>₹20 L</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-indigo-deep flex items-center gap-2">
                      <Percent className="w-4 h-4 text-gold" /> Interest Rate
                    </label>
                    <span className="font-display text-xl font-bold text-gold">{rate}% p.a.</span>
                  </div>
                  <Slider value={[rate]} onValueChange={(v) => setRate(v[0])} min={6} max={14} step={0.1} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                    <span>6%</span>
                    <span>14%</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-indigo-deep flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold" /> Tenure
                    </label>
                    <span className="font-display text-xl font-bold text-gold">{tenure} years</span>
                  </div>
                  <Slider value={[tenure]} onValueChange={(v) => setTenure(v[0])} min={1} max={20} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                    <span>1 yr</span>
                    <span>20 yrs</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gold/15">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Monthly EMI</span>
                    <span className="font-display text-3xl font-bold text-gold-gradient">{formatINRFull(emi)}</span>
                  </div>
                </div>

                <Button
                  onClick={() => openLeadForm()}
                  className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12"
                >
                  Apply for Financing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results + chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Card className="card-luxury-dark rounded-2xl h-full bg-spiritual-temple">
              <CardContent className="p-6 sm:p-8 h-full flex flex-col">
                <h3 className="font-display text-lg font-bold text-cream mb-1">Payment Breakdown</h3>
                <p className="text-xs text-cream/60 mb-6">Principal vs Interest over {tenure} years</p>

                <div className="flex-1 flex items-center justify-center min-h-[200px]">
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={95}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {chartData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number) => formatINRFull(v)}
                        contentStyle={{
                          background: "rgba(26,26,46,0.95)",
                          border: "1px solid rgba(197,162,62,0.3)",
                          borderRadius: "8px",
                          color: "#FFF8E7",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-cream/5">
                    <span className="flex items-center gap-2 text-sm text-cream/80">
                      <span className="w-3 h-3 rounded-full bg-green-light" /> Principal
                    </span>
                    <span className="font-mono text-cream font-semibold">{formatINRFull(principal)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-cream/5">
                    <span className="flex items-center gap-2 text-sm text-cream/80">
                      <span className="w-3 h-3 rounded-full bg-gold" /> Total Interest
                    </span>
                    <span className="font-mono text-cream font-semibold">{formatINRFull(totalInterest)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gold/15 border border-gold/30">
                    <span className="flex items-center gap-2 text-sm text-cream font-medium">
                      <TrendingUp className="w-4 h-4 text-gold" /> Total Payable
                    </span>
                    <span className="font-mono text-gold font-bold text-lg">{formatINRFull(totalAmount)}</span>
                  </div>
                </div>

                <p className="text-[11px] text-cream/50 mt-4 leading-relaxed">
                  * EMI calculation is indicative. Actual rates depend on your bank, credit profile, and loan terms. BrajProperty partners with leading banks for preferential rates.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
