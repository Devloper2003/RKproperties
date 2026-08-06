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

// ===== Spiritual Content =====

export const KRISHNA_QUOTES: { text: string; source: string }[] = [
  { text: "Whatever you do, whatever you eat, whatever you offer as oblation, whatever you give away, whatever austerity you practice — do it as an offering to Me.", source: "Bhagavad Gita 9.27" },
  { text: "Set thy heart upon thy work, but never on its reward.", source: "Bhagavad Gita 2.47" },
  { text: "The soul is neither born, nor does it ever die. It is eternal, ever-existing, and primeval.", source: "Bhagavad Gita 2.20" },
  { text: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.", source: "Bhagavad Gita 6.19" },
  { text: "A person is said to be elevated in yoga when, having renounced all material desires, he neither acts for sense gratification nor engages in fruitive work.", source: "Bhagavad Gita 6.4" },
  { text: "The thoughts of My pure devotees dwell in Me, their lives are surrendered to Me, and they derive great satisfaction and bliss enlightening one another.", source: "Bhagavad Gita 10.9" },
  { text: "Whoever offers Me with devotion a leaf, a flower, a fruit, or water — I accept that devout offering.", source: "Bhagavad Gita 9.26" },
  { text: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.", source: "Bhagavad Gita 18.66" },
];

export const FESTIVALS: { name: string; date: string; description: string; emoji: string }[] = [
  { name: "Krishna Janmashtami", date: "Aug 26, 2026", description: "Celebrating the divine appearance of Lord Krishna in Braj. Special aarti at all our township temples.", emoji: "🦚" },
  { name: "Radhashtami", date: "Sep 11, 2026", description: "The appearance day of Radharani, Krishna's divine consort. Sweets distributed at BrajProperty offices.", emoji: "🌸" },
  { name: "Govardhan Puja", date: "Oct 21, 2026", description: "Commemorating Krishna lifting Giriraj Hill. Special parikrama events at Braj Lotus Greens.", emoji: "⛰️" },
  { name: "Holi in Braj", date: "Mar 14, 2027", description: "The festival of colors celebrated in Vrindavan with divine fervor. Residents enjoy community festivities.", emoji: "🎨" },
  { name: "Kartik Purnima", date: "Nov 5, 2026", description: "The most auspicious month for Braj pilgrimage. Deep daan at all township temples.", emoji: "🪔" },
  { name: "Jhulan Yatra", date: "Aug 20, 2026", description: "Swing festival of Radha-Krishna. Beautifully decorated swings at our temple complexes.", emoji: "🌳" },
];

// Price appreciation data (mock historical + projection)
export const PRICE_APPRECIATION_DATA: { year: string; braj: number; mathura: number; vrindavan: number; govardhan: number }[] = [
  { year: "2021", braj: 100, mathura: 100, vrindavan: 100, govardhan: 100 },
  { year: "2022", braj: 118, mathura: 115, vrindavan: 122, govardhan: 117 },
  { year: "2023", braj: 142, mathura: 134, vrindavan: 151, govardhan: 138 },
  { year: "2024", braj: 175, mathura: 156, vrindavan: 188, govardhan: 168 },
  { year: "2025", braj: 210, mathura: 182, vrindavan: 230, govardhan: 202 },
  { year: "2026", braj: 258, mathura: 218, vrindavan: 285, govardhan: 248 },
  { year: "2027", braj: 312, mathura: 258, vrindavan: 348, govardhan: 298 },
];

// NRI investment stats
export const NRI_STATS: { label: string; value: string; sub: string }[] = [
  { label: "Annual Appreciation", value: "22%", sub: "Vrindavan premium plots (2021-26)" },
  { label: "Rental Yield", value: "4-6%", sub: "Post-development lease potential" },
  { label: "FEMA Compliant", value: "100%", sub: "NRI purchase allowed without RBI approval" },
  { label: "Repatriation", value: "Up to 2 properties", sub: "Sale proceeds freely repatriable" },
];

// Virtual tour stops for each project
export const TOUR_STOPS = [
  { id: "entrance", label: "Grand Entrance", icon: "🚪", desc: "Temple-themed gate with marble & gold accents" },
  { id: "temple", label: "Temple Complex", icon: "🛕", desc: "Daily aarti & devotional programs" },
  { id: "gardens", label: "Spiritual Gardens", icon: "🌿", desc: "Tulsi, meditation & parikrama paths" },
  { id: "plots", label: "Premium Plots", icon: "📐", desc: "Marked, ready-to-register plots" },
  { id: "amenities", label: "Clubhouse & Pool", icon: "🏊", desc: "Modern amenities in divine setting" },
  { id: "security", label: "24/7 Security", icon: "🛡️", desc: "Gated, RFID, CCTV secured community" },
];

// Project comparison dimensions
export const COMPARISON_DIMENSIONS: { key: string; label: string; icon: string }[] = [
  { key: "location", label: "Location", icon: "📍" },
  { key: "city", label: "City", icon: "🏙️" },
  { key: "totalAreaAcres", label: "Total Area", icon: "🗺️", suffix: " acres" },
  { key: "plotSize", label: "Plot Sizes", icon: "📐" },
  { key: "priceRange", label: "Price Range", icon: "💰" },
  { key: "status", label: "Status", icon: "📊" },
  { key: "possessionDate", label: "Possession", icon: "📅" },
  { key: "reraNumber", label: "RERA Number", icon: "📜" },
  { key: "mvdaNumber", label: "MVDA Number", icon: "🏛️" },
  { key: "amenitiesCount", label: "Amenities", icon: "✨", suffix: "+" },
  { key: "nearbyTemplesCount", label: "Nearby Temples", icon: "🛕" },
  { key: "usp", label: "USP", icon: "⭐" },
];
