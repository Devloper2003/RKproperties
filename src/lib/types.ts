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

// ===== Krishna Lila (Divine Pastimes) =====
export const KRISHNA_LILAS: { title: string; place: string; summary: string; lesson: string; emoji: string }[] = [
  {
    title: "Govardhan Lila",
    place: "Govardhan Hill",
    summary: "When Indra sent devastating rains upon Braj, young Krishna lifted the entire Govardhan Hill on His little finger, sheltering all residents and cattle for seven days. Humiliated, Indra surrendered and worshipped Krishna as the Supreme.",
    lesson: "Divine protection awaits those who surrender to the Supreme. Living near Govardhan is living under Krishna's lifted hand.",
    emoji: "⛰️",
  },
  {
    title: "Ras Lila",
    place: "Vrindavan",
    summary: "On a full moon autumn night, Krishna danced the Maha Raas with the Gopis by the banks of Yamuna. Each Gopi felt Krishna was dancing exclusively with her, yet He remained one — the supreme mystical union of devotee and Divine.",
    lesson: "True devotion brings the experience of Krishna's intimate presence. Vrindavan remains forever the stage of this divine dance.",
    emoji: "🌙",
  },
  {
    title: "Kaliya Daman",
    place: "Yamuna River, Vrindavan",
    summary: "The poisonous serpent Kaliya had polluted the Yamuna, killing all life. Young Krishna jumped into the river, danced on Kaliya's multiple hoods, and subdued him — not to kill, but to grant him liberation and send him away purified.",
    lesson: "Divine intervention purifies what is toxic. The Yamuna of Braj flows with the energy of this redemption.",
    emoji: "🐍",
  },
  {
    title: "Janma Lila",
    place: "Mathura",
    summary: "Born in a prison cell to Devaki and Vasudeva at midnight, Krishna was miraculously freed by divine will. The prison guards fell asleep, locks opened, and Vasudeva carried baby Krishna across the flooded Yamuna to safety in Gokul.",
    lesson: "Where there is divine purpose, no prison can hold. Mathura is forever the birthplace of the eternal.",
    emoji: "👶",
  },
  {
    title: "Damodar Lila",
    place: "Gokul",
    summary: "Young Krishna was tied to a mortar by mother Yashoda for His playful mischief. Yet the mortar, dragged by Krishna, got stuck between two massive Arjuna trees — which Krishna uprooted with ease, liberating two celestial beings cursed to live as trees.",
    lesson: "Even bound by maternal love, the Divine liberates souls. Devotion softens the heart of the infinite.",
    emoji: "🪢",
  },
  {
    title: "Maharaas at Seva Kunj",
    place: "Seva Kunj, Vrindavan",
    summary: "In the secluded grove of Seva Kunj, Krishna and Radha conducted the most intimate pastimes, served by countless devotees. Even today, devotees believe Krishna descends nightly to perform the eternal Raas here — no one is allowed after sunset.",
    lesson: "Some pastimes are eternal, beyond time. The sacred groves of Vrindavan resonate with divine love perpetually.",
    emoji: "🌳",
  },
];

// ===== FAQ data =====
export const FAQS: { question: string; answer: string; category: string }[] = [
  {
    question: "Are BrajProperty plots MVDA-approved?",
    answer: "Yes, every BrajProperty township carries a valid MVDA (Mathura-Vrindavan Development Authority) approval number, verifiable on the official MVDA portal. This is the gold standard of legal security for property buyers in the Braj region, ensuring proper zoning, approved layouts, and legally binding infrastructure commitments.",
    category: "Legal",
  },
  {
    question: "What is the booking amount and is it refundable?",
    answer: "The booking amount ranges from ₹10,000 to ₹50,000 depending on the project and plot size. It is 100% refundable within 48 hours of booking. After 48 hours, the amount is adjusted against the plot price. The booking blocks your chosen plot for 15 days while you complete documentation and payment.",
    category: "Booking",
  },
  {
    question: "Can NRIs buy plots in BrajProperty townships?",
    answer: "Absolutely. Under FEMA regulations, NRIs and OCIs can purchase residential plots in India without special RBI approval. We provide complete NRI documentation assistance including Power of Attorney, foreign remittance tracking, FEMA compliance certificates, and repatriation guidance for up to 2 residential properties.",
    category: "NRI",
  },
  {
    question: "What amenities are included in the township?",
    answer: "Amenities vary by project but typically include: temple complex, community hall, gardens with tulsi plantation, jogging track, children's play area, 24/7 security with CCTV, RFID gated entry, underground electrical wiring, rainwater harvesting, and 30-40% green belt coverage. Premium projects add clubhouse, swimming pool, goshala, organic farm, and amphitheater.",
    category: "Amenities",
  },
  {
    question: "What is the expected price appreciation?",
    answer: "Based on historical data (2021-2026), Vrindavan premium plots have appreciated 22% annually on average — outperforming Mathura (18%) and Govardhan (20%). Key drivers: Delhi-Mumbai Expressway connectivity, upcoming Jewar International Airport (45 min away), 50M+ annual spiritual tourists, and the state government's pilgrimage infrastructure push. Projected 2027 appreciation: 25-30% for premium gated townships.",
    category: "Investment",
  },
  {
    question: "How do I schedule a site visit?",
    answer: "You can schedule a site visit in three ways: (1) Use the 'Book Site Visit' button on any project page and pick a date; (2) WhatsApp us at +91 98370 12345 — we respond within 30 minutes; (3) Call us directly. We arrange complimentary pickup from Mathura/Vrindavan railway station for outstation visitors. Virtual video tours are also available for NRIs.",
    category: "Visit",
  },
  {
    question: "What documents will I receive after purchase?",
    answer: "Post full payment, you receive: (1) Sale Deed registered with Sub-Registrar; (2) Mutation entry in revenue records; (3) MVDA completion certificate; (4) RERA registration documents; (5) Tax paid receipts; (6) Society/Association membership; (7) Possession letter with plot dimensions and boundaries; (8) Original title chain. All documents are also available digitally via your BrajProperty account.",
    category: "Legal",
  },
  {
    question: "Is financing available through banks?",
    answer: "Yes, we have partnerships with leading banks (SBI, HDFC, ICICI, Axis) offering preferential home loan rates starting from 8.35% p.a. for plot + construction loans. Use our EMI calculator to estimate monthly payments. Our team assists with end-to-end loan documentation and bank coordination. Loans up to 80% of plot value are available subject to eligibility.",
    category: "Payment",
  },
  {
    question: "What happens if I want to cancel my booking?",
    answer: "Cancellation policy: 100% refund within 48 hours of booking; 90% refund within 7 days (10% administrative charge); 75% refund within 15 days; after 15 days, the booking amount is forfeited as the plot was reserved exclusively for you. Refunds are processed within 7-10 working days to the original payment method.",
    category: "Booking",
  },
  {
    question: "Are the plots ready for construction immediately?",
    answer: "For 'Selling' status projects (Orchid, Lotus Greens, Kunj), plots are ready for immediate construction with all infrastructure in place — internal roads, water, electricity, drainage. For 'Pre-Launch' projects (Dham), possession is as per the announced date (Dec 2027) with construction allowed post-possession. Construction guidelines and approved architects list are provided to all plot owners.",
    category: "Construction",
  },
];

// ===== WhatsApp Flow Steps (from PDF spec section 21) =====
export const WHATSAPP_FLOW_STEPS: { step: number; trigger: string; type: string; content: string; mode: string }[] = [
  { step: 1, trigger: "First WhatsApp click", type: "Template", content: "Namaste! Welcome to BrajProperty.in. How can I help you today?", mode: "Auto" },
  { step: 2, trigger: "User responds 'project'", type: "Interactive List", content: "Which project: Orchid, Lotus Greens, Kunj, Dham?", mode: "Auto" },
  { step: 3, trigger: "User selects project", type: "Rich Message", content: "Project details + brochure PDF + plot availability link", mode: "Auto" },
  { step: 4, trigger: "User asks 'price'", type: "Calculator Template", content: "EMI calculator link + starting price info", mode: "Auto" },
  { step: 5, trigger: "User asks complex query", type: "Transfer Notice", content: "Let me connect you with our property advisor...", mode: "Auto→Human" },
  { step: 6, trigger: "Lead goes cold (48h)", type: "Follow-up Template", content: "Gentle check-in: 'Kya aapne decision liya?'", mode: "Auto (1x only)" },
  { step: 7, trigger: "Booking initiated", type: "Confirmation Template", content: "Booking details + payment link + next steps", mode: "Auto" },
  { step: 8, trigger: "Site visit scheduled", type: "Reminder Template", content: "Visit details + map link + contact info", mode: "Auto (1hr before)" },
];

// ===== Lead scoring signals (from PDF spec section 15) =====
export const LEAD_SCORING_SIGNALS: { signal: string; points: number; trigger: string; type: string }[] = [
  { signal: "Viewed project page", points: 5, trigger: "Page view event", type: "Auto" },
  { signal: "Used EMI calculator", points: 10, trigger: "Calculator interaction", type: "Auto" },
  { signal: "Submitted WhatsApp query", points: 20, trigger: "WhatsApp message received", type: "Auto" },
  { signal: "Requested callback", points: 15, trigger: "Form submission", type: "Auto" },
  { signal: "Viewed plot details (>30s)", points: 8, trigger: "Plot page view >30s", type: "Auto" },
  { signal: "Downloaded brochure", points: 15, trigger: "PDF download event", type: "Auto" },
  { signal: "Visited site physically", points: 30, trigger: "Sales person entry", type: "Manual" },
  { signal: "Attended virtual tour", points: 20, trigger: "Tour completion event", type: "Auto" },
  { signal: "Repeated visitor (3+ sessions)", points: 10, trigger: "Analytics event", type: "Auto" },
  { signal: "NRI profile detected", points: 15, trigger: "Location/timezone data", type: "Auto" },
  { signal: "Budget confirmed (verbal)", points: 25, trigger: "Sales person entry", type: "Manual" },
  { signal: "Comparison page viewed", points: 12, trigger: "Comparison tool use", type: "Auto" },
];

// ===== Video Testimonials =====
export const VIDEO_TESTIMONIALS: { name: string; role: string; location: string; thumbnail: string; duration: string; quote: string; project: string }[] = [
  {
    name: "Rajesh Agrawal",
    role: "Retired Professor",
    location: "Delhi → Mathura",
    thumbnail: "/images/temples/banke-bihari.png",
    duration: "2:34",
    quote: "Every morning I walk to Banke Bihari Temple. It feels like a dream come true.",
    project: "Bankey Bihari Orchid",
  },
  {
    name: "Dr. Anjali Mehta",
    role: "NRI Cardiologist",
    location: "New Jersey → Vrindavan",
    thumbnail: "/images/temples/iskcon.png",
    duration: "3:12",
    quote: "My plot has already appreciated 22%. The BrajProperty team made it effortless.",
    project: "Bankey Bihari Dham",
  },
  {
    name: "Suresh & Lakshmi Sharma",
    role: "Devotee Couple",
    location: "Bangalore → Vrindavan",
    thumbnail: "/images/temples/govardhan.png",
    duration: "2:48",
    quote: "The satsang halls and devotional library transformed our spiritual life.",
    project: "Bankey Bihari Kunj",
  },
];

