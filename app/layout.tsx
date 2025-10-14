import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KD's Pressure Washing & Services | Lehigh Acres, FL",
  description: "Professional pressure washing, painting, and exterior/interior services in SWFL. Serving Lehigh Acres, Fort Myers, Naples, Estero, Bonita Springs, and Punta Gorda.",
  keywords: "pressure washing, painting services, exterior cleaning, interior services, Lehigh Acres, SWFL, Fort Myers, Naples",
  authors: [{ name: "KD's Pressure Washing" }],
  openGraph: {
    title: "KD's Pressure Washing & Services",
    description: "Professional pressure washing and painting services in Southwest Florida",
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
        <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}

