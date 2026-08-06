"use client";

import { motion } from "framer-motion";
import { OmSymbol } from "@/components/shared/brand";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${align === "center" ? "items-center text-center" : "items-start text-left"} gap-3 mb-12`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}>
          <span className={`h-px w-8 ${light ? "bg-gold/60" : "bg-gold/60"}`} />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold flex items-center gap-1.5">
            <OmSymbol className="text-sm" />
            {eyebrow}
          </span>
          <span className={`h-px w-8 ${light ? "bg-gold/60" : "bg-gold/60"}`} />
        </div>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${
          light ? "text-cream" : "text-indigo-deep"
        }`}
      >
        {title} {highlight && <span className="text-gold-gradient italic">{highlight}</span>}
      </h2>
      {subtitle && (
        <p
          className={`max-w-2xl text-base sm:text-lg leading-relaxed ${
            light ? "text-cream/70" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
