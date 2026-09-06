"use client";

import { usePathRouter } from "@/lib/router";
import { LuxurySite } from "@/components/site/luxury-site";

/**
 * Home page (/) — renders LuxurySite.
 * All other routes (/projects, /blog, etc.) are handled by [[...slug]]/page.tsx
 */
export default function Home() {
  usePathRouter();
  return <main className="min-h-screen bg-cream"><LuxurySite /></main>;
}
