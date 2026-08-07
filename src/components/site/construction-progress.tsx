"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Loader2, Calendar, Camera, MapPin } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { CONSTRUCTION_MILESTONES } from "@/lib/types";
import { toast } from "sonner";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: any }> = {
  completed: { label: "Completed", color: "text-green-deep", bg: "bg-green-light/10", border: "border-green-light/40", icon: CheckCircle2 },
  "in-progress": { label: "In Progress", color: "text-gold", bg: "bg-gold/10", border: "border-gold/40", icon: Loader2 },
  upcoming: { label: "Upcoming", color: "text-muted-foreground", bg: "bg-muted/10", border: "border-muted-foreground/30", icon: Clock },
};

export function ConstructionProgress() {
  const [selectedProject, setSelectedProject] = useState("bankey-bihari-dham");

  const completed = CONSTRUCTION_MILESTONES.filter((m) => m.status === "completed").length;
  const total = CONSTRUCTION_MILESTONES.length;
  const progress = (completed / total) * 100;

  const projects = [
    { slug: "bankey-bihari-dham", name: "Bankey Bihari Dham", phase: "Pre-Launch → Construction" },
    { slug: "bankey-bihari-orchid", name: "Bankey Bihari Orchid", phase: "Selling → Near Handover" },
    { slug: "braj-lotus-greens", name: "Braj Lotus Greens", phase: "Selling → Mid-Construction" },
    { slug: "bankey-bihari-kunj", name: "Bankey Bihari Kunj", phase: "Selling → Final Phase" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Build Transparency"
          title="Construction"
          highlight="Progress Tracker"
          subtitle="Watch your future home take shape. Real-time construction milestones, photo updates, and handover timelines for every RK Properties township. We believe in complete transparency."
        />

        {/* Project selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {projects.map((p) => (
            <button
              key={p.slug}
              onClick={() => setSelectedProject(p.slug)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedProject === p.slug
                  ? "bg-gold text-indigo-deep"
                  : "bg-white border border-gold/20 text-indigo-deep hover:border-gold/40"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Overall progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card className="card-luxury-dark rounded-2xl bg-spiritual-temple">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-cream">
                    {projects.find((p) => p.slug === selectedProject)?.name}
                  </h3>
                  <p className="text-xs text-cream/60">{projects.find((p) => p.slug === selectedProject)?.phase}</p>
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl font-bold text-gold">{Math.round(progress)}%</div>
                  <div className="text-[10px] text-cream/60">Complete</div>
                </div>
              </div>
              <Progress value={progress} className="h-2 bg-cream/10 [&>div]:bg-gradient-to-r [&>div]:from-gold-light [&>div]:to-gold" />
              <div className="flex justify-between text-[10px] text-cream/50 mt-2">
                <span>{completed} of {total} milestones completed</span>
                <span>Est. handover: Dec 2027</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent sm:-translate-x-1/2" />

          <div className="space-y-4">
            {CONSTRUCTION_MILESTONES.map((milestone, i) => {
              const cfg = STATUS_CONFIG[milestone.status];
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={milestone.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.06 }}
                  className={`relative flex items-start gap-4 sm:gap-8 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${cfg.border} bg-cream shadow-lg`}>
                      <span className="text-xl">{milestone.icon}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`ml-16 sm:ml-0 flex-1 ${isLeft ? "sm:pr-12" : "sm:pl-12"}`}>
                    <Card className={`card-luxury rounded-xl ${cfg.bg} border ${cfg.border}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="font-display text-sm font-bold text-indigo-deep">{milestone.phase}</h4>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Calendar className="w-2.5 h-2.5" /> {milestone.date}
                            </span>
                          </div>
                          <Badge variant="outline" className={`${cfg.border} ${cfg.color} text-[9px] flex items-center gap-1`}>
                            <cfg.icon className={`w-2.5 h-2.5 ${milestone.status === "in-progress" ? "animate-spin" : ""}`} />
                            {cfg.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-indigo-deep/80 leading-relaxed mb-3">{milestone.desc}</p>

                        {/* Photo button for completed/in-progress */}
                        {milestone.status !== "upcoming" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toast.info(`📸 Loading construction photos for ${milestone.phase}...`)}
                            className="text-[11px] text-gold hover:text-gold-dark hover:bg-gold/10 h-7 p-0"
                          >
                            <Camera className="w-3 h-3 mr-1" /> View Photos
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="hidden sm:block flex-1" />
                </motion.div>
              );
            })}
          </div>

          {/* End node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center mt-6 ml-16 sm:ml-0"
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-light flex items-center justify-center mx-auto border-2 border-cream shadow-lg">
                <span className="text-2xl">🎉</span>
              </div>
              <p className="text-sm font-medium text-indigo-deep mt-2">Handover & Possession</p>
              <p className="text-xs text-muted-foreground">Dec 2027</p>
            </div>
          </motion.div>
        </div>

        {/* Resident note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card className="card-luxury rounded-2xl">
            <CardContent className="p-5 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <h4 className="font-display text-sm font-bold text-indigo-deep">Already a resident?</h4>
                  <p className="text-xs text-muted-foreground">Access detailed progress photos & documents in your portal</p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  const communitySec = document.getElementById("community");
                  communitySec?.scrollIntoView({ behavior: "smooth" });
                }}
                className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold"
              >
                Resident Portal
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
