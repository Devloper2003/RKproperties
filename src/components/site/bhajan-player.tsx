"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, X } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { BRAJ_BHAJANS, BHAJAN_LYRICS } from "@/lib/types";

export function BhajanPlayer() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const [showPlayer, setShowPlayer] = useState(false); // mini player at bottom
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const bhajan = BRAJ_BHAJANS[currentIdx];

  // Mock playback (no real audio file, just progress simulation)
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            // Auto-advance to next
            setCurrentIdx((i) => (i + 1) % BRAJ_BHAJANS.length);
            return 0;
          }
          return p + 0.3; // slow progress
        });
      }, 200);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const playTrack = (idx: number) => {
    if (idx === currentIdx && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentIdx(idx);
      setProgress(0);
      setIsPlaying(true);
      setShowPlayer(true);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const next = () => {
    setCurrentIdx((i) => (i + 1) % BRAJ_BHAJANS.length);
    setProgress(0);
  };
  const prev = () => {
    setCurrentIdx((i) => (i - 1 + BRAJ_BHAJANS.length) % BRAJ_BHAJANS.length);
    setProgress(0);
  };

  // Parse duration string to seconds
  const totalSec = parseInt(bhajan.duration.split(":")[0]) * 60 + parseInt(bhajan.duration.split(":")[1]);
  const currentSec = Math.floor((progress / 100) * totalSec);
  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <section className="py-20 lg:py-28 bg-spiritual-temple relative overflow-hidden">
      {/* Decorative music notes */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {["🎵", "🎶", "🎵", "🎶", "🎵", "🎶", "🎵", "🎶"].map((note, i) => (
          <div
            key={i}
            className="absolute text-gold text-4xl"
            style={{
              left: `${(i * 13 + 5) % 95}%`,
              top: `${(i * 17 + 8) % 88}%`,
              animation: `float-up ${6 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {note}
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          eyebrow="Devotional Music"
          title="Braj"
          highlight="Bhajan Player"
          subtitle="Let the divine melodies of Braj fill your heart while you explore. These timeless bhajans invoke Krishna's presence — play one and feel the spiritual ambiance."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {BRAJ_BHAJANS.map((b, i) => {
            const isActive = i === currentIdx && showPlayer;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card
                  className={`rounded-xl cursor-pointer transition-all group ${
                    isActive
                      ? "bg-gold/10 border-gold/50"
                      : "bg-cream/5 backdrop-blur-sm border-cream/15 hover:border-gold/30"
                  }`}
                  onClick={() => playTrack(i)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    {/* Play/Pause button */}
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive ? "bg-gold text-indigo-deep" : "bg-cream/10 text-cream group-hover:bg-gold/20"
                    }`}>
                      {isActive && isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className={`font-display text-sm font-bold truncate ${isActive ? "text-gold" : "text-cream"}`}>
                          {b.title}
                        </h3>
                        {isActive && (
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-[10px]"
                          >
                            🎵
                          </motion.span>
                        )}
                      </div>
                      <p className="text-[11px] text-cream/50 truncate">{b.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[9px] border-gold/30 text-gold h-4">
                          {b.category}
                        </Badge>
                        <span className="text-[10px] text-cream/40">{b.duration}</span>
                      </div>
                    </div>

                    {/* Active progress bar */}
                    {isActive && (
                      <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                        <div className="w-16 h-1 rounded-full bg-cream/10 overflow-hidden">
                          <motion.div
                            className="h-full bg-gold"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-[9px] text-cream/50 font-mono">{fmtTime(currentSec)}/{b.duration}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Lyrics display for current bhajan */}
        {showPlayer && BHAJAN_LYRICS[bhajan.title] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className="bg-cream/5 backdrop-blur-sm border-gold/25 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Music className="w-4 h-4 text-gold" />
                  <span className="text-xs uppercase tracking-[0.25em] text-gold">Lyrics</span>
                  <span className="text-xs text-cream/60 ml-auto">Now playing: {bhajan.title}</span>
                </div>

                <div className="space-y-4">
                  {BHAJAN_LYRICS[bhajan.title].map((verse, vi) => (
                    <motion.div
                      key={vi}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: vi * 0.15 }}
                      className="p-4 rounded-xl bg-cream/5 border border-gold/10"
                    >
                      {verse.lines.map((line, li) => (
                        <p key={li} className="font-devanagari text-base sm:text-lg text-cream leading-relaxed text-center mb-1">
                          {line}
                        </p>
                      ))}
                      <p className="text-[11px] text-cream/50 italic mt-2 text-center">
                        {verse.translation}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-gold/10 border border-gold/20 text-center">
                  <p className="text-xs text-cream/70 italic">
                    🎵 Sing along with devotion. The Sanskrit syllables carry spiritual potency — each sound vibration purifies the heart.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <p className="text-center text-xs text-cream/40 mt-6">
          📻 Demo player — in production, these would stream actual bhajan recordings
        </p>
      </div>

      {/* Mini player (fixed bottom) */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-spiritual-temple/95 backdrop-blur-md border-t border-gold/30"
          >
            <div className="container mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
              {/* Track info */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center flex-shrink-0">
                  <Music className="w-4 h-4 text-indigo-deep" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-xs font-bold text-cream truncate">{bhajan.title}</div>
                  <div className="text-[10px] text-cream/50 truncate">{bhajan.category} · {fmtTime(currentSec)}/{bhajan.duration}</div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" onClick={prev} className="text-cream/70 hover:text-gold h-8 w-8">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button size="icon" onClick={togglePlay} className="bg-gold text-indigo-deep hover:bg-gold-dark h-9 w-9 rounded-full">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" fill="currentColor" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={next} className="text-cream/70 hover:text-gold h-8 w-8">
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>

              {/* Progress bar (desktop) */}
              <div className="hidden md:flex items-center gap-2 w-32">
                <div className="flex-1 h-1 rounded-full bg-cream/10 overflow-hidden">
                  <motion.div className="h-full bg-gold" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Close */}
              <Button
                size="icon"
                variant="ghost"
                onClick={() => { setShowPlayer(false); setIsPlaying(false); }}
                className="text-cream/50 hover:text-gold h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
