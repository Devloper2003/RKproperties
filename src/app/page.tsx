"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/store";
import { useHashRouter, parseHash } from "@/lib/router";
import { LuxurySite } from "@/components/site/luxury-site";
import { AdminPanel } from "@/components/admin/admin-panel";
import { ProjectPageView } from "@/components/site/project-page-view";
import { BlogPageView } from "@/components/site/blog-page-view";
import { TemplePageView } from "@/components/site/temple-page-view";
import { ProjectsListingPage } from "@/components/site/projects-listing-page";
import { BlogListingPage } from "@/components/site/blog-listing-page";
import { TemplesListingPage } from "@/components/site/temples-listing-page";
import { AboutPage } from "@/components/site/about-page";
import { InvestPage } from "@/components/site/invest-page";
import { ContactPage } from "@/components/site/contact-page";
import { PlotsPage } from "@/components/site/plots-page";

export default function Home() {
  useHashRouter();

  const view = useApp((s) => s.view);
  const projectPageSlug = useApp((s) => s.projectPageSlug);
  const blogPageSlug = useApp((s) => s.blogPageSlug);
  const templePageSlug = useApp((s) => s.templePageSlug);

  const route = typeof window !== "undefined" ? parseHash() : { name: "home" as const };

  // Admin
  if (view === "admin") return <main className="min-h-screen bg-cream"><AdminPanel /></main>;

  // Detail pages (from store state — set by router)
  if (projectPageSlug) return <main className="min-h-screen bg-cream"><ProjectPageView /></main>;
  if (blogPageSlug) return <main className="min-h-screen bg-cream"><BlogPageView /></main>;
  if (templePageSlug) return <main className="min-h-screen bg-cream"><TemplePageView /></main>;

  // Listing & static pages (from URL hash)
  if (route.name === "projects") return <main className="min-h-screen bg-cream"><ProjectsListingPage /></main>;
  if (route.name === "blog") return <main className="min-h-screen bg-cream"><BlogListingPage /></main>;
  if (route.name === "temples") return <main className="min-h-screen bg-cream"><TemplesListingPage /></main>;
  if (route.name === "plots") return <main className="min-h-screen bg-cream"><PlotsPage /></main>;
  if (route.name === "about") return <main className="min-h-screen bg-cream"><AboutPage /></main>;
  if (route.name === "invest") return <main className="min-h-screen bg-cream"><InvestPage /></main>;
  if (route.name === "contact") return <main className="min-h-screen bg-cream"><ContactPage /></main>;

  // Default: homepage
  return <main className="min-h-screen bg-cream"><LuxurySite /></main>;
}