// ===== Spiritual Quiz Questions =====
export const SPIRITUAL_QUIZ: { question: string; options: { text: string; scores: Record<string, number> }[] }[] = [
  {
    question: "Which Krishna pastime resonates most with you?",
    options: [
      { text: "Birth at midnight in Mathura (Janma Lila)", scores: { Mathura: 3, Vrindavan: 0, Govardhan: 0 } },
      { text: "Childhood pranks in Vrindavan (Baal Lila)", scores: { Vrindavan: 3, Mathura: 0, Govardhan: 0 } },
      { text: "Lifting Govardhan Hill (Giriraj Lila)", scores: { Govardhan: 3, Vrindavan: 0, Mathura: 0 } },
      { text: "Divine dance with Gopis (Ras Lila)", scores: { Vrindavan: 2, Govardhan: 1, Mathura: 0 } },
    ],
  },
  {
    question: "What kind of spiritual environment do you seek?",
    options: [
      { text: "Bustling temple town with urban convenience", scores: { Mathura: 3, Vrindavan: 1, Govardhan: 0 } },
      { text: "Devotional community with international devotees", scores: { Vrindavan: 3, Mathura: 0, Govardhan: 1 } },
      { text: "Quiet, intense parikrama-focused atmosphere", scores: { Govardhan: 3, Vrindavan: 1, Mathura: 0 } },
      { text: "Mix of all — close to everything", scores: { Vrindavan: 2, Mathura: 2, Govardhan: 1 } },
    ],
  },
  {
    question: "Which temple would you visit daily if possible?",
    options: [
      { text: "Krishna Janmabhoomi (birthplace)", scores: { Mathura: 3, Vrindavan: 0, Govardhan: 0 } },
      { text: "Banke Bihari / ISKCON / Prem Mandir", scores: { Vrindavan: 3, Mathura: 0, Govardhan: 0 } },
      { text: "Govardhan Hill / Daan Ghati / Mansi Ganga", scores: { Govardhan: 3, Vrindavan: 0, Mathura: 0 } },
      { text: "All of them — I love pilgrimage", scores: { Vrindavan: 1, Mathura: 1, Govardhan: 2 } },
    ],
  },
  {
    question: "What's your primary investment goal?",
    options: [
      { text: "Spiritual home for retirement (steady, mature city)", scores: { Mathura: 3, Vrindavan: 1, Govardhan: 0 } },
      { text: "Second home + community living (premium, international)", scores: { Vrindavan: 3, Mathura: 0, Govardhan: 1 } },
      { text: "Highest spiritual significance + appreciation potential", scores: { Govardhan: 3, Vrindavan: 1, Mathura: 0 } },
      { text: "Budget-friendly entry into Braj Dham", scores: { Vrindavan: 2, Mathura: 1, Govardhan: 1 } },
    ],
  },
  {
    question: "How important is proximity to Delhi/NCR?",
    options: [
      { text: "Very — Mathura is on the main Delhi-Agra route", scores: { Mathura: 3, Vrindavan: 1, Govardhan: 0 } },
      { text: "Moderate — Vrindavan is well-connected too", scores: { Vrindavan: 2, Mathura: 2, Govardhan: 1 } },
      { text: "Not important — spiritual depth matters more", scores: { Govardhan: 3, Vrindavan: 1, Mathura: 0 } },
      { text: "I'm an NRI — airport connectivity is key", scores: { Vrindavan: 2, Mathura: 2, Govardhan: 1 } },
    ],
  },
];

// Quiz results descriptions
export const QUIZ_RESULTS: Record<string, { title: string; subtitle: string; description: string; emoji: string; gradient: string }>= {
  Mathura: {
    title: "Mathura",
    subtitle: "The Divine Birthplace",
    description: "Your spiritual home is where Krishna was born. Mathura offers the perfect blend of urban convenience, devotional depth, and main-route connectivity. Our Bankey Bihari Orchid township (25 acres, ₹6-12L plots) is walking distance from Banke Bihari Temple.",
    emoji: "👶",
    gradient: "from-green-light/30 to-gold/20",
  },
  Vrindavan: {
    title: "Vrindavan",
    subtitle: "Krishna's Playground",
    description: "Your heart belongs in Vrindavan — the eternal stage of Krishna's divine pastimes. With ISKCON, Banke Bihari, and Prem Mandir, this is home to international devotees. Explore Bankey Bihari Kunj (₹5-10L) or the mega Bankey Bihari Dham (₹10-20L).",
    emoji: "🦚",
    gradient: "from-gold/30 to-temple-red/20",
  },
  Govardhan: {
    title: "Govardhan",
    subtitle: "Under Giriraj's Shelter",
    description: "You seek the most intense spiritual atmosphere — Govardhan, where Krishna lifted the hill on His finger. Our Braj Lotus Greens township offers direct Parikrama route access with premium-plus amenities. The most spiritually significant address in all of Braj.",
    emoji: "⛰️",
    gradient: "from-green-deep/30 to-sandstone/20",
  },
};

// ===== Referral Program tiers =====
export const REFERRAL_TIERS: { tier: string; referrals: string; reward: string; perk: string; color: string }[] = [
  { tier: "Sevak", referrals: "1-2", reward: "₹10,000", perk: "Silver kalash memento + temple prasad", color: "from-sandstone/40 to-sandstone/20" },
  { tier: "Bhakta", referrals: "3-5", reward: "₹25,000", perk: "Gold-plated Krishna idol + priority event invites", color: "from-gold/40 to-gold/20" },
  { tier: "Priya", referrals: "6-10", reward: "₹50,000", perk: "Personalized temple visit + 2-night Braj stay package", color: "from-gold/50 to-temple-red/20" },
  { tier: "Parijana", referrals: "10+", reward: "₹1,00,000", perk: "Lifetime VIP darshan + named groove in township temple", color: "from-temple-red/40 to-indigo-deep/20" },
];

// ===== ROI Calculator assumptions =====
export const ROI_ASSUMPTIONS = {
  avgAppreciationRate: 0.22, // 22% annual
  constructionCostPerSqft: 1800,
  rentalYield: 0.05, // 5%
  pilgrimageSeasonWeeks: 12, // weeks/year rentable
  weeklyRental: 20000,
  gstOnConstruction: 0.18,
};

// ===== Vastu Compass data =====
export const VASTU_DIRECTIONS: { direction: string; sanskrit: string; degree: number; deity: string; element: string; favorable: string[]; avoid: string[]; color: string }[] = [
  {
    direction: "North",
    sanskrit: "उत्तर",
    degree: 0,
    deity: "Kubera (God of Wealth)",
    element: "Water",
    favorable: ["Main entrance", "Pooja room", "Living room", "Treasury/Cash box"],
    avoid: ["Bedroom (master)", "Toilet", "Staircase"],
    color: "from-blue-400/30 to-blue-600/20",
  },
  {
    direction: "North-East",
    sanskrit: "ईशान",
    degree: 45,
    deity: "Ishana (Shiva)",
    element: "Water + Earth",
    favorable: ["Pooja room (most auspicious)", "Meditation space", "Water source", "Tulsi plant"],
    avoid: ["Toilet", "Kitchen", "Storeroom"],
    color: "from-green-300/30 to-blue-400/20",
  },
  {
    direction: "East",
    sanskrit: "पूर्व",
    degree: 90,
    deity: "Indra (King of Gods)",
    element: "Air",
    favorable: ["Main entrance", "Bathroom", "Large windows", "Study room"],
    avoid: ["Toilet", "Heavy furniture", "Storeroom"],
    color: "from-amber-300/30 to-yellow-400/20",
  },
  {
    direction: "South-East",
    sanskrit: "अग्नेय",
    degree: 135,
    deity: "Agni (Fire)",
    element: "Fire",
    favorable: ["Kitchen (ideal)", "Electrical appliances", "Generator room"],
    avoid: ["Bedroom", "Pooja room", "Water source"],
    color: "from-orange-400/30 to-red-500/20",
  },
  {
    direction: "South",
    sanskrit: "दक्षिण",
    degree: 180,
    deity: "Yama (Lord of Death)",
    element: "Earth",
    favorable: ["Bedroom (heavy sleep)", "Storeroom", "Heavy furniture"],
    avoid: ["Main entrance", "Pooja room", "Kitchen"],
    color: "from-red-400/30 to-pink-500/20",
  },
  {
    direction: "South-West",
    sanskrit: "नैऋत्य",
    degree: 225,
    deity: "Nairutya (Demons)",
    element: "Earth",
    favorable: ["Master bedroom (ideal)", "Heavy storage", "Treasury", "Staircase"],
    avoid: ["Main entrance", "Kitchen", "Toilet", "Water source"],
    color: "from-purple-400/30 to-indigo-500/20",
  },
  {
    direction: "West",
    sanskrit: "पश्चिम",
    degree: 270,
    deity: "Varuna (God of Rain)",
    element: "Air",
    favorable: ["Children's bedroom", "Study", "Dining room"],
    avoid: ["Main entrance (minor)", "Pooja room"],
    color: "from-cyan-400/30 to-blue-500/20",
  },
  {
    direction: "North-West",
    sanskrit: "वायव्य",
    degree: 315,
    deity: "Vayu (Wind)",
    element: "Air",
    favorable: ["Guest room", "Garage", "Toilet (acceptable)", "Granary"],
    avoid: ["Master bedroom", "Kitchen", "Pooja room"],
    color: "from-gray-400/30 to-slate-500/20",
  },
];

// ===== Braj Bhajans (devotional music) =====
export const BRAJ_BHAJANS: { title: string; artist: string; duration: string; category: string; description: string }[] = [
  { title: "Achyutam Keshavam", artist: "Traditional", duration: "4:32", category: "Morning", description: "Beautiful morning bhajan invoking Krishna's names — perfect start to your spiritual day." },
  { title: "Govind Bolo Hari Gopal Bolo", artist: "Traditional", duration: "5:18", category: "Kirtan", description: "Energetic kirtan calling out to Govind — ideal for community singing." },
  { title: "Yashomati Maiya Se", artist: "Traditional", duration: "3:45", category: "Lullaby", description: "Devotional song about Yashoda Maiya and child Krishna — soothing and heart-melting." },
  { title: "Radhe Radhe Govind", artist: "Traditional", duration: "6:02", category: "Meditation", description: "Repetitive chant of Radha-Krishna names for deep meditation." },
  { title: "Braj Bhumii Meri", artist: "Traditional", duration: "4:15", category: "Braj Folk", description: "Folk song celebrating the beauty and divinity of Braj Dham land." },
  { title: "Mero Mann Ram Ji", artist: "Traditional", duration: "5:30", category: "Evening", description: "Evening prayer bhajan for inner peace and surrender." },
];

// ===== Competitor comparison data =====
export const COMPETITORS: { name: string; type: string; avgPrice: string; legalClarity: string; amenities: string; spiritual: string; trustScore: number; ourAdvantage: string }[] = [
  {
    name: "Local Builders",
    type: "Unorganized",
    avgPrice: "₹3-5 L",
    legalClarity: "Poor — No MVDA",
    amenities: "Basic roads only",
    spiritual: "None",
    trustScore: 25,
    ourAdvantage: "MVDA approved + premium amenities + temple architecture",
  },
  {
    name: "National Developers",
    type: "Corporate",
    avgPrice: "₹8-15 L",
    legalClarity: "Good but generic",
    amenities: "Modern clubhouse",
    spiritual: "None — generic design",
    trustScore: 65,
    ourAdvantage: "Braj-native brand + temple-themed architecture + spiritual environment",
  },
  {
    name: "Religious Trusts/Ashrams",
    type: "Non-profit",
    avgPrice: "N/A (Donation)",
    legalClarity: "Variable",
    amenities: "Minimal",
    spiritual: "High credibility",
    trustScore: 70,
    ourAdvantage: "Premium lifestyle + modern amenities + same spiritual depth",
  },
  {
    name: "NRI-Focused Portals",
    type: "Online-only",
    avgPrice: "₹6-12 L",
    legalClarity: "Inconsistent",
    amenities: "Varies widely",
    spiritual: "None",
    trustScore: 50,
    ourAdvantage: "Local office + WhatsApp + site visits + Braj-native trust",
  },
  {
    name: "BrajProperty.in",
    type: "Premium Braj-native",
    avgPrice: "₹5-20 L",
    legalClarity: "100% MVDA + RERA",
    amenities: "Full premium gated",
    spiritual: "Temple-themed + spiritual community",
    trustScore: 95,
    ourAdvantage: "The only developer combining divine location + legal security + lifestyle luxury",
  },
];

// ===== Community portal features =====
export const COMMUNITY_FEATURES: { icon: string; title: string; desc: string }[] = [
  { icon: "🏗️", title: "Construction Updates", desc: "Photo timeline of your plot's development — monthly progress photos, milestone tracking, handover countdown." },
  { icon: "📄", title: "Document Vault", desc: "Secure digital access to all your property documents — sale deed, MVDA certificate, tax receipts, RERA papers." },
  { icon: "🎉", title: "Event RSVP", desc: "Community satsang, festival celebrations, Krishna Janmashtami, Holi — RSVP and join resident-only events." },
  { icon: "💬", title: "Resident Forum", desc: "Connect with fellow devotee-residents. Share experiences, organize carpools, plan temple visits together." },
  { icon: "🛠️", title: "Service Requests", desc: "Report maintenance issues, request plot visits, book community hall — all from your resident dashboard." },
  { icon: "📱", title: "Mobile App", desc: "PWA installable on your phone — offline access to documents, push notifications for events and updates." },
];

