"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Droplets, PaintBucket, Sparkles } from "lucide-react";

export default function Toolkit() {
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
    // For versioned images: /service-images/v1/toolkit-pressure-washer.jpg
    return basePath.replace("/service-images/", `/service-images/${imageVersion}/`);
  };

  const toolsBase = [
    {
      icon: PaintBucket,
      title: "Premium Paint Systems",
      description: "Top-quality paints and application tools for flawless, long-lasting finishes",
      imagePath: "/service-images/toolkit-paint-systems.jpg",
    },
    {
      icon: Droplets,
      title: "Professional Pressure Washers",
      description: "Adjustable high-grade equipment perfect for any surface type - from delicate siding to tough concrete",
      imagePath: "/service-images/toolkit-pressure-washer.jpg",
    },
    {
      icon: Wrench,
      title: "Specialized Equipment",
      description: "Extension poles, surface cleaners, and specialized nozzles for every job",
      imagePath: "/service-images/toolkit-specialized-equipment.jpg",
    },
    {
      icon: Sparkles,
      title: "Soft Wash Technology",
      description: "Low-pressure cleaning that's tough on dirt but gentle on your property",
      imagePath: "/service-images/toolkit-soft-wash.jpg",
    },
  ];

  // Apply versioned image paths
  const tools = toolsBase.map(tool => ({
    ...tool,
    image: getImagePath(tool.imagePath)
  }));

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent-600 font-semibold text-lg mb-2">OUR TOOLKIT</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            How We Tackle Your{" "}
            <span className="text-primary-600">Toughest Jobs</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cutting-edge tools and products for exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white">
                      {tool.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

