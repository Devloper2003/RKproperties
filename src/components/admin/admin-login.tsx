"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock, Mail, ArrowLeft, Sparkles, AlertTriangle } from "lucide-react";
import { useApp } from "@/lib/store";
import { LotusLogo, MandalaSVG } from "@/components/shared/brand";

export function AdminLogin() {
  const { setAdminAuthed, setView } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ e: email, p: password }),
      });
      const data = await res.json();

      if (data.ok) {
        setAdminAuthed(true);
      } else {
        setError("Invalid credentials. Access denied.");
      }
    } catch {
      setError("Authentication service unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-spiritual-temple relative overflow-hidden p-4">
      <MandalaSVG className="absolute -top-40 -left-40 w-[600px] h-[600px] text-gold/10 mandala-spin" />
      <MandalaSVG className="absolute -bottom-40 -right-40 w-[500px] h-[500px] text-gold/10 mandala-spin" style={{ animationDirection: "reverse" }} />

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
          <div className="bg-gradient-to-br from-indigo-deep to-[#2d1b3d] p-8 text-center relative">
            <div className="absolute inset-0 opacity-10">
              <MandalaSVG className="w-full h-full text-gold mandala-spin" />
            </div>
            <div className="relative">
              <LotusLogo className="w-14 h-14 text-gold mx-auto mb-3" />
              <h1 className="font-display text-2xl font-bold text-cream">RK Properties Admin</h1>
              <p className="text-xs text-cream/60 mt-1 tracking-wider uppercase">Property Management Portal</p>
            </div>
          </div>

          <form onSubmit={submit} className="p-8 space-y-5">
            <div className="text-center mb-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">
                <Shield className="w-3 h-3" /> Authorized Access Only
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

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
                placeholder="Enter authorized email"
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
                placeholder="Enter password"
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
                  <Sparkles className="w-4 h-4" /> Sign In
                </span>
              )}
            </Button>

            <div className="text-center pt-3 border-t border-gold/15">
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
      </motion.div>
    </div>
  );
}
