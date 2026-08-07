"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useApp } from "@/lib/store";
import { navigate } from "@/lib/router";
import type { BlogPost } from "@/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  investment: "bg-green-light/15 text-green-deep",
  spiritual: "bg-gold/15 text-gold",
  guide: "bg-temple-red/15 text-temple-red",
  "market-news": "bg-indigo-deep/10 text-indigo-deep",
};

export function BlogPreview() {
  
  const { data: posts = [] } = useQuery<BlogPost[]>({
    queryKey: ["blog-preview"],
    queryFn: async () => (await fetch("/api/blog?limit=3")).json().then((j) => j.data),
  });

  return (
    <section id="blog" className="py-20 lg:py-28 bg-marble">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Insights & Wisdom"
          title="Stories from"
          highlight="Braj Dham"
          subtitle="Spiritual insights, investment guidance, and market intelligence from the heart of Braj. Learn why thousands choose this sacred land."
        />

        {posts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">Loading articles...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <Card className="card-luxury rounded-2xl overflow-hidden h-full flex flex-col group cursor-pointer" onClick={() => navigate({name:"blog-post",slug:post.slug})}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/40 to-transparent" />
                    <Badge
                      className={`absolute top-3 left-3 border-0 capitalize ${CATEGORY_COLORS[post.category] || "bg-gold/15 text-gold"}`}
                    >
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-lg font-bold text-indigo-deep leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gold/10 text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime} min read
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button
            onClick={() => navigate({ name: "blog" })}
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
