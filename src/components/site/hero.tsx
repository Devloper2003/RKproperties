"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/lib/store";
import { MandalaSVG } from "@/components/shared/brand";

export function Hero() {
  const { openLeadForm, openVisit } = useApp();

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-spiritual-temple"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-vrindavan.png"
          alt="Vrindavan at golden dawn with temple silhouettes"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-deep/70 via-indigo-deep/40 to-indigo-deep/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(15,15,26,0.7)_100%)]" />
      </div>

      {/* Floating golden particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="float-particle absolute rounded-full bg-gold/60 pointer-events-none"
          style={{
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            left: `${(i * 7.3 + 5) % 95}%`,
            top: `${(i * 11.7 + 10) % 80}%`,
            animationDelay: `${(i % 5) * 1.6}s`,
            boxShadow: "0 0 8px rgba(197,162,62,0.6)",
          }}
        />
      ))}

      {/* Rotating mandala decoration */}
      <MandalaSVG className="absolute -top-32 -right-32 w-[500px] h-[500px] text-gold/20 mandala-spin pointer-events-none" />
      <MandalaSVG className="absolute -bottom-40 -left-40 w-[400px] h-[400px] text-gold/15 mandala-spin pointer-events-none" style={{ animationDirection: "reverse" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs font-medium tracking-[0.25em] text-gold uppercase">
            ✦ Braj Dham ✦ Vrindavan · Mathura · Govardhan
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream leading-[1.05] tracking-tight"
        >
          Your Spiritual Home
          <br />
          in <span className="text-gold-gradient italic">Braj Dham</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-base sm:text-lg lg:text-xl text-cream/80 max-w-2xl mx-auto font-body leading-relaxed"
        >
          Premium MVDA-approved plotted townships in the sacred land of Krishna.
          Gated communities with temple-themed architecture, clear legal titles,
          and modern amenities — where every plot is a step closer to divinity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="gold-shimmer bg-gradient-to-br from-gold-light via-gold to-gold-dark text-indigo-deep font-semibold text-base px-8 py-6 h-auto rounded-full hover:shadow-[0_8px_28px_rgba(197,162,62,0.5)]"
          >
            Explore 4 Townships
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <Button
            onClick={() => openVisit()}
            size="lg"
            variant="outline"
            className="bg-cream/5 backdrop-blur-sm border-cream/40 text-cream hover:bg-cream/15 hover:text-gold font-medium text-base px-8 py-6 h-auto rounded-full"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Book a Site Visit
          </Button>
        </motion.div>

        {/* Trust microcopy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-cream/60"
        >
          <span className="flex items-center gap-1.5">✓ MVDA Approved</span>
          <span className="flex items-center gap-1.5">✓ RERA Registered</span>
          <span className="flex items-center gap-1.5">✓ Clear Legal Title</span>
          <span className="flex items-center gap-1.5">✓ 500+ Happy Families</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.8 },
          y: { delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-cream/70 hover:text-gold transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
