"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ArrowLeft, IndianRupee, TrendingUp, PiggyBank, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { navigate } from "@/lib/router";
import { InnerNavbar } from "./inner-navbar";
import { useApp } from "@/lib/store";
import { formatINRFull, ROI_ASSUMPTIONS, PRICE_APPRECIATION_DATA } from "@/lib/types";

export function InvestPage() {
  const { openLeadForm } = useApp();
  const [principal, setPrincipal] = useState(800000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(10);
  const [plotPrice, setPlotPrice] = useState(800000);
  const [constructionSize, setConstructionSize] = useState(1200);
  const [holdYears, setHoldYears] = useState(5);

  // EMI calc
  const emi = useMemo(() => {
    const r = rate / 12 / 100; const n = tenure * 12;
    return r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [principal, rate, tenure]);

  // ROI calc
  const roi = useMemo(() => {
    const constructionCost = constructionSize * ROI_ASSUMPTIONS.constructionCostPerSqft;
    const totalInvestment = plotPrice + constructionCost;
    const futureLandValue = plotPrice * Math.pow(1 + ROI_ASSUMPTIONS.avgAppreciationRate, holdYears);
    const annualRental = ROI_ASSUMPTIONS.pilgrimageSeasonWeeks * ROI_ASSUMPTIONS.weeklyRental;
    const totalReturns = futureLandValue + annualRental * holdYears;
    return { totalInvestment, totalReturns, netProfit: totalReturns - totalInvestment, roiPercent: ((totalReturns - totalInvestment) / totalInvestment) * 100 };
  }, [plotPrice, constructionSize, holdYears]);

  const chartData = [
    { name: "Principal", value: principal, color: "#2D5016" },
    { name: "Interest", value: emi * tenure * 12 - principal, color: "#C5A23E" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <InnerNavbar title="Investment Tools" />

      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-indigo-deep to-[#2d1b3d] flex items-center justify-center">
        <div className="text-center px-4">
          <Badge className="bg-gold/20 text-gold border-0 mb-3">Smart Investment</Badge>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream mb-2">EMI & ROI Calculator</h1>
          <p className="text-sm text-cream/70 max-w-lg mx-auto">Plan your Braj Dham investment with our comprehensive calculators</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* EMI Calculator */}
        <section>
          <h2 className="font-display text-2xl font-bold text-indigo-deep mb-4 flex items-center gap-2"><span className="h-5 w-1 bg-gold rounded-full" /> EMI Calculator</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-luxury rounded-2xl">
              <CardContent className="p-6 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2"><Label className="text-xs">Loan Amount</Label><span className="font-bold text-gold">{formatINRFull(principal)}</span></div>
                  <Slider value={[principal]} onValueChange={(v) => setPrincipal(v[0])} min={100000} max={2000000} step={50000} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2"><Label className="text-xs">Interest Rate</Label><span className="font-bold text-gold">{rate}% p.a.</span></div>
                  <Slider value={[rate]} onValueChange={(v) => setRate(v[0])} min={6} max={14} step={0.1} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2"><Label className="text-xs">Tenure</Label><span className="font-bold text-gold">{tenure} years</span></div>
                  <Slider value={[tenure]} onValueChange={(v) => setTenure(v[0])} min={1} max={20} step={1} />
                </div>
                <div className="pt-3 border-t border-gold/15">
                  <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Monthly EMI</span><span className="font-display text-2xl font-bold text-gold-gradient">{formatINRFull(Math.round(emi))}</span></div>
                </div>
                <Button onClick={() => openLeadForm()} className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">Apply for Financing</Button>
              </CardContent>
            </Card>
            <Card className="card-luxury-dark rounded-2xl bg-spiritual-temple">
              <CardContent className="p-6">
                <h3 className="font-display text-base font-bold text-cream mb-4">Payment Breakdown</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value">
                      {chartData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatINRFull(v)} contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(197,162,62,0.3)", borderRadius: "8px", color: "#FFF8E7" }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ROI Calculator */}
        <section>
          <h2 className="font-display text-2xl font-bold text-indigo-deep mb-4 flex items-center gap-2"><span className="h-5 w-1 bg-gold rounded-full" /> ROI Projection ({holdYears} Years)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-luxury rounded-2xl">
              <CardContent className="p-6 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2"><Label className="text-xs">Plot Price</Label><span className="font-bold text-gold">{formatINRFull(plotPrice)}</span></div>
                  <Slider value={[plotPrice]} onValueChange={(v) => setPlotPrice(v[0])} min={100000} max={2000000} step={50000} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2"><Label className="text-xs">Construction (sq.ft)</Label><span className="font-bold text-gold">{constructionSize} sq.ft</span></div>
                  <Slider value={[constructionSize]} onValueChange={(v) => setConstructionSize(v[0])} min={500} max={3000} step={100} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2"><Label className="text-xs">Hold Period</Label><span className="font-bold text-gold">{holdYears} years</span></div>
                  <Slider value={[holdYears]} onValueChange={(v) => setHoldYears(v[0])} min={1} max={10} step={1} />
                </div>
              </CardContent>
            </Card>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Card className="card-luxury-dark rounded-xl bg-spiritual-temple"><CardContent className="p-4 text-center"><PiggyBank className="w-5 h-5 text-gold mx-auto mb-1" /><div className="font-display text-lg font-bold text-gold">{formatINRFull(roi.totalReturns)}</div><div className="text-[10px] text-cream/60">Total Returns</div></CardContent></Card>
                <Card className="card-luxury-dark rounded-xl bg-spiritual-temple"><CardContent className="p-4 text-center"><TrendingUp className="w-5 h-5 text-green-light mx-auto mb-1" /><div className="font-display text-lg font-bold text-green-light">{formatINRFull(roi.netProfit)}</div><div className="text-[10px] text-cream/60">Net Profit</div></CardContent></Card>
                <Card className="card-luxury-dark rounded-xl bg-spiritual-temple"><CardContent className="p-4 text-center"><Sparkles className="w-5 h-5 text-gold mx-auto mb-1" /><div className="font-display text-lg font-bold text-gold">{roi.roiPercent.toFixed(0)}%</div><div className="text-[10px] text-cream/60">Total ROI</div></CardContent></Card>
                <Card className="card-luxury-dark rounded-xl bg-spiritual-temple"><CardContent className="p-4 text-center"><Calendar className="w-5 h-5 text-cream mx-auto mb-1" /><div className="font-display text-lg font-bold text-cream">{(roi.roiPercent / holdYears).toFixed(1)}%</div><div className="text-[10px] text-cream/60">Annual Avg</div></CardContent></Card>
              </div>
              <Card className="card-luxury rounded-xl"><CardContent className="p-4">
                <div className="flex items-center justify-between text-sm mb-2"><span className="text-muted-foreground">Total Investment</span><span className="font-bold text-indigo-deep">{formatINRFull(roi.totalInvestment)}</span></div>
                <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Future Value ({holdYears}y)</span><span className="font-bold text-gold">{formatINRFull(roi.totalReturns)}</span></div>
                <Button onClick={() => openLeadForm()} className="w-full mt-3 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">Get Detailed Report <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </CardContent></Card>
            </div>
          </div>
        </section>

        {/* Price appreciation chart */}
        <section>
          <h2 className="font-display text-2xl font-bold text-indigo-deep mb-4 flex items-center gap-2"><span className="h-5 w-1 bg-gold rounded-full" /> Price Appreciation (2021-2027)</h2>
          <Card className="card-luxury-dark rounded-2xl bg-spiritual-temple">
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={PRICE_APPRECIATION_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(197,162,62,0.1)" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: "rgba(255,248,231,0.6)" }} />
                  <YAxis tick={{ fontSize: 11, fill: "rgba(255,248,231,0.6)" }} />
                  <Tooltip contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(197,162,62,0.4)", borderRadius: "8px", color: "#FFF8E7" }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="vrindavan" name="Vrindavan" fill="#C5A23E" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mathura" name="Mathura" fill="#8B2500" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="govardhan" name="Govardhan" fill="#4A7A2E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
