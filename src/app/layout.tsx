import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS_NAME, PHONE, SITE_URL } from "@/lib/constants";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BUSINESS_NAME} — Expert Plumbing Services in Denver, CO`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description:
    "CatPlumber offers professional plumbing services in Denver, CO and surrounding areas. Licensed & insured. Same-day service. Call (720) 717-3990 for a free quote.",
  keywords: [
    "plumber Denver",
    "plumbing services Denver CO",
    "emergency plumber",
    "drain cleaning",
    "water heater repair",
    "leak repair Denver",
    "licensed plumber Colorado",
  ],
  authors: [{ name: BUSINESS_NAME }],
  creator: BUSINESS_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    title: `${BUSINESS_NAME} — Expert Plumbing Services in Denver, CO`,
    description:
      "Professional plumbing services in Denver and surrounding areas. Licensed & insured. Same-day service available.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} — Denver Plumbing Services`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_NAME} — Expert Plumbing Services in Denver, CO`,
    description:
      "Professional plumbing services in Denver. Licensed & insured. Same-day service.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "format-detection": `telephone=${PHONE}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#2D3436] font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
