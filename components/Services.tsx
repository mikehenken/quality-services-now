"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  PaintBucket,
  Home,
  Building2,
  Sparkles,
  Fence,
  TreePine,
  Warehouse,
} from "lucide-react";

export default function Services() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");

  const residentialServices = [
    {
      icon: Droplets,
      title: "Pressure Washing",
      description: "Deep clean driveways, patios, decks, and siding with professional-grade equipment",
      image: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=600&q=80",
    },
    {
      icon: Home,
      title: "House Washing",
      description: "Gentle soft-wash system that protects your siding while removing dirt and mildew",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    },
    {
      icon: PaintBucket,
      title: "Exterior Painting",
      description: "Transform your home's curb appeal with professional painting services",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80",
    },
    {
      icon: Sparkles,
      title: "Interior Painting",
      description: "Refresh any room with expert interior painting and finishing",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80",
    },
    {
      icon: Fence,
      title: "Fence & Deck Staining",
      description: "Protect and beautify your outdoor wood surfaces with quality stains",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
    },
    {
      icon: TreePine,
      title: "Concrete Cleaning",
      description: "Remove stubborn stains and restore your concrete surfaces to like-new condition",
      image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80",
    },
  ];

  const commercialServices = [
    {
      icon: Building2,
      title: "Building Washing",
      description: "Keep your commercial property looking professional and inviting",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    },
    {
      icon: Warehouse,
      title: "Warehouse Cleaning",
      description: "Industrial-grade cleaning for warehouses and large facilities",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80",
    },
    {
      icon: Droplets,
      title: "Parking Lot Cleaning",
      description: "Pressure wash parking lots, walkways, and entry areas",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&q=80",
    },
    {
      icon: PaintBucket,
      title: "Commercial Painting",
      description: "Professional painting services for offices, retail spaces, and more",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    },
    {
      icon: Sparkles,
      title: "Storefront Restoration",
      description: "Revitalize your storefront to attract more customers",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80",
    },
    {
      icon: Home,
      title: "HOA Services",
      description: "Comprehensive cleaning and maintenance for HOA communities",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    },
  ];

  const services = activeTab === "residential" ? residentialServices : commercialServices;

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            What <span className="text-primary-600">We Clean</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive cleaning and restoration services for every need
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl shadow-md p-2 inline-flex">
            <button
              onClick={() => setActiveTab("residential")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "residential"
                  ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === "commercial"
                  ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Commercial
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#estimate"
            className="inline-block bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-accent-600 hover:to-accent-700 transition-all shadow-lg hover:shadow-xl"
          >
            View All Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}