// ===== Extended Braj Dham guide locations =====
export const BRAJ_DHAM_PLACES: { name: string; type: string; city: string; significance: string; x: number; y: number; emoji: string }[] = [
  { name: "Banke Bihari Temple", type: "Temple", city: "Vrindavan", significance: "Krishna in tribhanga form", x: 48, y: 42, emoji: "🛕" },
  { name: "ISKCON Temple", type: "Temple", city: "Vrindavan", significance: "International Krishna consciousness", x: 52, y: 45, emoji: "🛕" },
  { name: "Prem Mandir", type: "Temple", city: "Vrindavan", significance: "White marble beauty", x: 50, y: 40, emoji: "🛕" },
  { name: "Krishna Janmabhoomi", type: "Temple", city: "Mathura", significance: "Krishna's birthplace", x: 32, y: 52, emoji: "👶" },
  { name: "Vishram Ghat", type: "Ghat", city: "Mathura", significance: "Krishna rested here after Kansa", x: 30, y: 54, emoji: "🌊" },
  { name: "Govardhan Hill", type: "Parikrama", city: "Govardhan", significance: "Krishna lifted on His finger", x: 22, y: 70, emoji: "⛰️" },
  { name: "Mansi Ganga", type: "Ghat", city: "Govardhan", significance: "Sacred Kund for bathing", x: 20, y: 72, emoji: "🌊" },
  { name: "Radha Kund", type: "Kund", city: "Govardhan", significance: "Most sacred Kund in Braj", x: 18, y: 74, emoji: "💧" },
  { name: "Kusum Sarovar", type: "Sarovar", city: "Govardhan", significance: "Where Radha picked flowers", x: 16, y: 71, emoji: "🌸" },
  { name: "Nidhivan", type: "Grove", city: "Vrindavan", significance: "Krishna's nightly Raas still happens", x: 49, y: 44, emoji: "🌳" },
  { name: "Seva Kunj", type: "Grove", city: "Vrindavan", significance: "Eternal Raas sthala", x: 47, y: 43, emoji: "🌳" },
  { name: "Barsana", type: "Village", city: "Near Govardhan", significance: "Radha's village", x: 15, y: 65, emoji: "🏡" },
  { name: "Nandgaon", type: "Village", city: "Near Govardhan", significance: "Krishna's childhood home", x: 18, y: 62, emoji: "🏡" },
  { name: "Gokul", type: "Village", city: "Near Mathura", significance: "Krishna's foster home", x: 35, y: 48, emoji: "🏡" },
  { name: "Vrindavan Forest", type: "Forest", city: "Vrindavan", significance: "Krishna's cow-grazing grounds", x: 55, y: 38, emoji: "🌲" },
  { name: "Yamuna River", type: "River", city: "Braj", significance: "Sacred river of Braj", x: 40, y: 50, emoji: "🌊" },
];

// ===== Braj Calendar — Tithi & Auspicious Timings =====
export const BRAJ_CALENDAR: { date: string; tithi: string; event: string; temple: string; timing: string; type: "darshan" | "festival" | "fasting" | "auspicious"; description: string }[] = [
  { date: "Today", tithi: "Ashtami", event: "Krishna Ashtami", temple: "Banke Bihari Temple", timing: "5:30 AM - 12:00 PM, 5:30 - 9:00 PM", type: "darshan", description: "Special shringar darshan of Banke Bihari. Ashtami is highly auspicious — Krishna appeared on Ashtami." },
  { date: "Tomorrow", tithi: "Navami", event: "Radha Ashtami Vrata", temple: "ISKCON Temple", timing: "4:30 AM Mangala Aarti", type: "fasting", description: "Fasting day for devotees who observed Radha Ashtami. Break fast during 9:00-9:30 AM window." },
  { date: "Aug 23", tithi: "Tritiya", event: "Hariyali Teej", temple: "All Temples", timing: "Full day celebration", type: "festival", description: "Monsoon festival celebrating Krishna's divine play. Women apply mehndi, swing on jhulas in temple courtyards." },
  { date: "Aug 26", tithi: "Ashtami (Rohini)", event: "Krishna Janmashtami", temple: "Krishna Janmabhoomi", timing: "Midnight 12:00 AM (Abhishek)", type: "festival", description: "The most sacred day — Krishna's divine appearance. Midnight abhishek at Janmabhoomi. 500K+ devotees expected." },
  { date: "Aug 27", tithi: "Navami", event: "Nandotsav", temple: "Nandgaon & all temples", timing: "Morning celebrations", type: "festival", description: "Celebration of Krishna's naming ceremony by Nanda Baba. Joyous festival with dance and prasad distribution." },
  { date: "Sep 11", tithi: "Ashtami", event: "Radhashtami", temple: "Barsana & Vrindavan", timing: "Full day", type: "festival", description: "Appearance day of Radharani. Special darshan at Barsana (Radha's village) and all Vrindavan temples." },
  { date: "Daily", tithi: "Varies", event: "Mangala Aarti", temple: "ISKCON Vrindavan", timing: "4:30 AM", type: "darshan", description: "Pre-dawn aarti — the most intimate darshan of the day. Limited to early risers. Spiritual energy at its peak." },
  { date: "Daily", tithi: "Varies", event: "Sandhya Aarti", temple: "Vishram Ghat, Mathura", timing: "Sunset (6:30 PM)", type: "darshan", description: "Evening Yamuna aarti with floating diyas. Where Krishna rested after defeating Kansa. Free for all." },
  { date: "Weekly", tithi: "Ekadashi", event: "Ekadashi Fasting", temple: "All temples", timing: "Sunrise to next sunrise", type: "fasting", description: "Bi-monthly Ekadashi fast — most auspicious day for Krishna devotees. Break fast on Dwadashi." },
  { date: "Monthly", tithi: "Purnima", event: "Full Moon Parikrama", temple: "Govardhan Hill", timing: "Sunrise start (21 km)", type: "auspicious", description: "Full moon Govardhan Parikrama — most auspicious day for the 21km sacred walk. Lakhs of devotees participate." },
];

// ===== Sankalp options =====
export const SANKALP_TYPES: { id: string; title: string; sanskrit: string; desc: string; emoji: string }[] = [
  { id: "seva", title: "Community Seva", sanskrit: "सेवा", desc: "Pledge to serve the Braj community — volunteer at temple events, help elderly residents, organize cleanliness drives.", emoji: "🤝" },
  { id: "sadhana", title: "Daily Sadhana", sanskrit: "साधना", desc: "Commit to daily spiritual practice — japa meditation, Bhagavad Gita reading, temple darshan.", emoji: "📿" },
  { id: "go-seva", title: "Go Seva", sanskrit: "गो सेवा", desc: "Serve the sacred cows at our goshala — feed, groom, and care for Krishna's beloved cows.", emoji: "🐄" },
  { id: "parikrama", title: "Monthly Parikrama", sanskrit: "परिक्रमा", desc: "Walk the sacred Govardhan or Vrindavan parikrama monthly — 21km spiritual journey.", emoji: "🚶" },
  { id: "vridhi", title: "Tulsi Vridhi", sanskrit: "तुलसी वृद्धि", desc: "Plant and nurture Tulsi in your plot — the holiest plant, embodiment of Vrindadevi.", emoji: "🌿" },
  { id: "daan", title: "Anna Daan", sanskrit: "अन्न दान", desc: "Sponsor prasad meals at our township temple — feed devotees and pilgrims regularly.", emoji: "🍲" },
];

// ===== Plot comparison dimensions =====
export const PLOT_COMPARISON_DIMENSIONS: { key: string; label: string; icon: string }[] = [
  { key: "plotNumber", label: "Plot Number", icon: "🔢" },
  { key: "project", label: "Project", icon: "🏙️" },
  { key: "sizeSqyd", label: "Size", icon: "📐" },
  { key: "dimensions", label: "Dimensions", icon: "📏" },
  { key: "facing", label: "Facing", icon: "🧭" },
  { key: "price", label: "Price", icon: "💰" },
  { key: "status", label: "Status", icon: "📊" },
  { key: "isCorner", label: "Corner Plot", icon: "⭐" },
  { key: "isRoadFacing", label: "Road Facing", icon: "🛣️" },
  { key: "pricePerSqyd", label: "₹/sq.yd", icon: "📉" },
];

