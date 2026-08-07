"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";
import { navigate } from "@/lib/router";
import { InnerNavbar } from "./inner-navbar";
import { toast } from "sonner";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "General Inquiry", message: "" });

  const submit = async () => {
    if (!form.name || !form.phone) { toast.error("Please enter name and phone"); return; }
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      toast.success("🙏 Message sent! Our team will contact you within 30 minutes.");
      setForm({ name: "", phone: "", email: "", subject: "General Inquiry", message: "" });
    } catch { toast.error("Failed to send. Please WhatsApp us."); }
  };

  return (
    <div className="min-h-screen bg-cream">
      <InnerNavbar title="Contact Us" />

      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-indigo-deep to-[#2d1b3d] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream mb-2">Get in Touch</h1>
          <p className="text-sm text-cream/70 max-w-lg mx-auto">Namaste 🙏 We're here to guide you to your spiritual home in Braj Dham</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact info */}
          <div className="space-y-4">
            <Card className="card-luxury-dark rounded-2xl bg-spiritual-temple">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-cream mb-2">Contact Information</h3>
                <div className="space-y-3">
                  <a href="tel:+919837012345" className="flex items-center gap-3 text-sm text-cream/80 hover:text-gold transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center"><Phone className="w-4 h-4 text-gold" /></div>
                    <div><div className="text-[10px] text-cream/50">Phone</div><div className="font-medium">+91 98370 12345</div></div>
                  </a>
                  <a href="mailto:info@rkproperties.in" className="flex items-center gap-3 text-sm text-cream/80 hover:text-gold transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center"><Mail className="w-4 h-4 text-gold" /></div>
                    <div><div className="text-[10px] text-cream/50">Email</div><div className="font-medium">info@rkproperties.in</div></div>
                  </a>
                  <div className="flex items-center gap-3 text-sm text-cream/80">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center"><MapPin className="w-4 h-4 text-gold" /></div>
                    <div><div className="text-[10px] text-cream/50">Office</div><div className="font-medium">Braj Dham Heights, Vrindavan, Mathura, UP 281121</div></div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-cream/80">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center"><Clock className="w-4 h-4 text-gold" /></div>
                    <div><div className="text-[10px] text-cream/50">Hours</div><div className="font-medium">Mon-Sun: 9:00 AM - 8:00 PM</div></div>
                  </div>
                </div>
                <a href="https://wa.me/919837012345?text=Namaste! I'd like to know more about RK Properties" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-md bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1da851] transition-colors mt-4">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </a>
              </CardContent>
            </Card>

            {/* Google Map */}
            <Card className="card-luxury rounded-2xl overflow-hidden">
              <div className="rounded-2xl overflow-hidden border-2 border-gold/20">
                <iframe src="https://www.google.com/maps?q=Vrindavan,Mathura,Uttar+Pradesh&z=13&output=embed" width="100%" height="250" style={{ border: 0 }} loading="lazy" title="Office location" />
              </div>
            </Card>
          </div>

          {/* Contact form */}
          <Card className="card-luxury rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-indigo-deep">Send a Message</h3>
              <div><Label className="text-xs">Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white border-gold/25 mt-1 h-10" placeholder="Your name" /></div>
              <div><Label className="text-xs">Phone *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-white border-gold/25 mt-1 h-10" placeholder="+91 98765 43210" /></div>
              <div><Label className="text-xs">Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-white border-gold/25 mt-1 h-10" placeholder="you@email.com" /></div>
              <div><Label className="text-xs">Subject</Label>
                <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                  <SelectTrigger className="bg-white border-gold/25 mt-1 h-10"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="General Inquiry">General Inquiry</SelectItem><SelectItem value="Site Visit">Schedule Site Visit</SelectItem><SelectItem value="Investment">Investment Question</SelectItem><SelectItem value="NRI">NRI Query</SelectItem><SelectItem value="Booking">Booking Help</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label className="text-xs">Message</Label><Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-white border-gold/25 mt-1 min-h-[100px]" placeholder="Your message..." /></div>
              <Button onClick={submit} className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11"><Send className="w-4 h-4 mr-2" /> Send Message</Button>
              <p className="text-[10px] text-muted-foreground text-center">🙏 Response within 30 minutes · No spam</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
