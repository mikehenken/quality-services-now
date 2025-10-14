"use client";

import { motion } from "framer-motion";
import {
  Award,
  Shield,
  Users,
  Sparkles,
  Clock,
  DollarSign,
} from "lucide-react";

export default function WhyUs() {
  const features = [
    {
      icon: Award,
      title: "Industry-Leading Equipment",
      description: "Professional-grade tools and techniques that deliver superior results every time",
    },
    {
      icon: Users,
      title: "Fully Trained Team",
      description: "Experienced professionals committed to excellence and customer satisfaction",
    },
    {
      icon: DollarSign,
      title: "Free Estimates",
      description: "No-risk, transparent pricing so you know exactly what to expect",
    },
    {
      icon: Shield,
      title: "Fully Insured & Licensed",
      description: "Complete peace of mind with comprehensive insurance coverage",
    },
    {
      icon: Sparkles,
      title: "Quality Guaranteed",
      description: "We stand behind our work with a 100% satisfaction guarantee",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "We work around your schedule with convenient appointment times",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-accent-600 font-semibold text-lg mb-2">WHY US</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            What Sets Us <span className="text-primary-600">Apart</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the KD's difference with our commitment to quality and customer service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border-2 border-gray-100 hover:border-primary-300 transition-all duration-300 hover:shadow-xl"
              >
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

