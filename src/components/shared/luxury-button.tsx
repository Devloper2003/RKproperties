"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

type Variant = "gold" | "gold-outline" | "dark" | "ghost-gold" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface LuxuryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-sm",
};

const variants: Record<Variant, string> = {
  gold:
    "bg-gradient-to-br from-gold-light via-gold to-gold-dark text-indigo-deep shadow-[0_4px_18px_rgba(197,162,62,0.4)] hover:shadow-[0_8px_28px_rgba(197,162,62,0.55)] gold-shimmer font-semibold",
  "gold-outline":
    "border border-gold/60 text-gold-dark bg-transparent hover:bg-gold/10 hover:border-gold",
  dark: "bg-indigo-deep text-cream hover:bg-indigo-deep/90 shadow-md",
  "ghost-gold":
    "text-gold-dark hover:bg-gold/10 bg-transparent",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1ebe5b] shadow-[0_4px_18px_rgba(37,211,102,0.4)]",
};

export const LuxuryButton = React.forwardRef<
  HTMLButtonElement,
  LuxuryButtonProps
>(function LuxuryButton(
  { className, variant = "gold", size = "md", asChild, children, ...props },
  ref
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref as any}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-50 disabled:pointer-events-none",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});
