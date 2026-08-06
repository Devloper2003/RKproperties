// Shared types for BrajProperty.in

export interface NearbyTemple {
  name: string;
  distance: string;
  walkTime: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  location: string;
  city: string;
  latitude: number;
  longitude: number;
  totalAreaAcres: number;
  minPlotSize: number;
  maxPlotSize: number;
  priceRangeMin: number;
  priceRangeMax: number;
  status: string;
  reraNumber: string | null;
  mvdaNumber: string | null;
  possessionDate: string | null;
  heroImage: string;
  galleryImages: string[];
  amenities: string[];
  nearbyTemples: NearbyTemple[];
  usp: string;
  description: string;
  longDescription: string;
  isPublished: boolean;
  isFeatured: boolean;
  sortOrder: number;
  plotCount?: number;
  plots?: Plot[];
  testimonials?: Testimonial[];
}

export interface Plot {
  id: string;
  projectId: string;
  plotNumber: string;
  sizeSqyd: number;
  facing: string;
  dimensions: string;
  price: number;
  status: "available" | "reserved" | "booked" | "sold";
  isCorner: boolean;
  isRoadFacing: boolean;
  project?: { name: string; slug: string; city: string };
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  source: string;
  projectId: string | null;
  project?: { name: string; slug: string } | null;
  budgetRange: string | null;
  score: number;
  stage: string;
  notes: string | null;
  assignedTo: string | null;
  lastContactedAt: string | null;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string | null;
  content: string;
  avatar: string | null;
  rating: number;
  location: string | null;
  project?: { name: string; slug: string } | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  readTime: number;
  publishedAt: string;
}

export interface Temple {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  location: string;
  significance: string;
  distanceFromVrindavan: string | null;
}

export interface DashboardData {
  counts: {
    projects: number;
    plots: number;
    leads: number;
    bookings: number;
    testimonials: number;
    blogPosts: number;
    contacts: number;
  };
  plotStatusBreakdown: { status: string; count: number }[];
  leadStageBreakdown: { stage: string; count: number }[];
  projectCityBreakdown: { city: string; count: number }[];
  totalInventoryValue: number;
  recentLeads: Lead[];
  topProjects: {
    id: string;
    name: string;
    slug: string;
    city: string;
    status: string;
    plotCount: number;
    leadCount: number;
  }[];
}

export const PROJECT_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  selling: { label: "Selling Now", color: "text-green-deep bg-green-light/10" },
  "pre-launch": { label: "Pre-Launch", color: "text-temple-red bg-temple-red/10" },
  "sold-out": { label: "Sold Out", color: "text-muted-foreground bg-muted" },
};

export const PLOT_STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  available: { label: "Available", color: "text-green-light", bg: "bg-green-light", border: "border-green-light" },
  reserved: { label: "Reserved", color: "text-gold", bg: "bg-gold", border: "border-gold" },
  booked: { label: "Booked", color: "text-indigo-deep", bg: "bg-indigo-deep", border: "border-indigo-deep" },
  sold: { label: "Sold", color: "text-temple-red", bg: "bg-temple-red", border: "border-temple-red" },
};

export const LEAD_STAGES: { id: string; label: string; color: string }[] = [
  { id: "new", label: "New", color: "bg-blue-500" },
  { id: "contacted", label: "Contacted", color: "bg-amber-500" },
  { id: "qualified", label: "Qualified", color: "bg-purple-500" },
  { id: "site-visit", label: "Site Visit", color: "bg-pink-500" },
  { id: "negotiation", label: "Negotiation", color: "bg-orange-500" },
  { id: "won", label: "Won", color: "bg-green-600" },
  { id: "lost", label: "Lost", color: "bg-gray-500" },
];

export function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 === 0 ? 0 : 1)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
  return `₹${amount}`;
}

export function formatINRFull(amount: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}
