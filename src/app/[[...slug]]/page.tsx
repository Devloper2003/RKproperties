"use client";

import { useApp } from "@/lib/store";
import { usePathRouter, parsePath } from "@/lib/router";
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

export default function CatchAllPage() {
  usePathRouter();

  const view = useApp((s) => s.view);
  const projectPageSlug = useApp((s) => s.projectPageSlug);
  const blogPageSlug = useApp((s) => s.blogPageSlug);
  const templePageSlug = useApp((s) => s.templePageSlug);

  const route = typeof window !== "undefined" ? parsePath() : { name: "home" as const };

  // Admin
  if (view === "admin") return <main className="min-h-screen bg-cream page-animate"><AdminPanel /></main>;

  // Detail pages (from store state — set by router)
  if (projectPageSlug) return <main className="min-h-screen bg-cream page-animate"><ProjectPageView /></main>;
  if (blogPageSlug) return <main className="min-h-screen bg-cream page-animate"><BlogPageView /></main>;
  if (templePageSlug) return <main className="min-h-screen bg-cream page-animate"><TemplePageView /></main>;

  // Listing & static pages (from URL path)
  if (route.name === "projects") return <main className="min-h-screen bg-cream page-animate"><ProjectsListingPage /></main>;
  if (route.name === "blog") return <main className="min-h-screen bg-cream page-animate"><BlogListingPage /></main>;
  if (route.name === "temples") return <main className="min-h-screen bg-cream page-animate"><TemplesListingPage /></main>;
  if (route.name === "plots") return <main className="min-h-screen bg-cream page-animate"><PlotsPage /></main>;
  if (route.name === "about") return <main className="min-h-screen bg-cream page-animate"><AboutPage /></main>;
  if (route.name === "invest") return <main className="min-h-screen bg-cream page-animate"><InvestPage /></main>;
  if (route.name === "contact") return <main className="min-h-screen bg-cream page-animate"><ContactPage /></main>;

  // Default: homepage
  return <main className="min-h-screen bg-cream"><LuxurySite /></main>;
}
