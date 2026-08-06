"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Building2,
  Grid3x3,
  Users,
  CalendarCheck,
  FileText,
  BarChart3,
  FileBarChart,
  Settings,
  LogOut,
  Menu,
  ExternalLink,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { LotusLogo } from "@/components/shared/brand";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: Building2 },
  { id: "plots", label: "Plot Inventory", icon: Grid3x3 },
  { id: "leads", label: "Lead Pipeline", icon: Users },
  { id: "bookings", label: "Bookings", icon: CalendarCheck },
  { id: "content", label: "Content", icon: FileText },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings },
];

interface NavContentProps {
  activeModule: string;
  onNavigate: (id: string) => void;
  onViewSite: () => void;
  onSignOut: () => void;
}

function NavContent({ activeModule, onNavigate, onViewSite, onSignOut }: NavContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-gold/15">
        <div className="flex items-center gap-2.5">
          <LotusLogo className="w-9 h-9 text-gold" />
          <div>
            <div className="font-display text-base font-bold text-cream leading-tight">
              RK Properties<span className="text-gold">.in</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-cream/50">Admin Console</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scroll-luxury">
        {NAV.map((item) => {
          const active = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all relative group ${
                active
                  ? "bg-gradient-to-r from-gold/20 to-transparent text-gold"
                  : "text-cream/70 hover:text-gold hover:bg-cream/5"
              }`}
            >
              {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-gold rounded-r-full" />}
              <item.icon className={`w-4 h-4 ${active ? "text-gold" : "text-cream/60 group-hover:text-gold"}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="p-3 border-t border-gold/15 space-y-1">
        <button
          onClick={onViewSite}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-cream/70 hover:text-gold hover:bg-cream/5 transition-colors"
        >
          <ExternalLink className="w-4 h-4" /> View Website
        </button>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-temple-red hover:bg-temple-red/10 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const { adminActiveModule, setAdminActiveModule, setView, setAdminAuthed } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (id: string) => {
    setAdminActiveModule(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-spiritual-temple border-r border-gold/15 z-30">
        <NavContent
          activeModule={adminActiveModule}
          onNavigate={handleNavigate}
          onViewSite={() => setView("site")}
          onSignOut={() => { setAdminAuthed(false); setView("site"); }}
        />
      </aside>

      {/* Mobile header trigger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-spiritual-temple border-b border-gold/15 px-4 h-14 flex items-center justify-between">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button className="text-cream p-2 -ml-2" aria-label="Open menu">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-spiritual-temple border-gold/15">
            <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
            <NavContent
              activeModule={adminActiveModule}
              onNavigate={handleNavigate}
              onViewSite={() => setView("site")}
              onSignOut={() => { setAdminAuthed(false); setView("site"); }}
            />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <LotusLogo className="w-6 h-6 text-gold" />
          <span className="font-display text-sm font-bold text-cream">RK Properties Admin</span>
        </div>
        <div className="w-8" />
      </div>
    </>
  );
}
