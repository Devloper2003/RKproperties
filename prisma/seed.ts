import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const amenitiesOrchid = JSON.stringify([
  "Temple Complex",
  "Community Hall",
  "Children Park",
  "Jogging Track with Tulsi Plantation",
  "24x7 Security with CCTV",
  "Gated Entry with RFID",
  "Underground Electrical Wiring",
  "Rainwater Harvesting",
  "30% Green Belt",
  "Internal Roads 30-40 ft",
]);

const amenitiesLotus = JSON.stringify([
  "Lotus-Themed Entry with Water Features",
  "Yoga & Meditation Garden",
  "Parikrama Rest Area",
  "Senior Citizen Sit-out Zones",
  "Herbal Garden",
  "Direct Parikrama Route Access",
  "Temple Complex",
  "24x7 Security",
  "Underground Drainage",
  "40% Green Cover",
]);

const amenitiesKunj = JSON.stringify([
  "ISKCON Community Center Access",
  "Vaishnav Satsang Hall",
  "Devotional Library",
  "Temple Complex",
  "Tulsi Garden",
  "24x7 Security",
  "Gated Entry",
  "Internal Roads 30ft",
  "Rainwater Harvesting",
  "Children Play Area",
]);

const amenitiesDham = JSON.stringify([
  "Grand 3-Domed Temple Complex (3 Shrines)",
  "Clubhouse with Swimming Pool",
  "Meditation Caves",
  "Goshala (Cow Shelter)",
  "Organic Farm",
  "Amphitheater for Cultural Events",
  "Dedicated Parikrama Path",
  "Premium Landscaping",
  "24x7 Security with CCTV",
  "RFID Gated Entry",
  "Underground Utilities",
  "Jogging & Cycling Track",
]);

