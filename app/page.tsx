"use client";

import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

// Lazy load below-the-fold components
const WhyUs = lazy(() => import("@/components/WhyUs"));
const Guarantee = lazy(() => import("@/components/Guarantee"));
const Toolkit = lazy(() => import("@/components/Toolkit"));
const Reviews = lazy(() => import("@/components/Reviews"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const EstimateForm = lazy(() => import("@/components/EstimateForm"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback component
const LoadingSection = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="animate-pulse text-gray-400">Loading...</div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Suspense fallback={<LoadingSection />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Guarantee />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Toolkit />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Reviews />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <EstimateForm />
      </Suspense>
      <Suspense fallback={<LoadingSection />}>
        <Footer />
      </Suspense>
    </main>
  );
}

