"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Home,
  Building2,
  Shield,
  Clock,
  Users,
  Trash2,
  Zap,
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
      icon: Home,
      title: "House Cleaning",
      description: "Complete home cleaning services including kitchens, bathrooms, living areas, and bedrooms",
      imagePath: "/cleaning-images/cleaning-house-cleaning.jpg",
    },
    {
      icon: Sparkles,
      title: "Deep Cleaning",
      description: "Thorough deep cleaning for move-ins, move-outs, or seasonal cleaning needs",
      imagePath: "/cleaning-images/cleaning-deep-cleaning.jpg",
    },
    {
      icon: Shield,
      title: "Window Cleaning",
      description: "Professional window cleaning for crystal-clear views and spotless glass",
      imagePath: "/cleaning-images/cleaning-window-cleaning.jpg",
    },
    {
      icon: Clock,
      title: "Carpet Cleaning",
      description: "Deep carpet and upholstery cleaning to remove dirt, stains, and allergens",
      imagePath: "/cleaning-images/cleaning-carpet-cleaning.jpg",
    },
    {
      icon: Trash2,
      title: "Post-Construction",
      description: "Specialized cleaning after renovations, construction, or remodeling projects",
      imagePath: "/cleaning-images/cleaning-post-construction.jpg",
    },
    {
      icon: Zap,
      title: "Move-In/Out",
      description: "Comprehensive cleaning for new homes or preparing your old home for sale",
      imagePath: "/cleaning-images/cleaning-move-in-out.jpg",
    },
  ];

  const commercialServicesBase = [
    {
      icon: Building2,
      title: "Office Cleaning",
      description: "Professional office cleaning services to maintain a clean, productive workspace",
      imagePath: "/cleaning-images/cleaning-office-cleaning.jpg",
    },
    {
      icon: Users,
      title: "Retail Cleaning",
      description: "Store and retail space cleaning to keep your business looking its best",
      imagePath: "/cleaning-images/cleaning-retail-cleaning.jpg",
    },
    {
      icon: Shield,
      title: "Medical Facility",
      description: "Specialized cleaning for medical offices, clinics, and healthcare facilities",
      imagePath: "/cleaning-images/cleaning-medical-cleaning.jpg",
    },
    {
      icon: Clock,
      title: "Restaurant Cleaning",
      description: "Deep cleaning services for restaurants, kitchens, and food service areas",
      imagePath: "/cleaning-images/cleaning-restaurant-cleaning.jpg",
    },
    {
      icon: Sparkles,
      title: "Warehouse Cleaning",
      description: "Industrial warehouse and facility cleaning for large commercial spaces",
      imagePath: "/cleaning-images/cleaning-warehouse-cleaning.jpg",
    },
    {
      icon: Zap,
      title: "School Cleaning",
      description: "Educational facility cleaning for schools, universities, and learning centers",
      imagePath: "/cleaning-images/cleaning-school-cleaning.jpg",
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
            Our <span className="text-primary-600">Cleaning Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional cleaning services for homes and businesses across Southwest Florida
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