const projects = [
  {
    name: "Bankey Bihari Orchid",
    slug: "bankey-bihari-orchid",
    tagline: "Spiritual Proximity, Smart Investment",
    location: "Mathura, Near Banke Bihari Temple",
    city: "Mathura",
    latitude: 27.4924,
    longitude: 77.6737,
    totalAreaAcres: 25,
    minPlotSize: 100,
    maxPlotSize: 250,
    priceRangeMin: 600000,
    priceRangeMax: 1200000,
    status: "selling",
    reraNumber: "UPMVR/2024/0142",
    mvdaNumber: "MVDA/MTA/2024/0089",
    possessionDate: "Dec 2026",
    heroImage: "/images/projects/bankey-bihari-orchid.png",
    galleryImages: JSON.stringify([
      "/images/projects/bankey-bihari-orchid.png",
      "/images/township-aerial.png",
      "/images/temples/banke-bihari.png",
    ]),
    amenities: amenitiesOrchid,
    nearbyTemples: JSON.stringify([
      { name: "Banke Bihari Temple", distance: "1.2 km", walkTime: "15 min" },
      { name: "Krishna Janmabhoomi", distance: "3.5 km", walkTime: "40 min" },
      { name: "Vishram Ghat", distance: "4.0 km", walkTime: "45 min" },
    ]),
    usp: "Walking distance to Banke Bihari Temple — spiritual proximity at a budget-friendly premium entry.",
    description:
      "Bankey Bihari Orchid is a 25-acre premium gated township in Mathura, located near the revered Banke Bihari Temple. Designed for mid-range premium buyers seeking spiritual proximity with modern gated-community living.",
    longDescription:
      "Bankey Bihari Orchid brings together the divine proximity of Banke Bihari Temple and the comfort of a modern gated township. With 300+ residential plots ranging from 100 to 250 square yards, this township is designed for devotees who wish to make Mathura their permanent spiritual home. The entry gate draws architectural inspiration from Banke Bihari Temple, featuring a marble facade with gold accents. Internal roads are 30-40 feet wide with underground drainage, while 30% of the area is reserved as green belt. Expected price appreciation: 15-20% annually for the next 3 years.",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    name: "Braj Lotus Greens",
    slug: "braj-lotus-greens",
    tagline: "Where Govardhan Meets Modern Living",
    location: "Govardhan, Parikrama Route",
    city: "Govardhan",
    latitude: 27.5035,
    longitude: 77.4651,
    totalAreaAcres: 30,
    minPlotSize: 120,
    maxPlotSize: 300,
    priceRangeMin: 800000,
    priceRangeMax: 1500000,
    status: "selling",
    reraNumber: "UPMVR/2024/0156",
    mvdaNumber: "MVDA/GVD/2024/0042",
    possessionDate: "Mar 2027",
    heroImage: "/images/projects/braj-lotus-greens.png",
    galleryImages: JSON.stringify([
      "/images/projects/braj-lotus-greens.png",
      "/images/township-aerial.png",
      "/images/temples/govardhan.png",
    ]),
    amenities: amenitiesLotus,
    nearbyTemples: JSON.stringify([
      { name: "Govardhan Hill (Giriraj)", distance: "0.8 km", walkTime: "10 min" },
      { name: "Daan Ghati Temple", distance: "2.0 km", walkTime: "25 min" },
      { name: "Mansi Ganga", distance: "1.5 km", walkTime: "18 min" },
    ]),
    usp: "Premium-plus segment with direct Govardhan Parikrama views — supreme spiritual significance.",
    description:
      "Braj Lotus Greens is a 30-acre township in Govardhan with views of the Parikrama route. Positioned in the premium-plus segment owing to Govardhan's supreme spiritual significance.",
    longDescription:
      "Braj Lotus Greens is where the sacred Govardhan Parikrama meets modern luxury living. This 30-acre premium-plus township offers 400+ plots with sizes ranging from 120 to 300 square yards, each providing views of the Parikrama route. The lotus-themed entry gate features water features, while amenities go beyond the ordinary — a yoga meditation garden, parikrama rest area, senior citizen sit-out zones, herbal garden, and direct parikrama route access. Govardhan Hill, where Lord Krishna lifted Giriraj on his little finger, makes this location the most spiritually significant address in all of Braj.",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    name: "Bankey Bihari Kunj",
    slug: "bankey-bihari-kunj",
    tagline: "Your Home in the ISKCON Community",
    location: "Vrindavan, Near ISKCON Temple",
    city: "Vrindavan",
    latitude: 27.5712,
    longitude: 77.6999,
    totalAreaAcres: 20,
    minPlotSize: 80,
    maxPlotSize: 200,
    priceRangeMin: 500000,
    priceRangeMax: 1000000,
    status: "selling",
    reraNumber: "UPMVR/2024/0178",
    mvdaNumber: "MVDA/VRN/2024/0117",
    possessionDate: "Sep 2026",
    heroImage: "/images/projects/bankey-bihari-kunj.png",
    galleryImages: JSON.stringify([
      "/images/projects/bankey-bihari-kunj.png",
      "/images/township-aerial.png",
      "/images/temples/iskcon.png",
    ]),
    amenities: amenitiesKunj,
    nearbyTemples: JSON.stringify([
      { name: "ISKCON Temple", distance: "0.5 km", walkTime: "7 min" },
      { name: "Banke Bihari Temple", distance: "3.8 km", walkTime: "45 min" },
      { name: "Prem Mandir", distance: "1.2 km", walkTime: "15 min" },
    ]),
    usp: "Compact, accessible premium living in the heart of Vrindavan's ISKCON community.",
    description:
      "Bankey Bihari Kunj is a 20-acre compact township in Vrindavan, in the neighbourhood of ISKCON Temple. Designed for accessible premium living with smaller plot sizes and competitive pricing.",
    longDescription:
      "Bankey Bihari Kunj is the perfect home for devotees seeking to live within the ISKCON community of Vrindavan. This 20-acre compact township offers 250+ plots with smaller sizes (80-200 sq.yd) and competitive pricing (₹5-10 Lakh), lowering the entry barrier for spiritual living. The entry gate is designed in ISKCON temple architecture style, and residents enjoy access to the ISKCON community center, vaishnav satsang hall, and a devotional library. With the ISKCON Temple just a 7-minute walk away, daily darshan and satsang become part of your lifestyle.",
    isFeatured: true,
    sortOrder: 3,
  },
  {
    name: "Bankey Bihari Dham",
    slug: "bankey-bihari-dham",
    tagline: "Braj's Largest Gated Spiritual Township",
    location: "Vrindavan, Mega Township",
    city: "Vrindavan",
    latitude: 27.5896,
    longitude: 77.7199,
    totalAreaAcres: 40,
    minPlotSize: 150,
    maxPlotSize: 400,
    priceRangeMin: 1000000,
    priceRangeMax: 2000000,
    status: "pre-launch",
    reraNumber: "UPMVR/2024/0201 (Pre-Launch)",
    mvdaNumber: "MVDA/VRN/2024/0156",
    possessionDate: "Dec 2027",
    heroImage: "/images/projects/bankey-bihari-dham.png",
    galleryImages: JSON.stringify([
      "/images/projects/bankey-bihari-dham.png",
      "/images/township-aerial.png",
      "/images/temples/banke-bihari.png",
    ]),
    amenities: amenitiesDham,
    nearbyTemples: JSON.stringify([
      { name: "Banke Bihari Temple", distance: "5.2 km", walkTime: "60 min" },
      { name: "ISKCON Temple", distance: "3.5 km", walkTime: "40 min" },
      { name: "Prem Mandir", distance: "2.8 km", walkTime: "35 min" },
    ]),
    usp: "Braj region's largest gated residential township — landmark address with 25-30% premium potential.",
    description:
      "Bankey Bihari Dham is Vrindavan's 40-acre mega-township — the Braj region's largest gated residential project. Currently in pre-launch with aggressive early-bird pricing.",
    longDescription:
      "Bankey Bihari Dham is set to become the landmark address of Braj — a 40-acre mega-township and the region's largest gated residential project. Currently in pre-launch phase, this is the opportunity for early-bird investors and premium buyers to secure the most prestigious address in Vrindavan. With 500+ plots ranging from 150 to 400 square yards, the township features a grand entry gate with 3-domed temple architecture, marble flooring, and gold kalash. Full-scale amenities include a clubhouse, swimming pool, temple complex with 3 shrines, meditation caves, goshala (cow shelter), organic farm, amphitheater, and a dedicated parikrama path. Investment thesis: being the largest project, it will command a 25-30% premium over smaller projects.",
    isFeatured: true,
    sortOrder: 4,
  },
];

