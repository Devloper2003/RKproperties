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
  title: "BrajProperty.in — Your Spiritual Home in Braj Dham",
  description:
    "Premium MVDA-approved plotted townships in the sacred land of Vrindavan, Mathura & Govardhan. Gated communities with temple-themed architecture, clear legal titles, and modern amenities.",
  keywords: [
    "BrajProperty",
    "plot in Vrindavan",
    "property in Mathura",
    "Govardhan plot",
    "Bankey Bihari",
    "Braj Dham real estate",
    "MVDA approved plots",
    "premium township",
  ],
  authors: [{ name: "BrajProperty.in" }],
  openGraph: {
    title: "BrajProperty.in — Your Spiritual Home in Braj Dham",
    description:
      "Premium MVDA-approved plotted townships in Vrindavan, Mathura & Govardhan.",
    siteName: "BrajProperty.in",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrajProperty.in",
    description: "Premium plotted townships in sacred Braj Dham.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
