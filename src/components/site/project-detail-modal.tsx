"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin,
  Maximize,
  IndianRupee,
  Calendar,
  ShieldCheck,
  FileCheck,
  Building2,
  Church,
  Phone,
  MessageCircle,
  LayoutGrid,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatINRFull, PROJECT_STATUS_LABELS, PLOT_STATUS_CONFIG, type Project } from "@/lib/types";

export function ProjectDetailModal() {
  const { selectedProjectSlug, setSelectedProjectSlug, setSelectedProjectForPlots, openLeadForm } = useApp();

  const { data: project, isLoading: loading } = useQuery<(Project & { plots: any[]; testimonials: any[] }) | null>({
    queryKey: ["project-detail", selectedProjectSlug],
    queryFn: async () => {
      if (!selectedProjectSlug) return null;
      const res = await fetch(`/api/projects/${selectedProjectSlug}`);
      const json = await res.json();
      return json.data;
    },
    enabled: !!selectedProjectSlug,
  });

  const open = !!selectedProjectSlug;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && setSelectedProjectSlug(null)}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[92vh] p-0 gap-0 overflow-hidden bg-cream rounded-2xl">
        <ScrollArea className="max-h-[92vh] scroll-luxury">
          {loading && (
            <div className="p-20 text-center text-muted-foreground">Loading project details...</div>
          )}
          {project && (
            <div>
              {/* Hero */}
              <div className="relative h-72 sm:h-96">
                <Image
                  src={project.heroImage}
                  alt={project.name}
                  fill
                  sizes="95vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep via-indigo-deep/30 to-transparent" />
                <DialogHeader className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={PROJECT_STATUS_LABELS[project.status]?.color || "bg-gold/20 text-gold"} >
                      {PROJECT_STATUS_LABELS[project.status]?.label || project.status}
                    </Badge>
                    <span className="text-cream/80 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {project.location}
                    </span>
                  </div>
                  <DialogTitle className="font-display text-3xl sm:text-5xl font-bold text-cream">
                    {project.name}
                  </DialogTitle>
                  <DialogDescription className="text-gold italic text-base sm:text-lg mt-1">
                    {project.tagline}
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6 sm:p-8 space-y-8">
                {/* Quick stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Maximize, label: "Total Area", value: `${project.totalAreaAcres} acres` },
                    { icon: LayoutGrid, label: "Plot Sizes", value: `${project.minPlotSize}-${project.maxPlotSize} sq.yd` },
                    { icon: IndianRupee, label: "Price Range", value: `${formatINR(project.priceRangeMin)} - ${formatINR(project.priceRangeMax)}` },
                    { icon: Calendar, label: "Possession", value: project.possessionDate || "TBA" },
                  ].map((stat) => (
                    <div key={stat.label} className="card-luxury rounded-xl p-4 text-center">
                      <stat.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                      <div className="font-display font-bold text-indigo-deep text-sm mt-1">{stat.value}</div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-display text-xl font-bold text-indigo-deep mb-3 flex items-center gap-2">
                    <span className="h-4 w-1 bg-gold rounded-full" /> About this Township
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.longDescription}</p>
                </div>

                {/* Trust signals */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-green-light/10 border border-green-light/20">
                    <ShieldCheck className="w-6 h-6 text-green-deep flex-shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">MVDA Number</div>
                      <div className="font-mono font-semibold text-indigo-deep text-sm">{project.mvdaNumber || "Verified"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gold/10 border border-gold/20">
                    <FileCheck className="w-6 h-6 text-gold flex-shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">RERA Number</div>
                      <div className="font-mono font-semibold text-indigo-deep text-sm">{project.reraNumber || "Verified"}</div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                {project.amenities?.length > 0 && (
                  <div>
                    <h3 className="font-display text-xl font-bold text-indigo-deep mb-4 flex items-center gap-2">
                      <span className="h-4 w-1 bg-gold rounded-full" /> Premium Amenities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.amenities.map((a: string) => (
                        <div key={a} className="flex items-center gap-2 text-sm text-indigo-deep">
                          <CheckCircle2 className="w-4 h-4 text-green-deep flex-shrink-0" />
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nearby temples */}
                {project.nearbyTemples?.length > 0 && (
                  <div>
                    <h3 className="font-display text-xl font-bold text-indigo-deep mb-4 flex items-center gap-2">
                      <span className="h-4 w-1 bg-gold rounded-full" /> Nearby Sacred Temples
                    </h3>
                    <div className="space-y-2">
                      {project.nearbyTemples.map((t: any) => (
                        <div key={t.name} className="flex items-center justify-between p-3 rounded-lg bg-marble">
                          <div className="flex items-center gap-2">
                            <Church className="w-4 h-4 text-gold" />
                            <span className="font-medium text-indigo-deep text-sm">{t.name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {t.distance} · {t.walkTime} walk
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Plot preview */}
                {project.plots?.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-xl font-bold text-indigo-deep flex items-center gap-2">
                        <span className="h-4 w-1 bg-gold rounded-full" /> Available Plots Preview
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gold hover:text-gold-dark hover:bg-gold/10"
                        onClick={() => {
                          setSelectedProjectForPlots(project.slug);
                          setSelectedProjectSlug(null);
                          document.getElementById("plots")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        View All {project.plots.length} Plots →
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                      {project.plots.slice(0, 12).map((plot: any) => {
                        const cfg = PLOT_STATUS_CONFIG[plot.status] || PLOT_STATUS_CONFIG.available;
                        return (
                          <div
                            key={plot.id}
                            className={`p-2 rounded-lg border-2 ${cfg.border} bg-white text-center`}
                            title={`${plot.plotNumber} · ${plot.sizeSqyd} sq.yd · ${formatINRFull(plot.price)}`}
                          >
                            <div className="font-mono text-xs font-bold text-indigo-deep">{plot.plotNumber}</div>
                            <div className={`text-[10px] ${cfg.color}`}>{cfg.label}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                      {Object.values(PLOT_STATUS_CONFIG).map((c) => (
                        <span key={c.label} className="flex items-center gap-1.5">
                          <span className={`w-3 h-3 rounded ${c.bg}`} /> {c.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => openLeadForm(project.id)}
                    className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> Book Site Visit
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-green-deep/40 text-green-deep hover:bg-green-light/10 h-12"
                  >
                    <a href="https://wa.me/918923944689?text=Namaste! I'm interested in {project.name}" target="_blank" rel="noopener noreferrer">
                      <Phone className="w-4 h-4 mr-2" /> WhatsApp Us
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>

      {/* RealEstateListing Schema.org structured data for SEO */}
      {project && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              name: project.name,
              description: project.longDescription,
              url: `https://rkproperties.in/#projects`,
              image: project.galleryImages?.map((img: string) => `https://rkproperties.in${img}`) || [],
              address: {
                "@type": "PostalAddress",
                addressLocality: project.city,
                addressRegion: "Uttar Pradesh",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: project.latitude,
                longitude: project.longitude,
              },
              priceSpecification: {
                "@type": "PriceSpecification",
                price: project.priceRangeMin,
                priceCurrency: "INR",
                minPrice: project.priceRangeMin,
                maxPrice: project.priceRangeMax,
              },
              areaServed: project.city,
              identifier: project.reraNumber || project.mvdaNumber,
              status: project.status === "selling" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
              seller: {
                "@type": "Organization",
                name: "RK Properties",
                telephone: "+91-89239-44689",
              },
            }),
          }}
        />
      )}
    </Dialog>
  );
}