function generatePlots(projectId: string, count: number, minSize: number, maxSize: number, minPrice: number, maxPrice: number) {
  const facings = ["north", "south", "east", "west", "ne", "nw", "se", "sw"];
  const plots: any[] = [];
  const statuses = ["available", "available", "available", "available", "available", "reserved", "sold", "booked"];
  for (let i = 1; i <= count; i++) {
    const size = minSize + Math.floor(Math.random() * (maxSize - minSize) / 10) * 10;
    const ratio = (size - minSize) / (maxSize - minSize);
    const price = Math.round((minPrice + ratio * (maxPrice - minPrice)) / 1000) * 1000;
    const isCorner = Math.random() > 0.8;
    const isRoadFacing = Math.random() > 0.6;
    const dim1 = Math.floor(Math.sqrt(size) * 0.9);
    const dim2 = Math.round(size / dim1);
    plots.push({
      projectId,
      plotNumber: `P${String(i).padStart(3, "0")}`,
      sizeSqyd: size,
      facing: facings[Math.floor(Math.random() * facings.length)],
      dimensions: `${dim1}x${dim2}`,
      price,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      isCorner,
      isRoadFacing,
    });
  }
  return plots;
}

const testimonials = [
  {
    name: "Rajesh Agrawal",
    designation: "Retired Professor, Delhi",
    content:
      "After years of searching, RK Properties gave us the perfect spiritual home in Vrindavan. The MVDA approval and clear legal title gave us complete peace of mind. Every morning I walk to the Banke Bihari Temple — it feels like a dream come true.",
    rating: 5,
    location: "Bankey Bihari Orchid, Mathura",
    projectName: "Bankey Bihari Orchid",
  },
  {
    name: "Dr. Anjali Mehta",
    designation: "NRI Cardiologist, New Jersey",
    content:
      "As an NRI, I was initially skeptical about investing in Vrindavan remotely. But the transparency, virtual site visits, and WhatsApp updates from the RK Properties team made the entire process effortless. My plot in Bankey Bihari Dham has already appreciated 22%.",
    rating: 5,
    location: "Bankey Bihari Dham, Vrindavan",
    projectName: "Bankey Bihari Dham",
  },
  {
    name: "Suresh & Lakshmi Sharma",
    designation: "Devotee Couple, Bangalore",
    content:
      "We wanted a second home near ISKCON Vrindavan for our annual spiritual retreats. Bankey Bihari Kunj offered us the perfect community living experience with satsang halls and a devotional library. The gated security and temple-themed architecture exceeded our expectations.",
    rating: 5,
    location: "Bankey Bihari Kunj, Vrindavan",
    projectName: "Bankey Bihari Kunj",
  },
  {
    name: "Vikram Singh Rathore",
    designation: "Businessman, Jaipur",
    content:
      "Braj Lotus Greens is the best investment decision I've made. The Govardhan Parikrama view from my plot is breathtaking, and the lotus-themed entrance gives it a premium feel. The team's professionalism and legal clarity set them apart from local builders.",
    rating: 5,
    location: "Braj Lotus Greens, Govardhan",
    projectName: "Braj Lotus Greens",
  },
  {
    name: "Meera Devi",
    designation: "Spiritual Seeker, Mumbai",
    content:
      "I was looking for a peaceful retirement home where I could spend my days in devotion. RK Properties understood my spiritual needs, not just my investment needs. The herbal garden and meditation spaces in Lotus Greens have transformed my daily life.",
    rating: 5,
    location: "Braj Lotus Greens, Govardhan",
    projectName: "Braj Lotus Greens",
  },
  {
    name: "Arjun & Priya Kapoor",
    designation: "IT Professionals, Gurgaon",
    content:
      "We're a young couple with spiritual inclination, and Bankey Bihari Orchid gave us the perfect entry point — affordable, modern amenities, and walking distance to Banke Bihari Temple. The EMI calculator and transparent pricing made our decision easy.",
    rating: 5,
    location: "Bankey Bihari Orchid, Mathura",
    projectName: "Bankey Bihari Orchid",
  },
];