// ===== Krishna 108 Names (Full Ashtottara Shatanamavali) =====
export const KRISHNA_108_NAMES: { sanskrit: string; transliteration: string; meaning: string }[] = [
  { sanskrit: "ॐ श्री कृष्णाय नमः", transliteration: "Om Sri Krishnaya Namah", meaning: "Salutations to Lord Krishna" },
  { sanskrit: "ॐ कमलापतये नमः", transliteration: "Om Kamalapataye Namah", meaning: "Consort of Lakshmi" },
  { sanskrit: "ॐ वासुदेवाय नमः", transliteration: "Om Vasudevaya Namah", meaning: "Son of Vasudeva" },
  { sanskrit: "ॐ संकर्षणाय नमः", transliteration: "Om Sankarshanaya Namah", meaning: "Who draws all together" },
  { sanskrit: "ॐ प्रद्युम्नाय नमः", transliteration: "Om Pradyumnaya Namah", meaning: "The illuminator" },
  { sanskrit: "ॐ अनिरुद्धाय नमः", transliteration: "Om Aniruddhaya Namah", meaning: "The unobstructed one" },
  { sanskrit: "ॐ केशवाय नमः", transliteration: "Om Keshavaya Namah", meaning: "The one with beautiful hair" },
  { sanskrit: "ॐ नारायणाय नमः", transliteration: "Om Narayanaya Namah", meaning: "The refuge of all beings" },
  { sanskrit: "ॐ माधवाय नमः", transliteration: "Om Madhavaya Namah", meaning: "Lord of Lakshmi" },
  { sanskrit: "ॐ गोविंदाय नमः", transliteration: "Om Govindaya Namah", meaning: "Protector of cows" },
  { sanskrit: "ॐ विष्णवे नमः", transliteration: "Om Vishnave Namah", meaning: "The all-pervading one" },
  { sanskrit: "ॐ मधुसूदनाय नमः", transliteration: "Om Madhusudanaya Namah", meaning: "Slayer of demon Madhu" },
  { sanskrit: "ॐ त्रिविक्रमाय नमः", transliteration: "Om Trivikramaya Namah", meaning: "Who measured the three worlds" },
  { sanskrit: "ॐ श्रीधराय नमः", transliteration: "Om Sridharaya Namah", meaning: "Bearer of Sri (Lakshmi)" },
  { sanskrit: "ॐ पद्मनाभाय नमः", transliteration: "Om Padmanabhaya Namah", meaning: "Lotus-navel Lord" },
  { sanskrit: "ॐ दामोदराय नमः", transliteration: "Om Damodaraya Namah", meaning: "Bound by mother Yashoda's love" },
  { sanskrit: "ॐ सुरेशाय नमः", transliteration: "Om Sureshaya Namah", meaning: "Lord of the devas" },
  { sanskrit: "ॐ गरुडध्वजाय नमः", transliteration: "Om Garudadhwajaya Namah", meaning: "Whose flag bears Garuda" },
  { sanskrit: "ॐ जनार्दनाय नमः", transliteration: "Om Janardanaya Namah", meaning: "Protector of people" },
  { sanskrit: "ॐ हरये नमः", transliteration: "Om Haraye Namah", meaning: "The remover of sins" },
  { sanskrit: "ॐ श्रीनिवासाय नमः", transliteration: "Om Srinivasaya Namah", meaning: "Abode of Sri" },
  { sanskrit: "ॐ गोपालाय नमः", transliteration: "Om Gopalaya Namah", meaning: "Cowherd boy" },
  { sanskrit: "ॐ गोविंदाय नमः", transliteration: "Om Govindaya Namah", meaning: "Protector of cows" },
  { sanskrit: "ॐ मुरारये नमः", transliteration: "Om Muraraye Namah", meaning: "Enemy of demon Mura" },
  { sanskrit: "ॐ अच्युताय नमः", transliteration: "Om Achyutaya Namah", meaning: "The infallible one" },
  { sanskrit: "ॐ कृष्णाय नमः", transliteration: "Om Krishnaya Namah", meaning: "The all-attractive one" },
  { sanskrit: "ॐ बलभद्राय नमः", transliteration: "Om Balabhadraya Namah", meaning: "The strong one (Balarama)" },
  { sanskrit: "ॐ संकर्षणाय नमः", transliteration: "Om Sankarshanaya Namah", meaning: "Who draws together" },
  { sanskrit: "ॐ रुक्मिणीपतये नमः", transliteration: "Om Rukminipataye Namah", meaning: "Consort of Rukmini" },
  { sanskrit: "ॐ राधापतये नमः", transliteration: "Om Radhapataye Namah", meaning: "Beloved of Radha" },
  { sanskrit: "ॐ गोकुलानंदाय नमः", transliteration: "Om Gokulanandaya Namah", meaning: "Joy of Gokul" },
  { sanskrit: "ॐ वृन्दावनेश्वराय नमः", transliteration: "Om Vrindavaneshwaraya Namah", meaning: "Lord of Vrindavan" },
  { sanskrit: "ॐ गिरिधराय नमः", transliteration: "Om Giridharaya Namah", meaning: "Lifter of Govardhan Hill" },
  { sanskrit: "ॐ गोपीप्रियाय नमः", transliteration: "Om Gopipriyaya Namah", meaning: "Beloved of the Gopis" },
  { sanskrit: "ॐ मोहनाय नमः", transliteration: "Om Mohanaya Namah", meaning: "The enchanting one" },
  { sanskrit: "ॐ बालगोपालाय नमः", transliteration: "Om Balagopalaya Namah", meaning: "Child Krishna the cowherd" },
  { sanskrit: "ॐ यशोदानंदनाय नमः", transliteration: "Om Yashodanandanaya Namah", meaning: "Son of Yashoda" },
  { sanskrit: "ॐ नंदसुताय नमः", transliteration: "Om Nandasutaya Namah", meaning: "Son of Nanda" },
  { sanskrit: "ॐ देवकीनंदनाय नमः", transliteration: "Om Devakinandanaya Namah", meaning: "Son of Devaki" },
  { sanskrit: "ॐ कंसविद्वंसिने नमः", transliteration: "Om Kansavidwansine Namah", meaning: "Destroyer of Kansa" },
  { sanskrit: "ॐ शूरसुताय नमः", transliteration: "Om Shurasutaya Namah", meaning: "Son of Vasudeva (Shura's descendant)" },
  { sanskrit: "ॐ वासुदेवात्मजाय नमः", transliteration: "Om Vasudevatmajaya Namah", meaning: "Son of Vasudeva" },
  { sanskrit: "ॐ रुक्मिणीरमणाय नमः", transliteration: "Om Rukminiramanaaya Namah", meaning: "Lover of Rukmini" },
  { sanskrit: "ॐ सत्यभामापतये नमः", transliteration: "Om Satyabhamapataye Namah", meaning: "Consort of Satyabhama" },
  { sanskrit: "ॐ जाम्बवतीप्रियाय नमः", transliteration: "Om Jambavatipriyaya Namah", meaning: "Beloved of Jambavati" },
  { sanskrit: "ॐ मित्रविंदापतये नमः", transliteration: "Om Mitravindapataye Namah", meaning: "Consort of Mitravinda" },
  { sanskrit: "ॐ कालिंद्याईश्वराय नमः", transliteration: "Om Kalindyeshwaraya Namah", meaning: "Lord of Kalindi (Yamuna)" },
  { sanskrit: "ॐ लक्ष्मणाय नमः", transliteration: "Om Lakshmanaya Namah", meaning: "The auspicious one" },
  { sanskrit: "ॐ सात्यकिप्रियाय नमः", transliteration: "Om Satyakipriyaya Namah", meaning: "Beloved of Satyaki" },
  { sanskrit: "ॐ सुदामामित्राय नमः", transliteration: "Om Sudamamitraya Namah", meaning: "Friend of Sudama" },
  { sanskrit: "ॐ उद्धवाचार्याय नमः", transliteration: "Om Uddhavacharyaya Namah", meaning: "Teacher of Uddhava" },
  { sanskrit: "ॐ अर्जुनसारथये नमः", transliteration: "Om Arjunasarathaye Namah", meaning: "Charioteer of Arjuna" },
  { sanskrit: "ॐ भीष्मप्रियाय नमः", transliteration: "Om Bhishmapriyaya Namah", meaning: "Beloved of Bhishma" },
  { sanskrit: "ॐ द्रौपदीरक्षकाय नमः", transliteration: "Om Draupadirakshakaya Namah", meaning: "Protector of Draupadi" },
  { sanskrit: "ॐ अभिमन्युस्वामिने नमः", transliteration: "Om Abhimanyuswamine Namah", meaning: "Lord of Abhimanyu" },
  { sanskrit: "ॐ दुर्योधनविनाशकाय नमः", transliteration: "Om Duryodhanavinashakaya Namah", meaning: "Destroyer of Duryodhana" },
  { sanskrit: "ॐ जरासंधघ्ने नमः", transliteration: "Om Jarasandhaghne Namah", meaning: "Slayer of Jarasandha" },
  { sanskrit: "ॐ शिशुपालवधाय नमः", transliteration: "Om Shishupalavadhaya Namah", meaning: "Slayer of Shishupala" },
  { sanskrit: "ॐ शाल्वविद्वंसिने नमः", transliteration: "Om Shalvavidwansine Namah", meaning: "Destroyer of Shalva" },
  { sanskrit: "ॐ पौंड्रकविद्वंसिने नमः", transliteration: "Om Paundrakavidwansine Namah", meaning: "Destroyer of Paundraka" },
  { sanskrit: "ॐ द्विविदविद्वंसिने नमः", transliteration: "Om Dwividavidwansine Namah", meaning: "Destroyer of Dwivida" },
  { sanskrit: "ॐ बाणासुरघ्ने नमः", transliteration: "Om Banasuraghne Namah", meaning: "Slayer of Banasura" },
  { sanskrit: "ॐ कालियमर्दनाय नमः", transliteration: "Om Kaliyamardanaya Namah", meaning: "Subduer of serpent Kaliya" },
  { sanskrit: "ॐ पुतनामोहनाय नमः", transliteration: "Om Putanamohanaya Namah", meaning: "Slayer of demoness Putana" },
  { sanskrit: "ॐ तृणावर्तघ्ने नमः", transliteration: "Om Trinavartaghne Namah", meaning: "Slayer of demon Trinavarta" },
  { sanskrit: "ॐ शकटासुरघ्ने नमः", transliteration: "Om Shakatasuraghne Namah", meaning: "Slayer of demon Shakatasura" },
  { sanskrit: "ॐ वत्सासुरघ्ने नमः", transliteration: "Om Vatsasuraghne Namah", meaning: "Slayer of demon Vatsasura" },
  { sanskrit: "ॐ बकासुरघ्ने नमः", transliteration: "Om Bakasuraghne Namah", meaning: "Slayer of crane demon Bakasura" },
  { sanskrit: "ॐ अघासुरघ्ने नमः", transliteration: "Om Aghasuraghne Namah", meaning: "Slayer of demon Aghasura" },
  { sanskrit: "ॐ धेनुकासुरघ्ने नमः", transliteration: "Om Dhenukasuraghne Namah", meaning: "Slayer of demon Dhenuka" },
  { sanskrit: "ॐ प्रलंबासुरघ्ने नमः", transliteration: "Om Pralambasuraghne Namah", meaning: "Slayer of demon Pralamba" },
  { sanskrit: "ॐ मुष्टिकघ्ने नमः", transliteration: "Om Mushtikaghne Namah", meaning: "Slayer of Mushtika" },
  { sanskrit: "ॐ चाणूरघ्ने नमः", transliteration: "Om Chanuraghne Namah", meaning: "Slayer of wrestler Chanura" },
  { sanskrit: "ॐ केशिघ्ने नमः", transliteration: "Om Keshighne Namah", meaning: "Slayer of horse demon Keshi" },
  { sanskrit: "ॐ व्योमासुरघ्ने नमः", transliteration: "Om Vyomasuraghne Namah", meaning: "Slayer of demon Vyoma" },
  { sanskrit: "ॐ कंसघ्ने नमः", transliteration: "Om Kansaghne Namah", meaning: "Slayer of Kansa" },
  { sanskrit: "ॐ चाणूरमुष्टिकघ्ने नमः", transliteration: "Om Chanuramushtikaghne Namah", meaning: "Slayer of Chanura and Mushtika" },
  { sanskrit: "ॐ कुवलयापीडघ्ने नमः", transliteration: "Om Kuvalayapidaghne Namah", meaning: "Slayer of elephant Kuvalayapida" },
  { sanskrit: "ॐ श्रीभागवताय नमः", transliteration: "Om Sribhagavataya Namah", meaning: "The glorious Lord" },
  { sanskrit: "ॐ भागवतप्रियाय नमः", transliteration: "Om Bhagavatapriyaya Namah", meaning: "Beloved of devotees" },
  { sanskrit: "ॐ गीतामृताय नमः", transliteration: "Om Gitamritaya Namah", meaning: "Who gave the nectar of Gita" },
  { sanskrit: "ॐ गीतेश्वराय नमः", transliteration: "Om Giteshwaraya Namah", meaning: "Lord of the Gita" },
  { sanskrit: "ॐ योगेश्वराय नमः", transliteration: "Om Yogeshwaraya Namah", meaning: "Lord of Yoga" },
  { sanskrit: "ॐ परमात्मने नमः", transliteration: "Om Paramatmane Namah", meaning: "The Supreme Soul" },
  { sanskrit: "ॐ परमेश्वराय नमः", transliteration: "Om Parameshwaraya Namah", meaning: "The Supreme Lord" },
  { sanskrit: "ॐ पुरुषाय नमः", transliteration: "Om Purushaya Namah", meaning: "The Supreme Person" },
  { sanskrit: "ॐ पुरुषोत्तमाय नमः", transliteration: "Om Purushottamaya Namah", meaning: "The Supreme among persons" },
  { sanskrit: "ॐ अव्यक्ताय नमः", transliteration: "Om Avyaktaya Namah", meaning: "The unmanifest" },
  { sanskrit: "ॐ व्यक्ताय नमः", transliteration: "Om Vyaktaya Namah", meaning: "The manifest" },
  { sanskrit: "ॐ सत्याय नमः", transliteration: "Om Satyaya Namah", meaning: "The Truth" },
  { sanskrit: "ॐ सत्यपराक्रमाय नमः", transliteration: "Om Satyaparakramaya Namah", meaning: "Of true valor" },
  { sanskrit: "ॐ अनंताय नमः", transliteration: "Om Anantaya Namah", meaning: "The infinite" },
  { sanskrit: "ॐ अनंतविजयाय नमः", transliteration: "Om Anantavijayaya Namah", meaning: "Of infinite victory" },
  { sanskrit: "ॐ अजाय नमः", transliteration: "Om Ajaya Namah", meaning: "The unborn" },
  { sanskrit: "ॐ अमृताय नमः", transliteration: "Om Amritaya Namah", meaning: "The nectar" },
  { sanskrit: "ॐ अमृतवर्षिणे नमः", transliteration: "Om Amritavarshine Namah", meaning: "Rain of nectar" },
  { sanskrit: "ॐ महाभागाय नमः", transliteration: "Om Mahabhagaya Namah", meaning: "Most fortunate" },
  { sanskrit: "ॐ महायोगिने नमः", transliteration: "Om Mahayogine Namah", meaning: "Great yogi" },
  { sanskrit: "ॐ महाबलाय नमः", transliteration: "Om Mahabalaya Namah", meaning: "Of great strength" },
  { sanskrit: "ॐ महावीर्याय नमः", transliteration: "Om Mahaviryaya Namah", meaning: "Of great valor" },
  { sanskrit: "ॐ महातेजसे नमः", transliteration: "Om Mahatejase Namah", meaning: "Of great splendor" },
  { sanskrit: "ॐ महाशक्तये नमः", transliteration: "Om Mahashaktaye Namah", meaning: "Of great power" },
  { sanskrit: "ॐ महाद्युतये नमः", transliteration: "Om Mahadyutaye Namah", meaning: "Of great radiance" },
  { sanskrit: "ॐ महाभुजाय नमः", transliteration: "Om Mahabhujaya Namah", meaning: "Of mighty arms" },
  { sanskrit: "ॐ महारूपाय नमः", transliteration: "Om Maharupaya Namah", meaning: "Of great form" },
  { sanskrit: "ॐ महानाय नमः", transliteration: "Om Mahanaya Namah", meaning: "The Great" },
  { sanskrit: "ॐ महात्मने नमः", transliteration: "Om Mahatmane Namah", meaning: "Great soul" },
  { sanskrit: "ॐ महागर्भाय नमः", transliteration: "Om Mahagarbhaya Namah", meaning: "Of great womb (source)" },
  { sanskrit: "ॐ महेश्वराय नमः", transliteration: "Om Maheshwaraya Namah", meaning: "Great Lord" },
  { sanskrit: "ॐ महादेवाय नमः", transliteration: "Om Mahadevaya Namah", meaning: "Great God" },
  { sanskrit: "ॐ श्रीकृष्णाय नमः", transliteration: "Om Sri Krishnaya Namah", meaning: "Om Sri Krishna — the all-attractive Supreme" },
];

// ===== Braj Weather — Darshan suitability forecast =====
export const BRAJ_WEATHER: { day: string; date: string; temp: string; condition: string; icon: string; darshan: "excellent" | "good" | "moderate" | "avoid"; darshanNote: string; crowd: string; bestTime: string }[] = [
  { day: "Today", date: "Aug 6", temp: "32°C / 26°C", condition: "Partly Cloudy", icon: "⛅", darshan: "good", darshanNote: "Pleasant morning darshan. Carry umbrella for afternoon.", crowd: "Moderate", bestTime: "6-9 AM" },
  { day: "Tomorrow", date: "Aug 7", temp: "34°C / 27°C", condition: "Sunny", icon: "☀️", darshan: "good", darshanNote: "Clear skies — excellent for outdoor parikrama. Hydrate well.", crowd: "Moderate", bestTime: "Sunrise & Sunset" },
  { day: "Aug 8", date: "Aug 8", temp: "30°C / 25°C", condition: "Light Rain", icon: "🌧️", darshan: "moderate", darshanNote: "Light monsoon showers. Indoor temple darshan recommended. Avoid parikrama.", crowd: "Low", bestTime: "10 AM - 4 PM" },
  { day: "Aug 9", date: "Aug 9", temp: "28°C / 24°C", condition: "Thunderstorm", icon: "⛈️", darshan: "avoid", darshanNote: "Heavy rain expected. Avoid outdoor activities. Virtual darshan available.", crowd: "Very Low", bestTime: "Indoor only" },
  { day: "Aug 10", date: "Aug 10", temp: "31°C / 25°C", condition: "Cloudy", icon: "☁️", darshan: "excellent", darshanNote: "Post-rain freshness — most auspicious for Govardhan Parikrama. Cool breeze.", crowd: "High", bestTime: "Full day" },
  { day: "Aug 11", date: "Aug 11", temp: "33°C / 26°C", condition: "Sunny", icon: "☀️", darshan: "good", darshanNote: "Bright and clear. Best for photography at Prem Mandir.", crowd: "High", bestTime: "Morning" },
  { day: "Aug 12", date: "Aug 12", temp: "35°C / 28°C", condition: "Hot", icon: "🥵", darshan: "moderate", darshanNote: "Hot day — visit temples with AC. Carry water. Avoid noon parikrama.", crowd: "Low", bestTime: "After 5 PM" },
];

