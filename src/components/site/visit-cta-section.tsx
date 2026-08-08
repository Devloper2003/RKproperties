"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Car, Video, Clock, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";

const VISIT_OPTIONS = [
  { icon: Car, title: "Physical Visit", desc: "Walk through the township in person. Complimentary pickup from Mathura/Vrindavan station.", color: "text-gold" },
  { icon: Video, title: "Video Tour", desc: "Live WhatsApp video walkthrough with a property advisor showing plots, amenities & surroundings.", color: "text-green-deep" },
  { icon: Clock, title: "Quick 30-min", desc: "Short focused visit for busy professionals. See the specific plots you're interested in.", color: "text-temple-red" },
];

export function VisitCtaSection() {
  const { openVisit } = useApp();

  return (
    <section className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience in Person"
          title="Book Your"
          highlight="Sacred Site Visit"
          subtitle="A plot is more than dimensions on paper — it's the feeling of standing on your future spiritual home. Schedule a visit and let Braj Dham speak to your heart."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Image with overlay */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden card-luxury"
          >
            <Image
              src="/images/township-aerial.png"
              alt="Aerial view of premium Braj township"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-cream">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gold" />
                <span className="text-xs uppercase tracking-wider text-gold">Braj Dham · Vrindavan</span>
              </div>
              <h3 className="font-display text-xl font-bold">Where your spiritual story begins</h3>
              <p className="text-xs text-cream/70 mt-1">Walk the same land where Krishna once walked</p>
            </div>
            {/* Floating badge */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gold/90 backdrop-blur-sm text-indigo-deep text-xs font-bold flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              Same-day available
            </div>
          </motion.div>

          {/* Right: Visit options + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-3"
          >
            {VISIT_OPTIONS.map((opt, i) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="card-luxury rounded-xl">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <opt.icon className={`w-5 h-5 ${opt.color}`} />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-indigo-deep">{opt.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{opt.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* CTA */}
            <div className="pt-3 space-y-2">
              <Button
                onClick={() => openVisit()}
                className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12 text-base"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Your Visit
              </Button>
              <a
                href="tel:+918923944689"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md border border-gold/30 text-indigo-deep text-sm font-medium hover:bg-gold/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                Or call +91 89239 44689
              </a>
            </div>

            <p className="text-[11px] text-muted-foreground text-center pt-1">
              🙏 All visits include free refreshments, spiritual gift, and expert guidance.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
