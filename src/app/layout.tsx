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
  title: "BrajProperty.in — Your Spiritual Home in Braj Dham | Premium Plots in Vrindavan, Mathura & Govardhan",
  description:
    "Premium MVDA-approved plotted townships in the sacred land of Vrindavan, Mathura & Govardhan. Gated communities with temple-themed architecture, clear legal titles, and modern amenities. 4 townships, 185+ plots, 22% annual appreciation.",
  keywords: [
    "BrajProperty",
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
  authors: [{ name: "BrajProperty.in" }],
  metadataBase: new URL("https://brajproperty.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BrajProperty.in — Your Spiritual Home in Braj Dham",
    description:
      "Premium MVDA-approved plotted townships in Vrindavan, Mathura & Govardhan. 4 townships, 185+ plots, 22% annual appreciation.",
    siteName: "BrajProperty.in",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/hero-vrindavan.png", width: 1344, height: 768, alt: "Vrindavan at golden dawn" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrajProperty.in",
    description: "Premium plotted townships in sacred Braj Dham.",
    images: ["/images/hero-vrindavan.png"],
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
  name: "BrajProperty.in",
  url: "https://brajproperty.in",
  logo: "https://brajproperty.in/logo.svg",
  description: "Premium MVDA-approved plotted townships in Vrindavan, Mathura & Govardhan.",
  foundingDate: "2024",
  areaServed: ["Vrindavan", "Mathura", "Govardhan", "Braj Dham", "India"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-98370-12345",
    contactType: "sales",
    email: "info@brajproperty.in",
    areaServed: "IN",
    availableLanguage: ["Hindi", "English", "Hinglish"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Braj Dham Heights, Vrindavan",
    addressLocality: "Mathura",
    addressRegion: "Uttar Pradesh",
    postalCode: "281121",
    addressCountry: "IN",
  },
  sameAs: [
    "https://facebook.com/brajproperty",
    "https://instagram.com/brajproperty",
    "https://youtube.com/@brajproperty",
  ],
};

// Schema.org WebSite
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BrajProperty.in",
  url: "https://brajproperty.in",
  description: "Premium plotted townships in sacred Braj Dham",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://brajproperty.in/search?q={search_term_string}",
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
