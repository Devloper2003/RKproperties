"use client";

import { motion } from "framer-motion";
import { ShieldCheck, FileCheck, Award, Users, Lock, BadgeIndianRupee } from "lucide-react";

const SIGNALS = [
  { icon: ShieldCheck, label: "MVDA Approved", sub: "Verified & legal" },
  { icon: FileCheck, label: "RERA Registered", sub: "Transparent dealing" },
  { icon: Award, label: "Clear Legal Title", sub: "100% documented" },
  { icon: Users, label: "500+ Families", sub: "Happy residents" },
  { icon: Lock, label: "Secure Investment", sub: "Protected by law" },
  { icon: BadgeIndianRupee, label: "Best ROI", sub: "15-25% annually" },
];

export function TrustSignals() {
  return (
    <section className="py-14 bg-spiritual-temple relative overflow-hidden">
      {/* Decorative mandala */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-gold mandala-spin">
          <g stroke="currentColor" strokeWidth="0.5" fill="none">
            <circle cx="100" cy="100" r="95" />
            <circle cx="100" cy="100" r="70" />
            <circle cx="100" cy="100" r="45" />
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i * 22.5 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={100 + 45 * Math.cos(a)}
                  y1={100 + 45 * Math.sin(a)}
                  x2={100 + 95 * Math.cos(a)}
                  y2={100 + 95 * Math.sin(a)}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">✦ Trusted & Verified ✦</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream">
            Trust Signals That Set Us Apart
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center p-4 rounded-xl bg-cream/5 backdrop-blur-sm border border-gold/15 hover:border-gold/40 transition-colors"
            >
              <s.icon className="w-7 h-7 text-gold mx-auto mb-2" />
              <div className="text-sm font-semibold text-cream">{s.label}</div>
              <div className="text-[11px] text-cream/60 mt-0.5">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