// ===== Braj Prasad Recipes =====
export const BRAJ_RECIPES: { name: string; sanskrit: string; occasion: string; time: string; servings: string; difficulty: string; ingredients: string[]; steps: string[]; significance: string; emoji: string }[] = [
  {
    name: "Makhan Mishri",
    sanskrit: "माखन मिश्री",
    occasion: "Daily offering to Krishna",
    time: "10 min",
    servings: "4",
    difficulty: "Easy",
    ingredients: ["200g fresh white butter (makhan)", "100g rock sugar (mishri)", "4-5 tulsi leaves", "Pinch of cardamom powder"],
    steps: [
      "Take fresh churned white butter in a silver or brass bowl.",
      "Crush rock sugar (mishri) into small pieces — do not powder completely.",
      "Gently fold mishri into the butter — do not over-mix.",
      "Add finely chopped tulsi leaves and cardamom powder.",
      "Offer to Krishna with 'Om Namo Bhagavate Vasudevaya' mantra.",
      "Distribute as prasad after 5 minutes.",
    ],
    significance: "Krishna's favorite — He stole butter (makhan) as a child in Gokul. This is the most beloved offering in Braj.",
    emoji: "🧈",
  },
  {
    name: "Panchamrit",
    sanskrit: "पंचामृत",
    occasion: "Abhishek & festivals",
    time: "15 min",
    servings: "10",
    difficulty: "Easy",
    ingredients: ["1 cup milk", "1/2 cup yogurt (dahi)", "1/2 cup ghee", "1/2 cup honey", "1/2 cup sugar or jaggery", "10-12 tulsi leaves", "Cardamom, saffron threads"],
    steps: [
      "Combine milk and yogurt in a silver bowl — whisk smooth.",
      "Add melted ghee, honey, and sugar. Mix clockwise (pradakshina direction).",
      "Crush cardamom and add with saffron threads.",
      "Add tulsi leaves — they purify the mixture.",
      "Chant 'Om Namo Bhagavate Vasudevaya' 108 times while preparing.",
      "Use for abhishek of deity, then distribute as prasad.",
    ],
    significance: "The 'five nectars' — used for Krishna's abhishek on Janmashtami. Symbolizes the five elements and spiritual purity.",
    emoji: "🥛",
  },
  {
    name: "Charnamrit",
    sanskrit: "चरणामृत",
    occasion: "Daily temple darshan",
    time: "5 min",
    servings: "20",
    difficulty: "Easy",
    ingredients: ["2 cups water", "1 tbsp milk", "1 tsp honey", "2-3 tulsi leaves", "Cardamom powder", "Saffron threads"],
    steps: [
      "Boil water and cool to room temperature.",
      "Add milk, honey, cardamom, and saffron.",
      "Place tulsi leaves — represents purity.",
      "Offer at deity's lotus feet (charan).",
      "Collect and distribute in right hand cupped.",
    ],
    significance: "The 'nectar of the Lord's feet' — most sacred prasad. Sipped from cupped hand after darshan at every Braj temple.",
    emoji: "💧",
  },
  {
    name: "Panjiri",
    sanskrit: "पंजीरी",
    occasion: "Janmashtami special",
    time: "30 min",
    servings: "15",
    difficulty: "Medium",
    ingredients: ["2 cups whole wheat flour", "1 cup ghee", "1/2 cup powdered sugar", "1/4 cup almonds, cashews, raisins", "2 tbsp melon seeds", "1 tbsp fennel seeds", "1 tsp cardamom", "1/2 tsp nutmeg"],
    steps: [
      "Roast flour in ghee on low flame until golden and aromatic (15 min).",
      "Cool slightly, then add powdered sugar.",
      "Add chopped dry fruits, melon seeds, fennel.",
      "Mix cardamom and nutmeg powders.",
      "Store in airtight container. Offer to Krishna at midnight.",
      "Distribute as Janmashtami prasad — believed to be Krishna's birthday feast.",
    ],
    significance: "Traditional Janmashtami prasad across Braj. Represents nourishment and is believed to have been prepared by Yashoda Maiya for baby Krishna.",
    emoji: "🌰",
  },
];

// ===== Multi-language content =====
export const TRANSLATIONS = {
  en: {
    heroTitle: "Your Spiritual Home in Braj Dham",
    heroSubtitle: "Premium MVDA-approved plotted townships in the sacred land of Krishna.",
    bookNow: "Book Now",
    exploreProjects: "Explore Projects",
    bookSiteVisit: "Book a Site Visit",
    namaste: "Namaste",
    viewDetails: "View Details",
    enquire: "Enquire",
    compare: "Compare",
    wishlist: "Wishlist",
    learnMore: "Learn More",
    getCallback: "Get Callback",
    sendWishlist: "Send Wishlist to Advisor",
    beginJourney: "Begin the Journey",
  },
  hi: {
    heroTitle: "ब्रज धाम में आपका आध्यात्मिक घर",
    heroSubtitle: "कृष्ण की पावन भूमि में प्रीमियम एमवीडीए-अनुमोदित प्लॉटेड टाउनशिप।",
    bookNow: "अभी बुक करें",
    exploreProjects: "प्रोजेक्ट्स देखें",
    bookSiteVisit: "साइट विज़िट बुक करें",
    namaste: "नमस्ते",
    viewDetails: "विवरण देखें",
    enquire: "पूछताछ",
    compare: "तुलना करें",
    wishlist: "पसंदीदा",
    learnMore: "और जानें",
    getCallback: "कॉलबैक पाएं",
    sendWishlist: "सलाहकार को पसंदीदा भेजें",
    beginJourney: "यात्रा शुरू करें",
  },
  hinglish: {
    heroTitle: "Braj Dham mein aapka Spiritual Home",
    heroSubtitle: "Premium MVDA-approved plotted townships Krishna ki sacred land mein.",
    bookNow: "Abhi Book Karein",
    exploreProjects: "Projects Dekhein",
    bookSiteVisit: "Site Visit Book Karein",
    namaste: "Namaste 🙏",
    viewDetails: "Details Dekhein",
    enquire: "Enquiry Karein",
    compare: "Compare Karein",
    wishlist: "Wishlist",
    learnMore: "Aur Jaanein",
    getCallback: "Callback Pao",
    sendWishlist: "Advisor ko Wishlist Bhejein",
    beginJourney: "Journey Shuru Karein",
  },
};

export type Language = keyof typeof TRANSLATIONS;

// ===== Sadhana Tracker activities =====
export const SADHANA_ACTIVITIES: { id: string; name: string; sanskrit: string; icon: string; target: number; unit: string; color: string }[] = [
  { id: "japa", name: "Japa (Mantra Chanting)", sanskrit: "जप", icon: "📿", target: 16, unit: "rounds", color: "text-gold" },
  { id: "darshan", name: "Temple Darshan", sanskrit: "दर्शन", icon: "🛕", target: 1, unit: "visit", color: "text-temple-red" },
  { id: "parikrama", name: "Parikrama", sanskrit: "परिक्रमा", icon: "🚶", target: 1, unit: "round", color: "text-green-deep" },
  { id: "gita", name: "Bhagavad Gita Reading", sanskrit: "गीता पाठ", icon: "📖", target: 1, unit: "chapter", color: "text-indigo-deep" },
  { id: "goseva", name: "Go Seva (Cow Service)", sanskrit: "गो सेवा", icon: "🐄", target: 1, unit: "session", color: "text-amber-600" },
  { id: "tulsi", name: "Tulsi Worship", sanskrit: "तुलसी पूजा", icon: "🌿", target: 2, unit: "times", color: "text-green-light" },
];

// ===== Braj Darshan Guide — Temple visiting info =====
export const DARSHAN_GUIDE: { temple: string; city: string; timing: string; aarti: string; dress: string; etiquette: string[]; bestDay: string; emoji: string }[] = [
  {
    temple: "Banke Bihari Temple",
    city: "Vrindavan",
    timing: "Summer: 7:45 AM-12:00 PM, 5:30-9:30 PM · Winter: 8:45 AM-1:00 PM, 3:30-8:30 PM",
    aarti: "Mangala 8:00 AM, Rajbhog 11:30 AM, Sandhya 7:00 PM",
    dress: "Traditional Indian attire. No shorts/sleeveless. Dhoti for men preferred in inner sanctum.",
    etiquette: ["No photography inside sanctum", "No leather items allowed", "Maintain silence in main hall", "Prasad distributed after aarti", "Special curtain darshan every few minutes"],
    bestDay: "Tuesday & Thursday — less crowded",
    emoji: "🛕",
  },
  {
    temple: "ISKCON Temple",
    city: "Vrindavan",
    timing: "Mangala 4:30 AM, Darshan 5:00 AM-12:30 PM, 4:00-8:30 PM",
    aarti: "Mangala 4:30 AM, Shringar 7:15 AM, Rajbhog 12:00 PM, Sandhya 6:30 PM",
    dress: "Dhoti/kurta for men, saree/salwar for women. Clean modest clothing.",
    etiquette: ["Remove shoes at entrance", "No phones inside sanctum", "Stand in queue discipline", "Kirtan participation encouraged", "Free prasad after Rajbhog aarti"],
    bestDay: "Sunday — special feast & kirtan",
    emoji: "🛕",
  },
  {
    temple: "Krishna Janmabhoomi",
    city: "Mathura",
    timing: "5:00 AM-12:00 PM, 4:00-9:00 PM (tight security)",
    aarti: "Mangala 5:30 AM, Sandhya 7:00 PM",
    dress: "Modest traditional. Security check at entry — avoid large bags.",
    etiquette: ["Strict security screening", "No electronics allowed inside", "No leather belts/wallets", "ID proof may be required", "Maintain silence at birthplace"],
    bestDay: "Monday — Krishna's day, most auspicious",
    emoji: "👶",
  },
  {
    temple: "Govardhan Hill Parikrama",
    city: "Govardhan",
    timing: "24 hours (start at sunrise recommended)",
    aarti: "Mansi Ganga aarti at sunset 6:30 PM",
    dress: "Walking clothes, comfortable shoes. Carry water bottle.",
    etiquette: ["21 km parikrama — 4-5 hours walk", "No shoes on sacred parts (carry socks)", "Respect sadhus on the path", "Don't pluck flowers/tulsi from hill", "Charity to needy encouraged"],
    bestDay: "Purnima (full moon) — most auspicious",
    emoji: "⛰️",
  },
  {
    temple: "Prem Mandir",
    city: "Vrindavan",
    timing: "5:30 AM-12:00 PM, 4:30-8:30 PM",
    aarti: "Sandhya aarti 7:00 PM, Light show 7:30 PM",
    dress: "Modest clothing. No shorts.",
    etiquette: ["Photography allowed in gardens", "No touching deities", "Light show is must-see", "Free entry", "Maintain queue discipline"],
    bestDay: "Evening — for light & sound show",
    emoji: "🛕",
  },
  {
    temple: "Vishram Ghat",
    city: "Mathura",
    timing: "5:00 AM-9:00 PM (Yamuna aarti at sunrise & sunset)",
    aarti: "Yamuna aarti 6:00 AM & 6:30 PM",
    dress: "Traditional. Remove shoes before stepping to ghat.",
    etiquette: ["Don't pollute Yamuna water", "Boating available — negotiate rates", "Feed fish for punya", "Light diya for ancestors", "Evening aarti is magical"],
    bestDay: "Every day — sunrise aarti best",
    emoji: "🌊",
  },
];

