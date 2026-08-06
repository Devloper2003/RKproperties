"use client";

import { Bell, Search, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useApp } from "@/lib/store";

export function AdminTopbar({ title, subtitle }: { title: string; subtitle: string }) {
  const { setView } = useApp();
  return (
    <header className="sticky top-0 z-20 bg-cream/95 backdrop-blur-md border-b border-gold/15 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 mt-14 lg:mt-0">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-xl sm:text-2xl font-bold text-indigo-deep leading-tight truncate">
            {title}
          </h1>
          <p className="text-xs text-muted-foreground truncate hidden sm:block">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 w-48 lg:w-64 h-9 bg-white border-gold/25 text-sm"
            />
          </div>

          <button
            onClick={() => setView("site")}
            aria-label="View website"
            className="hidden sm:flex w-9 h-9 items-center justify-center rounded-full text-muted-foreground hover:text-gold hover:bg-gold/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            aria-label="Notifications"
            className="relative w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-gold hover:bg-gold/10 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-temple-red" />
          </button>

          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-gold/15">
            <Avatar className="w-9 h-9 border border-gold/30">
              <AvatarFallback className="bg-gradient-to-br from-gold-light to-gold-dark text-cream text-xs font-bold">
                SA
              </AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <div className="text-sm font-semibold text-indigo-deep leading-tight">Super Admin</div>
              <div className="text-[10px] text-muted-foreground">admin@brajproperty.in</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
