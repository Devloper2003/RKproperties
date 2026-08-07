"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/store";
import { useHashRouter, parseHash, navigate } from "@/lib/router";
import { LuxurySite } from "@/components/site/luxury-site";
import { AdminPanel } from "@/components/admin/admin-panel";
import { ProjectPageView } from "@/components/site/project-page-view";
import { BlogPageView } from "@/components/site/blog-page-view";
import { TemplePageView } from "@/components/site/temple-page-view";
import { ProjectsListingPage } from "@/components/site/projects-listing-page";
import { BlogListingPage } from "@/components/site/blog-listing-page";
import { TemplesListingPage } from "@/components/site/temples-listing-page";

export default function Home() {
  // Initialize hash router — listens to URL changes + back button
  useHashRouter();

  const view = useApp((s) => s.view);
  const projectPageSlug = useApp((s) => s.projectPageSlug);
  const blogPageSlug = useApp((s) => s.blogPageSlug);
  const templePageSlug = useApp((s) => s.templePageSlug);

  // Determine current route from URL hash
  const route = typeof window !== "undefined" ? parseHash() : { name: "home" as const };

  // Admin
  if (view === "admin") return <main className="min-h-screen bg-cream"><AdminPanel /></main>;

  // Project detail page
  if (projectPageSlug) return <main className="min-h-screen bg-cream"><ProjectPageView /></main>;

  // Blog post page
  if (blogPageSlug) return <main className="min-h-screen bg-cream"><BlogPageView /></main>;

  // Temple detail page
  if (templePageSlug) return <main className="min-h-screen bg-cream"><TemplePageView /></main>;

  // Listing pages (based on URL hash)
  if (route.name === "projects") return <main className="min-h-screen bg-cream"><ProjectsListingPage /></main>;
  if (route.name === "blog") return <main className="min-h-screen bg-cream"><BlogListingPage /></main>;
  if (route.name === "temples") return <main className="min-h-screen bg-cream"><TemplesListingPage /></main>;

  // Default: homepage
  return <main className="min-h-screen bg-cream"><LuxurySite /></main>;
}
