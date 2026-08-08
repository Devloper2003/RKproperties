"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Menu, X, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useApp } from "@/lib/store";
import { navigate } from "@/lib/router";
import { LotusLogo } from "@/components/shared/brand";
import { LanguageToggle } from "./language-toggle";

const NAV_LINKS = [
  { label: "Home", route: "home" as const },
  { label: "Projects", route: "projects" as const },
  { label: "Plots", route: "plots" as const },
  { label: "About", route: "about" as const },
  { label: "Invest", route: "invest" as const },
  { label: "Blog", route: "blog" as const },
  { label: "Contact", route: "contact" as const },
];

export function Navbar({ scrolled }: { scrolled: boolean }) {
  const { toggleView, setMobileMenuOpen, openLeadForm, festivalDismissed } = useApp();
  const [mobileOpen, setMobile] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const logoClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (logoClickTimer.current) clearTimeout(logoClickTimer.current);
    if (newCount >= 3) {
      setLogoClicks(0);
      navigate({ name: "admin" }); // Secret admin access
    } else {
      logoClickTimer.current = setTimeout(() => setLogoClicks(0), 600);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-500 ${
        festivalDismissed ? "top-0" : "top-[40px]"
      } ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-[0_2px_20px_rgba(197,162,62,0.12)] border-b border-gold/15"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo — triple click for secret admin access */}
          <button onClick={handleLogoClick} className="flex items-center gap-2.5 group cursor-pointer">
            <LotusLogo className="w-9 h-9 transition-transform group-hover:scale-110" />
            <div className="flex flex-col leading-none text-left">
              <span
                className={`font-display text-lg font-bold tracking-tight ${
                  scrolled ? "text-indigo-deep" : "text-cream"
                }`}
              >
                RK Properties
              </span>
              <span
                className={`text-[9px] uppercase tracking-[0.2em] ${
                  scrolled ? "text-muted-foreground" : "text-cream/70"
                }`}
              >
                Shalinder Singh
              </span>
            </div>
          </button>

          {/* Desktop nav — ALL links navigate to separate pages */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate({ name: link.route })}
                className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  scrolled
                    ? "text-indigo-deep/80 hover:text-gold hover:bg-gold/5"
                    : "text-cream/90 hover:text-gold hover:bg-cream/10"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageToggle light={!scrolled} />
            <a
              href="tel:+918923944689"
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                scrolled ? "text-indigo-deep hover:text-gold" : "text-cream/90 hover:text-gold"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              +91 89239 44689
            </a>
            <Button
              onClick={() => openLeadForm()}
              size="sm"
              className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold hover:shadow-[0_4px_14px_rgba(197,162,62,0.45)]"
            >
              Book Site Visit
            </Button>
            {/* Admin access hidden — triple-click logo to access */}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobile}>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className={`p-2 rounded-md ${
                    scrolled ? "text-indigo-deep" : "text-cream"
                  }`}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-cream p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex items-center justify-between p-5 border-b border-gold/15">
                  <div className="flex items-center gap-2">
                    <LotusLogo className="w-7 h-7 text-gold" />
                    <span className="font-display text-lg font-bold text-indigo-deep">
                      RK Properties<span className="text-gold">.in</span>
                    </span>
                  </div>
                  <SheetClose asChild>
                    <button className="text-muted-foreground hover:text-gold">
                      <X className="w-5 h-5" />
                    </button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col p-4 gap-1">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <button
                        onClick={() => { setMobile(false); navigate({ name: link.route }); }}
                        className="text-left px-4 py-3 text-indigo-deep font-medium rounded-md hover:bg-gold/10 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </button>
                    </SheetClose>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gold/15 flex flex-col gap-2">
                    <Button
                      onClick={() => {
                        setMobile(false);
                        openLeadForm();
                      }}
                      className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"
                    >
                      Book Site Visit
                    </Button>
                    {/* Admin hidden from mobile menu — triple-click logo */}
                    <a
                      href="tel:+918923944689"
                      className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2"
                    >
                      <Phone className="w-4 h-4" />
                      +91 89239 44689
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
