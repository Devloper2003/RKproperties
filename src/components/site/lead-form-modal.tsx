"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, MessageCircle, X } from "lucide-react";
import { useApp } from "@/lib/store";
import type { Project } from "@/lib/types";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Enter a valid 10-digit phone"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  projectId: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const BUDGETS = ["5-10 Lakh", "10-15 Lakh", "15-20 Lakh", "20+ Lakh", "Not sure yet"];

export function LeadFormModal() {
  const { leadFormOpen, leadFormProjectId, closeLeadForm } = useApp();
  const [submitting, setSubmitting] = useState(false);

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => (await fetch("/api/projects")).json().then((j) => j.data),
    enabled: leadFormOpen,
  });

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { projectId: leadFormProjectId },
  });

  useEffect(() => {
    if (leadFormProjectId) setValue("projectId", leadFormProjectId);
  }, [leadFormProjectId, setValue]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
          source: "website",
          projectId: data.projectId || undefined,
          budgetRange: data.budget || undefined,
          notes: data.message || undefined,
        }),
      });
      if (res.ok) {
        toast.success("🙏 Namaste! Our property advisor will contact you within 30 minutes.");
        reset();
        closeLeadForm();
      } else {
        toast.error("Submission failed. Please try WhatsApp.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={leadFormOpen} onOpenChange={(o) => !o && closeLeadForm()}>
      <DialogContent className="max-w-md w-[95vw] p-0 gap-0 overflow-hidden bg-cream rounded-2xl">
        {/* Header band */}
        <div className="bg-spiritual-temple p-6 text-center relative">
          <button
            onClick={closeLeadForm}
            className="absolute top-3 right-3 text-cream/60 hover:text-gold"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-3xl mb-2">🪔</div>
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold text-cream">
              Begin Your Spiritual Journey
            </DialogTitle>
            <DialogDescription className="text-cream/70">
              Share your details — our advisor will call you within 30 minutes.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <Input placeholder="Full Name *" className="bg-white border-gold/25 h-11" {...register("name")} />
            {errors.name && <p className="text-xs text-temple-red mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Input placeholder="Phone Number *" className="bg-white border-gold/25 h-11" {...register("phone")} />
            {errors.phone && <p className="text-xs text-temple-red mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <Input type="email" placeholder="Email (optional)" className="bg-white border-gold/25 h-11" {...register("email")} />
            {errors.email && <p className="text-xs text-temple-red mt-1">{errors.email.message}</p>}
          </div>
          <Select onValueChange={(v) => setValue("projectId", v)} defaultValue={leadFormProjectId}>
            <SelectTrigger className="bg-white border-gold/25 h-11">
              <SelectValue placeholder="Select Project (optional)" />
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
          <Textarea
            placeholder="Your message (optional)"
            className="bg-white border-gold/25 min-h-[80px] resize-none"
            {...register("message")}
          />
          <Button
            type="submit"
            disabled={submitting}
            className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12"
          >
            {submitting ? "Sending..." : "Request Callback"}
            {!submitting && <Send className="w-4 h-4 ml-2" />}
          </Button>
          <a
            href="https://wa.me/919837012345?text=Namaste! I'd like to enquire about BrajProperty plots"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-[#25D366]/10 text-[#1a8e3b] text-sm font-medium hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Or message us on WhatsApp
          </a>
        </form>
      </DialogContent>
    </Dialog>
  );
}