const blogPosts = [
  {
    title: "Why Vrindavan is the Top Spiritual Real Estate Destination of 2026",
    slug: "vrindavan-top-spiritual-real-estate-2026",
    excerpt:
      "Discover why Vrindavan has emerged as the preferred destination for spiritual real estate investment, driven by infrastructure growth, MVDA approval, and a 50M+ annual devotee footfall.",
    content:
      "Vrindavan, the sacred land where Lord Krishna spent his childhood, has transformed from a pilgrimage town into a premium real estate destination. The Delhi-Mumbai Expressway has reduced travel time from Delhi to under 2 hours, while the upcoming Jewar International Airport further boosts connectivity. With 50M+ annual spiritual tourists and the Mathura Refinery expansion creating employee housing demand, the market is primed for growth. MVDA-approved premium developers currently hold less than 15% market penetration, indicating massive headroom for appreciation.",
    featuredImage: "/images/hero-vrindavan.png",
    category: "investment",
    tags: JSON.stringify(["Vrindavan", "Investment", "Real Estate", "2026"]),
    author: "RK Properties Insights Team",
    readTime: 7,
  },
  {
    title: "Banke Bihari Temple: History, Significance & Visiting Guide",
    slug: "banke-bihari-temple-history-guide",
    excerpt:
      "Explore the divine history of Banke Bihari Temple, one of Vrindavan's most revered shrines, and learn about its cultural significance for residents and devotees alike.",
    content:
      "The Banke Bihari Temple, established in 1864 by Swami Haridas, houses the divine couple Krishna and Radha in their 'tribhanga' (three-fold bending) form. The temple's unique tradition of hiding the deity behind curtains and revealing Him at intervals reflects the deep devotional intimacy of Braj. For residents of Bankey Bihari Orchid and Kunj, living within walking distance of this sacred shrine transforms daily life into a continuous spiritual experience.",
    featuredImage: "/images/temples/banke-bihari.png",
    category: "spiritual",
    tags: JSON.stringify(["Banke Bihari", "Temple", "Vrindavan", "Guide"]),
    author: "Spiritual Editorial Team",
    readTime: 8,
  },
  {
    title: "Govardhan Parikrama: The Sacred 21 km Spiritual Walk",
    slug: "govardhan-parikrama-sacred-walk-guide",
    excerpt:
      "A complete guide to the Govardhan Parikrama — the 21-kilometer sacred circumambulation around Giriraj Hill that millions of devotees complete each year.",
    content:
      "The Govardhan Parikrama is a 21-kilometer sacred walk around Giriraj Hill, where Lord Krishna lifted the entire mountain on his little finger to protect Braj from Indra's wrath. The parikrama begins at Mansi Ganga and passes through Daan Ghati, Anyor, and Radha Kund. For residents of Braj Lotus Greens, this divine walk is accessible daily, making it a cornerstone of their spiritual lifestyle.",
    featuredImage: "/images/temples/govardhan.png",
    category: "spiritual",
    tags: JSON.stringify(["Govardhan", "Parikrama", "Guide", "Spiritual"]),
    author: "Spiritual Editorial Team",
    readTime: 6,
  },
  {
    title: "NRI Investment Guide: Buying Property in Vrindavan from Abroad",
    slug: "nri-investment-guide-vrindavan-property",
    excerpt:
      "A comprehensive guide for Non-Resident Indians looking to invest in Vrindavan real estate — covering legal frameworks, FEMA compliance, repatriation rules, and ROI expectations.",
    content:
      "For NRIs, investing in Vrindavan real estate offers both spiritual fulfillment and financial growth. Under FEMA regulations, NRIs can purchase residential plots without special permission, subject to documentation. Repatriation of sale proceeds is permitted up to the equivalent of foreign exchange brought in. The Braj region has witnessed 18-25% annual appreciation in premium gated townships, outperforming metro markets. Our team assists with end-to-end NRI documentation, Power of Attorney, and virtual site visits.",
    featuredImage: "/images/township-aerial.png",
    category: "investment",
    tags: JSON.stringify(["NRI", "Investment", "FEMA", "Legal"]),
    author: "RK Properties Legal Team",
    readTime: 10,
  },
  {
    title: "MVDA Approval: Why It Matters for Your Property Investment",
    slug: "mvda-approval-importance-property-investment",
    excerpt:
      "Understanding the Mathura-Vrindavan Development Authority (MVDA) approval process and why it is the single most important trust signal for property buyers in Braj.",
    content:
      "MVDA approval is the gold standard of legal security for property buyers in the Braj region. It ensures that the land is properly zoned, the layout is approved, and all necessary infrastructure commitments are legally binding. Unapproved developments risk demolition, legal disputes, and complete loss of investment. Every RK Properties project carries a valid MVDA number, verifiable on the official MVDA portal. This single trust signal separates premium developers from unorganized local builders.",
    featuredImage: "/images/projects/bankey-bihari-orchid.png",
    category: "guide",
    tags: JSON.stringify(["MVDA", "Legal", "Trust", "Guide"]),
    author: "RK Properties Legal Team",
    readTime: 5,
  },
  {
    title: "Vrindavan vs Mathura vs Govardhan: Which Braj City is Right for You?",
    slug: "vrindavan-vs-mathura-vs-govardhan-comparison",
    excerpt:
      "A detailed comparison of the three sacred cities of Braj Dham — helping you choose the perfect location based on spiritual preference, lifestyle, and investment goals.",
    content:
      "Each city in Braj Dham offers a distinct spiritual character. Vrindavan is the heart of Krishna's childhood pastimes, home to ISKCON, Banke Bihari, and Prem Mandir — ideal for ISKCON devotees and international visitors. Mathura, the birthplace of Krishna, combines urban convenience with spiritual depth — perfect for retirees seeking both. Govardhan, with Giriraj Hill, offers the most intense spiritual atmosphere — favored by serious practitioners and senior devotees. Your choice should align with your spiritual practice, family needs, and investment horizon.",
    featuredImage: "/images/hero-vrindavan.png",
    category: "guide",
    tags: JSON.stringify(["Comparison", "Vrindavan", "Mathura", "Govardhan"]),
    author: "RK Properties Insights Team",
    readTime: 9,
  },
  {
    title: "Krishna Janmashtami 2026: Complete Celebration Guide for Braj Dham",
    slug: "krishna-janmashtami-2026-braj-dham-guide",
    excerpt:
      "Everything you need to know about celebrating Krishna Janmashtami 2026 in Vrindavan, Mathura, and Govardhan — temple timings, special events, and resident celebrations.",
    content:
      "Janmashtami in Braj Dham is unlike anywhere else on Earth. The celebrations begin at midnight (the hour of Krishna's appearance) with elaborate abhishek, aarti, and flower showers at every major temple. Banke Bihari Temple draws over 500,000 devotees for the midnight darshan. ISKCON Vrindavan hosts a 3-day festival with international devotees. Mathura's Krishna Janmabhoomi (the exact birthplace) performs a special abhishek at midnight. For RK Properties residents, our township temples organize community celebrations with ras lila performances, prasad distribution, and children's fancy dress competitions. Plan your visit 2-3 months in advance — accommodation fills rapidly.",
    featuredImage: "/images/temples/banke-bihari.png",
    category: "spiritual",
    tags: JSON.stringify(["Janmashtami", "Festival", "2026", "Guide"]),
    author: "Spiritual Editorial Team",
    readTime: 7,
  },
  {
    title: "Razorpay Guide: How to Securely Book Your Plot Online",
    slug: "razorpay-secure-plot-booking-guide",
    excerpt:
      "A step-by-step walkthrough of our Razorpay-powered booking flow — UPI, cards, net banking, EMI options, and security measures explained.",
    content:
      "Booking your plot online with RK Properties is 100% secure via Razorpay (PCI DSS Level 1 certified). The 3-step flow: (1) Review plot summary and booking amount (₹10K-50K); (2) Enter your personal details; (3) Pay via UPI (GPay/PhonePe/Paytm), Credit/Debit card, Net Banking, or EMI (3/6/12 months for bookings above ₹30K). Your booking is confirmed instantly with a unique Booking ID, and the plot is reserved for 15 days. 18% GST applies on the booking amount. Full refund available within 48 hours. The booking amount is adjusted against your final plot price.",
    featuredImage: "/images/township-aerial.png",
    category: "guide",
    tags: JSON.stringify(["Razorpay", "Payment", "Booking", "Security"]),
    author: "RK Properties Tech Team",
    readTime: 5,
  },
  {
    title: "Top 10 Temples to Visit Near Your RK Properties Township",
    slug: "top-10-temples-near-braj-property-townships",
    excerpt:
      "A curated guide to the 10 most sacred temples within walking distance or short drive from our Vrindavan, Mathura, and Govardhan townships.",
    content:
      "Living in a RK Properties township means daily access to Braj's holiest shrines. From Bankey Bihari Orchid: Banke Bihari Temple (1.2 km), Krishna Janmabhoomi (3.5 km), Vishram Ghat (4 km). From Braj Lotus Greens: Govardhan Hill (0.8 km), Daan Ghati (2 km), Mansi Ganga (1.5 km). From Bankey Bihari Kunj: ISKCON Temple (0.5 km), Prem Mandir (1.2 km), Banke Bihari (3.8 km). From Bankey Bihari Dham: all Vrindavan temples within 5 km. Each temple has unique darshan timings, festival significance, and historical depth — we provide a complimentary temple guidebook to every plot owner.",
    featuredImage: "/images/temples/iskcon.png",
    category: "spiritual",
    tags: JSON.stringify(["Temples", "Guide", "Nearby", "Braj"]),
    author: "Spiritual Editorial Team",
    readTime: 10,
  },
  {
    title: "Why Gated Townships Beat Independent Plots in Braj",
    slug: "gated-townships-vs-independent-plots-braj",
    excerpt:
      "Security, amenities, legal clarity, and community — 5 reasons why gated townships outperform independent plots in the Braj region.",
    content:
      "Independent plots in Braj often suffer from unclear titles, lack of infrastructure, and security concerns. Gated townships like ours solve all three: (1) Legal — MVDA-approved layouts with clear titles, no dispute risk; (2) Infrastructure — internal roads, underground drainage, water, electricity already in place; (3) Security — 24/7 CCTV, RFID gated entry, trained guards; (4) Amenities — temple complex, gardens, community hall, jogging track; (5) Community — like-minded spiritual seekers as neighbors, satsang groups, festival celebrations. The 15-20% premium over independent plots is recovered within 2 years through faster appreciation and hassle-free living.",
    featuredImage: "/images/projects/bankey-bihari-dham.png",
    category: "investment",
    tags: JSON.stringify(["Gated", "Township", "Comparison", "Investment"]),
    author: "RK Properties Insights Team",
    readTime: 6,
  },
  {
    title: "Braj Dham Real Estate Market Report Q3 2026",
    slug: "braj-dham-real-estate-market-report-q3-2026",
    excerpt:
      "Quarterly market analysis: price trends, demand drivers, new launches, and investment outlook for Vrindavan, Mathura, and Govardhan.",
    content:
      "Q3 2026 Braj real estate update: Vrindavan premium gated plots up 8.2% QoQ, Mathura +6.7%, Govardhan +7.1%. Key demand drivers: Jewar Airport construction ahead of schedule (45% complete), Delhi-Mumbai Expressway second lane opened, spiritual tourism recovery to 92% of pre-COVID peak. NRI inquiries up 34% YoY, particularly from US/Gulf markets. MVDA approved 7 new projects this quarter (vs 4 in Q3 2025). Supply remains constrained in premium segment — only 3,200 plots available across all MVDA-approved gated townships. Outlook: 25-30% annual appreciation expected to continue through 2027. RK Properties Dham pre-launch oversubscribed 2.3x.",
    featuredImage: "/images/township-aerial.png",
    category: "market-news",
    tags: JSON.stringify(["Market Report", "Q3 2026", "Trends", "Analysis"]),
    author: "RK Properties Insights Team",
    readTime: 11,
  },
  {
    title: "Building Your Dream Home: Construction Guidelines for Braj Plots",
    slug: "building-dream-home-construction-guidelines-braj",
    excerpt:
      "Everything you need to know about constructing on your RK Properties plot — approvals, architects, Vastu, timelines, and costs.",
    content:
      "Once you own a RK Properties plot, construction is straightforward with our guidance. Step 1: Obtain MVDA building sanction (we assist with paperwork, 30-45 days). Step 2: Choose from our approved architects panel (familiar with Braj aesthetic + Vastu compliance). Step 3: Vastu considerations — east/north facing plots preferred, temple/pooja room in north-east, kitchen in south-east. Step 4: Construction cost ₹1,500-2,200 per sq.ft. depending on finishes. Step 5: Timeline 8-12 months for a 2BHK villa. We provide approved contractor lists, material suppliers with negotiated rates, and project management support. Many residents rent out their homes during peak pilgrimage seasons (₹15K-25K/week).",
    featuredImage: "/images/projects/braj-lotus-greens.png",
    category: "guide",
    tags: JSON.stringify(["Construction", "Vastu", "Building", "Guide"]),
    author: "RK Properties Construction Team",
    readTime: 12,
  },
];

