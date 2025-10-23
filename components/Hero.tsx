"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Phone, Star, Building2, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// GMB integration disabled

interface AreaData {
  name: string;
  clients: string;
  properties: string;
  reviews: {
    name: string;
    rating: number;
    text: string;
    type: "residential" | "commercial";
    image: string;
  }[];
}

const areaData: Record<string, AreaData> = {
  "lehigh": {
    name: "Lehigh Acres",
    clients: "890+",
    properties: "1,230+",
    reviews: [
      {
        name: "DeAndre L.",
        rating: 5,
        text: "Best cleaning service I've had in years! They were thorough, careful with our belongings, and cleaned up everything perfectly. The results speak for themselves.",
        type: "residential",
        image: "/review-photos/lehigh-deandre.webp"
      },
      {
        name: "Maria R.",
        rating: 5,
        text: "Our home looks brand new! Professional crew, fair pricing, and amazing results. Highly recommend Quality Services Now to anyone in Lehigh Acres!",
        type: "residential",
        image: "/review-photos/lehigh-maria.webp"
      }
    ]
  },
  "fort myers": {
    name: "Fort Myers",
    clients: "1,240+",
    properties: "1,850+",
    reviews: [
      {
        name: "Marcus J.",
        rating: 5,
        text: "Quality Services Now did an amazing job cleaning our home. It looks brand new! They were professional, on time, and the pricing was very fair.",
        type: "residential",
        image: "/review-photos/fort-myers-marcus.webp"
      },
      {
        name: "Linda K.",
        rating: 5,
        text: "Transformed our office building! The team was incredibly professional and the results exceeded our expectations. Worth every penny!",
        type: "commercial",
        image: "/review-photos/fort-myers-linda.webp"
      },
      {
        name: "Robert T.",
        rating: 5,
        text: "Outstanding work on our home. Years of buildup completely removed. They were careful, efficient, and the price was reasonable.",
        type: "residential",
        image: "/review-photos/fort-myers-robert.webp"
      }
    ]
  },
  "naples": {
    name: "Naples",
    clients: "1,580+",
    properties: "2,120+",
    reviews: [
      {
        name: "Jasmine W.",
        rating: 5,
        text: "We hired Quality Services Now for both residential and commercial cleaning. The transformation is incredible! Our home has never been cleaner.",
        type: "residential",
        image: "/review-photos/naples-jasmine.webp"
      },
      {
        name: "Patricia M.",
        rating: 5,
        text: "Exceptional service from start to finish. Our luxury home needed detailed work and they delivered perfection. Highly professional team!",
        type: "residential",
        image: "/review-photos/naples-patricia.webp"
      }
    ]
  },
  "estero": {
    name: "Estero",
    clients: "670+",
    properties: "920+",
    reviews: [
      {
        name: "Carlos M.",
        rating: 5,
        text: "Quality Services Now cleaned our entire house and it looks stunning! They protected all our furniture, cleaned up daily, and finished on schedule.",
        type: "residential",
        image: "/review-photos/estero-carlos.webp"
      },
      {
        name: "Jennifer S.",
        rating: 5,
        text: "Our shopping plaza looks amazing after their cleaning service. Professional, reliable, and great communication throughout the project!",
        type: "commercial",
        image: "/review-photos/estero-jennifer.webp"
      }
    ]
  },
  "bonita springs": {
    name: "Bonita Springs",
    clients: "820+",
    properties: "1,150+",
    reviews: [
      {
        name: "Aaliyah T.",
        rating: 5,
        text: "Professional from start to finish. Free estimate was detailed and accurate. The crew was courteous and did exceptional work on our commercial building.",
        type: "commercial",
        image: "/review-photos/bonita-springs-aaliyah.webp"
      },
      {
        name: "Michael B.",
        rating: 5,
        text: "Amazing transformation of our home! The team was meticulous and the results are outstanding. Best decision we made this year!",
        type: "residential",
        image: "/review-photos/bonita-springs-michael.webp"
      }
    ]
  },
  "punta gorda": {
    name: "Punta Gorda",
    clients: "510+",
    properties: "740+",
    reviews: [
      {
        name: "Tyrone K.",
        rating: 5,
        text: "Outstanding cleaning service! Removed years of buildup from our home. They also cleaned our entire property - looks amazing.",
        type: "residential",
        image: "/review-photos/punta-gorda-tyrone.webp"
      },
      {
        name: "Susan L.",
        rating: 5,
        text: "Our waterfront property looks pristine! The team was respectful, efficient, and delivered results beyond our expectations. Highly recommend!",
        type: "residential",
        image: "/review-photos/punta-gorda-susan.webp"
      }
    ]
  }
};

