"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Quote, MapPin, Star, X } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { VIDEO_TESTIMONIALS } from "@/lib/types";

export function VideoTestimonials() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Resident Stories"
          title="Hear from our"
          highlight="Devotee-Residents"
          subtitle="Real families. Real journeys. Real spiritual transformations. Watch our residents share their Braj Dham homecoming stories in their own words."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VIDEO_TESTIMONIALS.map((video, i) => (
            <motion.div
              key={video.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Card
                className="card-luxury rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setActive(i)}
              >
                {/* Thumbnail with play */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/20 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="w-16 h-16 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center pulse-divine shadow-2xl"
                    >
                      <Play className="w-7 h-7 text-indigo-deep ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Duration badge */}
                  <Badge className="absolute bottom-3 right-3 bg-cream/95 text-indigo-deep border-0 font-mono text-xs">
                    {video.duration}
                  </Badge>

                  {/* Quote overlay */}
                  <div className="absolute bottom-3 left-3 right-16">
                    <Quote className="w-4 h-4 text-gold/70 mb-1" />
                    <p className="text-xs text-cream/90 italic line-clamp-2 leading-snug">
                      &ldquo;{video.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-cream flex items-center justify-center font-display font-bold flex-shrink-0">
                      {video.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-bold text-indigo-deep truncate">{video.name}</h3>
                      <p className="text-[11px] text-muted-foreground truncate">{video.role}</p>
                    </div>
                    <div className="flex flex-shrink-0">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gold/10 flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold" /> {video.location}
                    </span>
                    <Badge variant="outline" className="text-[9px] border-gold/30 text-gold">
                      {video.project}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: "500+", label: "Happy Families" },
            { value: "4.9/5", label: "Resident Rating" },
            { value: "92%", label: "Would Recommend" },
            { value: "3", label: "Cities Served" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-marble">
              <div className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Video player modal (mock) */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-indigo-deep/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-video bg-spiritual-temple">
                <Image
                  src={VIDEO_TESTIMONIALS[active].thumbnail}
                  alt={VIDEO_TESTIMONIALS[active].name}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-60"
                />
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream/20 backdrop-blur-sm text-cream hover:bg-gold hover:text-indigo-deep flex items-center justify-center z-10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-cream">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center mx-auto mb-4 cursor-pointer"
                    >
                      <Play className="w-9 h-9 text-indigo-deep ml-1" fill="currentColor" />
                    </motion.div>
                    <p className="text-sm text-cream/80 max-w-md mx-auto px-4">
                      &ldquo;{VIDEO_TESTIMONIALS[active].quote}&rdquo;
                    </p>
                    <p className="text-xs text-gold mt-2">— {VIDEO_TESTIMONIALS[active].name}</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-indigo-deep">{VIDEO_TESTIMONIALS[active].name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {VIDEO_TESTIMONIALS[active].role} · {VIDEO_TESTIMONIALS[active].location}
                    </p>
                  </div>
                  <Badge className="bg-gold/15 text-gold border-0">{VIDEO_TESTIMONIALS[active].project}</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mt-3 text-center">
                  📱 This is a demo video player. In production, this would play the resident's recorded testimonial via YouTube/Vimeo embed.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
