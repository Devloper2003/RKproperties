"use client";

import { create } from "zustand";

export type View = "site" | "admin";

interface AppState {
  // View
  view: View;
  setView: (v: View) => void;
  toggleView: () => void;

  // Admin panel
  adminAuthed: boolean;
  setAdminAuthed: (v: boolean) => void;
  adminActiveModule: string;
  setAdminActiveModule: (m: string) => void;

  // Selected project (for detail modal)
  selectedProjectSlug: string | null;
  setSelectedProjectSlug: (s: string | null) => void;

  // Plot filter modal
  selectedProjectForPlots: string | null;
  setSelectedProjectForPlots: (s: string | null) => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;

  // Chatbot
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;

  // Lead form modal
  leadFormOpen: boolean;
  leadFormProjectId?: string;
  openLeadForm: (projectId?: string) => void;
  closeLeadForm: () => void;

  // Booking modal
  bookingPlotId?: string;
  openBooking: (plotId: string) => void;
  closeBooking: () => void;
}

export const useApp = create<AppState>((set) => ({
  view: "site",
  setView: (view) => set({ view }),
  toggleView: () => set((s) => ({ view: s.view === "site" ? "admin" : "site" })),

  adminAuthed: false,
  setAdminAuthed: (adminAuthed) => set({ adminAuthed }),
  adminActiveModule: "dashboard",
  setAdminActiveModule: (adminActiveModule) => set({ adminActiveModule }),

  selectedProjectSlug: null,
  setSelectedProjectSlug: (selectedProjectSlug) => set({ selectedProjectSlug }),

  selectedProjectForPlots: null,
  setSelectedProjectForPlots: (selectedProjectForPlots) => set({ selectedProjectForPlots }),

  mobileMenuOpen: false,
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),

  chatOpen: false,
  setChatOpen: (chatOpen) => set({ chatOpen }),

  leadFormOpen: false,
  leadFormProjectId: undefined,
  openLeadForm: (projectId) => set({ leadFormOpen: true, leadFormProjectId: projectId }),
  closeLeadForm: () => set({ leadFormOpen: false, leadFormProjectId: undefined }),

  bookingPlotId: undefined,
  openBooking: (bookingPlotId) => set({ bookingPlotId }),
  closeBooking: () => set({ bookingPlotId: undefined }),
}));