const temples = [
  {
    name: "Banke Bihari Temple",
    slug: "banke-bihari-temple",
    description: "Vrindavan's most revered temple housing Krishna in His tribhanga form.",
    longDescription:
      "Established in 1864 by Swami Haridas, the Banke Bihari Temple is Vrindavan's most spiritually significant shrine. The deity, discovered by Swami Haridas in Nidhivan, manifests Krishna and Radha in a unique tribhanga (three-fold bending) posture. The temple's distinctive tradition of periodically drawing and opening curtains reflects the devotional intimacy of Braj.",
    image: "/images/temples/banke-bihari.png",
    location: "Vrindavan",
    significance: "One of the holiest Krishna temples, central to Vrindavan's spiritual identity.",
    distanceFromVrindavan: "0 km (in Vrindavan)",
  },
  {
    name: "Govardhan Hill (Giriraj)",
    slug: "govardhan-hill",
    description: "The sacred hill Krishna lifted on His little finger to protect Braj.",
    longDescription:
      "Govardhan Hill, or Giriraj, is where Lord Krishna performed one of His most celebrated pastimes — lifting the entire mountain on His little finger for seven days to protect Braj's residents from Indra's devastating rains. Today, millions of devotees complete the 21-km Parikrama around the hill annually, making it one of the most sacred walks in Hinduism.",
    image: "/images/temples/govardhan.png",
    location: "Govardhan",
    significance: "Site of Krishna's Giriraj pastime; the 21-km Parikrama is a sacred pilgrimage.",
    distanceFromVrindavan: "22 km from Vrindavan",
  },
  {
    name: "ISKCON Temple",
    slug: "iskcon-temple",
    description: "Sri Sri Krishna Balaram Mandir, the heart of ISKCON Vrindavan.",
    longDescription:
      "The ISKCON Temple, or Sri Sri Krishna Balaram Mandir, was established in 1975 by Srila Prabhupada. It serves as the international headquarters of ISKCON's spiritual activities in Vrindavan. The temple's pristine white marble architecture, manicured gardens, and vibrant kirtan make it a spiritual home for devotees from over 80 countries.",
    image: "/images/temples/iskcon.png",
    location: "Vrindavan",
    significance: "International ISKCON hub; center of global Krishna consciousness in Vrindavan.",
    distanceFromVrindavan: "0 km (in Vrindavan)",
  },
];

