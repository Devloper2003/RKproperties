"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
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
import { CheckCircle2, CreditCard, User, MapPin, IndianRupee, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { useApp } from "@/lib/store";
import { formatINRFull, type Plot } from "@/lib/types";

const STEPS = ["Plot Summary", "Your Details", "Payment", "Confirmed"];

export function BookingModal() {
  const { bookingPlotId, closeBooking } = useApp();
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState({ name: "", phone: "", email: "" });
  const [bookingId, setBookingId] = useState("");

  const { data: plot, isLoading } = useQuery<Plot | null>({
    queryKey: ["plot", bookingPlotId],
    queryFn: async () => {
      if (!bookingPlotId) return null;
      // fetch all plots and find — simpler approach
      const res = await fetch("/api/plots");
      const json = await res.json();
      return json.data.find((p: Plot) => p.id === bookingPlotId) || null;
    },
    enabled: !!bookingPlotId,
  });

  useEffect(() => {
    if (bookingPlotId) setStep(0);
  }, [bookingPlotId]);

  const bookingAmount = 25000;

  const handlePayment = () => {
    // Mock Razorpay flow
    setBookingId(`BRJ${Date.now().toString().slice(-8)}`);
    setStep(3);
    toast.success("🎉 Booking confirmed! WhatsApp confirmation sent.");
  };

  const open = !!bookingPlotId;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeBooking()}>
      <DialogContent className="max-w-lg w-[95vw] p-0 gap-0 overflow-hidden bg-cream rounded-2xl">
        {/* Stepper */}
        <div className="bg-spiritual-temple px-6 py-5">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold text-cream flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" /> Reserve Your Plot
            </DialogTitle>
            <DialogDescription className="text-cream/60">
              {plot ? `Booking ${plot.plotNumber} · ${plot.sizeSqyd} sq.yd` : "Loading..."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-1 mt-4">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1 flex items-center gap-1">
                <div
                  className={`flex-1 h-1.5 rounded-full transition-colors ${
                    i <= step ? "bg-gold" : "bg-cream/20"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-cream/60">
            {STEPS.map((s, i) => (
              <span key={s} className={i === step ? "text-gold font-semibold" : ""}>{s}</span>
            ))}
          </div>
        </div>

        <div className="p-6">
          {isLoading && <div className="py-10 text-center text-muted-foreground">Loading plot details...</div>}

          {!isLoading && plot && (
            <AnimatePresence mode="wait">
              {/* Step 0: Summary */}
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="card-luxury rounded-xl p-5 mb-4">
                    <h3 className="font-display text-lg font-bold text-indigo-deep mb-3">Plot Summary</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><div className="text-xs text-muted-foreground">Plot Number</div><div className="font-mono font-bold text-indigo-deep">{plot.plotNumber}</div></div>
                      <div><div className="text-xs text-muted-foreground">Size</div><div className="font-semibold text-indigo-deep">{plot.sizeSqyd} sq.yd</div></div>
                      <div><div className="text-xs text-muted-foreground">Dimensions</div><div className="font-semibold text-indigo-deep">{plot.dimensions}</div></div>
                      <div><div className="text-xs text-muted-foreground">Facing</div><div className="font-semibold text-indigo-deep uppercase">{plot.facing}</div></div>
                      <div className="col-span-2 pt-2 border-t border-gold/15"><div className="text-xs text-muted-foreground">Plot Price</div><div className="font-display text-2xl font-bold text-gold">{formatINRFull(plot.price)}</div></div>
                    </div>
                  </div>
                  <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-muted-foreground">Booking Amount (refundable*)</div>
                        <div className="text-[11px] text-muted-foreground/80">Blocks this plot for 15 days</div>
                      </div>
                      <div className="font-display text-xl font-bold text-gold">{formatINRFull(bookingAmount)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <ShieldCheck className="w-4 h-4 text-green-deep" /> 100% refundable within 48 hours · Secure Razorpay payment
                  </div>
                  <Button onClick={() => setStep(1)} className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12">
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}

              {/* Step 1: Details */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-display text-lg font-bold text-indigo-deep mb-4 flex items-center gap-2"><User className="w-5 h-5 text-gold" /> Your Details</h3>
                  <div className="space-y-3">
                    <Input placeholder="Full Name *" className="bg-white border-gold/25 h-11" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                    <Input placeholder="Phone Number *" className="bg-white border-gold/25 h-11" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
                    <Input type="email" placeholder="Email *" className="bg-white border-gold/25 h-11" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-3">📱 We'll send booking confirmation via WhatsApp & email.</p>
                  <div className="flex gap-2 mt-5">
                    <Button onClick={() => setStep(0)} variant="outline" className="border-gold/30 text-indigo-deep hover:bg-gold/10">
                      <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </Button>
                    <Button
                      onClick={() => {
                        if (!details.name || !details.phone) {
                          toast.error("Please enter name and phone");
                          return;
                        }
                        setStep(2);
                      }}
                      className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11"
                    >
                      Proceed to Payment <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="font-display text-lg font-bold text-indigo-deep mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-gold" /> Secure Payment</h3>
                  <div className="card-luxury rounded-xl p-5 mb-4">
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gold/15">
                      <span className="text-sm text-muted-foreground">Plot {plot.plotNumber} · Booking</span>
                      <span className="font-bold text-gold">{formatINRFull(bookingAmount)}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3 text-sm">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span className="font-medium">{formatINRFull(Math.round(bookingAmount * 0.18))}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gold/15">
                      <span className="font-semibold text-indigo-deep">Total Payable</span>
                      <span className="font-display text-xl font-bold text-gold">{formatINRFull(Math.round(bookingAmount * 1.18))}</span>
                    </div>
                  </div>
                  {/* Payment methods */}
                  <div className="space-y-2 mb-4">
                    {["UPI · GPay, PhonePe, Paytm", "Credit / Debit Card", "Net Banking"].map((m, i) => (
                      <label key={m} className="flex items-center gap-3 p-3 rounded-lg border border-gold/20 bg-white cursor-pointer hover:border-gold/40">
                        <input type="radio" name="payment" defaultChecked={i === 0} className="accent-gold" />
                        <span className="text-sm text-indigo-deep">{m}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <ShieldCheck className="w-4 h-4 text-green-deep" /> 256-bit SSL · Razorpay secured · PCI DSS compliant
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setStep(1)} variant="outline" className="border-gold/30 text-indigo-deep hover:bg-gold/10">
                      <ArrowLeft className="w-4 h-4 mr-1" /> Back
                    </Button>
                    <Button onClick={handlePayment} className="flex-1 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11">
                      <IndianRupee className="w-4 h-4 mr-1" /> Pay {formatINRFull(Math.round(bookingAmount * 1.18))}
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center mt-3">Demo payment — no real charge</p>
                </motion.div>
              )}

              {/* Step 3: Confirmed */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-green-light/20 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-deep" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-indigo-deep mb-2">Booking Confirmed! 🎉</h3>
                  <p className="text-sm text-muted-foreground mb-4">Your plot {plot.plotNumber} is reserved for 15 days.</p>
                  <div className="card-luxury rounded-xl p-4 mb-4 text-left">
                    <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Booking ID</span><span className="font-mono font-bold text-gold">{bookingId}</span></div>
                    <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Plot</span><span className="font-semibold text-indigo-deep">{plot.plotNumber} · {plot.sizeSqyd} sq.yd</span></div>
                    <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Amount Paid</span><span className="font-semibold text-indigo-deep">{formatINRFull(Math.round(bookingAmount * 1.18))}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Valid Until</span><span className="font-semibold text-indigo-deep">{new Date(Date.now() + 15 * 86400000).toLocaleDateString("en-IN")}</span></div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">📩 Confirmation sent to {details.phone} via WhatsApp & email.</p>
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/918923944689?text=Namaste! I just booked plot ${plot.plotNumber}. Booking ID: ${bookingId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-md bg-[#25D366] text-white font-medium text-sm hover:bg-[#1da851]"
                    >
                      <MapPin className="w-4 h-4" /> Schedule Site Visit
                    </a>
                    <Button onClick={closeBooking} variant="outline" className="border-gold/30 text-indigo-deep">Close</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
