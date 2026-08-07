"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { navigate } from "@/lib/router";
import { useApp } from "@/lib/store";
import { LotusLogo } from "@/components/shared/brand";

const NAV_LINKS = [
  { label: "Home", route: "home" as const },
  { label: "Projects", route: "projects" as const },
  { label: "Plots", route: "plots" as const },
  { label: "About", route: "about" as const },
  { label: "Invest", route: "invest" as const },
  { label: "Blog", route: "blog" as const },
  { label: "Contact", route: "contact" as const },
];

export function InnerNavbar({ title }: { title: string }) {
  const { openLeadForm } = useApp();
  return (
    <div className="sticky top-0 z-50 bg-spiritual-temple border-b border-gold/20 shadow-lg">
      {/* Top row: logo + back + CTAs */}
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate({ name: "home" })} className="flex items-center gap-2 text-sm font-medium text-cream hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Home</span>
          </button>
          <div className="h-4 w-px bg-cream/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <LotusLogo className="w-7 h-7" />
            <span className="font-display text-sm font-bold text-cream hidden sm:inline">RK Properties</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => openLeadForm()} size="sm" className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold text-xs h-8">
            <MessageCircle className="w-3 h-3 mr-1" /> Enquire
          </Button>
        </div>
      </div>
      {/* Nav links row */}
      <div className="px-4 sm:px-6 pb-2 flex items-center gap-1 overflow-x-auto scroll-luxury">
        {NAV_LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() => navigate({ name: link.route })}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              link.label === title ? "bg-gold/20 text-gold" : "text-cream/70 hover:text-gold hover:bg-cream/10"
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}
