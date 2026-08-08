"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon, Clock, MapPin, Car, Plane, Video, CheckCircle2,
  ChevronLeft, ChevronRight, User, Phone, Mail, PartyPopper,
} from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/lib/store";
import { type Project } from "@/lib/types";

const TIME_SLOTS = [
  "09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM",
];

const VISIT_TYPES = [
  { id: "physical", label: "Physical Visit", icon: Car, desc: "Complimentary pickup from station", color: "text-gold" },
  { id: "virtual", label: "Video Tour", icon: Video, desc: "Live WhatsApp video walkthrough", color: "text-green-deep" },
  { id: "nri", label: "NRI Virtual", icon: Plane, desc: "Dedicated NRI advisor call", color: "text-temple-red" },
];

export function SiteVisitModal() {
  const { visitOpen, visitProjectId, closeVisit } = useApp();
  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [visitType, setVisitType] = useState<string>("physical");
  const [details, setDetails] = useState({ name: "", phone: "", email: "", pickup: "" });
  const [confirmed, setConfirmed] = useState(false);

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => (await fetch("/api/projects")).json().then((j) => j.data),
    enabled: visitOpen,
  });

  const selectedProject = projects.find((p) => p.id === visitProjectId) || projects[0];

  // Disable past dates and Sundays (site visit off-day)
  const disabledDays = useMemo(() => {
    return [{ daysOfWeek: [0] }, { before: new Date() }];
  }, []);

  const reset = () => {
    setStep(0);
    setDate(undefined);
    setTimeSlot("");
    setVisitType("physical");
    setDetails({ name: "", phone: "", email: "", pickup: "" });
    setConfirmed(false);
  };

  const handleClose = () => {
    closeVisit();
    setTimeout(reset, 300);
  };

  const submit = async () => {
    if (!details.name || !details.phone || !date || !timeSlot) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: details.name,
          phone: details.phone,
          email: details.email || undefined,
          source: visitType === "nri" ? "ads" : "website",
          projectId: selectedProject?.id,
          budgetRange: undefined,
          notes: `Site visit requested: ${date.toDateString()} ${timeSlot}, Type: ${visitType}, Pickup: ${details.pickup || "self"}`,
        }),
      });
      setConfirmed(true);
      toast.success("🙏 Site visit scheduled! Confirmation sent via WhatsApp.");
    } catch {
      toast.error("Failed to schedule. Please WhatsApp us directly.");
    }
  };

  const open = visitOpen;
  const steps = ["Date & Time", "Visit Type", "Details", "Confirmed"];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-lg w-[95vw] max-h-[92vh] overflow-y-auto scroll-luxury bg-cream rounded-2xl p-0 gap-0">
        {/* Header */}
        <div className="bg-spiritual-temple p-5 relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-cream/60 hover:text-gold"
            aria-label="Close"
          >
            ✕
          </button>
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <CalendarIcon className="w-4 h-4 text-gold" />
              <span className="text-xs uppercase tracking-[0.25em] text-gold">Schedule Visit</span>
            </div>
            <DialogTitle className="font-display text-xl font-bold text-cream">
              Book a Site Visit
            </DialogTitle>
            <DialogDescription className="text-cream/70">
              {selectedProject ? `${selectedProject.name} · ${selectedProject.city}` : "Select your preferred time"}
            </DialogDescription>
          </DialogHeader>

          {/* Stepper */}
          <div className="flex items-center gap-1 mt-4">
            {steps.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-1.5 rounded-full transition-colors ${i <= step ? "bg-gold" : "bg-cream/20"}`} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5 text-[9px] text-cream/50">
            {steps.map((s, i) => (
              <span key={s} className={i === step ? "text-gold font-semibold" : ""}>{s}</span>
            ))}
          </div>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {/* Step 0: Date & Time */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center justify-center mb-3">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={[
  { daysOfWeek: [0, 6] },
  { before: new Date() }
] as any}
                    className="rounded-xl border border-gold/20"
                    classNames={{
                      day_selected: "bg-gold text-indigo-deep",
                      day_today: "bg-gold/10 text-gold",
                    }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground text-center mb-3">
                  📅 Sundays are our rest day. Choose any other day.
                </p>

                {date && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Label className="text-xs text-indigo-deep mb-2 block flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" /> Available Time Slots
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setTimeSlot(slot)}
                          className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                            timeSlot === slot
                              ? "bg-gold text-indigo-deep border-gold ring-gold-glow"
                              : "bg-white border-gold/20 text-indigo-deep hover:border-gold/40"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <Button
                  onClick={() => setStep(1)}
                  disabled={!date || !timeSlot}
                  className="w-full mt-5 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11"
                >
                  Continue →
                </Button>
              </motion.div>
            )}

            {/* Step 1: Visit Type */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Label className="text-xs text-indigo-deep mb-3 block">Choose Visit Type</Label>
                <div className="space-y-2">
                  {VISIT_TYPES.map((vt) => (
                    <button
                      key={vt.id}
                      onClick={() => setVisitType(vt.id)}
                      className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                        visitType === vt.id
                          ? "border-gold bg-gold/5 ring-gold-glow"
                          : "border-gold/15 bg-white hover:border-gold/30"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0`}>
                        <vt.icon className={`w-5 h-5 ${vt.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-display text-sm font-bold text-indigo-deep">{vt.label}</div>
                        <div className="text-[11px] text-muted-foreground">{vt.desc}</div>
                      </div>
                      {visitType === vt.id && <CheckCircle2 className="w-4 h-4 text-gold" />}
                    </button>
                  ))}
                </div>

                {visitType === "physical" && (
                  <div className="mt-3 p-3 rounded-lg bg-marble text-xs text-muted-foreground">
                    🚗 <strong className="text-indigo-deep">Complimentary pickup</strong> from Mathura/Vrindavan railway station or any local hotel. Just share your location in the next step.
                  </div>
                )}

                <div className="flex gap-2 mt-5">
                  <Button onClick={() => setStep(0)} variant="outline" className="border-gold/30 text-indigo-deep hover:bg-gold/10">
                    ← Back
                  </Button>
                  <Button onClick={() => setStep(2)} className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11">
                    Continue →
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs flex items-center gap-1 text-indigo-deep"><User className="w-3 h-3 text-gold" /> Full Name *</Label>
                    <Input value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} className="bg-white border-gold/25 mt-1 h-10" placeholder="Your name" />
                  </div>
                  <div>
                    <Label className="text-xs flex items-center gap-1 text-indigo-deep"><Phone className="w-3 h-3 text-gold" /> Phone (WhatsApp) *</Label>
                    <Input value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} className="bg-white border-gold/25 mt-1 h-10" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <Label className="text-xs flex items-center gap-1 text-indigo-deep"><Mail className="w-3 h-3 text-gold" /> Email</Label>
                    <Input type="email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} className="bg-white border-gold/25 mt-1 h-10" placeholder="you@email.com" />
                  </div>
                  {visitType === "physical" && (
                    <div>
                      <Label className="text-xs flex items-center gap-1 text-indigo-deep"><MapPin className="w-3 h-3 text-gold" /> Pickup Location</Label>
                      <Input value={details.pickup} onChange={(e) => setDetails({ ...details, pickup: e.target.value })} className="bg-white border-gold/25 mt-1 h-10" placeholder="Hotel name, station, or address" />
                    </div>
                  )}
                </div>

                {/* Summary */}
                <Card className="card-luxury rounded-xl mt-4">
                  <CardContent className="p-3 text-xs space-y-1">
                    <div className="flex justify-between"><span className="text-muted-foreground">Project</span><span className="font-medium text-indigo-deep">{selectedProject?.name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium text-indigo-deep">{date?.toDateString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium text-indigo-deep">{timeSlot}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium text-gold capitalize">{visitType}</span></div>
                  </CardContent>
                </Card>

                <div className="flex gap-2 mt-5">
                  <Button onClick={() => setStep(1)} variant="outline" className="border-gold/30 text-indigo-deep hover:bg-gold/10">
                    ← Back
                  </Button>
                  <Button onClick={submit} className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11">
                    Confirm Visit
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmed */}
            {step === 3 && confirmed && (
              <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-green-light/20 flex items-center justify-center mx-auto mb-4"
                >
                  <PartyPopper className="w-10 h-10 text-green-deep" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-indigo-deep mb-1">Visit Scheduled! 🎉</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {date?.toDateString()} at {timeSlot}
                </p>
                <Card className="card-luxury rounded-xl p-4 mb-4 text-left">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Project</span><span className="font-medium text-indigo-deep">{selectedProject?.name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Visit Type</span><span className="font-medium text-indigo-deep capitalize">{visitType}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Confirmation</span><span className="font-mono text-gold font-bold">VST-{Date.now().toString().slice(-6)}</span></div>
                  </div>
                </Card>
                <p className="text-xs text-muted-foreground mb-4">
                  📲 Confirmation sent to {details.phone} via WhatsApp.<br />
                  Our advisor will call 1 hour before your visit.
                </p>
                <a
                  href={`https://wa.me/918923944689?text=Namaste! I just scheduled a site visit for ${selectedProject?.name} on ${date?.toDateString()} at ${timeSlot}. Confirmation: VST-${Date.now().toString().slice(-6)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1da851] transition-colors"
                >
                  💬 Confirm on WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auto-advance when confirmed */}
          {confirmed && step !== 3 && setStep(3)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
