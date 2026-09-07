"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

/**
 * LazySection — only renders children when the section scrolls into viewport.
 * Perf tuning:
 * - rootMargin "400px 0px" pre-loads sections 400px before they enter viewport
 * - requestAnimationFrame batches reveal with browser paint cycle (no jank)
 * - Falls back to instant render for prefers-reduced-motion via huge rootMargin
 */
export function LazySection({
  children,
  className = "",
  minHeight = 200,
}: {
  children: ReactNode;
  className?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setVisible(true));
          observer.disconnect();
        }
      },
      {
        rootMargin: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "1000px 0px"
          : "400px 0px",
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={!visible ? { minHeight, contentVisibility: "auto", containIntrinsicSize: `1px ${minHeight}px` } : undefined}
    >
      {visible ? children : null}
    </div>
  );
}
