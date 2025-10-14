"use client";

import { useState } from "react";
import { Search, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [zipCode, setZipCode] = useState("");

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search for service availability
    if (zipCode) {
      alert(`Great! We serve the ${zipCode} area. Scroll down to request your free estimate!`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-600/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Transform Your Property's{" "}
              <span className="text-accent-400">Appearance</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto">
              Professional pressure washing, painting, and restoration services for homes and businesses across SWFL
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Check If We Serve Your Area
            </h2>
            <form onSubmit={handleZipSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none text-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Check Availability</span>
              </button>
            </form>
            <p className="text-sm text-gray-600 mt-4">
              Serving: Lehigh Acres • Fort Myers • Naples • Estero • Bonita Springs • Punta Gorda
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#estimate"
              className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-600 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Get Free Estimate
            </a>
            <a
              href="tel:+12395551234"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 justify-center w-full sm:w-auto"
            >
              <Phone className="w-5 h-5" />
              <span>(239) 555-1234</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

