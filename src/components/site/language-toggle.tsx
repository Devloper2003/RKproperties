"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useApp } from "@/lib/store";

const LANGUAGES = [
  { code: "en" as const, label: "English", native: "English", flag: "🇬🇧" },
  { code: "hi" as const, label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "hinglish" as const, label: "Hinglish", native: "Hinglish", flag: "🇮🇳" },
];

export function LanguageToggle({ light = false }: { light?: boolean }) {
  const { language, setLanguage } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
          light
            ? "text-cream/90 hover:text-gold hover:bg-cream/10"
            : "text-indigo-deep hover:text-gold hover:bg-gold/5"
        }`}
        aria-label="Change language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{current.native}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 w-40 bg-cream border border-gold/25 rounded-lg shadow-xl overflow-hidden z-50"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors ${
                  lang.code === language
                    ? "bg-gold/10 text-gold font-semibold"
                    : "text-indigo-deep hover:bg-gold/5"
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="flex-1 text-left">
                  <div>{lang.native}</div>
                  <div className="text-[9px] text-muted-foreground">{lang.label}</div>
                </span>
                {lang.code === language && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
            <div className="px-3 py-1.5 bg-marble text-[9px] text-muted-foreground text-center border-t border-gold/10">
              🙏 Namaste · नमस्ते · Namaste
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
