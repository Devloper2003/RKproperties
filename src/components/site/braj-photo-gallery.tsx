"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Camera, ChevronLeft, ChevronRight, Heart, Share2, Upload } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { BRAJ_PHOTOS } from "@/lib/types";
import { toast } from "sonner";

const CATEGORIES = ["All", "Temple", "Township", "Parikrama", "Landscape"];
const CATEGORY_COLORS: Record<string, string> = {
  Temple: "border-gold/30 text-gold",
  Township: "border-green-light/30 text-green-deep",
  Parikrama: "border-temple-red/30 text-temple-red",
  Landscape: "border-blue-500/30 text-blue-400",
};

export function BrajPhotoGallery() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const filtered = filter === "All" ? BRAJ_PHOTOS : BRAJ_PHOTOS.filter((p) => p.category === filter);

  const toggleLike = (id: string) => {
    const newSet = new Set(liked);
    if (newSet.has(id)) newSet.delete(id);
    else { newSet.add(id); toast.success("❤️ Added to favorites!"); }
    setLiked(newSet);
  };

  const navigate = (dir: number) => {
    if (active === null) return;
    setActive((a) => a !== null ? (a + dir + filtered.length) % filtered.length : null);
  };

  return (
    <section className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sacred Moments"
          title="Braj Dham"
          highlight="Photo Gallery"
          subtitle="Witness the beauty of Braj Dham — temples, townships, parikrama paths, and golden dawns. Every photo captures a moment of Krishna's divine land. Have a photo to share? Submit yours!"
        />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === cat ? "bg-gold text-indigo-deep" : "bg-white border border-gold/20 text-indigo-deep hover:border-gold/40"
              }`}
            >
              {cat} {cat !== "All" && `(${BRAJ_PHOTOS.filter(p => p.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${i % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
              onClick={() => setActive(i)}
            >
              <div className={`relative ${i % 5 === 0 ? "aspect-square sm:aspect-auto sm:h-full" : "aspect-square"}`}>
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-cream">
                <Badge variant="outline" className={`text-[9px] mb-1 ${CATEGORY_COLORS[photo.category] || "border-gold/30 text-gold"}`}>
                  {photo.category}
                </Badge>
                <h4 className="font-display text-xs sm:text-sm font-bold leading-tight">{photo.title}</h4>
                <p className="text-[10px] text-cream/70 flex items-center gap-0.5 mt-0.5">
                  <MapPin className="w-2.5 h-2.5" /> {photo.location}
                </p>
              </div>

              {/* Like button */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleLike(photo.id); }}
                className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  liked.has(photo.id) ? "bg-temple-red/20 text-temple-red" : "bg-cream/20 text-cream/60 hover:bg-cream/30"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${liked.has(photo.id) ? "fill-current" : ""}`} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Upload CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Card className="card-luxury rounded-2xl inline-block">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-gold" />
              </div>
              <div className="text-left">
                <h4 className="font-display text-sm font-bold text-indigo-deep">Have a Braj photo to share?</h4>
                <p className="text-xs text-muted-foreground">Submit your Braj Dham photos — featured photos get prasad!</p>
              </div>
              <Button
                size="sm"
                onClick={() => toast.success("📸 Upload feature coming soon! WhatsApp us your photos.")}
                className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"
              >
                Submit Photo
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {active !== null && filtered[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-indigo-deep/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button onClick={() => setActive(null)} className="absolute top-4 right-4 text-cream/60 hover:text-gold z-10" aria-label="Close">
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/10 text-cream hover:bg-gold hover:text-indigo-deep flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <motion.div
              key={active}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                <Image
                  src={filtered[active].image}
                  alt={filtered[active].title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="text-center text-cream">
                <Badge variant="outline" className={`mb-2 ${CATEGORY_COLORS[filtered[active].category] || "border-gold/30 text-gold"}`}>
                  {filtered[active].category}
                </Badge>
                <h3 className="font-display text-xl font-bold mb-1">{filtered[active].title}</h3>
                <p className="text-sm text-cream/70 max-w-lg mx-auto mb-2">{filtered[active].desc}</p>
                <div className="flex items-center justify-center gap-4 text-xs text-cream/50">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-gold" /> {filtered[active].location}</span>
                  <span className="flex items-center gap-1"><Camera className="w-3 h-3 text-gold" /> {filtered[active].photographer}</span>
                </div>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream/10 text-cream hover:bg-gold hover:text-indigo-deep flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
