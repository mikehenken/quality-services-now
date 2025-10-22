import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quality Services Now | Professional Cleaning Services | Fort Myers, FL",
  description: "Professional cleaning services for homes and businesses in Southwest Florida. Serving Fort Myers, Naples, Lehigh Acres, Marco Island, Estero, Bonita Springs, and Punta Gorda.",
  keywords: "cleaning services, house cleaning, office cleaning, commercial cleaning, Fort Myers, SWFL, Naples, Lehigh Acres",
  authors: [{ name: "Quality Services Now" }],
  openGraph: {
    title: "Quality Services Now",
    description: "Professional cleaning services in Southwest Florida",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e40af',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preload" href="/images/hero-cleaning-team.jpg" as="image" type="image/jpeg" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}

