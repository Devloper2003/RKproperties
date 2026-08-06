"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Navigation, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import type { Temple, Project } from "@/lib/types";

// Stylized Braj region map positions (approx %)
const CITY_POSITIONS: Record<string, { x: number; y: number }> = {
  Mathura: { x: 32, y: 52 },
  Vrindavan: { x: 48, y: 42 },
  Govardhan: { x: 22, y: 70 },
};

export function TownshipMap() {
  const { openTemplePage } = useApp();
  const { data: temples = [] } = useQuery<Temple[]>({
    queryKey: ["temples"],
    queryFn: async () => (await fetch("/api/temples")).json().then((j) => j.data),
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => (await fetch("/api/projects")).json().then((j) => j.data),
  });

  return (
    <section className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sacred Geography"
          title="Explore the Land of"
          highlight="Braj Dham"
          subtitle="Three sacred cities, four premium townships, and 50+ ancient temples — all within the spiritual heartland where Lord Krishna once walked."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Real Google Map of Braj Dham region */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square max-w-lg mx-auto w-full"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden border-4 border-gold/30 shadow-2xl">
              <iframe
                src="https://www.google.com/maps?q=Vrindavan,Mathura,Uttar+Pradesh&z=10&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Braj Dham region map - Vrindavan, Mathura, Govardhan"
                className="w-full h-full"
              />
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground flex items-center gap-1.5 bg-cream/90 px-3 py-1.5 rounded-full shadow-md">
              <Navigation className="w-3 h-3 text-gold" />
              Real map of Braj Dham · Vrindavan · Mathura · Govardhan
            </div>
          </motion.div>

          {/* Temples list */}
          <div>
            <h3 className="font-display text-2xl font-bold text-indigo-deep mb-6 flex items-center gap-2">
              <span className="h-5 w-1 bg-gold rounded-full" /> Sacred Temples Nearby
            </h3>
            <div className="space-y-4 max-h-[480px] overflow-y-auto scroll-luxury pr-2">
              {(temples.length ? temples : []).slice(0, 3).map((temple, i) => (
                <motion.div
                  key={temple.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <Card className="card-luxury rounded-2xl overflow-hidden cursor-pointer" onClick={() => openTemplePage(temple.slug)}>
                    <div className="flex gap-4">
                      <div className="relative w-28 h-28 flex-shrink-0">
                        <Image
                          src={temple.image}
                          alt={temple.name}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4 flex-1">
                        <h4 className="font-display text-lg font-bold text-indigo-deep">{temple.name}</h4>
                        <p className="text-xs text-gold flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {temple.location}
                          {temple.distanceFromVrindavan && ` · ${temple.distanceFromVrindavan}`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{temple.significance}</p>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
