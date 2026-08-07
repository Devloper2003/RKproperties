"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, FileCheck, Landmark, Camera, Flower2, Sparkles, Heart, TrendingUp, Building2, MapPin } from "lucide-react";
import { navigate } from "@/lib/router";
import { InnerNavbar } from "./inner-navbar";
import { useApp } from "@/lib/store";

const USPS = [
  { icon: ShieldCheck, title: "MVDA Approved", desc: "Every project carries a valid MVDA number — verifiable on the official portal. Your investment is legally secure." },
  { icon: FileCheck, title: "Clear Legal Title", desc: "100% clear land titles with comprehensive documentation. No disputes, no hidden risks — pure peace of mind." },
  { icon: Landmark, title: "Temple Architecture", desc: "Entry gates inspired by Banke Bihari, ISKCON & Govardhan. Marble facades with gold accents — divine aesthetics." },
  { icon: Camera, title: "24/7 Security", desc: "Gated entry with RFID, CCTV surveillance, and trained guards. Your spiritual home is safe around the clock." },
  { icon: Flower2, title: "Spiritual Environment", desc: "Tulsi gardens, meditation spaces, parikrama paths, and satsang halls. Daily life infused with devotion." },
  { icon: Sparkles, title: "Premium Amenities", desc: "Clubhouse, swimming pool, temple complex, goshala, organic farm — modern luxury in a spiritual setting." },
];

export function AboutPage() {
  const { openLeadForm } = useApp();
  return (
    <div className="min-h-screen bg-cream">
      <InnerNavbar title="About RK Properties" />

      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-indigo-deep to-[#2d1b3d] flex items-center justify-center">
        <div className="text-center px-4">
          <Badge className="bg-gold/20 text-gold border-0 mb-3">Why Choose Us</Badge>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream mb-2">The RK Properties Difference</h1>
          <p className="text-sm text-cream/70 max-w-lg mx-auto">We deliver the rare combination of divine location, legal security, and lifestyle luxury</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section>
          <h2 className="font-display text-2xl font-bold text-indigo-deep mb-3 flex items-center gap-2"><span className="h-5 w-1 bg-gold rounded-full" /> Our Story</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            RK Properties is a premium plotted development company in the sacred Braj Dham region. We develop gated residential townships
            in Vrindavan, Mathura, and Govardhan — where Lord Krishna performed His divine pastimes 5,000 years ago. Our philosophy:
            "Har visitor ek potential devotee-resident hai, aur har page ek step hai unke spiritual home tak." We combine temple-themed
            architecture with modern amenities, MVDA-approved legal security, and a deeply spiritual community environment.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-indigo-deep mb-4 flex items-center gap-2"><span className="h-5 w-1 bg-gold rounded-full" /> Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USPS.map((u, i) => (
              <motion.div key={u.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card className="card-luxury rounded-xl h-full">
                  <CardContent className="p-5">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3"><u.icon className="w-6 h-6 text-gold" /></div>
                    <h3 className="font-display text-base font-bold text-indigo-deep mb-1">{u.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{u.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "4", label: "Premium Townships", icon: Building2 },
            { value: "185+", label: "Plots Available", icon: MapPin },
            { value: "3", label: "Sacred Cities", icon: Heart },
            { value: "100%", label: "MVDA Approved", icon: TrendingUp },
          ].map((s) => (
            <Card key={s.label} className="card-luxury rounded-xl text-center">
              <CardContent className="p-4">
                <s.icon className="w-6 h-6 text-gold mx-auto mb-1" />
                <div className="font-display text-2xl font-bold text-gold-gradient">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="text-center pt-4">
          <Button onClick={() => openLeadForm()} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12 px-8">
            Begin Your Spiritual Journey
          </Button>
        </div>
      </div>
    </div>
  );
}