// ===== Construction Progress milestones =====
export const CONSTRUCTION_MILESTONES: { phase: string; status: "completed" | "in-progress" | "upcoming"; date: string; desc: string; icon: string }[] = [
  { phase: "Land Acquisition", status: "completed", date: "Jan 2026", desc: "40 acres acquired with clear title. MVDA layout sanction received.", icon: "📜" },
  { phase: "Site Grading & Leveling", status: "completed", date: "Mar 2026", desc: "Complete land leveling, boundary wall construction, site office setup.", icon: "🏗️" },
  { phase: "Internal Roads", status: "in-progress", date: "Jul 2026", desc: "Sector A roads completed. Sector B base laying in progress (60% done).", icon: "🛣️" },
  { phase: "Water & Sewage", status: "in-progress", date: "Aug 2026", desc: "Underground drainage pipes laid in Sector A. Water tower foundation started.", icon: "💧" },
  { phase: "Electrical Infrastructure", status: "upcoming", date: "Sep 2026", desc: "Underground cabling, transformers, street lights installation.", icon: "⚡" },
  { phase: "Temple Complex Foundation", status: "upcoming", date: "Oct 2026", desc: "Main township temple foundation stone laying ceremony planned.", icon: "🛕" },
  { phase: "Entry Gate Construction", status: "upcoming", date: "Nov 2026", desc: "Grand 3-domed marble entry gate with gold kalash.", icon: "🚪" },
  { phase: "Landscaping & Gardens", status: "upcoming", date: "Jan 2027", desc: "Tulsi gardens, meditation spaces, jogging track, green belt development.", icon: "🌿" },
  { phase: "Clubhouse & Pool", status: "upcoming", date: "Mar 2027", desc: "Premium clubhouse, swimming pool, gym, community hall.", icon: "🏊" },
  { phase: "Final Handover", status: "upcoming", date: "Dec 2027", desc: "Plot possession, documentation, society formation, key handover.", icon: "🎉" },
];

// ===== Plot Recommendation Engine — preferences =====
export const RECOMMENDATION_CRITERIA: { id: string; question: string; options: { value: string; label: string; emoji: string; weight: Record<string, number> }[] }[] = [
  {
    id: "budget",
    question: "What's your budget range?",
    options: [
      { value: "5-10", label: "₹5-10 Lakh", emoji: "💸", weight: { "bankey-bihari-kunj": 3, "bankey-bihari-orchid": 1, "braj-lotus-greens": 0, "bankey-bihari-dham": 0 } },
      { value: "6-12", label: "₹6-12 Lakh", emoji: "💰", weight: { "bankey-bihari-orchid": 3, "bankey-bihari-kunj": 2, "braj-lotus-greens": 1, "bankey-bihari-dham": 0 } },
      { value: "8-15", label: "₹8-15 Lakh", emoji: "💎", weight: { "braj-lotus-greens": 3, "bankey-bihari-orchid": 2, "bankey-bihari-dham": 1, "bankey-bihari-kunj": 0 } },
      { value: "10-20", label: "₹10-20 Lakh", emoji: "👑", weight: { "bankey-bihari-dham": 3, "braj-lotus-greens": 2, "bankey-bihari-orchid": 0, "bankey-bihari-kunj": 0 } },
    ],
  },
  {
    id: "city",
    question: "Which sacred city calls to you?",
    options: [
      { value: "vrindavan", label: "Vrindavan — Krishna's playground", emoji: "🦚", weight: { "bankey-bihari-kunj": 3, "bankey-bihari-dham": 3, "bankey-bihari-orchid": 0, "braj-lotus-greens": 0 } },
      { value: "mathura", label: "Mathura — Krishna's birthplace", emoji: "👶", weight: { "bankey-bihari-orchid": 3, "bankey-bihari-kunj": 0, "bankey-bihari-dham": 0, "braj-lotus-greens": 0 } },
      { value: "govardhan", label: "Govardhan — Giriraj's shelter", emoji: "⛰️", weight: { "braj-lotus-greens": 3, "bankey-bihari-orchid": 0, "bankey-bihari-kunj": 0, "bankey-bihari-dham": 0 } },
    ],
  },
  {
    id: "size",
    question: "What plot size do you need?",
    options: [
      { value: "small", label: "Compact (80-150 sq.yd)", emoji: "📐", weight: { "bankey-bihari-kunj": 3, "bankey-bihari-orchid": 2, "braj-lotus-greens": 0, "bankey-bihari-dham": 0 } },
      { value: "medium", label: "Medium (120-250 sq.yd)", emoji: "📏", weight: { "bankey-bihari-orchid": 2, "braj-lotus-greens": 3, "bankey-bihari-kunj": 1, "bankey-bihari-dham": 0 } },
      { value: "large", label: "Large (150-400 sq.yd)", emoji: "🗺️", weight: { "bankey-bihari-dham": 3, "braj-lotus-greens": 2, "bankey-bihari-orchid": 1, "bankey-bihari-kunj": 0 } },
    ],
  },
  {
    id: "priority",
    question: "What matters most to you?",
    options: [
      { value: "spiritual", label: "Walking distance to temple", emoji: "🛕", weight: { "bankey-bihari-orchid": 3, "bankey-bihari-kunj": 3, "braj-lotus-greens": 2, "bankey-bihari-dham": 1 } },
      { value: "investment", label: "Highest appreciation potential", emoji: "📈", weight: { "bankey-bihari-dham": 3, "braj-lotus-greens": 2, "bankey-bihari-orchid": 1, "bankey-bihari-kunj": 0 } },
      { value: "amenities", label: "Premium amenities (pool, clubhouse)", emoji: "🏊", weight: { "bankey-bihari-dham": 3, "braj-lotus-greens": 2, "bankey-bihari-orchid": 1, "bankey-bihari-kunj": 0 } },
      { value: "community", label: "Devotee community living", emoji: "🤝", weight: { "bankey-bihari-kunj": 3, "bankey-bihari-orchid": 2, "braj-lotus-greens": 1, "bankey-bihari-dham": 2 } },
    ],
  },
];

// ===== Krishna Stories for children =====
export const KRISHNA_STORIES: { title: string; emoji: string; ageGroup: string; moral: string; story: string }[] = [
  {
    title: "Krishna and the Butter Thief",
    emoji: "🧈",
    ageGroup: "3-6 years",
    moral: "Even the Divine loves playful mischief — but always share with love.",
    story: "Little Krishna loved butter more than anything! He would climb up to high shelves where mother Yashoda kept the butter pot, sometimes with his friends, sometimes all by himself. When Yashoda caught him, his big innocent eyes would melt her heart. 'I didn't take it, Maiya!' he would say, butter still on his face. She would tie him to a mortar as gentle punishment, but even that became a divine play — Krishna dragged the mortar between two trees, uprooting them and freeing two cursed souls. The lesson? Even God's mischief carries deeper purpose, and a mother's love forgives all.",
  },
  {
    title: "Krishna Lifts Govardhan Hill",
    emoji: "⛰️",
    ageGroup: "5-9 years",
    moral: "Have faith in the Divine — God protects those who surrender to Him.",
    story: "Lord Indra, god of rain, was angry because the people of Braj stopped worshipping him and started praying to Govardhan Hill instead (on Krishna's advice). Indra sent terrible storms! For seven days, rain poured and winds howled. But young Krishna simply lifted the entire Govardhan Hill on his little finger, creating a giant umbrella. All the people, cows, and animals took shelter underneath. Indra realized Krishna was no ordinary boy — He was the Supreme Lord! Indra came down, bowed to Krishna, and begged forgiveness. Krishna smiled and blessed Indra. From that day, Govardhan Puja is celebrated every year.",
  },
  {
    title: "Krishna and Kaliya the Serpent",
    emoji: "🐍",
    ageGroup: "5-9 years",
    moral: "Divine love purifies even the most dangerous beings.",
    story: "The Yamuna river had become poisonous because a hundred-headed serpent named Kaliya lived in it. No fish could survive, no bird could fly over it. One day, Krishna's friends fell unconscious after drinking the water! Krishna jumped into the river to confront Kaliya. A fierce battle followed — Krishna danced on Kaliya's many hoods. Kaliya's wives begged for mercy. Krishna didn't kill Kaliya — instead, He sent him away to the ocean, purified by His divine touch. The Yamuna became clean again. The lesson? Krishna doesn't destroy — He transforms and purifies.",
  },
  {
    title: "Krishna's Best Friend Sudama",
    emoji: "🤝",
    ageGroup: "6-10 years",
    moral: "True friendship is beyond wealth — God remembers His devotees always.",
    story: "Sudama was Krishna's childhood friend. They studied together in the ashram of Sandipani Muni. Years later, Sudama was very poor. His wife said, 'Go to Krishna, who is now a great king in Dwaraka. He will help us.' Sudama took a small pouch of flattened rice (poha) — Krishna's favorite as a child. When Krishna saw Sudama, He ran to embrace him, washed his feet with tears of joy, and ate the simple poha with great love. Krishna didn't ask what Sudama wanted. When Sudama returned home, he found a beautiful palace where his hut had been, filled with wealth and comfort. Krishna knew his friend's need without being asked.",
  },
  {
    title: "Krishna and the Demoness Putana",
    emoji: "👼",
    ageGroup: "3-7 years",
    moral: "God protects innocents — evil intentions always fail.",
    story: "When Krishna was a baby, the wicked king Kansa sent a demoness named Putana to kill Him. She disguised herself as a beautiful woman and offered to nurse baby Krishna. But her breasts were smeared with poison! Little Krishna smiled at her, took her breast in His tiny mouth, and drank not just the milk but her very life-force. Putana screamed and tried to escape, but Krishna held on. She fell dead, and in her true demon form, she was huge as a mountain. But because Krishna had drunk her milk, she attained liberation — even evil beings who encounter the Divine are freed.",
  },
  {
    title: "Krishna's Ras Leela",
    emoji: "🌙",
    ageGroup: "7-12 years",
    moral: "Pure devotion connects you directly with the Divine — eternally.",
    story: "On a beautiful full moon night in autumn, Krishna played His flute on the banks of the Yamuna. The Gopis of Vrindavan heard the enchanting melody and left everything — their homes, families, chores — to be with Krishna. Krishna expanded Himself into many forms, so each Gopi felt He was dancing only with her. This was the Maha Ras Leela — the divine dance of love. It symbolizes that the Supreme Lord is always present for every devotee who loves Him purely. The Gopis didn't seek anything from Krishna — they only wanted to be with Him. This selfless love is the highest form of devotion, and Vrindavan remains forever the stage of this eternal dance.",
  },
];

// ===== Newsletter series =====
export const NEWSLETTER_SERIES: { day: number; subject: string; preview: string; category: string }[] = [
  { day: 1, subject: "Namaste! Welcome to Braj Dham 🙏", preview: "Begin your spiritual journey with Krishna's sacred land. Discover why millions call Braj their spiritual home.", category: "Welcome" },
  { day: 3, subject: "The Story of Banke Bihari Temple", preview: "Discover how Krishna appeared in His tribhanga form to Swami Haridas in Nidhivan, 1864.", category: "Spiritual" },
  { day: 5, subject: "Why MVDA Approval Matters for Your Investment", preview: "Legal clarity, clear titles, and approved infrastructure — the BrajProperty difference explained.", category: "Investment" },
  { day: 7, subject: "Govardhan Parikrama: A 21km Spiritual Journey", preview: "Everything you need to know about the most sacred walk in Braj — route, timing, significance.", category: "Guide" },
  { day: 10, subject: "NRI Investment Guide for Braj Dham", preview: "FEMA compliance, repatriation rules, and how NRIs can own a piece of sacred Vrindavan.", category: "NRI" },
  { day: 14, subject: "Janmashtami in Braj — A Once-in-a-Lifetime Experience", preview: "Midnight abhishek, ras lila, prasad — celebrate Krishna's birthday where He was born.", category: "Festival" },
];

// ===== Braj Pilgrimage Planner — itinerary templates =====
export const PILGRIMAGE_DURATIONS: { days: number; title: string; subtitle: string; emoji: string; intensity: "relaxed" | "moderate" | "intensive" }[] = [
  { days: 1, title: "Day Divine", subtitle: "Quick spiritual reset", emoji: "🌅", intensity: "relaxed" },
  { days: 2, title: "Weekend Blessing", subtitle: "Saturday-Sunday Braj immersion", emoji: "Weekend", intensity: "moderate" },
  { days: 3, title: "Sacred Trilogy", subtitle: "Vrindavan · Mathura · Govardhan", emoji: "🛕", intensity: "moderate" },
  { days: 7, title: "Braj Saptaah", subtitle: "Complete Braj Dham immersion", emoji: "🕉️", intensity: "intensive" },
];

