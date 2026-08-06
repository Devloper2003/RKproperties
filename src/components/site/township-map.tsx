"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import type { Temple, Project } from "@/lib/types";

// Stylized Braj region map positions (approx %)
const CITY_POSITIONS: Record<string, { x: number; y: number }> = {
  Mathura: { x: 32, y: 52 },
  Vrindavan: { x: 48, y: 42 },
  Govardhan: { x: 22, y: 70 },
};

export function TownshipMap() {
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
          {/* Stylized SVG map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square max-w-lg mx-auto w-full"
          >
            <div className="absolute inset-0 rounded-full bg-spiritual-dawn opacity-20 blur-3xl" />
            <svg viewBox="0 0 400 400" className="relative w-full h-full">
              {/* Yamuna river curve */}
              <path
                d="M 50 50 Q 150 150 180 220 T 350 380"
                stroke="#87CEEB"
                strokeWidth="3"
                fill="none"
                opacity="0.4"
                strokeLinecap="round"
              />
              <text x="60" y="45" fill="#87CEEB" fontSize="10" opacity="0.7" fontStyle="italic">
                Yamuna Ji
              </text>

              {/* Govardhan hill arc */}
              <path
                d="M 40 280 Q 90 240 140 290"
                stroke="#4A7A2E"
                strokeWidth="4"
                fill="none"
                opacity="0.5"
                strokeLinecap="round"
              />
              <text x="50" y="320" fill="#4A7A2E" fontSize="10" opacity="0.8" fontStyle="italic">
                Giriraj
              </text>

              {/* City pins */}
              {Object.entries(CITY_POSITIONS).map(([city, pos]) => {
                const cityProjects = projects.filter((p) => p.city.toLowerCase() === city.toLowerCase());
                return (
                  <g key={city}>
                    {/* Pulsing ring */}
                    <circle cx={pos.x * 4} cy={pos.y * 4} r="20" fill="#C5A23E" opacity="0.15">
                      <animate attributeName="r" values="20;32;20" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={pos.x * 4} cy={pos.y * 4} r="8" fill="#C5A23E" />
                    <circle cx={pos.x * 4} cy={pos.y * 4} r="3" fill="#1A1A2E" />
                    <text
                      x={pos.x * 4}
                      y={pos.y * 4 - 14}
                      textAnchor="middle"
                      fill="#1A1A2E"
                      fontSize="13"
                      fontWeight="700"
                      fontFamily="Playfair Display, serif"
                    >
                      {city}
                    </text>
                    <text
                      x={pos.x * 4}
                      y={pos.y * 4 + 22}
                      textAnchor="middle"
                      fill="#8B6914"
                      fontSize="9"
                      fontWeight="600"
                    >
                      {cityProjects.length} {cityProjects.length === 1 ? "township" : "townships"}
                    </text>
                  </g>
                );
              })}

              {/* Connecting pilgrimage route */}
              <path
                d="M 128 208 Q 160 180 192 168 Q 200 200 88 280"
                stroke="#C5A23E"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
                opacity="0.5"
              />
            </svg>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground flex items-center gap-1.5">
              <Navigation className="w-3 h-3 text-gold" />
              Stylized map of sacred Braj Dham region
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
                  <Card className="card-luxury rounded-2xl overflow-hidden">
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
