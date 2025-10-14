"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: "Marcus J.",
      location: "Fort Myers, FL",
      rating: 5,
      text: "KD's team did an amazing job pressure washing our driveway and house. It looks brand new! They were professional, on time, and the pricing was very fair. Highly recommend!",
    },
    {
      name: "Jasmine W.",
      location: "Naples, FL",
      rating: 5,
      text: "We hired KD's for both exterior painting and pressure washing. The transformation is incredible! Our home's curb appeal has never been better. Great attention to detail.",
    },
    {
      name: "DeAndre L.",
      location: "Lehigh Acres, FL",
      rating: 5,
      text: "Best service I've had in years! They were thorough, careful with our landscaping, and cleaned up everything perfectly. The results speak for themselves. Will definitely use them again.",
    },
    {
      name: "Aaliyah T.",
      location: "Bonita Springs, FL",
      rating: 5,
      text: "Professional from start to finish. Free estimate was detailed and accurate. The crew was courteous and did exceptional work on our commercial building. Very impressed!",
    },
    {
      name: "Carlos M.",
      location: "Estero, FL",
      rating: 5,
      text: "KD's painted our entire house interior and it looks stunning! They protected all our furniture, cleaned up daily, and finished on schedule. Worth every penny!",
    },
    {
      name: "Tyrone K.",
      location: "Punta Gorda, FL",
      rating: 5,
      text: "Outstanding pressure washing service! Removed years of buildup from our patio and pool deck. They also cleaned our roof - looks amazing. Couldn't be happier with the results.",
    },
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent-600 font-semibold text-lg mb-2">OUR REVIEWS</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Don't Take Our <span className="text-primary-600">Word for It</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent-500 text-accent-500" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">4.9</span>
            <span className="text-gray-600">({reviews.length}+ reviews)</span>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Review Cards */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-8 md:p-12 rounded-2xl shadow-xl border-2 border-gray-100"
                >
                  <div className="flex mb-4">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 fill-accent-500 text-accent-500"
                      />
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                    "{reviews[currentIndex].text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                      {reviews[currentIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {reviews[currentIndex].name}
                      </h4>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {reviews[currentIndex].location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevReview}
                className="bg-white border-2 border-gray-200 text-gray-700 p-3 rounded-full hover:border-primary-500 hover:text-primary-600 transition-all shadow-md hover:shadow-lg"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextReview}
                className="bg-white border-2 border-gray-200 text-gray-700 p-3 rounded-full hover:border-primary-500 hover:text-primary-600 transition-all shadow-md hover:shadow-lg"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

