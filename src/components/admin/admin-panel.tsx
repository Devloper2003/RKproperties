"use client";

import { AdminLogin } from "./admin-login";
import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";
import { Dashboard } from "./modules/dashboard";
import { Projects } from "./modules/projects";
import { Plots } from "./modules/plots";
import { Leads } from "./modules/leads";
import { Bookings } from "./modules/bookings";
import { Content } from "./modules/content";
import { Analytics } from "./modules/analytics";
import { Reports } from "./modules/reports";
import { Settings } from "./modules/settings";
import { useApp } from "@/lib/store";
import { LotusLogo } from "@/components/shared/brand";

const MODULE_TITLES: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Overview of your spiritual real estate business" },
  projects: { title: "Projects", subtitle: "Manage your premium townships" },
  plots: { title: "Plot Inventory", subtitle: "Real-time plot availability and pricing" },
  leads: { title: "Lead Pipeline", subtitle: "CRM — nurture devotees to residents" },
  bookings: { title: "Bookings", subtitle: "Track plot reservations and payments" },
  content: { title: "Content", subtitle: "Blog, testimonials, temples & team" },
  analytics: { title: "Analytics", subtitle: "Business intelligence & insights" },
  reports: { title: "Reports", subtitle: "Generate and export business reports" },
  settings: { title: "Settings", subtitle: "Site configuration & preferences" },
};

export function AdminPanel() {
  const { adminAuthed, adminActiveModule } = useApp();

  if (!adminAuthed) {
    return <AdminLogin />;
  }

  const meta = MODULE_TITLES[adminActiveModule] || MODULE_TITLES.dashboard;

  const renderModule = () => {
    switch (adminActiveModule) {
      case "dashboard": return <Dashboard />;
      case "projects": return <Projects />;
      case "plots": return <Plots />;
      case "leads": return <Leads />;
      case "bookings": return <Bookings />;
      case "content": return <Content />;
      case "analytics": return <Analytics />;
      case "reports": return <Reports />;
      case "settings": return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-cream">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <AdminTopbar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {renderModule()}
        </main>
        <footer className="border-t border-gold/15 px-6 py-3 text-xs text-muted-foreground flex items-center justify-between bg-cream">
          <span className="flex items-center gap-1.5">
            <LotusLogo className="w-4 h-4 text-gold" />
            RK Properties Admin · © 2026
          </span>
          <span>MVDA Approved · Secure Session</span>
        </footer>
      </div>
    </div>
  );
}
