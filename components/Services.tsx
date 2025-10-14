"use client";

import { useState, useEffect } from "react";
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
  const [imageVersion, setImageVersion] = useState("current");

  // Get image version from URL parameter (?images=v1 or ?images=v2)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const version = params.get("images") || "current";
      setImageVersion(version);
    }
  }, []);

  // Helper to get versioned image path
  const getImagePath = (basePath: string) => {
    if (imageVersion === "current") {
      return basePath;
    }
    // For versioned images: /service-images/v1/service-pressure-washing.jpg
    return basePath.replace("/service-images/", `/service-images/${imageVersion}/`);
  };

  const residentialServicesBase = [
    {
      icon: PaintBucket,
      title: "Exterior Painting",
      description: "Transform your home's curb appeal with professional painting services",
      imagePath: "/service-images/service-exterior-painting.jpg",
    },
    {
      icon: TreePine,
      title: "Concrete Cleaning",
      description: "Remove stubborn stains and restore your concrete surfaces to like-new condition",
      imagePath: "/service-images/service-concrete-cleaning.jpg",
    },
    {
      icon: Droplets,
      title: "Pressure Washing",
      description: "Deep clean driveways, patios, decks, and siding with professional-grade equipment",
      imagePath: "/service-images/service-pressure-washing.jpg",
    },
    {
      icon: Sparkles,
      title: "Interior Painting",
      description: "Refresh any room with expert interior painting and finishing",
      imagePath: "/service-images/service-interior-painting.jpg",
    },
    {
      icon: Home,
      title: "House Washing",
      description: "Gentle soft-wash system that protects your siding while removing dirt and mildew",
      imagePath: "/service-images/service-house-washing.jpg",
    },
    {
      icon: Fence,
      title: "Fence & Deck Staining",
      description: "Protect and beautify your outdoor wood surfaces with quality stains",
      imagePath: "/service-images/service-fence-deck-staining.jpg",
    },
  ];

  const commercialServicesBase = [
    {
      icon: Building2,
      title: "Building Washing",
      description: "Keep your commercial property looking professional and inviting",
      imagePath: "/service-images/service-building-washing.jpg",
    },
    {
      icon: Warehouse,
      title: "Warehouse Cleaning",
      description: "Industrial-grade cleaning for warehouses and large facilities",
      imagePath: "/service-images/service-warehouse-cleaning.jpg",
    },
    {
      icon: Droplets,
      title: "Parking Lot Cleaning",
      description: "Pressure wash parking lots, walkways, and entry areas",
      imagePath: "/service-images/service-parking-lot.jpg",
    },
    {
      icon: PaintBucket,
      title: "Commercial Painting",
      description: "Professional painting services for offices, retail spaces, and more",
      imagePath: "/service-images/service-commercial-painting.jpg",
    },
    {
      icon: Sparkles,
      title: "Storefront Restoration",
      description: "Revitalize your storefront to attract more customers",
      imagePath: "/service-images/service-storefront.jpg",
    },
    {
      icon: Home,
      title: "HOA Services",
      description: "Comprehensive cleaning and maintenance for HOA communities",
      imagePath: "/service-images/service-hoa.jpg",
    },
  ];

  // Apply versioned image paths
  const residentialServices = residentialServicesBase.map(service => ({
    ...service,
    image: getImagePath(service.imagePath)
  }));

  const commercialServices = commercialServicesBase.map(service => ({
    ...service,
    image: getImagePath(service.imagePath)
  }));

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
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
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