export default function Hero() {
  const [zipCode, setZipCode] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // GMB integration disabled - using original area data

  const detectArea = (input: string): string | null => {
    const lowerInput = input.toLowerCase().trim();
    
    // ZIP code mappings
    const zipMappings: Record<string, string> = {
      "33936": "lehigh",
      "33971": "lehigh",
      "33972": "lehigh",
      "33973": "lehigh",
      "33974": "lehigh",
      "33916": "fort myers",
      "33901": "fort myers",
      "33907": "fort myers",
      "33912": "fort myers",
      "33913": "fort myers",
      "33919": "fort myers",
      "34102": "naples",
      "34103": "naples",
      "34104": "naples",
      "34105": "naples",
      "34108": "naples",
      "34109": "naples",
      "34110": "naples",
      "34119": "naples",
      "34120": "naples",
      "33928": "estero",
      "33929": "bonita springs",
      "34134": "bonita springs",
      "33950": "punta gorda",
      "33948": "punta gorda",
      "33955": "punta gorda"
    };
    
    // Check if it's a ZIP code
    if (zipMappings[lowerInput]) {
      return zipMappings[lowerInput];
    }
    
    // Check if it contains an area name
    const areas = ["lehigh", "fort myers", "naples", "estero", "bonita springs", "punta gorda"];
    for (const area of areas) {
      if (lowerInput.includes(area)) {
        return area;
      }
    }
    
    return null;
  };

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode) {
      const area = detectArea(zipCode);
      setSelectedArea(area);
    }
  };

  // Scroll to container when area is selected
  useEffect(() => {
    if (selectedArea && containerRef.current) {
      // Small delay to allow animation to start
      setTimeout(() => {
        const element = containerRef.current;
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 100; // 100px space from edge (accounts for header + spacing)
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [selectedArea]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/hero-cleaning-team.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-600/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-8 pb-16 md:pt-6 md:pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Professional Cleaning{" "}
              <span className="text-accent-400">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto">
              Quality cleaning services for homes and businesses across Southwest Florida - Fort Myers, Naples, Lehigh Acres, and more
            </p>
          </motion.div>

          <motion.div
            ref={containerRef}
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
              Serving: Fort Myers • Naples • Lehigh Acres • Marco Island • Estero • Bonita Springs • Punta Gorda
            </p>
            
            {/* Area Details Slide-In */}
            <AnimatePresence>
              {selectedArea && areaData[selectedArea] && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t-2 border-gray-200 pt-6">
                    {/* Stats Section */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-primary-700">
                          {areaData[selectedArea].clients}
                        </p>
                        <p className="text-sm text-gray-600 font-medium mt-1">Clients Served</p>
                      </div>
                      <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-accent-700">
                          {areaData[selectedArea].properties}
                        </p>
                        <p className="text-sm text-gray-600 font-medium mt-1">Properties Cleaned</p>
                      </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-3">
                        Recent Reviews in {areaData[selectedArea].name}
                      </h3>
                      {areaData[selectedArea].reviews.map((review, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex gap-4">
                            {/* Property Image */}
                            <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                              <img
                                src={review.image}
                                alt={`${review.type} property`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            
                            {/* Review Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="font-semibold text-gray-900">{review.name}</p>
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                      review.type === "commercial" 
                                        ? "bg-blue-100 text-blue-700" 
                                        : "bg-green-100 text-green-700"
                                    }`}>
                                      {review.type === "commercial" ? (
                                        <><Building2 className="w-3 h-3" /> Commercial</>
                                      ) : (
                                        <><Home className="w-3 h-3" /> Residential</>
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex gap-0.5 mb-2">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star key={i} className="w-4 h-4 fill-accent-500 text-accent-500" />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-700 line-clamp-3">{review.text}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                      <p className="text-sm text-gray-600 mb-3">
                        ✅ Great! We serve {areaData[selectedArea].name}
                      </p>
                      <a
                        href="#estimate"
                        className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg"
                      >
                        Request Your Free Estimate
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
              {selectedArea && !areaData[selectedArea] && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t-2 border-gray-200 pt-6 text-center">
                    <p className="text-gray-700 mb-4">
                      We're expanding our services! While we may not have detailed information for your area yet, we'd love to discuss serving you.
                    </p>
                    <a
                      href="#estimate"
                      className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg"
                    >
                      Contact Us Anyway
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
              href="tel:+12396713894"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 justify-center w-full sm:w-auto"
            >
              <Phone className="w-5 h-5" />
              <span>(239) 671-3894</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
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

