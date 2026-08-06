"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { FAQS } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  Legal: "bg-green-light/15 text-green-deep border-green-light/30",
  Booking: "bg-gold/15 text-gold border-gold/30",
  NRI: "bg-temple-red/15 text-temple-red border-temple-red/30",
  Amenities: "bg-indigo-deep/10 text-indigo-deep border-indigo-deep/30",
  Investment: "bg-purple-500/15 text-purple-700 border-purple-500/30",
  Visit: "bg-blue-500/15 text-blue-700 border-blue-500/30",
  Payment: "bg-amber-500/15 text-amber-700 border-amber-500/30",
  Construction: "bg-pink-500/15 text-pink-700 border-pink-500/30",
};

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(FAQS.map((f) => f.category)))];

  const filtered = FAQS.filter((f) => {
    const matchesSearch =
      !search ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || f.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <section id="faq" className="py-20 lg:py-28 bg-marble relative">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Questions & Answers"
          title="Your"
          highlight="Spiritual Doubts Cleared"
          subtitle="Everything you need to know about buying your sacred plot in Braj Dham. Can't find your answer? WhatsApp us — we respond within 30 minutes."
        />

        {/* Search + filter */}
        <div className="mb-8 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions... (e.g. MVDA, NRI, booking, payment)"
              className="pl-10 bg-white border-gold/25 h-11"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  category === cat
                    ? "bg-gold text-indigo-deep"
                    : "bg-white text-muted-foreground hover:text-indigo-deep border border-gold/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <Card className="card-luxury rounded-xl">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-muted-foreground">No questions match your search. Try WhatsApp us instead.</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((faq, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Card className={`card-luxury rounded-xl overflow-hidden transition-all ${isOpen ? "ring-gold-glow" : ""}`}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full p-5 text-left flex items-start gap-3 hover:bg-gold/5 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? "bg-gold text-indigo-deep" : "bg-gold/10 text-gold"}`}>
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-sm sm:text-base font-bold text-indigo-deep leading-snug">
                            {faq.question}
                          </h3>
                          <ChevronDown className={`w-4 h-4 text-gold flex-shrink-0 mt-0.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </div>
                        <Badge variant="outline" className={`mt-1.5 text-[9px] ${CATEGORY_COLORS[faq.category] || "bg-muted"}`}>
                          {faq.category}
                        </Badge>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pl-16">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="card-luxury rounded-2xl p-6 inline-block">
            <div className="text-2xl mb-2">🙏</div>
            <h3 className="font-display text-lg font-bold text-indigo-deep mb-1">Still have questions?</h3>
            <p className="text-sm text-muted-foreground mb-4">Our property advisors speak Hindi, English & Hinglish.</p>
            <a
              href="https://wa.me/919837012345?text=Namaste! I have a question about BrajProperty plots"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1da851] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Ask on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
