import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KD's Pressure Washing & Services | Lehigh Acres, FL",
  description: "Professional pressure washing, painting, and exterior/interior services in SWFL. Serving Lehigh Acres, Fort Myers, Naples, Estero, Bonita Springs, and Punta Gorda.",
  keywords: "pressure washing, painting services, exterior cleaning, interior services, Lehigh Acres, SWFL, Fort Myers, Naples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}

