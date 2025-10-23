"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Original hardcoded reviews (GMB integration disabled)
  const reviews = [
    {
      name: "Marcus J.",
      location: "Fort Myers, FL",
      rating: 5,
      text: "Quality Services Now did an amazing job cleaning our home. It looks brand new! They were professional, on time, and the pricing was very fair. Highly recommend!",
    },
    {
      name: "Jasmine W.",
      location: "Naples, FL",
      rating: 5,
      text: "We hired Quality Services Now for both residential and commercial cleaning. The transformation is incredible! Our home has never been cleaner. Great attention to detail.",
    },
    {
      name: "DeAndre L.",
      location: "Lehigh Acres, FL",
      rating: 5,
      text: "Best cleaning service I've had in years! They were thorough, careful with our belongings, and cleaned up everything perfectly. The results speak for themselves. Will definitely use them again.",
    },
    {
      name: "Aaliyah T.",
      location: "Bonita Springs, FL",
      rating: 5,
      text: "Professional from start to finish. Free estimate was detailed and accurate. The crew was courteous and did exceptional work on our office building. Very impressed!",
    },
    {
      name: "Carlos M.",
      location: "Estero, FL",
      rating: 5,
      text: "Quality Services Now cleaned our entire house and it looks stunning! They protected all our furniture, cleaned up daily, and finished on schedule. Worth every penny!",
    },
    {
      name: "Tyrone K.",
      location: "Punta Gorda, FL",
      rating: 5,
      text: "Outstanding cleaning service! Removed years of buildup from our home. They also cleaned our entire property - looks amazing. Couldn't be happier with the results.",
    },
  ];

  const averageRating = 4.9;
  const totalReviews = reviews.length;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
            across Southwest Florida
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">
                {averageRating}
              </span>
            </div>
            <p className="text-gray-600">
              Based on {totalReviews} customer reviews
            </p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {reviews[currentIndex].name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {reviews[currentIndex].name}
                      </h3>
                      <div className="flex ml-2">
                        {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{reviews[currentIndex].location}</span>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      "{reviews[currentIndex].text}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevReview}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextReview}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-blue-600"
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