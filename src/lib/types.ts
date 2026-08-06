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



