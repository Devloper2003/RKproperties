"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Scroll progress bar — top of page.
 * Perf tuning: lighter spring (stiffness 80, damping 25, restDelta 0.01)
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.01,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light origin-left z-[60] pointer-events-none"
      aria-hidden
    />
  );
}
