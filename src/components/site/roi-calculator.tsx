"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { IndianRupee, TrendingUp, Home, Calendar, PiggyBank, ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import { formatINRFull, ROI_ASSUMPTIONS } from "@/lib/types";

export function RoiCalculator() {
  const { openLeadForm } = useApp();
  const [plotPrice, setPlotPrice] = useState(800000);
  const [plotSize, setPlotSize] = useState(150); // sq.yd
  const [constructionSize, setConstructionSize] = useState(1200); // sq.ft
  const [holdYears, setHoldYears] = useState(5);

  const roi = useMemo(() => {
    const constructionCost = constructionSize * ROI_ASSUMPTIONS.constructionCostPerSqft;
    const gstOnConstruction = constructionCost * ROI_ASSUMPTIONS.gstOnConstruction;
    const totalInvestment = plotPrice + constructionCost + gstOnConstruction;

    // Appreciation on land only (land appreciates, construction depreciates)
    const futureLandValue = plotPrice * Math.pow(1 + ROI_ASSUMPTIONS.avgAppreciationRate, holdYears);
    // Construction depreciates ~2% annually
    const futureConstructionValue = constructionCost * Math.pow(1 - 0.02, holdYears);
    const futureValue = futureLandValue + futureConstructionValue;

    // Rental income (pilgrimage season)
    const annualRental = ROI_ASSUMPTIONS.pilgrimageSeasonWeeks * ROI_ASSUMPTIONS.weeklyRental;
    const totalRental = annualRental * holdYears;

    const totalReturns = futureValue + totalRental;
    const netProfit = totalReturns - totalInvestment;
    const roiPercent = (netProfit / totalInvestment) * 100;
    const cagr = (Math.pow(totalReturns / totalInvestment, 1 / holdYears) - 1) * 100;

    // Year-by-year projection
    const yearly = Array.from({ length: holdYears + 1 }).map((_, year) => {
      const land = plotPrice * Math.pow(1 + ROI_ASSUMPTIONS.avgAppreciationRate, year);
      const bldg = constructionCost * Math.pow(1 - 0.02, year);
      const rental = annualRental * year;
      return {
        year: `Yr ${year}`,
        landValue: Math.round(land),
        totalValue: Math.round(land + bldg + rental),
        invested: totalInvestment,
      };
    });

    return {
      plotPrice,
      constructionCost,
      gstOnConstruction,
      totalInvestment,
      futureLandValue,
      futureConstructionValue,
      futureValue,
      annualRental,
      totalRental,
      totalReturns,
      netProfit,
      roiPercent,
      cagr,
      yearly,
    };
  }, [plotPrice, plotSize, constructionSize, holdYears]);

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Smart Investment"
          title="Project Your"
          highlight="5-Year Returns"
          subtitle="See exactly how your Braj Dham investment grows over time. Factor in land appreciation, construction costs, rental income, and GST — all in one comprehensive ROI projection."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="card-luxury rounded-2xl h-full">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-display text-lg font-bold text-indigo-deep flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-gold" /> Investment Inputs
                </h3>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs text-indigo-deep flex items-center gap-1">
                      <Home className="w-3 h-3 text-gold" /> Plot Price
                    </Label>
                    <span className="font-display text-base font-bold text-gold">{formatINRFull(plotPrice)}</span>
                  </div>
                  <Slider value={[plotPrice]} onValueChange={(v) => setPlotPrice(v[0])} min={100000} max={2000000} step={50000} />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>₹1L</span><span>₹20L</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs text-indigo-deep">Plot Size (sq.yd)</Label>
                    <span className="font-display text-base font-bold text-gold">{plotSize} sq.yd</span>
                  </div>
                  <Slider value={[plotSize]} onValueChange={(v) => setPlotSize(v[0])} min={80} max={400} step={10} />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>80</span><span>400</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs text-indigo-deep">Construction Size (sq.ft)</Label>
                    <span className="font-display text-base font-bold text-gold">{constructionSize} sq.ft</span>
                  </div>
                  <Slider value={[constructionSize]} onValueChange={(v) => setConstructionSize(v[0])} min={500} max={3000} step={100} />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>500 (1BHK)</span><span>3000 (Villa)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs text-indigo-deep flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gold" /> Hold Period
                    </Label>
                    <span className="font-display text-base font-bold text-gold">{holdYears} years</span>
                  </div>
                  <Slider value={[holdYears]} onValueChange={(v) => setHoldYears(v[0])} min={1} max={10} step={1} />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>1 yr</span><span>10 yrs</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gold/15">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Investment</span>
                    <span className="font-display text-lg font-bold text-indigo-deep">{formatINRFull(roi.totalInvestment)}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1 space-y-0.5">
                    <div>• Plot: {formatINRFull(roi.plotPrice)}</div>
                    <div>• Construction: {formatINRFull(roi.constructionCost)}</div>
                    <div>• GST (18%): {formatINRFull(roi.gstOnConstruction)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-4"
          >
            {/* KPI cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card className="card-luxury-dark rounded-xl bg-spiritual-temple">
                <CardContent className="p-4 text-center">
                  <PiggyBank className="w-5 h-5 text-gold mx-auto mb-1" />
                  <div className="font-display text-base sm:text-lg font-bold text-gold">{formatINRFull(roi.totalReturns)}</div>
                  <div className="text-[10px] text-cream/60">Total Returns</div>
                </CardContent>
              </Card>
              <Card className="card-luxury-dark rounded-xl bg-spiritual-temple">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-5 h-5 text-green-light mx-auto mb-1" />
                  <div className="font-display text-base sm:text-lg font-bold text-green-light">{formatINRFull(roi.netProfit)}</div>
                  <div className="text-[10px] text-cream/60">Net Profit</div>
                </CardContent>
              </Card>
              <Card className="card-luxury-dark rounded-xl bg-spiritual-temple">
                <CardContent className="p-4 text-center">
                  <Sparkles className="w-5 h-5 text-gold mx-auto mb-1" />
                  <div className="font-display text-base sm:text-lg font-bold text-gold">{roi.roiPercent.toFixed(0)}%</div>
                  <div className="text-[10px] text-cream/60">Total ROI</div>
                </CardContent>
              </Card>
              <Card className="card-luxury-dark rounded-xl bg-spiritual-temple">
                <CardContent className="p-4 text-center">
                  <Calendar className="w-5 h-5 text-cream mx-auto mb-1" />
                  <div className="font-display text-base sm:text-lg font-bold text-cream">{roi.cagr.toFixed(1)}%</div>
                  <div className="text-[10px] text-cream/60">CAGR</div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card className="card-luxury-dark rounded-2xl bg-spiritual-temple">
              <CardContent className="p-6">
                <h3 className="font-display text-base font-bold text-cream mb-1">
                  {holdYears}-Year Value Projection
                </h3>
                <p className="text-xs text-cream/60 mb-4">Land appreciation + rental income vs invested amount</p>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={roi.yearly}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(197,162,62,0.1)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: "rgba(255,248,231,0.6)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "rgba(255,248,231,0.6)" }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                    <Tooltip
                      formatter={(v: number) => formatINRFull(v)}
                      contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(197,162,62,0.4)", borderRadius: "8px", color: "#FFF8E7" }}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="invested" name="Invested" fill="#6b6557" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="landValue" name="Land Value" fill="#C5A23E" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="totalValue" name="Total Value" fill="#4A7A2E" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Breakdown + CTA */}
            <Card className="card-luxury rounded-2xl">
              <CardContent className="p-5">
                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div className="p-2.5 rounded-lg bg-marble">
                    <div className="text-muted-foreground">Future Land Value ({holdYears}y)</div>
                    <div className="font-semibold text-gold">{formatINRFull(roi.futureLandValue)}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-marble">
                    <div className="text-muted-foreground">Annual Rental Income</div>
                    <div className="font-semibold text-green-deep">{formatINRFull(roi.annualRental)}</div>
                  </div>
                </div>
                <Button
                  onClick={() => openLeadForm()}
                  className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11"
                >
                  Get Detailed Investment Report
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  * Projections based on 22% avg annual appreciation (2021-26 actual). Past performance doesn't guarantee future returns.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