const teamMembers = [
  { name: "Shalinder Singh", role: "Founder & Managing Director", photo: "", phone: "+91 89542 89824", whatsapp: "+91 89542 89824", sortOrder: 1 },
  ];

const settings = [
  { key: "whatsapp_number", value: "918923944689", type: "text", group: "contact" },
  { key: "phone_primary", value: "+91 89239 44689", type: "text", group: "contact" },
  { key: "email_primary", value: "shailendrrachaudhary@gmail.com", type: "text", group: "contact" },
  { key: "office_address", value: "Mathura - Vrindavan Marg, In front of Kailash Nagar Road, Near ATTLA CHUNGI, Vatsalya Gram, Mathura, UP 281121", type: "text", group: "contact" },
  { key: "booking_amount_min", value: "10000", type: "text", group: "booking" },
  { key: "booking_amount_max", value: "50000", type: "text", group: "booking" },
  { key: "gst_percentage", value: "18", type: "text", group: "booking" },
];

async function main() {
  console.log("🌱 Seeding RK Properties.in database...");

  // Clean existing
  await db.contactMessage.deleteMany();
  await db.booking.deleteMany();
  await db.lead.deleteMany();
  await db.testimonial.deleteMany();
  await db.plot.deleteMany();
  await db.project.deleteMany();
  await db.blogPost.deleteMany();
  await db.temple.deleteMany();
  await db.teamMember.deleteMany();
  await db.siteSetting.deleteMany();
  await db.adminUser.deleteMany();

  // Projects
  for (const p of projects) {
    await db.project.create({ data: p });
  }
  console.log(`✓ Created ${projects.length} projects`);

  // Plots for each project
  for (const p of projects) {
    const plotCount = p.totalAreaAcres >= 35 ? 60 : p.totalAreaAcres >= 25 ? 45 : 35;
    const plots = generatePlots(p.id || "", 0, p.minPlotSize, p.maxPlotSize, p.priceRangeMin, p.priceRangeMax);
    // re-fetch project to get id
  }
  // Since we don't have IDs yet, fetch and create plots
  const createdProjects = await db.project.findMany();
  for (const project of createdProjects) {
    const plotCount = project.totalAreaAcres >= 35 ? 60 : project.totalAreaAcres >= 25 ? 45 : 35;
    const plots = generatePlots(project.id, plotCount, project.minPlotSize, project.maxPlotSize, project.priceRangeMin, project.priceRangeMax);
    for (const plot of plots) {
      await db.plot.create({ data: plot });
    }
    console.log(`  → ${project.name}: ${plotCount} plots`);
  }

  // Testimonials
  for (const t of testimonials) {
    const project = createdProjects.find((p) => p.name === t.projectName);
    await db.testimonial.create({
      data: {
        name: t.name,
        designation: t.designation,
        content: t.content,
        rating: t.rating,
        location: t.location,
        projectId: project?.id,
      },
    });
  }
  console.log(`✓ Created ${testimonials.length} testimonials`);

  // Blog posts
  for (const b of blogPosts) {
    await db.blogPost.create({ data: b });
  }
  console.log(`✓ Created ${blogPosts.length} blog posts`);

  // Temples
  for (const t of temples) {
    await db.temple.create({ data: t });
  }
  console.log(`✓ Created ${temples.length} temples`);

  // Team
  for (const m of teamMembers) {
    await db.teamMember.create({ data: m });
  }
  console.log(`✓ Created ${teamMembers.length} team members`);

  // Settings
  for (const s of settings) {
    await db.siteSetting.create({ data: s });
  }
  console.log(`✓ Created ${settings.length} settings`);

  // Sample leads
  const sampleLeads = [
    { name: "Rohit Verma", phone: "9876543210", email: "rohit@email.com", source: "website", stage: "new", score: 25, budgetRange: "5-10 Lakh", notes: "Interested in Bankey Bihari Kunj" },
    { name: "Kavita Joshi", phone: "9876543211", email: "kavita@email.com", source: "whatsapp", stage: "contacted", score: 45, budgetRange: "8-15 Lakh", notes: "NRI from London, wants video call" },
    { name: "Manish Gupta", phone: "9876543212", email: "manish@email.com", source: "ads", stage: "qualified", score: 65, budgetRange: "10-20 Lakh", notes: "Looking for corner plot in Dham" },
    { name: "Sunita Rao", phone: "9876543213", email: "sunita@email.com", source: "referral", stage: "site-visit", score: 80, budgetRange: "8-15 Lakh", notes: "Site visit scheduled next week" },
    { name: "Pradeep Singh", phone: "9876543214", email: "pradeep@email.com", source: "website", stage: "negotiation", score: 90, budgetRange: "10-20 Lakh", notes: "Negotiating on Plot P012" },
    { name: "Anita Desai", phone: "9876543215", email: "anita@email.com", source: "walk-in", stage: "won", score: 100, budgetRange: "6-12 Lakh", notes: "Booked plot in Orchid" },
    { name: "Vijay Kumar", phone: "9876543216", email: "vijay@email.com", source: "website", stage: "new", score: 15, budgetRange: "5-10 Lakh", notes: "First inquiry" },
    { name: "Deepa Nair", phone: "9876543217", email: "deepa@email.com", source: "whatsapp", stage: "contacted", score: 40, budgetRange: "8-15 Lakh", notes: "Asked about Govardhan project" },
  ];
  for (const l of sampleLeads) {
    await db.lead.create({ data: { ...l, projectId: createdProjects[Math.floor(Math.random() * createdProjects.length)].id } });
  }
  console.log(`✓ Created ${sampleLeads.length} sample leads`);

  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL;
const adminPass = process.env.ADMIN_PASS;
if (adminEmail && adminPass) {
    await db.adminUser.create({
      data: {
        email: adminEmail,
        name: "Super Admin",
        role: "superadmin",
        password: adminPass,
      },
    });
    console.log("✓ Created authorized user");
  } else {
    console.warn("⚠ ADMIN_EMAIL / ADMIN_PASS not set — admin user skipped");
  }
  console.log("✓ Created admin user (admin@rkproperties.in / braj2026)");

  console.log("\n🎉 Seeding complete!");
  const projectCount = await db.project.count();
  const plotCount = await db.plot.count();
  const leadCount = await db.lead.count();
  console.log(`   Projects: ${projectCount}, Plots: ${plotCount}, Leads: ${leadCount}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
