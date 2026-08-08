"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, Tag, Share2, Phone, MessageCircle } from "lucide-react";
import { useApp } from "@/lib/store";
import type { BlogPost } from "@/lib/types";
import { toast } from "sonner";
import { navigate } from "@/lib/router";

export function BlogPageView() {
  const { blogPageSlug, closeBlogPage, openLeadForm } = useApp();

  const { data: post, isLoading } = useQuery<BlogPost | null>({
    queryKey: ["blog-post-page", blogPageSlug],
    queryFn: async () => {
      if (!blogPageSlug) return null;
      const res = await fetch(`/api/blog?limit=50`);
      const json = await res.json();
      return json.data.find((p: BlogPost) => p.slug === blogPageSlug) || null;
    },
    enabled: !!blogPageSlug,
  });

  if (!blogPageSlug) return null;

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-spiritual-temple border-b border-gold/20 px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">
        <button onClick={() => navigate({name:"home"})} className="flex items-center gap-2 text-sm font-medium text-cream hover:text-gold transition-colors">
          <ArrowLeft className="w-4 h4" /> Back to Home
        </button>
        <Button onClick={() => toast.success("🔗 Link copied!")} size="sm" variant="ghost" className="text-cream/60 hover:text-gold p-2">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-40">
          <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      )}

      {post && (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <Badge className="bg-gold/15 text-gold border-0 mb-3 capitalize">{post.category}</Badge>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-indigo-deep mb-3 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold" /> {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold" /> {post.readTime} min read</span>
              <span>by {post.author}</span>
            </div>
          </div>

          {/* Featured image */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6">
            <Image src={post.featuredImage} alt={post.title} fill sizes="100vw" className="object-cover" priority />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-base sm:text-lg text-indigo-deep/80 leading-relaxed mb-4 font-medium">{post.excerpt}</p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">{post.content}</p>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gold/10">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="border-gold/30 text-gold text-xs">
                  <Tag className="w-3 h-3 mr-1" /> {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 p-6 rounded-2xl bg-spiritual-temple text-center">
            <h3 className="font-display text-xl font-bold text-cream mb-2">Interested in Braj Dham plots?</h3>
            <p className="text-sm text-cream/70 mb-4">Talk to our property advisor for personalized guidance.</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button onClick={() => { navigate({name:"home"}); setTimeout(() => openLeadForm(), 300); }} className="gold-shimmer bg-gradient-to-br from-gold-light to-gold text-indigo-deep font-semibold">
                <MessageCircle className="w-4 h-4 mr-2" /> Get Callback
              </Button>
              <Button asChild variant="outline" className="border-green-deep/40 text-green-deep hover:bg-green-light/10">
                <a href="https://wa.me/918923944689" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
