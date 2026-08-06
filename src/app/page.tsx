"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/store";
import { LuxurySite } from "@/components/site/luxury-site";
import { AdminPanel } from "@/components/admin/admin-panel";
import { ProjectPageView } from "@/components/site/project-page-view";
import { BlogPageView } from "@/components/site/blog-page-view";
import { TemplePageView } from "@/components/site/temple-page-view";

export default function Home() {
  const view = useApp((s) => s.view);
  const projectPageSlug = useApp((s) => s.projectPageSlug);
  const blogPageSlug = useApp((s) => s.blogPageSlug);
  const templePageSlug = useApp((s) => s.templePageSlug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view, projectPageSlug, blogPageSlug, templePageSlug]);

  // Admin view
  if (view === "admin") return <main className="min-h-screen bg-cream"><AdminPanel /></main>;

  // Separate detail pages — completely replace the homepage
  if (projectPageSlug) return <main className="min-h-screen bg-cream"><ProjectPageView /></main>;
  if (blogPageSlug) return <main className="min-h-screen bg-cream"><BlogPageView /></main>;
  if (templePageSlug) return <main className="min-h-screen bg-cream"><TemplePageView /></main>;

  // Default: luxury site homepage
  return <main className="min-h-screen bg-cream"><LuxurySite /></main>;
}