export const PILGRIMAGE_ITINERARIES: Record<number, { day: number; morning: { temple: string; activity: string; time: string }; afternoon: { temple: string; activity: string; time: string }; evening: { temple: string; activity: string; time: string }; tip: string }[]> = {
  1: [
    {
      day: 1,
      morning: { temple: "Banke Bihari Temple", activity: "Mangala darshan & aarti", time: "7:45 AM" },
      afternoon: { temple: "Prem Mandir", activity: "Garden stroll & light show prep", time: "4:00 PM" },
      evening: { temple: "ISKCON Temple", activity: "Sandhya aarti & kirtan", time: "6:30 PM" },
      tip: "Start early to avoid crowds. Carry a reusable water bottle.",
    },
  ],
  2: [
    {
      day: 1,
      morning: { temple: "Banke Bihari Temple", activity: "Morning darshan", time: "8:00 AM" },
      afternoon: { temple: "Seva Kunj & Nidhivan", activity: "Sacred grove visit", time: "3:00 PM" },
      evening: { temple: "Prem Mandir", activity: "Light & sound show", time: "7:30 PM" },
      tip: "Nidhivan closes at sunset — no one allowed after dark. Legend says Krishna comes nightly.",
    },
    {
      day: 2,
      morning: { temple: "Krishna Janmabhoomi", activity: "Birthplace darshan", time: "5:00 AM" },
      afternoon: { temple: "Vishram Ghat", activity: "Yamuna aarti & boat ride", time: "4:00 PM" },
      evening: { temple: "Dwarkadhish Temple", activity: "Evening aarti", time: "7:00 PM" },
      tip: "Janmabhoomi has strict security — no phones, no bags. Carry only ID proof.",
    },
  ],
  3: [
    {
      day: 1,
      morning: { temple: "Banke Bihari Temple", activity: "Morning darshan", time: "7:45 AM" },
      afternoon: { temple: "ISKCON Temple", activity: "Rajbhog aarti & prasad", time: "12:00 PM" },
      evening: { temple: "Prem Mandir", activity: "Light show", time: "7:30 PM" },
      tip: "Vrindavan day — wear comfortable shoes for temple hopping.",
    },
    {
      day: 2,
      morning: { temple: "Krishna Janmabhoomi", activity: "Birthplace darshan", time: "5:00 AM" },
      afternoon: { temple: "Gokul & Raman Reti", activity: "Krishna's childhood spots", time: "2:00 PM" },
      evening: { temple: "Vishram Ghat", activity: "Yamuna Sandhya aarti", time: "6:30 PM" },
      tip: "Mathura day — visit Gokul for authentic Krishna childhood leela sites.",
    },
    {
      day: 3,
      morning: { temple: "Govardhan Hill", activity: "Start 21km parikrama", time: "Sunrise" },
      afternoon: { temple: "Radha Kund & Kusum Sarovar", activity: "Sacred kund baths", time: "1:00 PM" },
      evening: { temple: "Mansi Ganga", activity: "Evening aarti & rest", time: "6:00 PM" },
      tip: "Govardhan parikrama is 21km — 4-5 hours walk. Start early, carry water, wear walking shoes.",
    },
  ],
  7: [
    {
      day: 1,
      morning: { temple: "Banke Bihari Temple", activity: "Arrival & first darshan", time: "8:00 AM" },
      afternoon: { temple: "Loi Bazaar", activity: "Spiritual shopping & rest", time: "3:00 PM" },
      evening: { temple: "Prem Mandir", activity: "Light show", time: "7:30 PM" },
      tip: "Day 1: Settle in, acclimatize. Don't overdo it.",
    },
    {
      day: 2,
      morning: { temple: "ISKCON Temple", activity: "Mangala aarti (4:30 AM)", time: "4:30 AM" },
      afternoon: { temple: "Seva Kunj & Nidhivan", activity: "Sacred groves", time: "2:00 PM" },
      evening: { temple: "Banke Bihari", activity: "Sandhya darshan", time: "7:00 PM" },
      tip: "Day 2: Deep Vrindavan immersion. ISKCON mangala at 4:30 AM is life-changing.",
    },
    {
      day: 3,
      morning: { temple: "Krishna Janmabhoomi", activity: "Birthplace darshan", time: "5:00 AM" },
      afternoon: { temple: "Dwarkadhish Temple", activity: "Temple architecture tour", time: "2:00 PM" },
      evening: { temple: "Vishram Ghat", activity: "Yamuna aarti", time: "6:30 PM" },
      tip: "Day 3: Mathura exploration. Janmabhoomi requires ID proof.",
    },
    {
      day: 4,
      morning: { temple: "Gokul", activity: "Krishna's foster home", time: "8:00 AM" },
      afternoon: { temple: "Raman Reti", activity: "Krishna's playground", time: "2:00 PM" },
      evening: { temple: "Mahavan", activity: "Ancient temple visits", time: "5:00 PM" },
      tip: "Day 4: Gokul — where Krishna grew up. Don't miss Raman Reti sand darshan.",
    },
    {
      day: 5,
      morning: { temple: "Govardhan Hill", activity: "Full parikrama (21km)", time: "Sunrise" },
      afternoon: { temple: "Radha Kund", activity: "Sacred bath & meditation", time: "2:00 PM" },
      evening: { temple: "Kusum Sarovar", activity: "Sunset meditation", time: "6:00 PM" },
      tip: "Day 5: The big day — Govardhan parikrama. Most auspicious. Take it slow.",
    },
    {
      day: 6,
      morning: { temple: "Barsana", activity: "Radha's village & Shriji Temple", time: "8:00 AM" },
      afternoon: { temple: "Nandgaon", activity: "Krishna's childhood home", time: "2:00 PM" },
      evening: { temple: "Vrindavan", activity: "Return & rest", time: "6:00 PM" },
      tip: "Day 6: Radha-Krishna's village tour. Barsana is Radha's birthplace — very sacred.",
    },
    {
      day: 7,
      morning: { temple: "Banke Bihari", activity: "Farewell darshan", time: "8:00 AM" },
      afternoon: { temple: "Local markets", activity: "Souvenirs & prasad shopping", time: "2:00 PM" },
      evening: { temple: "Departure", activity: "Carry blessings home", time: "—" },
      tip: "Day 7: Farewell. Take Banke Bihari's blessings one last time before leaving Braj.",
    },
  ],
};

// ===== Satsang Schedule =====
export const SATSANG_SCHEDULE: { day: string; time: string; type: string; temple: string; leader: string; capacity: string; fee: string; desc: string; emoji: string }[] = [
  { day: "Monday", time: "6:00 AM - 7:30 AM", type: "Morning Kirtan", temple: "Township Temple Complex", leader: "Pandit Gopal Shastri", capacity: "50", fee: "Free", desc: "Start your week with divine kirtan. Open to all residents. Prasad served after.", emoji: "🌅" },
  { day: "Tuesday", time: "5:30 PM - 7:00 PM", type: "Bhagavad Gita Path", temple: "Community Hall", leader: "Smt. Meera Devi", capacity: "30", fee: "Free", desc: "Chapter-by-chapter Gita reading with explanation. Perfect for spiritual seekers.", emoji: "📖" },
  { day: "Wednesday", time: "7:00 PM - 8:30 PM", type: "Bhajan Sandhya", temple: "Township Temple Complex", leader: "Braj Bhajan Mandali", capacity: "100", fee: "Free", desc: "Evening of devotional bhajans. Musical instruments welcome. Tea & prasad.", emoji: "🎵" },
  { day: "Thursday", time: "6:00 AM - 8:00 AM", type: "Tulsi Puja & Japa", temple: "Tulsi Garden", leader: "Self-led", capacity: "Unlimited", fee: "Free", desc: "Guruvar special — worship Tulsi Maharani and chant 16 rounds of Hare Krishna maha-mantra.", emoji: "🌿" },
  { day: "Friday", time: "7:00 PM - 9:00 PM", type: "Katha & Discourse", temple: "Community Hall", leader: "Guest Speaker (rotating)", capacity: "80", fee: "Free", desc: "Spiritual discourse on Krishna's leelas. Guest speakers from ISKCON & local ashrams.", emoji: "🗣️" },
  { day: "Saturday", time: "5:00 PM - 7:00 PM", type: "Children Satsang", temple: "Community Hall", leader: "Smt. Radha Rani", capacity: "40", fee: "Free", desc: "Special satsang for children — Krishna stories, bhajans, art & craft. Ages 4-12.", emoji: "🧒" },
  { day: "Sunday", time: "10:00 AM - 1:00 PM", type: "Sunday Feast & Kirtan", temple: "Township Temple Complex", leader: "Community", capacity: "200", fee: "Free", desc: "Weekly community feast — free vegetarian meal, kirtan, spiritual discussion. All welcome.", emoji: "🍽️" },
];

// ===== Krishna Mantra Library =====
export const KRISHNA_MANTRAS: { id: string; name: string; sanskrit: string; transliteration: string; purpose: string; count: number; duration: string; difficulty: string; desc: string; emoji: string }[] = [
  {
    id: "maha",
    name: "Hare Krishna Maha Mantra",
    sanskrit: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे, हरे राम हरे राम राम राम हरे हरे",
    transliteration: "Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare",
    purpose: "Spiritual liberation (moksha)",
    count: 16,
    duration: "2 hours",
    difficulty: "Beginner",
    desc: "The most powerful mantra in Kali Yuga. Chanted by ISKCON devotees worldwide. 16 rounds daily on tulsi mala is the standard practice.",
    emoji: "📿",
  },
  {
    id: "panchtattva",
    name: "Pancha Tattva Mantra",
    sanskrit: "श्री कृष्ण चैतन्य प्रभु नित्यानंद श्री अद्वैत गदाधर श्रीवसादि गौर भक्त वृंद",
    transliteration: "Sri Krishna Chaitanya Prabhu Nityananda Sri Advaita Gadadhara Srivasadi Gaura Bhakta Vrinda",
    purpose: "Before any kirtan or japa",
    count: 3,
    duration: "2 minutes",
    difficulty: "Beginner",
    desc: "Chanted before starting any kirtan or japa. Invokes the mercy of Chaitanya Mahaprabhu and His associates. Essential for all devotees.",
    emoji: "🙏",
  },
  {
    id: "govindam",
    name: "Govindam Adi Purusham",
    sanskrit: "गोविंदमादिपुरुषं तमहं भजामि",
    transliteration: "Govindam Adi-purusham tam aham bhajami",
    purpose: "Morning invocation",
    count: 1,
    duration: "5 minutes",
    difficulty: "Beginner",
    desc: "From Brahma Samhita. Sung at ISKCON temples worldwide during Mangala aarti (4:30 AM). Invokes Krishna as the Supreme Original Person.",
    emoji: "🌅",
  },
  {
    id: "krishna-ashtakam",
    name: "Krishnashtakam",
    sanskrit: "वस्त्रे विभाति विद्युद्वत् तवास्यं चारु हासितम्",
    transliteration: "Vastre vibhati vidyudvat tasyam charu hasitam",
    purpose: "Meditation on Krishna's form",
    count: 1,
    duration: "10 minutes",
    difficulty: "Intermediate",
    desc: "Eight verses glorifying Krishna's beautiful form. Recited during morning worship to fix the mind on Krishna's divine appearance.",
    emoji: "✨",
  },
  {
    id: "radha-krishna",
    name: "Radha Krishna Pranam",
    sanskrit: "राधे राधे गोविंदा, राधे राधे गोपाला",
    transliteration: "Radhe Radhe Govinda, Radhe Radhe Gopala",
    purpose: "Daily remembrance",
    count: 108,
    duration: "15 minutes",
    difficulty: "Beginner",
    desc: "Simple yet powerful mantra remembering Radha and Krishna. Common greeting in Braj — say 'Radhe Radhe' everywhere. 108 times = one mala round.",
    emoji: "🌸",
  },
  {
    id: "damodar",
    name: "Damodarashtakam",
    sanskrit: "नमामीश्वरं सचिदानंद रूपं लसत्कुंडलं गोकुले ब्रजमणि",
    transliteration: "Namamishvaram sac-cid-ananda rupam lasat kundalam gokule bhrajamanam",
    purpose: "Kartik month special",
    count: 1,
    duration: "10 minutes",
    difficulty: "Intermediate",
    desc: "Eight prayers to baby Krishna as Damodar (bound by Yashoda's love). Especially chanted during Kartik month (Oct-Nov) for immense spiritual merit.",
    emoji: "🪔",
  },
];

