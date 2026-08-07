"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Maximize, IndianRupee, ArrowRight, Search } from "lucide-react";
import { useApp } from "@/lib/store";
import { navigate } from "@/lib/router";
import { InnerNavbar } from "./inner-navbar";
import { formatINR, PROJECT_STATUS_LABELS, type Project } from "@/lib/types";
import { useState } from "react";

export function ProjectsListingPage() {
  const { } = useApp();
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("All");

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["projects-listing"],
    queryFn: async () => (await fetch("/api/projects")).json().then((j) => j.data),
  });

  const filtered = projects.filter((p) => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchesCity = cityFilter === "All" || p.city === cityFilter;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <InnerNavbar title="All Projects" />

      {/* Hero header */}
      <div className="relative h-48 sm:h-64 bg-spiritual-temple overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-deep to-[#2d1b3d]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream mb-2">All Premium Townships</h1>
            <p className="text-sm text-cream/70 max-w-lg mx-auto px-4">Explore our 4 MVDA-approved gated communities across Vrindavan, Mathura & Govardhan</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-9 pr-4 h-10 rounded-lg border border-gold/25 bg-white text-sm"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Vrindavan", "Mathura", "Govardhan"].map((city) => (
              <button
                key={city}
                onClick={() => setCityFilter(city)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  cityFilter === city ? "bg-gold text-indigo-deep" : "bg-white border border-gold/20 text-indigo-deep hover:border-gold/40"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <Card key={i} className="card-luxury animate-pulse h-64" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const status = PROJECT_STATUS_LABELS[project.status] || PROJECT_STATUS_LABELS.selling;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => navigate({ name: "project", slug: project.slug })}
                  className="cursor-pointer"
                >
                  <Card className="card-luxury group rounded-2xl overflow-hidden h-full">
                    <div className="relative h-52 overflow-hidden">
                      <Image src={project.heroImage} alt={project.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/60 to-transparent" />
                      <Badge className={`absolute top-3 left-3 ${status.color} border-0`}>{status.label}</Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display text-lg font-bold text-indigo-deep mb-1">{project.name}</h3>
                      <p className="text-xs text-gold italic mb-2">{project.tagline}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                        <MapPin className="w-3 h-3 text-gold" /> {project.location}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                        <div><span className="text-muted-foreground">Area:</span> <span className="font-semibold text-indigo-deep">{project.totalAreaAcres} acres</span></div>
                        <div><span className="text-muted-foreground">Price:</span> <span className="font-semibold text-gold">{formatINR(project.priceRangeMin)} - {formatINR(project.priceRangeMax)}</span></div>
                      </div>
                      <Button className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold text-sm h-9">
                        View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
