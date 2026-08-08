"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight, CheckCircle2, Calendar, FileText, MessageCircle, Users } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import { COMMUNITY_FEATURES } from "@/lib/types";
import { toast } from "sonner";

const RECENT_UPDATES = [
  { date: "Aug 5, 2026", project: "Bankey Bihari Dham", update: "Internal road laying completed for Sector A. Photos uploaded.", type: "construction" },
  { date: "Aug 2, 2026", project: "Braj Lotus Greens", update: "Temple complex foundation work begins. Expected completion: Nov 2026.", type: "construction" },
  { date: "Jul 28, 2026", project: "Bankey Bihari Orchid", update: "Krishna Janmashtami celebration — RSVP now open for residents.", type: "event" },
  { date: "Jul 25, 2026", project: "Bankey Bihari Kunj", update: "New document uploaded: MVDA completion certificate for Phase 1.", type: "document" },
];

const TYPE_ICONS: Record<string, any> = {
  construction: "🏗️",
  event: "🎉",
  document: "📄",
};

export function CommunityPortal() {
  const { openLeadForm } = useApp();
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const tryUnlock = () => {
    if (code.length < 6) {
      toast.error("Please enter your booking ID (e.g., BRJ8472910)");
      return;
    }
    setUnlocked(true);
    toast.success("🙏 Welcome to your resident portal!");
  };

  return (
    <section id="community" className="py-20 lg:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Resident Exclusive"
          title="Your Spiritual"
          highlight="Community Portal"
          subtitle="Already a RK Properties resident? Access your personalized dashboard — track construction progress, download documents, RSVP to community events, and connect with fellow devotee-residents."
        />

        {!unlocked ? (
          /* Login gate */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <Card className="card-luxury rounded-2xl overflow-hidden">
              <div className="bg-spiritual-temple p-6 text-center">
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3"
                >
                  <Lock className="w-8 h-8 text-gold" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-cream mb-1">Resident Login</h3>
                <p className="text-xs text-cream/60">Enter your booking ID to access your portal</p>
              </div>
              <CardContent className="p-6">
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g., BRJ8472910"
                  className="bg-white border-gold/25 h-11 font-mono text-center text-lg tracking-wider"
                  onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
                />
                <Button
                  onClick={tryUnlock}
                  className="w-full mt-3 gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-11"
                >
                  Access Portal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <div className="mt-4 pt-4 border-t border-gold/15 text-center">
                  <p className="text-xs text-muted-foreground mb-2">Not a resident yet?</p>
                  <Button
                    onClick={() => openLeadForm()}
                    variant="outline"
                    size="sm"
                    className="border-gold/30 text-indigo-deep hover:bg-gold/10"
                  >
                    Begin Your Journey
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground text-center mt-3">
                  Demo: Enter any 6+ character code to preview the portal
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Portal dashboard */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Welcome banner */}
            <Card className="card-luxury-dark rounded-2xl bg-spiritual-temple">
              <CardContent className="p-6 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-green-light" />
                    <span className="text-xs uppercase tracking-wider text-gold">Resident Portal Active</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-cream">
                    🙏 Welcome back, Devotee!
                  </h3>
                  <p className="text-xs text-cream/60 mt-0.5">Booking ID: {code.toUpperCase()} · Plot under development</p>
                </div>
                <Button
                  onClick={() => setUnlocked(false)}
                  variant="outline"
                  size="sm"
                  className="border-cream/30 text-cream hover:bg-cream/10"
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Features grid */}
              <div className="lg:col-span-2">
                <h3 className="font-display text-base font-bold text-indigo-deep mb-3">Portal Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {COMMUNITY_FEATURES.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Card className="card-luxury rounded-xl h-full">
                        <CardContent className="p-4">
                          <div className="text-2xl mb-2">{f.icon}</div>
                          <h4 className="font-display text-sm font-bold text-indigo-deep mb-1">{f.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent updates */}
              <div>
                <h3 className="font-display text-base font-bold text-indigo-deep mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold" /> Recent Updates
                </h3>
                <Card className="card-luxury rounded-xl">
                  <CardContent className="p-4 space-y-3 max-h-[400px] overflow-y-auto scroll-luxury">
                    {RECENT_UPDATES.map((u, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="pb-3 border-b border-gold/10 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-lg flex-shrink-0">{TYPE_ICONS[u.type]}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <Badge variant="outline" className="text-[9px] border-gold/30 text-gold h-4">
                                {u.project.split(" ").slice(-1)[0]}
                              </Badge>
                              <span className="text-[10px] text-muted-foreground">{u.date}</span>
                            </div>
                            <p className="text-xs text-indigo-deep leading-snug">{u.update}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Card className="card-luxury rounded-lg">
                    <CardContent className="p-3 text-center">
                      <FileText className="w-4 h-4 text-gold mx-auto mb-1" />
                      <div className="font-display text-lg font-bold text-indigo-deep">8</div>
                      <div className="text-[10px] text-muted-foreground">Documents</div>
                    </CardContent>
                  </Card>
                  <Card className="card-luxury rounded-lg">
                    <CardContent className="p-3 text-center">
                      <Users className="w-4 h-4 text-gold mx-auto mb-1" />
                      <div className="font-display text-lg font-bold text-indigo-deep">3</div>
                      <div className="text-[10px] text-muted-foreground">Events</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <Card className="card-luxury rounded-2xl">
              <CardContent className="p-5">
                <h3 className="font-display text-sm font-bold text-indigo-deep mb-3">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="border-gold/30 text-indigo-deep hover:bg-gold/10" onClick={() => toast.info("📄 Downloading your documents...")}>
                    <FileText className="w-3.5 h-3.5 mr-1" /> Download All Documents
                  </Button>
                  <Button size="sm" variant="outline" className="border-gold/30 text-indigo-deep hover:bg-gold/10" onClick={() => toast.info("🎉 Opening event RSVP...")}>
                    <Calendar className="w-3.5 h-3.5 mr-1" /> RSVP Janmashtami
                  </Button>
                  <Button size="sm" variant="outline" className="border-gold/30 text-indigo-deep hover:bg-gold/10" onClick={() => toast.info("💬 Opening resident forum...")}>
                    <MessageCircle className="w-3.5 h-3.5 mr-1" /> Resident Forum
                  </Button>
                  <Button size="sm" variant="outline" className="border-green-deep/30 text-green-deep hover:bg-green-light/10" onClick={() => window.open("https://wa.me/918923944689?text=Namaste! Resident query from portal", "_blank")}>
                    <MessageCircle className="w-3.5 h-3.5 mr-1" /> WhatsApp Manager
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
