"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, MapPin, Maximize, IndianRupee, Calendar, ShieldCheck, FileCheck,
  LayoutGrid, CheckCircle2, Church, Phone, MessageCircle, Navigation, Share2,
  ChevronLeft, ChevronRight, Star, Sparkles, Home,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINR, formatINRFull, PROJECT_STATUS_LABELS, PLOT_STATUS_CONFIG, type Project } from "@/lib/types";
import { toast } from "sonner";
import { navigate } from "@/lib/router";

export function ProjectPageView() {
  const { projectPageSlug, closeProjectPage, openLeadForm, openBooking, setSelectedProjectForPlots, openVisit } = useApp();
  const [activeImage, setActiveImage] = useState(0);

  const { data: project, isLoading } = useQuery<(Project & { plots: any[]; testimonials: any[] }) | null>({
    queryKey: ["project-page", projectPageSlug],
    queryFn: async () => {
      if (!projectPageSlug) return null;
      const res = await fetch(`/api/projects/${projectPageSlug}`);
      const json = await res.json();
      return json.data;
    },
    enabled: !!projectPageSlug,
  });

  if (!projectPageSlug) return null;

  const gallery = project ? [project.heroImage, ...(project.galleryImages || [])] : [];

  return (
    <div className="min-h-screen bg-cream">
      {/* Top navigation bar */}
      <div className="sticky top-0 z-50 bg-spiritual-temple border-b border-gold/20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">
        <button
          onClick={() => navigate({name:"home"})}
          className="flex items-center gap-2 text-sm font-medium text-cream hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        {project && (
          <div className="hidden md:flex items-center gap-2 text-xs text-cream/60">
            <Home className="w-3.5 h-3.5 text-gold" />
            <span className="font-medium text-cream">{project.name}</span>
            <span>·</span>
            <span>{project.city}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => toast.success("🔗 Link copied!")}
            size="sm"
            variant="ghost"
            className="text-cream/60 hover:text-gold p-2"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => openLeadForm(project?.id)}
            size="sm"
            className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5 mr-1" /> Enquire
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-40">
          <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
        </div>
      )}

      {project && (
        <div className="pb-20">
          {/* Hero gallery */}
          <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
            <Image
              src={gallery[activeImage] || project.heroImage}
              alt={project.name}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep via-indigo-deep/30 to-transparent" />

            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((i) => (i - 1 + gallery.length) % gallery.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/20 backdrop-blur-sm text-cream hover:bg-gold hover:text-indigo-deep flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImage((i) => (i + 1) % gallery.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/20 backdrop-blur-sm text-cream hover:bg-gold hover:text-indigo-deep flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        i === activeImage ? "border-gold scale-110" : "border-cream/30 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt={`Gallery ${i + 1}`} width={48} height={48} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <div className="max-w-4xl">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <Badge className={PROJECT_STATUS_LABELS[project.status]?.color || "bg-gold/20 text-gold"}>
                    {PROJECT_STATUS_LABELS[project.status]?.label || project.status}
                  </Badge>
                  <span className="text-cream/80 text-sm flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {project.location}
                  </span>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-2">
                  {project.name}
                </h1>
                <p className="text-gold italic text-lg sm:text-xl">{project.tagline}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Maximize, label: "Total Area", value: `${project.totalAreaAcres} acres`, color: "text-gold", bg: "bg-gold/10" },
                { icon: LayoutGrid, label: "Plot Sizes", value: `${project.minPlotSize}-${project.maxPlotSize} sq.yd`, color: "text-green-deep", bg: "bg-green-light/10" },
                { icon: IndianRupee, label: "Price Range", value: `${formatINR(project.priceRangeMin)} - ${formatINR(project.priceRangeMax)}`, color: "text-temple-red", bg: "bg-temple-red/10" },
                { icon: Calendar, label: "Possession", value: project.possessionDate || "TBA", color: "text-indigo-deep", bg: "bg-indigo-deep/10" },
              ].map((stat, i) => (
                <div key={stat.label} className="card-luxury rounded-xl p-4 text-center">
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  <div className="font-display font-bold text-indigo-deep text-sm mt-1">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* USP */}
            <div className="card-luxury-dark rounded-2xl bg-spiritual-temple p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gold mb-1">Unique Selling Proposition</div>
                  <p className="text-sm text-cream leading-relaxed">{project.usp}</p>
                </div>
              </div>
            </div>

            {/* About */}
            <section>
              <h2 className="font-display text-2xl font-bold text-indigo-deep mb-3 flex items-center gap-2">
                <span className="h-5 w-1 bg-gold rounded-full" /> About this Township
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{project.longDescription}</p>
            </section>

            {/* Trust signals */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            </section>

            {/* Amenities */}
            {project.amenities?.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-indigo-deep mb-4 flex items-center gap-2">
                  <span className="h-5 w-1 bg-gold rounded-full" /> Premium Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {project.amenities.map((a: string) => (
                    <div key={a} className="flex items-center gap-2 p-3 rounded-lg bg-marble text-sm text-indigo-deep">
                      <CheckCircle2 className="w-4 h-4 text-green-deep flex-shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Nearby temples */}
            {project.nearbyTemples?.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-indigo-deep mb-4 flex items-center gap-2">
                  <span className="h-5 w-1 bg-gold rounded-full" /> Nearby Sacred Temples
                </h2>
                <div className="space-y-2">
                  {project.nearbyTemples.map((t: any) => (
                    <div key={t.name} className="flex items-center justify-between p-3 rounded-lg bg-marble">
                      <div className="flex items-center gap-2">
                        <Church className="w-4 h-4 text-gold" />
                        <span className="font-medium text-indigo-deep text-sm">{t.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{t.distance} · {t.walkTime} walk</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Plot availability */}
            {project.plots?.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl font-bold text-indigo-deep flex items-center gap-2">
                    <span className="h-5 w-1 bg-gold rounded-full" /> Plot Availability
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gold hover:text-gold-dark hover:bg-gold/10"
                    onClick={() => {
                      navigate({ name: "home" });
                      setSelectedProjectForPlots(project.slug);
                      setTimeout(() => document.getElementById("plots")?.scrollIntoView({ behavior: "smooth" }), 200);
                    }}
                  >
                    View All {project.plots.length} Plots →
                  </Button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {project.plots.slice(0, 18).map((plot: any) => {
                    const cfg = PLOT_STATUS_CONFIG[plot.status] || PLOT_STATUS_CONFIG.available;
                    return (
                      <div
                        key={plot.id}
                        className={`p-2 rounded-lg border-2 ${cfg.border} bg-white text-center cursor-pointer hover:shadow-md transition-all`}
                        title={`${plot.plotNumber} · ${plot.sizeSqyd} sq.yd · ${formatINRFull(plot.price)}`}
                        onClick={() => { navigate({name:"home"}); setTimeout(() => openBooking(plot.id), 300); }}
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
              </section>
            )}

            {/* Google Map */}
            <section>
              <h2 className="font-display text-2xl font-bold text-indigo-deep mb-4 flex items-center gap-2">
                <span className="h-5 w-1 bg-gold rounded-full" /> Location on Map
              </h2>
              <div className="rounded-2xl overflow-hidden border-2 border-gold/20 shadow-lg">
                <iframe
                  src={`https://www.google.com/maps?q=${project.latitude},${project.longitude}&z=14&output=embed`}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${project.name} location map`}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
                <Navigation className="w-3 h-3 text-gold" /> {project.location} · {project.city}, Uttar Pradesh
              </p>
            </section>

            {/* Testimonials */}
            {project.testimonials && project.testimonials.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-indigo-deep mb-4 flex items-center gap-2">
                  <span className="h-5 w-1 bg-gold rounded-full" /> Resident Voices
                </h2>
                <div className="space-y-3">
                  {project.testimonials.map((t: any) => (
                    <div key={t.id} className="card-luxury rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-cream flex items-center justify-center font-display font-bold flex-shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-indigo-deep text-sm">{t.name}</span>
                            <span className="text-[10px] text-muted-foreground">{t.designation}</span>
                          </div>
                          <div className="flex gap-0.5 mb-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < t.rating ? "fill-gold text-gold" : "text-gold/30"}`} />
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground italic leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <Separator />

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button onClick={() => openLeadForm(project.id)} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12">
                <MessageCircle className="w-4 h-4 mr-2" /> Book Site Visit
              </Button>
              <Button onClick={() => { navigate({name:"home"}); setTimeout(() => openVisit(project.id), 300); }} variant="outline" className="border-gold/40 text-indigo-deep hover:bg-gold/10 h-12">
                <Calendar className="w-4 h-4 mr-2" /> Schedule Visit
              </Button>
              <Button asChild variant="outline" className="border-green-deep/40 text-green-deep hover:bg-green-light/10 h-12">
                <a href={`https://wa.me/918923944689?text=Namaste! I'm interested in ${project.name}`} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
