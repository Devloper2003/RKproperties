"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Maximize, IndianRupee, ArrowRight, BadgeCheck, GitCompare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import { formatINR, PROJECT_STATUS_LABELS, type Project } from "@/lib/types";

export function ProjectsShowcase() {
  const setSelectedProjectSlug = useApp((s) => s.setSelectedProjectSlug);
  const openLeadForm = useApp((s) => s.openLeadForm);
  const toggleCompare = useApp((s) => s.toggleCompare);
  const isComparing = useApp((s) => s.isComparing);
  const setCompareOpen = useApp((s) => s.setCompareOpen);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/projects");
      const json = await res.json();
      return json.data;
    },
  });

  return (
    <section id="projects" className="py-20 lg:py-28 bg-cream relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Premium Townships"
          title="Four Sacred"
          highlight="Gated Communities"
          subtitle="Each BrajProperty township is crafted with temple-themed architecture, MVDA-approved legal security, and modern amenities — your spiritual home awaits."
        />

        {/* Compare hint */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-xs text-indigo-deep">
            <GitCompare className="w-3.5 h-3.5 text-gold" />
            <span>Tip: Click <strong className="text-gold">Compare</strong> on any project to compare up to 3 side-by-side</span>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card-luxury rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-marble" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-marble rounded w-3/4" />
                  <div className="h-4 bg-marble rounded w-full" />
                  <div className="h-4 bg-marble rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {projects.map((project, i) => {
              const statusInfo = PROJECT_STATUS_LABELS[project.status] || PROJECT_STATUS_LABELS.selling;
              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="card-luxury group rounded-2xl overflow-hidden flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.heroImage}
                      alt={project.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/60 to-transparent" />
                    <Badge
                      className={`absolute top-3 left-3 ${statusInfo.color} border-0 font-semibold`}
                    >
                      {statusInfo.label}
                    </Badge>
                    {/* Compare toggle */}
                    <button
                      onClick={() => toggleCompare(project.slug)}
                      aria-label={isComparing(project.slug) ? "Remove from comparison" : "Add to comparison"}
                      className={`absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${
                        isComparing(project.slug)
                          ? "bg-gold text-indigo-deep ring-gold-glow"
                          : "bg-cream/90 text-indigo-deep hover:bg-gold"
                      }`}
                    >
                      <GitCompare className="w-3 h-3" />
                      {isComparing(project.slug) ? "Comparing" : "Compare"}
                    </button>
                    {project.isFeatured && (
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-gold text-indigo-deep text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3" />
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-xl font-bold text-indigo-deep leading-tight">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-gold font-medium italic">{project.tagline}</p>
                    <p className="mt-3 text-xs text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      {project.location}
                    </p>

                    <div className="mt-5 space-y-2 text-sm">
                      <div className="flex items-center justify-between py-1.5 border-b border-gold/10">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Maximize className="w-3.5 h-3.5" /> Area
                        </span>
                        <span className="font-semibold text-indigo-deep">{project.totalAreaAcres} acres</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-gold/10">
                        <span className="text-muted-foreground">Plot Size</span>
                        <span className="font-semibold text-indigo-deep">
                          {project.minPlotSize}–{project.maxPlotSize} sq.yd
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-gold/10">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <IndianRupee className="w-3.5 h-3.5" /> Price
                        </span>
                        <span className="font-semibold text-gold">
                          {formatINR(project.priceRangeMin)} – {formatINR(project.priceRangeMax)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-muted-foreground">Plots</span>
                        <span className="font-semibold text-indigo-deep">{project.plotCount || 0} available</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-5 flex gap-2">
                      <Button
                        onClick={() => setSelectedProjectSlug(project.slug)}
                        className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold hover:shadow-[0_4px_14px_rgba(197,162,62,0.4)]"
                        size="sm"
                      >
                        View Details
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                      <Button
                        onClick={() => openLeadForm(project.id)}
                        variant="outline"
                        size="sm"
                        className="border-gold/40 text-indigo-deep hover:bg-gold/10"
                      >
                        Enquire
                      </Button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
