"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

/**
 * LazySection — only renders children when the section scrolls into viewport.
 * Shows a placeholder spacer until visible, preventing layout shift.
 * Uses Intersection Observer with rootMargin for pre-loading.
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

    // Skip IO if user prefers reduced motion — render immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // Once visible, stay visible
        }
      },
      { rootMargin: "200px 0px", threshold: 0 } // Pre-load 200px before entering viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={!visible ? { minHeight } : undefined}
    >
      {visible ? children : null}
    </div>
  );
}
