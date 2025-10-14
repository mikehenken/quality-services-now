"use client";

import { motion } from "framer-motion";
import { Calendar, ClipboardCheck, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Calendar,
      number: "01",
      title: "Schedule Your Free Estimate",
      description:
        "Contact us and we'll visit your property to assess the work and provide a detailed, no-obligation quote.",
    },
    {
      icon: ClipboardCheck,
      number: "02",
      title: "Book Your Service",
      description:
        "Choose a convenient time that works for you. We'll arrive on schedule, fully equipped and ready to work.",
    },
    {
      icon: Sparkles,
      number: "03",
      title: "Enjoy the Results",
      description:
        "We'll complete a thorough walk-through with you to ensure everything meets our high standards and your expectations.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent-600 font-semibold text-lg mb-2">GET STARTED</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            How It <span className="text-primary-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your property
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative h-full"
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-primary-200 -z-10" />
                  )}

                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 relative h-full flex flex-col">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-accent-500 to-accent-600 text-white font-display font-bold text-2xl w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-md">
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="#estimate"
              className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl"
            >
              Request Your Free Estimate
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

