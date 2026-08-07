"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Navigation } from "lucide-react";
import { navigate } from "@/lib/router";
import { InnerNavbar } from "./inner-navbar";
import type { Temple } from "@/lib/types";

export function TemplesListingPage() {
  const { data: temples = [], isLoading } = useQuery<Temple[]>({
    queryKey: ["temples-listing"],
    queryFn: async () => (await fetch("/api/temples")).json().then((j) => j.data),
  });

  return (
    <div className="min-h-screen bg-cream">
      <InnerNavbar title="Sacred Temples" />

      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-indigo-deep to-[#2d1b3d] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream mb-2">Sacred Temples of Braj</h1>
          <p className="text-sm text-cream/70 max-w-lg mx-auto px-4">Explore the divine temples near our townships</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">Loading temples...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {temples.map((temple, i) => (
              <motion.div key={temple.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} onClick={() => navigate({ name: "temple", slug: temple.slug })} className="cursor-pointer">
                <Card className="card-luxury group rounded-2xl overflow-hidden h-full">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={temple.image} alt={temple.name} fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <h3 className="font-display text-lg font-bold text-cream">{temple.name}</h3>
                      <p className="text-xs text-cream/70 flex items-center gap-1"><MapPin className="w-3 h-3" /> {temple.location}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground line-clamp-2">{temple.significance}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
