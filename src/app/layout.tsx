import type { Metadata, Viewport } from "next";
import { Anuphan, IBM_Plex_Sans_Thai, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_CONFIG } from "@/data/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { AdminBar } from "@/components/AdminBar";
import "./globals.css";

const ibmThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-thai",
  display: "swap",
});

const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-anuphan",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070609",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: `${SITE_CONFIG.nameTh} (${SITE_CONFIG.nameEn}) — ศูนย์รวมม็อดแปลภาษาไทยคุณภาพสูง`,
    template: `%s | ${SITE_CONFIG.nameTh}`,
  },
  description: SITE_CONFIG.descriptionTh,
  keywords: [
    "MaTaReaL ม็อดไทย",
    "MaTaReaL ModThai",
    "ม็อดภาษาไทย",
    "ม็อดแปลไทย Steam",
    "Venus Vacation PRISM - DEAD OR ALIVE Xtreme ม็อดไทย",
    "Venus Vacation PRISM ม็อดไทย",
    "ดาวน์โหลดม็อดแปลภาษาไทย",
  ],
  authors: [{ name: SITE_CONFIG.authorName, url: SITE_CONFIG.nexusProfileUrl }],
  creator: SITE_CONFIG.authorName,
  publisher: SITE_CONFIG.nameTh,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/brand/favicon-48.png?v=2", sizes: "48x48", type: "image/png" },
      { url: "/brand/icon-192.png?v=2", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png?v=2", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/icon-192.png?v=2",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: SITE_CONFIG.siteUrl,
    siteName: `${SITE_CONFIG.nameTh} (${SITE_CONFIG.nameEn})`,
    title: `${SITE_CONFIG.nameTh} — คลังม็อดภาษาไทย แจกฟรี 100%`,
    description: SITE_CONFIG.descriptionTh,
    images: [
      {
        url: "/brand/og-site.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "MaTaReaL ม็อดไทย — คลังม็อดภาษาไทย แจกฟรี 100%",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.nameTh} (${SITE_CONFIG.nameEn})`,
    description: SITE_CONFIG.descriptionTh,
    images: ["/brand/og-site.jpg?v=3"],
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${ibmThai.variable} ${anuphan.variable} ${jakarta.variable} dark`}
    >
      <body className="min-h-screen flex flex-col text-white selection:bg-[#ff4d8d]/35 selection:text-white">
        <AmbientBackdrop />
        <AdminBar />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
