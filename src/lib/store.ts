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

  // Plot Wishlist (favorites) - persisted to localStorage
  wishlistPlotIds: string[];
  toggleWishlist: (plotId: string) => void;
  isWishlisted: (plotId: string) => boolean;
  clearWishlist: () => void;
  initWishlist: () => void;

  // Project Comparison Tool
  compareProjectSlugs: string[];
  toggleCompare: (slug: string) => void;
  isComparing: (slug: string) => boolean;
  compareOpen: boolean;
  setCompareOpen: (v: boolean) => void;

  // Wishlist panel
  wishlistOpen: boolean;
  setWishlistOpen: (v: boolean) => void;

  // Virtual site tour
  tourOpen: boolean;
  tourProjectSlug: string | null;
  openTour: (slug: string) => void;
  closeTour: () => void;

  // Real site visit booking
  visitOpen: boolean;
  visitProjectId?: string;
  openVisit: (projectId?: string) => void;
  closeVisit: () => void;

  // Plot comparison
  comparePlotIds: string[];
  togglePlotCompare: (id: string) => void;
  isPlotComparing: (id: string) => boolean;
  plotCompareOpen: boolean;
  setPlotCompareOpen: (v: boolean) => void;
}

const WISHLIST_KEY = "braj_wishlist";

function loadWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWishlist(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export const useApp = create<AppState>((set, get) => ({
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

  // Wishlist
  wishlistPlotIds: [],
  toggleWishlist: (plotId) => {
    const current = get().wishlistPlotIds;
    const next = current.includes(plotId)
      ? current.filter((id) => id !== plotId)
      : [...current, plotId];
    saveWishlist(next);
    set({ wishlistPlotIds: next });
  },
  isWishlisted: (plotId) => get().wishlistPlotIds.includes(plotId),
  clearWishlist: () => {
    saveWishlist([]);
    set({ wishlistPlotIds: [] });
  },
  initWishlist: () => {
    if (get().wishlistPlotIds.length === 0) {
      set({ wishlistPlotIds: loadWishlist() });
    }
  },

  // Comparison
  compareProjectSlugs: [],
  toggleCompare: (slug) => {
    const current = get().compareProjectSlugs;
    let next: string[];
    if (current.includes(slug)) {
      next = current.filter((s) => s !== slug);
    } else if (current.length < 3) {
      next = [...current, slug];
    } else {
      next = [current[1], current[2], slug];
    }
    set({ compareProjectSlugs: next });
  },
  isComparing: (slug) => get().compareProjectSlugs.includes(slug),
  compareOpen: false,
  setCompareOpen: (compareOpen) => set({ compareOpen }),

  // Wishlist panel
  wishlistOpen: false,
  setWishlistOpen: (wishlistOpen) => set({ wishlistOpen }),

  // Virtual tour
  tourOpen: false,
  tourProjectSlug: null,
  openTour: (tourProjectSlug) => set({ tourOpen: true, tourProjectSlug }),
  closeTour: () => set({ tourOpen: false, tourProjectSlug: null }),

  // Real site visit
  visitOpen: false,
  visitProjectId: undefined,
  openVisit: (visitProjectId) => set({ visitOpen: true, visitProjectId }),
  closeVisit: () => set({ visitOpen: false, visitProjectId: undefined }),

  // Plot comparison
  comparePlotIds: [],
  togglePlotCompare: (id) => {
    const current = get().comparePlotIds;
    let next: string[];
    if (current.includes(id)) {
      next = current.filter((x) => x !== id);
    } else if (current.length < 3) {
      next = [...current, id];
    } else {
      next = [current[1], current[2], id];
    }
    set({ comparePlotIds: next });
  },
  isPlotComparing: (id) => get().comparePlotIds.includes(id),
  plotCompareOpen: false,
  setPlotCompareOpen: (plotCompareOpen) => set({ plotCompareOpen }),
}));
