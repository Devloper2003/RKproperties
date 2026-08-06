"use client";

import { useEffect } from "react";
import { useApp } from "@/lib/store";
import { LuxurySite } from "@/components/site/luxury-site";
import { AdminPanel } from "@/components/admin/admin-panel";

export default function Home() {
  const view = useApp((s) => s.view);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  return (
    <main className="min-h-screen bg-cream">
      {view === "site" ? <LuxurySite /> : <AdminPanel />}
    </main>
  );
}
