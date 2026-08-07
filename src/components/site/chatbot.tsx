"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Phone, Loader2, Bot, User } from "lucide-react";
import { useApp } from "@/lib/store";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const QUICK_REPLIES = [
  "Tell me about your projects",
  "What are the plot prices?",
  "Is MVDA approval important?",
  "Book a site visit",
];

const WELCOME_MSG: Msg = {
  role: "assistant",
  content:
    "Namaste 🙏 I'm Braj Assist, your spiritual property guide. I can help you explore our 4 premium townships in Vrindavan, Mathura & Govardhan, check plot availability, and calculate EMI. How may I assist you on your spiritual home journey?",
};

export function Chatbot() {
  const { chatOpen, setChatOpen } = useApp();
  const [messages, setMessages] = useState<Msg[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const json = await res.json();
      const reply = json.data?.reply || "I apologize, please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting. Please WhatsApp our team directly at +91 98370 12345 for immediate help. 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[380px] h-[520px] max-h-[75vh] bg-cream rounded-2xl shadow-[0_20px_60px_rgba(26,26,46,0.3)] border border-gold/30 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-spiritual-temple px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
                  <Bot className="w-5 h-5 text-indigo-deep" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-light border-2 border-indigo-deep" />
              </div>
              <div>
                <div className="font-display text-sm font-bold text-cream flex items-center gap-1.5">
                  Braj Assist <Sparkles className="w-3 h-3 text-gold" />
                </div>
                <div className="text-[10px] text-cream/60">Your Spiritual Property Guide</div>
              </div>
            </div>
            <a
              href="https://wa.me/919837012345?text=Namaste! I'd like to speak with a human property advisor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] px-2 py-1 rounded-full bg-green-light/20 text-green-light hover:bg-green-light/30 flex items-center gap-1"
              title="Talk to a human"
            >
              <Phone className="w-3 h-3" /> Human
            </a>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef as any}>
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                      m.role === "user"
                        ? "bg-indigo-deep text-cream"
                        : "bg-gradient-to-br from-gold-light to-gold text-indigo-deep"
                    }`}
                  >
                    {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div
                    className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-indigo-deep text-cream rounded-tr-sm"
                        : "bg-white text-indigo-deep border border-gold/15 rounded-tl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-light to-gold flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-indigo-deep" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white border border-gold/15 rounded-tl-sm flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-gold" />
                    <span className="text-xs text-muted-foreground">Braj Assist is typing...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick replies */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-[11px] px-2.5 py-1.5 rounded-full bg-gold/10 text-gold hover:bg-gold/20 transition-colors border border-gold/20"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-gold/15 flex gap-2 bg-cream"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about plots, prices, temples..."
              className="bg-white border-gold/25 h-10 text-sm"
              disabled={loading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep h-10 w-10 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
