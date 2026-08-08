"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Check, Compass, Star, Phone, Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { useApp } from "@/lib/store";
import { toast } from "sonner";

const CONSULTATION_TYPES = [
  { id: "basic", name: "Basic Vastu Check", duration: "30 min", price: "Free", features: ["Plot direction analysis", "Vastu compliance overview", "Basic recommendations"], icon: "🧭" },
  { id: "standard", name: "Standard Consultation", duration: "60 min", price: "₹1,100", features: ["Everything in Basic", "Detailed plot report", "Construction layout guidance", "Room placement advice"], icon: "📋" },
  { id: "premium", name: "Premium Consultation", duration: "90 min", price: "₹2,100", features: ["Everything in Standard", "On-site visit (Vrindavan/Mathura/Govardhan)", "Complete Vastu remediation plan", "1-year follow-up support"], icon: "👑" },
];

export function VastuConsultationModal() {
  const { vastuOpen, closeVastu } = useApp();
  const [step, setStep] = useState(0);
  const [type, setType] = useState("standard");
  const [details, setDetails] = useState({ name: "", phone: "", plot: "", question: "" });
  const [confirmed, setConfirmed] = useState(false);

  const reset = () => {
    setStep(0);
    setType("standard");
    setDetails({ name: "", phone: "", plot: "", question: "" });
    setConfirmed(false);
  };

  const handleClose = () => {
    closeVastu();
    setTimeout(reset, 300);
  };

  const submit = () => {
    if (!details.name || !details.phone) {
      toast.error("Please enter name and phone");
      return;
    }
    setConfirmed(true);
    setStep(2)
    toast.success("🧭 Vastu consultation requested! Our expert will call within 24 hours.");
  };

  const steps = ["Consultation Type", "Your Details", "Confirmed"];

  return (
    <Dialog open={vastuOpen} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-lg w-[95vw] max-h-[92vh] overflow-y-auto scroll-luxury bg-cream rounded-2xl p-0 gap-0">
        {/* Header */}
        <div className="bg-spiritual-temple p-5 relative">
          <button onClick={handleClose} className="absolute top-3 right-3 text-cream/60 hover:text-gold" aria-label="Close">✕</button>
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Compass className="w-4 h-4 text-gold" />
              <span className="text-xs uppercase tracking-[0.25em] text-gold">Vastu Expert</span>
            </div>
            <DialogTitle className="font-display text-xl font-bold text-cream">
              Book Vastu Consultation
            </DialogTitle>
            <DialogDescription className="text-cream/70">
              Get expert Vastu guidance for your Braj plot
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
            {/* Step 0: Type selection */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="space-y-2.5">
                  {CONSULTATION_TYPES.map((ct) => (
                    <button
                      key={ct.id}
                      onClick={() => setType(ct.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${
                        type === ct.id ? "border-gold bg-gold/5 ring-gold-glow" : "border-gold/15 bg-white hover:border-gold/30"
                      }`}
                    >
                      <span className="text-3xl flex-shrink-0">{ct.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-display text-sm font-bold text-indigo-deep">{ct.name}</h4>
                          <Badge className="bg-gold/15 text-gold border-0 text-[10px]">{ct.price}</Badge>
                        </div>
                        <div className="text-[11px] text-muted-foreground mb-2">{ct.duration} consultation</div>
                        <ul className="space-y-1">
                          {ct.features.map((f) => (
                            <li key={f} className="text-[11px] text-indigo-deep/70 flex items-start gap-1.5">
                              <Check className="w-3 h-3 text-green-deep flex-shrink-0 mt-0.5" /> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </button>
                  ))}
                </div>

                <Button onClick={() => setStep(1)} className="w-full mt-5 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* Step 1: Details */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-indigo-deep">Full Name *</Label>
                    <Input value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} className="bg-white border-gold/25 mt-1 h-10" placeholder="Your name" />
                  </div>
                  <div>
                    <Label className="text-xs text-indigo-deep">Phone (WhatsApp) *</Label>
                    <Input value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} className="bg-white border-gold/25 mt-1 h-10" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <Label className="text-xs text-indigo-deep">Plot Number / Project (if known)</Label>
                    <Input value={details.plot} onChange={(e) => setDetails({ ...details, plot: e.target.value })} className="bg-white border-gold/25 mt-1 h-10" placeholder="e.g., P045 / Bankey Bihari Dham" />
                  </div>
                  <div>
                    <Label className="text-xs text-indigo-deep">Your Vastu Question</Label>
                    <Textarea value={details.question} onChange={(e) => setDetails({ ...details, question: e.target.value })} placeholder="e.g., Is my North-East facing plot good for pooja room?" className="bg-white border-gold/25 mt-1 min-h-[80px]" />
                  </div>
                </div>

                {/* Summary */}
                <div className="p-3 rounded-lg bg-marble mt-4 text-xs space-y-1">
                  <div className="flex justify-between"><span className="text-muted-foreground">Consultation</span><span className="font-medium text-indigo-deep">{CONSULTATION_TYPES.find((c) => c.id === type)?.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium text-indigo-deep">{CONSULTATION_TYPES.find((c) => c.id === type)?.duration}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="font-medium text-gold">{CONSULTATION_TYPES.find((c) => c.id === type)?.price}</span></div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button onClick={() => setStep(0)} variant="outline" className="border-gold/30 text-indigo-deep hover:bg-gold/10">← Back</Button>
                  <Button onClick={submit} className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11">
                    Book Consultation
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Confirmed */}
            {step === 2 && confirmed && (
              <motion.div key="s2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4"
                >
                  <Compass className="w-10 h-10 text-gold" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-indigo-deep mb-1">Consultation Booked! 🧭</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our Vastu expert will call you within 24 hours.
                </p>
                <div className="card-luxury rounded-xl p-4 mb-4 text-left">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Booking ID</span><span className="font-mono font-bold text-gold">VST-{Date.now().toString().slice(-6)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium text-indigo-deep">{CONSULTATION_TYPES.find((c) => c.id === type)?.name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium text-indigo-deep">{CONSULTATION_TYPES.find((c) => c.id === type)?.duration}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="font-medium text-gold">{CONSULTATION_TYPES.find((c) => c.id === type)?.price}</span></div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  📲 Confirmation sent to {details.phone} via WhatsApp.
                </p>
                <Button onClick={handleClose} variant="outline" className="border-gold/30 text-indigo-deep hover:bg-gold/10">
                  <Check className="w-4 h-4 mr-1" /> Done
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auto-advance when confirmed */}
          {confirmed && step !== 2 && setStep(2)}

          {/* Expert info */}
          {step === 0 && (
            <div className="mt-5 p-3 rounded-lg bg-spiritual-temple/5 border border-gold/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-cream flex items-center justify-center font-display font-bold flex-shrink-0">
                VS
              </div>
              <div>
                <div className="text-xs font-bold text-indigo-deep flex items-center gap-1">
                  Vastu Shastri <Star className="w-3 h-3 text-gold fill-gold" />
                </div>
                <div className="text-[10px] text-muted-foreground">20+ years experience · 5000+ consultations</div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
