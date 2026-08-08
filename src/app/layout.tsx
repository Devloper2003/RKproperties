import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-devanagari",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RK Properties — Your Spiritual Home in Braj Dham | Premium Plots in Vrindavan, Mathura & Govardhan",
  description:
    "Premium MVDA-approved plotted townships in the sacred land of Vrindavan, Mathura & Govardhan. Gated communities with temple-themed architecture, clear legal titles, and modern amenities. 4 townships, 185+ plots, 22% annual appreciation.",
  keywords: [
    "RK Properties",
    "plot in Vrindavan",
    "property in Mathura",
    "Govardhan plot",
    "Bankey Bihari",
    "Braj Dham real estate",
    "MVDA approved plots",
    "premium township",
    "NRI investment Vrindavan",
    "ISKCON property",
    "Banke Bihari temple plot",
    "spiritual real estate India",
  ],
  authors: [{ name: "RK Properties" }],
  metadataBase: new URL("https://rkproperties.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RK Properties — Your Spiritual Home in Braj Dham",
    description:
      "Premium MVDA-approved plotted townships in Vrindavan, Mathura & Govardhan. 4 townships, 185+ plots, 22% annual appreciation.",
    siteName: "RK Properties",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/hero-vrindavan.png", width: 1344, height: 768, alt: "Vrindavan at golden dawn" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "RK Properties",
    description: "Premium plotted townships in sacred Braj Dham.",
    images: ["/images/hero-vrindavan.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "real estate",
};

// Schema.org structured data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RK Properties",
  url: "https://rkproperties.in",
  logo: "https://rkproperties.in/logo.svg",
  description: "Premium MVDA-approved plotted townships in Vrindavan, Mathura & Govardhan.",
  foundingDate: "2024",
  areaServed: ["Vrindavan", "Mathura", "Govardhan", "Braj Dham", "India"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-89239-44689",
    contactType: "sales",
    email: "shailendrrachaudhary@gmail.com",
    areaServed: "IN",
    availableLanguage: ["Hindi", "English", "Hinglish"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "In front of Kailash Nagar Road, Near ATTLA CHUNGI, Vatsalya Gram",
    addressLocality: "Mathura",
    addressRegion: "Uttar Pradesh",
    postalCode: "281121",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61580589940876",
    "https://instagram.com/rkproperties_official1/",
    "https://youtube.com/@rkproperties",
  ],
};

// Schema.org WebSite
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RK Properties",
  url: "https://rkproperties.in",
  description: "Premium plotted townships in sacred Braj Dham",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://rkproperties.in/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${notoSerifSC.variable} antialiased bg-cream text-foreground`}
      >
        <Providers>{children}</Providers>
        <Toaster />
        <SonnerToaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--popover)",
              color: "var(--popover-foreground)",
              border: "1px solid rgba(197,162,62,0.35)",
            },
          }}
        />
      </body>
    </html>
  );
}
