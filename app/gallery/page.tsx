"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, MapPin, Star } from "lucide-react";
import Link from "next/link";

export default function Gallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Sample gallery images - in a real implementation, these would be fetched from Google My Business API
  const sampleImages = [
    {
      id: 1,
      url: "/gallery/cleaning-1.jpg",
      title: "Residential Kitchen Cleaning",
      description: "Spotless kitchen after our deep cleaning service",
      location: "Fort Myers, FL",
      rating: 5,
      date: "2024-01-15"
    },
    {
      id: 2,
      url: "/gallery/cleaning-2.jpg", 
      title: "Office Space Cleaning",
      description: "Professional office cleaning for corporate clients",
      location: "Naples, FL",
      rating: 5,
      date: "2024-01-12"
    },
    {
      id: 3,
      url: "/gallery/cleaning-3.jpg",
      title: "Bathroom Deep Clean",
      description: "Complete bathroom sanitization and cleaning",
      location: "Fort Myers, FL", 
      rating: 5,
      date: "2024-01-10"
    },
    {
      id: 4,
      url: "/gallery/cleaning-4.jpg",
      title: "Living Room Cleaning",
      description: "Fresh and clean living space",
      location: "Lehigh Acres, FL",
      rating: 5,
      date: "2024-01-08"
    },
    {
      id: 5,
      url: "/gallery/cleaning-5.jpg",
      title: "Commercial Building",
      description: "Large-scale commercial cleaning project",
      location: "Bonita Springs, FL",
      rating: 5,
      date: "2024-01-05"
    },
    {
      id: 6,
      url: "/gallery/cleaning-6.jpg",
      title: "Post-Construction Cleanup",
      description: "Specialized cleaning after renovation work",
      location: "Estero, FL",
      rating: 5,
      date: "2024-01-03"
    },
    {
      id: 7,
      url: "/gallery/cleaning-7.jpg",
      title: "Restaurant Kitchen",
      description: "Deep cleaning for food service establishment",
      location: "Marco Island, FL",
      rating: 5,
      date: "2024-01-01"
    },
    {
      id: 8,
      url: "/gallery/cleaning-8.jpg",
      title: "Medical Office Cleaning",
      description: "Sanitized medical facility cleaning",
      location: "Punta Gorda, FL",
      rating: 5,
      date: "2023-12-28"
    }
  ];

  useEffect(() => {
    // Simulate loading from Google My Business API
    const loadImages = async () => {
      setLoading(true);
      // In a real implementation, you would fetch from Google My Business API here
      // const response = await fetch('/api/google-business-photos');
      // const data = await response.json();
      
      // For now, use sample data
      setTimeout(() => {
        setImages(sampleImages);
        setLoading(false);
      }, 1000);
    };

    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-2xl font-bold text-gray-900">Our Work Gallery</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            See Our <span className="text-primary-600">Quality Work</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our recent cleaning projects and see the difference our professional team makes
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300" />
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2" />
                  <div className="h-3 bg-gray-300 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {image.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{image.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Google My Business Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-2">See More Photos</h3>
            <p className="text-sm text-gray-600 mb-4">
              Visit our Google My Business profile to see all our customer photos and reviews
            </p>
            <a
              href="https://maps.app.goo.gl/cJLTtagj1CkxGC5D7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View on Google
            </a>
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="relative">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {selectedImage.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedImage.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{selectedImage.rating}/5</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
