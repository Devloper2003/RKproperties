"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, X, ChevronRight, ChevronLeft, MapPin, Compass, Camera } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import { TOUR_STOPS, type Project } from "@/lib/types";

export function VirtualTourSection() {
  const { openTour } = useApp();
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => (await fetch("/api/projects")).json().then((j) => j.data),
  });

  return (
    <section id="tour" className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Immersive Experience"
          title="Take a Virtual"
          highlight="Spiritual Tour"
          subtitle="Can't visit in person? Explore our townships from the comfort of your home. Walk through the grand entrances, temple complexes, gardens, and premium plots — all in immersive 360° style."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card
                className="card-luxury rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => openTour(project.slug)}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={project.heroImage}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/30 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center pulse-divine"
                    >
                      <Play className="w-7 h-7 text-indigo-deep ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Tour duration badge */}
                  <Badge className="absolute top-3 right-3 bg-cream/95 text-indigo-deep border-0">
                    <Camera className="w-3 h-3 mr-1" /> 6 stops
                  </Badge>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-display text-lg font-bold text-cream leading-tight">{project.name}</h3>
                    <p className="text-[11px] text-cream/70 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {project.city}
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-gold group-hover:text-gold-dark">
                    Start Virtual Tour
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VirtualTourModal() {
  const { tourOpen, tourProjectSlug, closeTour } = useApp();
  const [activeStop, setActiveStop] = useState(0);

  const { data: project } = useQuery<Project | null>({
    queryKey: ["project-tour", tourProjectSlug],
    queryFn: async () => {
      if (!tourProjectSlug) return null;
      const res = await fetch(`/api/projects/${tourProjectSlug}`);
      return res.json().then((j) => j.data);
    },
    enabled: !!tourProjectSlug,
  });

  const goNext = () => setActiveStop((s) => (s + 1) % TOUR_STOPS.length);
  const goPrev = () => setActiveStop((s) => (s - 1 + TOUR_STOPS.length) % TOUR_STOPS.length);

  const stop = TOUR_STOPS[activeStop];

  return (
    <Dialog open={tourOpen} onOpenChange={(o) => !o && closeTour()}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[92vh] p-0 gap-0 overflow-hidden bg-cream rounded-2xl">
        {/* Hero image area */}
        <div className="relative h-72 sm:h-96 bg-spiritual-temple overflow-hidden">
          {project && (
            <Image
              src={project.galleryImages?.[activeStop % (project.galleryImages?.length || 1)] || project.heroImage}
              alt={stop?.label}
              fill
              sizes="95vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep via-indigo-deep/30 to-transparent" />

          <button
            onClick={closeTour}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-indigo-deep/60 text-cream hover:bg-indigo-deep/80 flex items-center justify-center z-10"
            aria-label="Close tour"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Stop label */}
          <div className="absolute bottom-6 left-6 right-6 text-cream">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{stop?.icon}</span>
              <span className="text-xs uppercase tracking-[0.25em] text-gold">
                Stop {activeStop + 1} of {TOUR_STOPS.length}
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">{stop?.label}</h3>
            <p className="text-sm text-cream/70 mt-1">{stop?.desc}</p>
          </div>

          {/* Nav arrows */}
          <button
            onClick={goPrev}
            aria-label="Previous stop"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/20 backdrop-blur-sm text-cream hover:bg-gold hover:text-indigo-deep flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next stop"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/20 backdrop-blur-sm text-cream hover:bg-gold hover:text-indigo-deep flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Stop selector */}
        <div className="p-5 bg-marble border-b border-gold/15">
          <div className="flex items-center gap-2 overflow-x-auto scroll-luxury pb-1">
            {TOUR_STOPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveStop(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all flex-shrink-0 ${
                  i === activeStop
                    ? "tour-stop-active border-gold/60"
                    : "bg-white border-gold/15 hover:border-gold/30"
                }`}
              >
                <span className="text-lg">{s.icon}</span>
                <span className={`text-xs font-medium ${i === activeStop ? "text-gold" : "text-indigo-deep"}`}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Project info */}
        <div className="p-6">
          {project && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="font-display text-lg font-bold text-indigo-deep">{project.name}</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Compass className="w-3 h-3 text-gold" /> {project.location}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    closeTour();
                    useApp.getState().openProjectPage(project.slug);
                  }}
                  className="border-gold/30 text-indigo-deep hover:bg-gold/10"
                >
                  Project Details
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    closeTour();
                    useApp.getState().openLeadForm(project.id);
                  }}
                  className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"
                >
                  Book Real Visit
                </Button>
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-4 text-center">
            📱 Prefer a live video walkthrough? WhatsApp our team for a personalized virtual tour with a property advisor.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
