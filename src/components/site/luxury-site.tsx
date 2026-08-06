"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { FestivalBanner } from "./festival-banner";
import { Hero } from "./hero";
import { QuoteRotator } from "./quote-rotator";
import { SacredLocations } from "./sacred-locations";
import { ProjectsShowcase } from "./projects-showcase";
import { VirtualTourSection, VirtualTourModal } from "./virtual-tour";
import { PlotExplorer } from "./plot-explorer";
import { Usps } from "./usps";
import { TownshipMap } from "./township-map";
import { Testimonials } from "./testimonials";
import { TrustSignals } from "./trust-signals";
import { NriSection } from "./nri-section";
import { EmiCalculator } from "./emi-calculator";
import { BlogPreview } from "./blog-preview";
import { LeadCta } from "./lead-cta";
import { Footer } from "./footer";
import { WhatsappFab } from "./whatsapp-fab";
import { Chatbot } from "./chatbot";
import { ProjectDetailModal } from "./project-detail-modal";
import { LeadFormModal } from "./lead-form-modal";
import { BookingModal } from "./booking-modal";
import { ComparisonModal, ComparisonBar } from "./comparison-modal";
import { WishlistPanel } from "./wishlist-panel";
import { ScrollProgress } from "./scroll-progress";
import { useApp } from "@/lib/store";

export function LuxurySite() {
  const [scrolled, setScrolled] = useState(false);
  const initWishlist = useApp((s) => s.initWishlist);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initialize wishlist from localStorage on first mount
  useEffect(() => {
    initWishlist();
  }, [initWishlist]);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <ScrollProgress />
      <FestivalBanner />
      <Navbar scrolled={scrolled} />
      <main className="flex-1">
        <Hero />
        <QuoteRotator />
        <SacredLocations />
        <ProjectsShowcase />
        <VirtualTourSection />
        <PlotExplorer />
        <Usps />
        <TownshipMap />
        <Testimonials />
        <TrustSignals />
        <NriSection />
        <EmiCalculator />
        <BlogPreview />
        <LeadCta />
      </main>
      <Footer />
      <WhatsappFab />
      <Chatbot />
      <ProjectDetailModal />
      <LeadFormModal />
      <BookingModal />
      <ComparisonModal />
      <ComparisonBar />
      <WishlistPanel />
      <VirtualTourModal />
    </div>
  );
}
