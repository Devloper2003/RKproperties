"use client";

import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, FileText, Church, Users, Clock } from "lucide-react";
import type { BlogPost, Testimonial, Temple, TeamMember } from "@/lib/types";

export function Content() {
  const { data: posts = [] } = useQuery<BlogPost[]>({ queryKey: ["blog-admin"], queryFn: async () => (await fetch("/api/blog?limit=50")).json().then((j) => j.data) });
  const { data: testimonials = [] } = useQuery<Testimonial[]>({ queryKey: ["testimonials-admin"], queryFn: async () => (await fetch("/api/testimonials")).json().then((j) => j.data) });
  const { data: temples = [] } = useQuery<Temple[]>({ queryKey: ["temples-admin"], queryFn: async () => (await fetch("/api/temples")).json().then((j) => j.data) });

  return (
    <Tabs defaultValue="blog">
      <TabsList className="bg-marble">
        <TabsTrigger value="blog" className="data-[state=active]:bg-cream data-[state=active]:text-gold"><FileText className="w-3.5 h-3.5 mr-1.5" /> Blog ({posts.length})</TabsTrigger>
        <TabsTrigger value="testimonials" className="data-[state=active]:bg-cream data-[state=active]:text-gold"><Star className="w-3.5 h-3.5 mr-1.5" /> Testimonials ({testimonials.length})</TabsTrigger>
        <TabsTrigger value="temples" className="data-[state=active]:bg-cream data-[state=active]:text-gold"><Church className="w-3.5 h-3.5 mr-1.5" /> Temples ({temples.length})</TabsTrigger>
        <TabsTrigger value="team" className="data-[state=active]:bg-cream data-[state=active]:text-gold"><Users className="w-3.5 h-3.5 mr-1.5" /> Team</TabsTrigger>
      </TabsList>

      <TabsContent value="blog" className="mt-4">
        <Card className="card-luxury rounded-xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-marble">
                  <tr className="text-left text-xs text-muted-foreground border-b border-gold/15">
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Author</th>
                    <th className="px-4 py-3 font-medium">Read Time</th>
                    <th className="px-4 py-3 font-medium">Published</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p.id} className="border-b border-gold/8 hover:bg-gold/5">
                      <td className="px-4 py-3 font-medium text-indigo-deep max-w-xs truncate">{p.title}</td>
                      <td className="px-4 py-3"><Badge variant="outline" className="capitalize border-gold/30 text-gold">{p.category}</Badge></td>
                      <td className="px-4 py-3 text-muted-foreground">{p.author}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground"><Clock className="w-3 h-3 inline mr-1" />{p.readTime} min</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(p.publishedAt).toLocaleDateString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="testimonials" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <Card key={t.id} className="card-luxury rounded-xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < t.rating ? "fill-gold text-gold" : "text-gold/30"}`} />)}
                </div>
                <p className="text-sm text-indigo-deep/80 italic line-clamp-4 mb-3">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-2 pt-3 border-t border-gold/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-cream flex items-center justify-center text-xs font-bold">{t.name.charAt(0)}</div>
                  <div><div className="text-sm font-semibold text-indigo-deep">{t.name}</div><div className="text-[11px] text-muted-foreground">{t.project?.name}</div></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="temples" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {temples.map((t) => (
            <Card key={t.id} className="card-luxury rounded-xl overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Church className="w-5 h-5 text-gold" />
                  <h3 className="font-display text-base font-bold text-indigo-deep">{t.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-2">📍 {t.location}</p>
                <p className="text-sm text-indigo-deep/80 line-clamp-3">{t.significance}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="team" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Shri Gopal Das", role: "Founder & MD" },
            { name: "Smt. Radha Rani", role: "Director, Spiritual Outreach" },
            { name: "Shri Arjun Sharma", role: "Head of Sales" },
            { name: "Smt. Meera Gupta", role: "Legal & Compliance" },
          ].map((m) => (
            <Card key={m.name} className="card-luxury rounded-xl text-center">
              <CardContent className="p-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-light to-gold-dark text-cream flex items-center justify-center font-display text-xl font-bold mx-auto mb-3">{m.name.charAt(0)}</div>
                <div className="font-medium text-indigo-deep text-sm">{m.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{m.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
