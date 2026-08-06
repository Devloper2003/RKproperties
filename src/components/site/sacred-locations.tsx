"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { SectionHeading } from "./section-heading";

const LOCATIONS = [
  {
    name: "Vrindavan",
    sanskrit: "वृन्दावन",
    significance: "Krishna's childhood playground — home to Banke Bihari, ISKCON & Prem Mandir",
    projects: 2,
    image: "/images/temples/banke-bihari.png",
    accent: "from-gold/20",
  },
  {
    name: "Mathura",
    sanskrit: "मथुरा",
    significance: "The divine birthplace of Lord Krishna — spiritual heart of Braj Dham",
    projects: 1,
    image: "/images/temples/banke-bihari.png",
    accent: "from-green-light/20",
  },
  {
    name: "Govardhan",
    sanskrit: "गोवर्धन",
    significance: "Where Krishna lifted Giriraj — the most sacred parikrama in Braj",
    projects: 1,
    image: "/images/temples/govardhan.png",
    accent: "from-temple-red/20",
  },
];

export function SacredLocations() {
  return (
    <section className="py-20 lg:py-28 bg-marble relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sacred Cities"
          title="Three Divine Cities of"
          highlight="Braj Dham"
          subtitle="Each city in Braj holds a unique spiritual significance. Our townships are placed where devotion meets daily life — walking distance to the temples that define Braj."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="card-luxury group relative overflow-hidden rounded-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={loc.image}
                  alt={`${loc.name} temple`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/30 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold/90 text-indigo-deep text-xs font-semibold">
                  {loc.projects} {loc.projects === 1 ? "Project" : "Projects"}
                </div>
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="font-devanagari text-gold text-sm mb-1">{loc.sanskrit}</p>
                  <h3 className="font-display text-3xl font-bold text-cream">{loc.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{loc.significance}</p>
                <a
                  href="#projects"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Explore {loc.name} townships
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
