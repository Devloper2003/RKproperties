"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { useApp } from "@/lib/store";
import { LotusLogo } from "@/components/shared/brand";
import { LanguageToggle } from "./language-toggle";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Plots", href: "#plots" },
  { label: "About Braj", href: "#about" },
  { label: "Invest", href: "#invest" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ scrolled }: { scrolled: boolean }) {
  const { toggleView, setMobileMenuOpen, openLeadForm, festivalDismissed } = useApp();
  const [mobileOpen, setMobile] = useState(false);

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
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <LotusLogo className="w-9 h-9 text-gold transition-transform group-hover:scale-110" />
            <div className="flex flex-col leading-none">
              <span
                className={`font-display text-xl font-bold tracking-tight ${
                  scrolled ? "text-indigo-deep" : "text-cream"
                }`}
              >
                RK Properties
              </span>
              <span
                className={`text-[10px] uppercase tracking-[0.2em] ${
                  scrolled ? "text-muted-foreground" : "text-cream/70"
                }`}
              >
                Spiritual Living in Braj
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                  scrolled
                    ? "text-indigo-deep/80 hover:text-gold hover:bg-gold/5"
                    : "text-cream/90 hover:text-gold hover:bg-cream/10"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageToggle light={!scrolled} />
            <a
              href="tel:+919837012345"
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                scrolled ? "text-indigo-deep hover:text-gold" : "text-cream/90 hover:text-gold"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              +91 98370 12345
            </a>
            <Button
              onClick={() => openLeadForm()}
              size="sm"
              className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold hover:shadow-[0_4px_14px_rgba(197,162,62,0.45)]"
            >
              Book Site Visit
            </Button>
            <Button
              onClick={toggleView}
              size="sm"
              variant="outline"
              className={`border-gold/40 ${
                scrolled
                  ? "text-indigo-deep hover:bg-gold/10"
                  : "text-cream border-cream/30 hover:bg-cream/10"
              }`}
            >
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              Admin
            </Button>
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
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="px-4 py-3 text-indigo-deep font-medium rounded-md hover:bg-gold/10 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </a>
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
                    <Button
                      onClick={() => {
                        setMobile(false);
                        toggleView();
                      }}
                      variant="outline"
                      className="border-gold/40 text-indigo-deep"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Admin Panel
                    </Button>
                    <a
                      href="tel:+919837012345"
                      className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2"
                    >
                      <Phone className="w-4 h-4" />
                      +91 98370 12345
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