// ===== Bhajan Lyrics =====
export const BHAJAN_LYRICS: Record<string, { lines: string[]; translation: string }[]> = {
  "Achyutam Keshavam": [
    { lines: ["अच्युतं केशवं रामानारायणं कृष्णं दामोदरं वासुदेवं हरिम्", "श्रीधरं माधवं गोपालो विष्णुम् जय यादवं श्रीवत्सांकं वरदम्"], translation: "I bow to Achyuta, Keshava, Rama, Narayana, Krishna, Damodara, Vasudeva, Hari, Sridhara, Madhava, Gopala, Vishnu — victory to Yadava, the bearer of Srivatsa mark, the boon-giver." },
    { lines: ["कृष्णं गोविंदं गोपालं वरदम् जय यादवं श्रीवत्सांकं वरदम्"], translation: "Glory to Krishna, Govinda, Gopala — the boon-giver, the Yadava, the bearer of Srivatsa mark." },
  ],
  "Govind Bolo Hari Gopal Bolo": [
    { lines: ["गोविंद बोलो हरि गोपाल बोलो", "राधा रमण हरि गोविंद बोलो"], translation: "Sing Govind! Sing Hari Gopal! Sing to Radha's beloved, Hari Govind!" },
    { lines: ["हे गोपाल कृष्णा गोविंद गिरधर", "हे मधुसूदन मुरारी"], translation: "O Gopal Krishna, Govind Girdhar! O Madhusudan, Murari (slayer of Mura demon)!" },
  ],
  "Yashomati Maiya Se": [
    { lines: ["यशोमती मैया से बोलो नंदलाला", "संग मेरे सखा गोकुल के बाला"], translation: "Tell mother Yashoda, O beloved Nandalal! With me are the boys of Gokul." },
    { lines: ["माखन खायो नहीं मैया, मैंने तो भोला"], translation: "'Mother, I didn't eat the butter — I'm innocent!' says Krishna with butter on his face." },
  ],
  "Radhe Radhe Govind": [
    { lines: ["राधे राधे गोविंद, राधे राधे गोपाला", "राधे राधे गोकुल के धनी, राधे राधे ब्रजलाला"], translation: "Radhe Radhe Govind, Radhe Radhe Gopala! Radhe Radhe Lord of Gokul, Radhe Radhe child of Braj!" },
  ],
  "Braj Bhumii Meri": [
    { lines: ["ब्रज भूमि मेरी जन्म भूमि है", "यमुना के तीरे कृष्ण की लीला है"], translation: "Braj land is my birthplace. On Yamuna's banks, Krishna's divine play unfolds." },
  ],
  "Mero Mann Ram Ji": [
    { lines: ["मेरो मन राम जी पठै घर आवो", "मैं तो हौं दासी तुम्हारी"], translation: "My mind calls out: 'O Ram, come home!' I am your humble servant." },
  ],
};

// ===== Goshala — Sacred Cow adoption/sponsorship =====
export const GOSHALA_COWS: { id: string; name: string; sanskrit: string; breed: string; age: string; temperament: string; story: string; sponsorshipPerMonth: number; emoji: string; sponsored: boolean }[] = [
  { id: "gauri", name: "Gauri", sanskrit: "गौरी", breed: "Gir", age: "5 years", temperament: "Gentle & affectionate", story: "Gauri was rescued from a slaughterhouse in 2024. She now lives peacefully in our goshala, producing 8 liters of milk daily for temple offerings.", sponsorshipPerMonth: 2100, emoji: "🐄", sponsored: false },
  { id: "nandini", name: "Nandini", sanskrit: "नंदिनी", breed: "Sahiwal", age: "3 years", temperament: "Playful & energetic", story: "Nandini was born on Krishna Janmashtami 2023 — a divine sign! She loves being brushed and will nuzzle anyone who feeds her fresh grass.", sponsorshipPerMonth: 2100, emoji: "🐄", sponsored: false },
  { id: "kamdhenu", name: "Kamdhenu", sanskrit: "कामधेनु", breed: "Tharparkar", age: "8 years", temperament: "Wise & calm mother", story: "Our eldest cow, Kamdhenu has mothered 4 calves. She embodies the wish-fulfilling cow of Hindu mythology — her presence brings peace to all who visit.", sponsorshipPerMonth: 3100, emoji: "🐄", sponsored: true },
  { id: "shyama", name: "Shyama", sanskrit: "श्यामा", breed: "Krishna Valley", age: "2 years", temperament: "Shy but curious", story: "Shyama was found wandering near Govardhan Hill. Dark as Krishna Himself, she's named after the Lord. Still adjusting to goshala life but thriving.", sponsorshipPerMonth: 1500, emoji: "🐄", sponsored: false },
  { id: "radha", name: "Radha", sanskrit: "राधा", breed: "Hariana", age: "6 years", temperament: "Loving & protective", story: "Radha adopted an orphaned calf as her own — she represents maternal devotion. She produces the richest milk used for Krishna's daily abhishek.", sponsorshipPerMonth: 2100, emoji: "🐄", sponsored: false },
  { id: "balaram", name: "Balaram", sanskrit: "बलराम", breed: "Kankrej", age: "4 years", temperament: "Strong & dignified ox", story: "Balaram is our plough ox — strong as Krishna's brother. He helps plough the organic farm where we grow vegetables for prasad meals.", sponsorshipPerMonth: 1500, emoji: "🐂", sponsored: false },
];

export const GOSHALA_STATS: { label: string; value: string; emoji: string }[] = [
  { label: "Sacred Cows", value: "47", emoji: "🐄" },
  { label: "Acres of Grazing", value: "8", emoji: "🌿" },
  { label: "Liters/Day Milk", value: "180L", emoji: "🥛" },
  { label: "Sponsored", value: "23", emoji: "❤️" },
];

// ===== Krishna Quiz — test knowledge =====
export const KRISHNA_QUIZ_QUESTIONS: { question: string; options: string[]; answer: number; explanation: string }[] = [
  { question: "Where was Krishna born?", options: ["Vrindavan", "Mathura", "Gokul", "Govardhan"], answer: 1, explanation: "Krishna was born in a prison cell in Mathura to Devaki and Vasudeva at midnight on Ashtami." },
  { question: "Who was Krishna's foster mother?", options: ["Devaki", "Yashoda", "Radha", "Rukmini"], answer: 1, explanation: "Yashoda Maiya raised Krishna in Gokul. She is the embodiment of maternal devotion (vatsalya bhava)." },
  { question: "Which hill did Krishna lift on his finger?", options: ["Nandgaon Hill", "Govardhan Hill", "Vrindavan Hill", "Barsana Hill"], answer: 1, explanation: "Krishna lifted Govardhan Hill for 7 days to protect Braj from Indra's devastating rains." },
  { question: "What is the name of Krishna's flute?", options: ["Bansuri", "Venu", "Shankh", "Both Bansuri and Venu"], answer: 3, explanation: "Krishna's flute is called both Bansuri and Venu. Its enchanting sound attracted all of Braj — humans, animals, and even the Yamuna river." },
  { question: "Who was Krishna's best childhood friend (poor devotee)?", options: ["Arjuna", "Uddhava", "Sudama", "Balarama"], answer: 2, explanation: "Sudama was Krishna's poor childhood friend. When he visited Krishna with just flattened rice (poha), Krishna blessed him with a palace." },
  { question: "Which serpent did Krishna subdue in the Yamuna?", options: ["Vasuki", "Kaliya", "Takshaka", "Shesha"], answer: 1, explanation: "Krishna danced on Kaliya's hundred hoods, subduing (not killing) him. Kaliya was sent to the ocean, purified by divine touch." },
  { question: "How many wives did Krishna have (as per tradition)?", options: ["8", "108", "16108", "1008"], answer: 2, explanation: "Krishna had 16,108 wives — 8 principal queens and 16,100 maidens rescued from demon Narakasura's captivity." },
  { question: "What does 'Damodara' mean?", options: ["One with lotus eyes", "Bound by mother's love", "The cowherd", "The supreme enjoyer"], answer: 1, explanation: "Damodara means 'bound around the belly' — when Yashoda tied Krishna to a mortar with a rope around his stomach." },
  { question: "Which festival celebrates Krishna's birthday?", options: ["Holi", "Diwali", "Janmashtami", "Rath Yatra"], answer: 2, explanation: "Janmashtami celebrates Krishna's divine appearance at midnight on Ashtami (8th day) of Krishna Paksha in Bhadrapada month." },
  { question: "What is the Hare Krishna Maha Mantra?", options: ["Om Namo Bhagavate", "Hare Krishna Hare Krishna Krishna Krishna Hare Hare", "Om Namo Shivaya", "Om Gam Ganapataye"], answer: 1, explanation: "The Maha Mantra: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare' — recommended for Kali Yuga." },
];

// ===== Spiritual Shop products =====
export const SPIRITUAL_PRODUCTS: { id: string; name: string; sanskrit: string; category: string; price: number; desc: string; emoji: string; inStock: boolean }[] = [
  { id: "tulsi-mala-108", name: "Tulsi Mala (108 beads)", sanskrit: "तुलसी माला", category: "Japa Mala", price: 501, desc: "Hand-strung sacred Tulsi beads from Vrindavan for chanting 108 mantras. Comes with silk pouch.", emoji: "📿", inStock: true },
  { id: "krishna-idol-brass", name: "Brass Krishna Idol", sanskrit: "कृष्ण मूर्ति", category: "Deity", price: 2100, desc: "Beautifully crafted brass Krishna standing in tribhanga pose, playing flute. 6 inches tall.", emoji: "🛕", inStock: true },
  { id: "panchamrit-set", name: "Panchamrit Set", sanskrit: "पंचामृत सेट", category: "Puja Items", price: 350, desc: "Complete set for preparing panchamrit — silver bowl, spoon, and recipe card. From Braj temples.", emoji: "🥛", inStock: true },
  { id: "makhan-mishri-prasad", name: "Makhan Mishri Prasad", sanskrit: "माखन मिश्री", category: "Prasad", price: 150, desc: "Krishna's favorite offering — fresh butter with rock sugar & tulsi. Shipped from Vrindavan.", emoji: "🧈", inStock: true },
  { id: "bhagavad-gita-pocket", name: "Pocket Bhagavad Gita", sanskrit: "श्रीमद्भगवद्गीता", category: "Books", price: 110, desc: "Compact Bhagavad Gita with Sanskrit + Hindi + English translation. Perfect for daily reading.", emoji: "📖", inStock: true },
  { id: "diya-brass-set", name: "Brass Diya Set (5 pcs)", sanskrit: "दीपक सेट", category: "Puja Items", price: 550, desc: "Set of 5 traditional brass diyas for aarti. Handmade by Braj artisans. Includes cotton wicks.", emoji: "🪔", inStock: true },
  { id: "radha-krishna-photo", name: "Radha Krishna Photo Frame", sanskrit: "राधा-कृष्ण फोटो", category: "Decor", price: 750, desc: "Framed Radha-Krishna photo from Vrindavan's Prem Mandir. Wooden frame with gold accents.", emoji: "🖼️", inStock: true },
  { id: "chandan-tilak", name: "Chandan Tilak Set", sanskrit: "चंदन तिलक", category: "Puja Items", price: 210, desc: "Pure sandalwood paste (chandan) for applying tilak. From Braj's sacred forests.", emoji: "🕉️", inStock: true },
];

// ===== Braj Photo Gallery =====
export const BRAJ_PHOTOS: { id: string; title: string; location: string; category: string; image: string; desc: string; photographer: string }[] = [
  { id: "p1", title: "Sunrise at Banke Bihari", location: "Vrindavan", category: "Temple", image: "/images/temples/banke-bihari.png", desc: "First rays of dawn illuminating the temple spire as devotees queue for Mangala darshan.", photographer: "Rajesh K." },
  { id: "p2", title: "Govardhan Parikrama Path", location: "Govardhan", category: "Parikrama", image: "/images/temples/govardhan.png", desc: "The sacred 21km path around Giriraj Hill, walked by millions of devotees each year.", photographer: "Suresh M." },
  { id: "p3", title: "ISKCON Evening Aarti", location: "Vrindavan", category: "Temple", image: "/images/temples/iskcon.png", desc: "Sandhya aarti at ISKCON — hundreds of devotees singing kirtan as lamps are offered.", photographer: "Anjali D." },
  { id: "p4", title: "Township Aerial View", location: "Vrindavan", category: "Township", image: "/images/township-aerial.png", desc: "Bird's eye view of our premium gated township with temple-themed entrance and green belt.", photographer: "BrajProperty Team" },
  { id: "p5", title: "Vrindavan Golden Dawn", location: "Vrindavan", category: "Landscape", image: "/images/hero-vrindavan.png", desc: "The sacred land of Braj at golden hour — temple silhouettes and morning mist over Yamuna.", photographer: "BrajProperty Team" },
  { id: "p6", title: "Bankey Bihari Orchid Entrance", location: "Mathura", category: "Township", image: "/images/projects/bankey-bihari-orchid.png", desc: "Temple-themed entrance gate inspired by Banke Bihari Temple — marble facade with gold accents.", photographer: "BrajProperty Team" },
  { id: "p7", title: "Braj Lotus Greens Garden", location: "Govardhan", category: "Township", image: "/images/projects/braj-lotus-greens.png", desc: "Lotus-themed water fountain at the entrance, with Govardhan Hill in the background.", photographer: "BrajProperty Team" },
  { id: "p8", title: "Bankey Bihari Kunj", location: "Vrindavan", category: "Township", image: "/images/projects/bankey-bihari-kunj.png", desc: "ISKCON-inspired entrance gate with devotional gardens and tulsi plantation.", photographer: "BrajProperty Team" },
  { id: "p9", title: "Bankey Bihari Dham Grand Gate", location: "Vrindavan", category: "Township", image: "/images/projects/bankey-bihari-dham.png", desc: "Grand 3-domed temple architecture entrance — Braj's largest gated township.", photographer: "BrajProperty Team" },
];








