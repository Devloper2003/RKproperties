"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Share2, Phone, Navigation, Sparkles, Clock } from "lucide-react";
import { useApp } from "@/lib/store";
import type { Temple } from "@/lib/types";
import { toast } from "sonner";
import { navigate } from "@/lib/router";

export function TemplePageView() {
  const { templePageSlug, closeTemplePage } = useApp();

  const { data: temple, isLoading } = useQuery<Temple | null>({
    queryKey: ["temple-page", templePageSlug],
    queryFn: async () => {
      if (!templePageSlug) return null;
      const res = await fetch(`/api/temples`);
      const json = await res.json();
      return json.data.find((t: Temple) => t.slug === templePageSlug) || null;
    },
    enabled: !!templePageSlug,
  });

  if (!templePageSlug) return null;

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-spiritual-temple border-b border-gold/20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">
        <button onClick={() => navigate({name:"home"})} className="flex items-center gap-2 text-sm font-medium text-cream hover:text-gold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <Button onClick={() => toast.success("🔗 Link copied!")} size="sm" variant="ghost" className="text-cream/60 hover:text-gold p-2">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-40">
          <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      )}

      {temple && (
        <div className="pb-20">
          {/* Hero image */}
          <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
            <Image src={temple.image} alt={temple.name} fill sizes="100vw" priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep via-indigo-deep/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <Badge className="bg-gold/20 text-gold border-0 mb-2">Sacred Temple</Badge>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream mb-1">{temple.name}</h1>
              <p className="text-cream/80 text-sm flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {temple.location}
                {temple.distanceFromVrindavan && <span> · {temple.distanceFromVrindavan}</span>}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Significance */}
            <div className="card-luxury-dark rounded-2xl bg-spiritual-temple p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-gold mb-1">Spiritual Significance</div>
                  <p className="text-sm text-cream leading-relaxed">{temple.significance}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="font-display text-2xl font-bold text-indigo-deep mb-3 flex items-center gap-2">
                <span className="h-5 w-1 bg-gold rounded-full" /> About this Sacred Place
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{temple.longDescription}</p>
            </section>

            {/* Google Map */}
            <section>
              <h2 className="font-display text-2xl font-bold text-indigo-deep mb-4 flex items-center gap-2">
                <span className="h-5 w-1 bg-gold rounded-full" /> Location on Map
              </h2>
              <div className="rounded-2xl overflow-hidden border-2 border-gold/20 shadow-lg">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(temple.name + " " + temple.location)}&z=15&output=embed`}
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${temple.name} location map`}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-1">
                <Navigation className="w-3 h-3 text-gold" /> {temple.location}
              </p>
            </section>

            {/* CTA */}
            <div className="mt-8 p-6 rounded-2xl bg-spiritual-temple text-center">
              <h3 className="font-display text-xl font-bold text-cream mb-2">Want to visit this temple?</h3>
              <p className="text-sm text-cream/70 mb-4">Our team arranges guided temple tours for site visitors.</p>
              <Button asChild className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">
                <a href={`https://wa.me/918923944689?text=Namaste! I want to visit ${temple.name}`} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" /> Plan a Visit via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
