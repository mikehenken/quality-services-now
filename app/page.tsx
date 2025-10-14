"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Guarantee from "@/components/Guarantee";
import Toolkit from "@/components/Toolkit";
import Reviews from "@/components/Reviews";
import HowItWorks from "@/components/HowItWorks";
import EstimateForm from "@/components/EstimateForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <Guarantee />
      <Toolkit />
      <Reviews />
      <HowItWorks />
      <EstimateForm />
      <Footer />
    </main>
  );
}

