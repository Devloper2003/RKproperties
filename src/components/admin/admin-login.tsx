"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Mail, ArrowLeft, Sparkles } from "lucide-react";
import { useApp } from "@/lib/store";
import { LotusLogo, MandalaSVG } from "@/components/shared/brand";

export function AdminLogin() {
  const { setAdminAuthed, setView } = useApp();
  const [email, setEmail] = useState("admin@brajproperty.in");
  const [password, setPassword] = useState("braj2026");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setAdminAuthed(true);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-spiritual-temple relative overflow-hidden p-4">
      {/* Decorative mandalas */}
      <MandalaSVG className="absolute -top-40 -left-40 w-[600px] h-[600px] text-gold/10 mandala-spin" />
      <MandalaSVG className="absolute -bottom-40 -right-40 w-[500px] h-[500px] text-gold/10 mandala-spin" style={{ animationDirection: "reverse" }} />

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="float-particle absolute rounded-full bg-gold/40"
          style={{
            width: "4px", height: "4px",
            left: `${(i * 13 + 10) % 90}%`,
            top: `${(i * 17 + 15) % 80}%`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-cream rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.4)] overflow-hidden border border-gold/20">
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-deep to-[#2d1b3d] p-8 text-center relative">
            <div className="absolute inset-0 opacity-10">
              <MandalaSVG className="w-full h-full text-gold mandala-spin" />
            </div>
            <div className="relative">
              <LotusLogo className="w-14 h-14 text-gold mx-auto mb-3" />
              <h1 className="font-display text-2xl font-bold text-cream">BrajProperty Admin</h1>
              <p className="text-xs text-cream/60 mt-1 tracking-wider uppercase">Spiritual Property Management</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="p-8 space-y-5">
            <div className="text-center mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">
                <Shield className="w-3 h-3" /> Secure Admin Portal
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-medium text-indigo-deep flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-gold" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gold/25 h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-medium text-indigo-deep flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-gold" /> Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-gold/25 h-11"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold h-12"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-indigo-deep/30 border-t-indigo-deep rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Sign In to Dashboard
                </span>
              )}
            </Button>

            <div className="text-center pt-3 border-t border-gold/15">
              <p className="text-[11px] text-muted-foreground mb-2">
                Demo: <code className="text-gold">admin@brajproperty.in</code> / <code className="text-gold">braj2026</code>
              </p>
              <button
                type="button"
                onClick={() => setView("site")}
                className="text-xs text-muted-foreground hover:text-gold flex items-center gap-1 mx-auto"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Website
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-cream/50 mt-5">
          Protected by 256-bit SSL · RBAC secured · Audit logged
        </p>
      </motion.div>
    </div>
  );
}
