"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Youtube, Twitter, Shield } from "lucide-react";
import { useApp } from "@/lib/store";
import { LotusLogo } from "@/components/shared/brand";
import { toast } from "sonner";

export function Footer() {
  const { toggleView, openProjectPage } = useApp();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("🙏 Subscribed! You'll receive spiritual insights & investment updates.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer className="mt-auto bg-spiritual-temple text-cream relative overflow-hidden">
      {/* Top border ornament */}
      <div className="divider-gold" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <LotusLogo className="w-10 h-10 text-gold" />
              <div>
                <div className="font-display text-xl font-bold text-cream">
                  RK Properties
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-cream/60">Spiritual Living</div>
              </div>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed mb-5">
              Your Spiritual Home in Braj Dham. Premium MVDA-approved plotted townships in Vrindavan, Mathura & Govardhan — where devotion meets modern living.
            </p>
            <div className="flex gap-2">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="w-9 h-9 rounded-full bg-cream/10 hover:bg-gold hover:text-indigo-deep flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-display text-base font-bold text-gold mb-4 uppercase tracking-wide">Our Townships</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                "Bankey Bihari Orchid",
                "Braj Lotus Greens",
                "Bankey Bihari Kunj",
                "Bankey Bihari Dham",
              ].map((p) => (
                <li key={p}>
                  <a href="#projects" className="text-cream/70 hover:text-gold transition-colors">{p}</a>
                </li>
              ))}
              <li><a href="#plots" className="text-cream/70 hover:text-gold transition-colors">View All Plots →</a></li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-base font-bold text-gold mb-4 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="text-cream/70 hover:text-gold transition-colors">Why RK Properties</a></li>
              <li><a href="#invest" className="text-cream/70 hover:text-gold transition-colors">EMI Calculator</a></li>
              <li><a href="#blog" className="text-cream/70 hover:text-gold transition-colors">Blog & Insights</a></li>
              <li><a href="#testimonials" className="text-cream/70 hover:text-gold transition-colors">Testimonials</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-bold text-gold mb-4 uppercase tracking-wide">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-cream/70">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>Braj Dham Heights, Vrindavan, Mathura, Uttar Pradesh 281121</span>
              </li>
              <li>
                <a href="tel:+919837012345" className="flex items-center gap-2.5 text-cream/70 hover:text-gold transition-colors">
                  <Phone className="w-4 h-4 text-gold" /> +91 98370 12345
                </a>
              </li>
              <li>
                <a href="mailto:info@rkproperties.in" className="flex items-center gap-2.5 text-cream/70 hover:text-gold transition-colors">
                  <Mail className="w-4 h-4 text-gold" /> info@rkproperties.in
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919837012345?text=Namaste! I'd like to know more about RK Properties plots"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-green-light text-cream text-xs font-semibold hover:bg-green-deep transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gold/15 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h5 className="font-display text-lg font-bold text-cream mb-1">Subscribe to Braj Insights</h5>
            <p className="text-xs text-cream/60">Spiritual wisdom + market intelligence, monthly. No spam.</p>
          </div>
          <form onSubmit={handleNewsletter} className="flex gap-2">
            <Input
              type="email"
              required
              placeholder="your@email.com"
              className="bg-cream/10 border-gold/25 text-cream placeholder:text-cream/40 h-11"
            />
            <Button type="submit" className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11 px-6">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/15 bg-indigo-deep/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/50">
          <div>© 2026 RK Properties — All rights reserved. Made with 🙏 in Braj Dham.</div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">✓ MVDA Approved</span>
            <span className="flex items-center gap-1.5">✓ RERA Registered</span>
            <a href="#" className="hover:text-gold">Privacy</a>
            <a href="#" className="hover:text-gold">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
