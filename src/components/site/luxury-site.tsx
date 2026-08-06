"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { FestivalBanner } from "./festival-banner";
import { Hero } from "./hero";
import { QuoteRotator } from "./quote-rotator";
import { SacredLocations } from "./sacred-locations";
import { KrishnaLilaSection } from "./krishna-lila";
import { SpiritualQuiz } from "./spiritual-quiz";
import { ProjectsShowcase } from "./projects-showcase";
import { VirtualTourSection, VirtualTourModal } from "./virtual-tour";
import { PlotExplorer } from "./plot-explorer";
import { VastuCompass } from "./vastu-compass";
import { Usps } from "./usps";
import { BrajDhamMap } from "./braj-dham-map";
import { TownshipMap } from "./township-map";
import { Testimonials } from "./testimonials";
import { VideoTestimonials } from "./video-testimonials";
import { TrustSignals } from "./trust-signals";
import { PriceComparison } from "./price-comparison";
import { NriSection } from "./nri-section";
import { EmiCalculator } from "./emi-calculator";
import { RoiCalculator } from "./roi-calculator";
import { VisitCtaSection } from "./visit-cta-section";
import { WhatsappFlow } from "./whatsapp-flow";
import { FaqSection } from "./faq-section";
import { ReferralProgram } from "./referral-program";
import { CommunityPortal } from "./community-portal";
import { BhajanPlayer } from "./bhajan-player";
import { BrajCalendar } from "./braj-calendar";
import { SankalpSection } from "./sankalp-section";
import { KrishnaNamesCounter } from "./krishna-names-counter";
import { BrajWeather } from "./braj-weather";
import { BrajRecipes } from "./braj-recipes";
import { SadhanaTracker } from "./sadhana-tracker";
import { DarshanGuide } from "./darshan-guide";
import { ConstructionProgress } from "./construction-progress";
import { PlotRecommendation } from "./plot-recommendation";
import { KrishnaStories } from "./krishna-stories";
import { NewsletterSignup } from "./newsletter-signup";
import { VastuConsultationModal } from "./vastu-consultation-modal";
import { ProjectPageView } from "./project-page-view";
import { PilgrimagePlanner } from "./pilgrimage-planner";
import { SatsangSchedule } from "./satsang-schedule";
import { MantraLibrary } from "./mantra-library";
import { GoshalaSection } from "./goshala-section";
import { KrishnaQuiz } from "./krishna-quiz";
import { SpiritualShop } from "./spiritual-shop";
import { BrajPhotoGallery } from "./braj-photo-gallery";
import { BlogPreview } from "./blog-preview";
import { LeadCta } from "./lead-cta";
import { Footer } from "./footer";
import { WhatsappFab } from "./whatsapp-fab";
import { Chatbot } from "./chatbot";
import { ProjectDetailModal } from "./project-detail-modal";
// ProjectDetailModal is replaced by ProjectPageView — keeping import for backward compat but not rendering
import { LeadFormModal } from "./lead-form-modal";
import { BookingModal } from "./booking-modal";
import { ComparisonModal, ComparisonBar } from "./comparison-modal";
import { PlotComparisonModal, PlotCompareBar } from "./plot-comparison-modal";
import { WishlistPanel } from "./wishlist-panel";
import { ScrollProgress } from "./scroll-progress";
import { SiteVisitModal } from "./site-visit-modal";
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
        <KrishnaLilaSection />
        <SpiritualQuiz />
        <ProjectsShowcase />
        <VirtualTourSection />
        <PlotExplorer />
        <VastuCompass />
        <PlotRecommendation />
        <Usps />
        <BrajDhamMap />
        <TownshipMap />
        <Testimonials />
        <VideoTestimonials />
        <TrustSignals />
        <PriceComparison />
        <NriSection />
        <EmiCalculator />
        <RoiCalculator />
        <VisitCtaSection />
        <WhatsappFlow />
        <FaqSection />
        <ReferralProgram />
        <CommunityPortal />
        <BhajanPlayer />
        <MantraLibrary />
        <KrishnaNamesCounter />
        <BrajCalendar />
        <BrajWeather />
        <SankalpSection />
        <SadhanaTracker />
        <DarshanGuide />
        <PilgrimagePlanner />
        <SatsangSchedule />
        <BrajRecipes />
        <GoshalaSection />
        <ConstructionProgress />
        <KrishnaStories />
        <KrishnaQuiz />
        <BrajPhotoGallery />
        <SpiritualShop />
        <BlogPreview />
        <NewsletterSignup />
        <LeadCta />
      </main>
      <Footer />
      <WhatsappFab />
      <Chatbot />
      {/* Old ProjectDetailModal removed — replaced by ProjectPageView */}
      <LeadFormModal />
      <BookingModal />
      <ComparisonModal />
      <ComparisonBar />
      <PlotComparisonModal />
      <PlotCompareBar />
      <WishlistPanel />
      <VirtualTourModal />
      <SiteVisitModal />
      <VastuConsultationModal />
      <ProjectPageView />
    </div>
  );
}
