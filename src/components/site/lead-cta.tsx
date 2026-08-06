"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Sparkles } from "lucide-react";
import type { Project } from "@/lib/types";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  projectId: z.string().optional(),
  budget: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const BUDGETS = ["5-10 Lakh", "10-15 Lakh", "15-20 Lakh", "20+ Lakh", "Not sure yet"];

export function LeadCta() {
  const [submitting, setSubmitting] = useState(false);
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => (await fetch("/api/projects")).json().then((j) => j.data),
  });

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          source: "website",
          projectId: data.projectId || undefined,
          budgetRange: data.budget || undefined,
          notes: "Lead from homepage CTA section",
        }),
      });
      if (res.ok) {
        toast.success("🙏 Namaste! Our property advisor will call you within 30 minutes.");
        reset();
      } else {
        toast.error("Something went wrong. Please try WhatsApp instead.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-dark via-gold to-gold-light" />
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="lotus-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#1A1A2E" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="#1A1A2E" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#lotus-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          <div className="text-indigo-deep">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-deep/10 mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold tracking-wider uppercase">Begin Your Journey</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Begin Your Spiritual
              <br />
              Home Journey Today
            </h2>
            <p className="text-indigo-deep/80 text-base sm:text-lg leading-relaxed mb-6">
              Namaste 🙏 Share your details and our property advisor will personally guide you to your sacred plot in Braj Dham. <strong>Response within 30 minutes.</strong>
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">✓ Free site visit arrangement</div>
              <div className="flex items-center gap-2">✓ Complete legal documentation walkthrough</div>
              <div className="flex items-center gap-2">✓ EMI & financing assistance</div>
              <div className="flex items-center gap-2">✓ WhatsApp +91 98370 12345</div>
            </div>
          </div>

          {/* Form card */}
          <div className="bg-cream rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(26,26,46,0.25)]">
            <h3 className="font-display text-xl font-bold text-indigo-deep mb-1">Request a Callback</h3>
            <p className="text-xs text-muted-foreground mb-5">We respect your privacy. No spam, ever.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name *"
                  className="bg-white border-gold/25 h-11"
                  {...register("name")}
                />
                {errors.name && <p className="text-xs text-temple-red mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Input
                  placeholder="Phone Number *"
                  className="bg-white border-gold/25 h-11"
                  {...register("phone")}
                />
                {errors.phone && <p className="text-xs text-temple-red mt-1">{errors.phone.message}</p>}
              </div>
              <Select onValueChange={(v) => setValue("projectId", v)}>
                <SelectTrigger className="bg-white border-gold/25 h-11">
                  <SelectValue placeholder="Interested Project (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select onValueChange={(v) => setValue("budget", v)}>
                <SelectTrigger className="bg-white border-gold/25 h-11">
                  <SelectValue placeholder="Budget Range (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGETS.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full gold-shimmer bg-gradient-to-br from-indigo-deep to-[#2d1b3d] text-cream font-semibold h-12 hover:shadow-lg"
              >
                {submitting ? "Sending..." : "Get Callback"}
                {!submitting && <Send className="w-4 h-4 ml-2" />}
              </Button>
              <p className="text-[11px] text-center text-muted-foreground">
                By submitting, you agree to be contacted about BrajProperty plots.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
