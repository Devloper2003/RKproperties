"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, ArrowRight, Search } from "lucide-react";
import { navigate } from "@/lib/router";
import type { BlogPost } from "@/lib/types";
import { useState } from "react";

const CATEGORY_COLORS: Record<string, string> = {
  investment: "bg-green-light/15 text-green-deep",
  spiritual: "bg-gold/15 text-gold",
  guide: "bg-temple-red/15 text-temple-red",
  "market-news": "bg-indigo-deep/10 text-indigo-deep",
};

export function BlogListingPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["blog-listing"],
    queryFn: async () => (await fetch("/api/blog?limit=50")).json().then((j) => j.data),
  });

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = posts.filter((p) => {
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === "All" || p.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-cream">
      <div className="sticky top-0 z-50 bg-spiritual-temple border-b border-gold/20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">
        <button onClick={() => navigate({ name: "home" })} className="flex items-center gap-2 text-sm font-medium text-cream hover:text-gold">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="text-cream font-display text-sm font-bold hidden sm:block">Blog & Insights</div>
      </div>

      <div className="relative h-48 sm:h-64 bg-gradient-to-br from-indigo-deep to-[#2d1b3d] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-cream mb-2">Braj Dham Insights</h1>
          <p className="text-sm text-cream/70 max-w-lg mx-auto px-4">Spiritual wisdom, investment guides, and market intelligence from Braj</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-9 pr-4 h-10 rounded-lg border border-gold/25 bg-white text-sm" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-2.5 py-1 rounded-full text-xs font-medium ${category === cat ? "bg-gold text-indigo-deep" : "bg-white border border-gold/20 text-indigo-deep hover:border-gold/40"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">Loading articles...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filtered.map((post, i) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} onClick={() => navigate({ name: "blog-post", slug: post.slug })} className="cursor-pointer">
                <Card className="card-luxury group rounded-2xl overflow-hidden h-full">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={post.featuredImage} alt={post.title} fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <Badge className={`absolute top-3 left-3 border-0 capitalize ${CATEGORY_COLORS[post.category] || "bg-gold/15 text-gold"}`}>{post.category}</Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-display text-base font-bold text-indigo-deep mb-2 line-clamp-2 group-hover:text-gold transition-colors">{post.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
