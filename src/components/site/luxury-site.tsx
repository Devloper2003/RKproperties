"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { SacredLocations } from "./sacred-locations";
import { ProjectsShowcase } from "./projects-showcase";
import { PlotExplorer } from "./plot-explorer";
import { Usps } from "./usps";
import { TownshipMap } from "./township-map";
import { Testimonials } from "./testimonials";
import { TrustSignals } from "./trust-signals";
import { EmiCalculator } from "./emi-calculator";
import { BlogPreview } from "./blog-preview";
import { LeadCta } from "./lead-cta";
import { Footer } from "./footer";
import { WhatsappFab } from "./whatsapp-fab";
import { Chatbot } from "./chatbot";
import { ProjectDetailModal } from "./project-detail-modal";
import { LeadFormModal } from "./lead-form-modal";
import { BookingModal } from "./booking-modal";

export function LuxurySite() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar scrolled={scrolled} />
      <main className="flex-1">
        <Hero />
        <SacredLocations />
        <ProjectsShowcase />
        <PlotExplorer />
        <Usps />
        <TownshipMap />
        <Testimonials />
        <TrustSignals />
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
    </div>
  );
}
