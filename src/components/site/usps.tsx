"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  FileCheck,
  Landmark,
  Camera,
  Flower2,
  Sparkles,
  Heart,
  TrendingUp,
  Building2,
  MapPin,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

const USPS = [
  {
    icon: ShieldCheck,
    title: "MVDA Approved",
    desc: "Every project carries a valid MVDA number — verifiable on the official portal. Your investment is legally secure.",
    color: "text-green-deep",
    bg: "bg-green-light/10",
  },
  {
    icon: FileCheck,
    title: "Clear Legal Title",
    desc: "100% clear land titles with comprehensive documentation. No disputes, no hidden risks — pure peace of mind.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: Landmark,
    title: "Temple Architecture",
    desc: "Entry gates inspired by Banke Bihari, ISKCON & Govardhan. Marble facades with gold accents — divine aesthetics.",
    color: "text-temple-red",
    bg: "bg-temple-red/10",
  },
  {
    icon: Camera,
    title: "24/7 Security",
    desc: "Gated entry with RFID, CCTV surveillance, and trained guards. Your spiritual home is safe around the clock.",
    color: "text-indigo-deep",
    bg: "bg-indigo-deep/10",
  },
  {
    icon: Flower2,
    title: "Spiritual Environment",
    desc: "Tulsi gardens, meditation spaces, parikrama paths, and satsang halls. Daily life infused with devotion.",
    color: "text-green-deep",
    bg: "bg-green-light/10",
  },
  {
    icon: Sparkles,
    title: "Premium Amenities",
    desc: "Clubhouse, swimming pool, temple complex, goshala, organic farm — modern luxury in a spiritual setting.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
];

const COUNTERS = [
  { icon: Building2, value: 4, label: "Premium Townships", suffix: "" },
  { icon: MapPin, value: 185, label: "Plots Available", suffix: "+" },
  { icon: Heart, value: 3, label: "Sacred Cities", suffix: "" },
  { icon: TrendingUp, value: 100, label: "MVDA Approved", suffix: "%" },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Usps() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The BrajProperty"
          highlight="Difference"
          subtitle="We deliver the rare combination of divine location, legal security, and lifestyle luxury that makes your investment both a spiritual homecoming and a wise financial decision."
        />

        {/* USP grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {USPS.map((usp, i) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-luxury rounded-2xl p-6 group"
            >
              <div className={`w-12 h-12 rounded-xl ${usp.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <usp.icon className={`w-6 h-6 ${usp.color}`} />
              </div>
              <h3 className="font-display text-lg font-bold text-indigo-deep mb-2">{usp.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{usp.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 card-luxury-dark rounded-3xl p-8 sm:p-12 bg-spiritual-temple"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {COUNTERS.map((c) => (
              <div key={c.label} className="text-center">
                <c.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <div className="font-display text-4xl sm:text-5xl font-bold text-gold-gradient">
                  <Counter value={c.value} suffix={c.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-cream/70 mt-2 uppercase tracking-wide">{c.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
