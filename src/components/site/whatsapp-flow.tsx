"use client";

import { motion } from "framer-motion";
import { MessageCircle, User, Bot, ArrowRight, Clock, FileText, Calculator, Bell, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { WHATSAPP_FLOW_STEPS } from "@/lib/types";

const STEP_ICONS = [User, MessageCircle, FileText, Calculator, Bot, Clock, CheckCircle2, Bell];

const MODE_COLORS: Record<string, string> = {
  "Auto": "bg-green-light/15 text-green-light border-green-light/30",
  "Auto→Human": "bg-gold/15 text-gold border-gold/30",
  "Auto (1x only)": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "Auto (1hr before)": "bg-blue-500/15 text-blue-300 border-blue-500/30",
};

export function WhatsappFlow() {
  return (
    <section className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Communication Journey"
          title="WhatsApp"
          highlight="Automation Flow"
          subtitle="85% of our lead communication happens on WhatsApp. Here's the 8-step automated journey every inquiry takes — from first namaste to site visit reminder, with seamless human handoff."
        />

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent sm:-translate-x-1/2" />

          <div className="space-y-6">
            {WHATSAPP_FLOW_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i] || MessageCircle;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex items-start gap-4 sm:gap-8 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Step number node */}
                  <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center shadow-[0_0_20px_rgba(197,162,62,0.3)] border-2 border-cream">
                      <Icon className="w-5 h-5 text-indigo-deep" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-deep text-gold text-[10px] font-bold flex items-center justify-center border border-gold/30">
                      {step.step}
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`ml-16 sm:ml-0 flex-1 ${isLeft ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                    <Card className="card-luxury rounded-xl inline-block max-w-md text-left">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                              Step {step.step}
                            </div>
                            <h4 className="font-display text-sm font-bold text-indigo-deep leading-tight">
                              {step.trigger}
                            </h4>
                          </div>
                          <Badge variant="outline" className="text-[10px] border-gold/30 text-gold">
                            {step.type}
                          </Badge>
                        </div>

                        {/* Chat bubble preview */}
                        <div className={`p-2.5 rounded-lg text-xs mb-2 ${
                          step.mode.includes("Human")
                            ? "bg-temple-red/10 text-temple-red border border-temple-red/20"
                            : "bg-green-light/10 text-green-deep border border-green-light/20"
                        }`}>
                          <div className="flex items-start gap-1.5">
                            {step.mode.includes("Human") ? (
                              <User className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Bot className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            )}
                            <span className="italic">&ldquo;{step.content}&rdquo;</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={`text-[9px] ${MODE_COLORS[step.mode] || "bg-muted text-muted-foreground"}`}>
                            {step.mode}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" /> Instant
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for the other half */}
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
            className="relative flex justify-center mt-8 ml-16 sm:ml-0"
          >
            <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 -top-4">
              <div className="w-10 h-10 rounded-full bg-green-light flex items-center justify-center border-2 border-cream shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-cream" />
              </div>
            </div>
            <div className="mt-12 text-center">
              <p className="text-sm font-medium text-indigo-deep">Lead converted → Booking confirmed 🎉</p>
              <p className="text-xs text-muted-foreground mt-1">Average journey: 7-14 days from first WhatsApp to booking</p>
            </div>
          </motion.div>
        </div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Avg Response Time", value: "< 30 sec", icon: Clock },
            { label: "WhatsApp Conversion", value: "30%", icon: ArrowRight },
            { label: "Messages/Day", value: "1000+", icon: MessageCircle },
            { label: "Human Handoff Rate", value: "15%", icon: User },
          ].map((stat) => (
            <Card key={stat.label} className="card-luxury rounded-xl text-center">
              <CardContent className="p-4">
                <stat.icon className="w-5 h-5 text-gold mx-auto mb-1.5" />
                <div className="font-display text-lg font-bold text-indigo-deep">{stat.value}</div>
                <div className="text-[11px] text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
