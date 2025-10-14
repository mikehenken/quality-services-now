"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function Guarantee() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <ShieldCheck className="w-16 h-16 text-white" />
            </div>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-6">
            Our 100% Satisfaction Guarantee
          </h2>
          <p className="text-xl text-white/95 mb-8 leading-relaxed">
            If you are ever dissatisfied with any area of our service, simply let us know{" "}
            <strong>within 48 hours</strong> and we will re-clean or re-paint at no additional
            charge. Your satisfaction is our top priority.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 className="w-6 h-6 text-accent-400" />
              <span className="font-semibold">No Questions Asked</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 className="w-6 h-6 text-accent-400" />
              <span className="font-semibold">Fast Response</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 className="w-6 h-6 text-accent-400" />
              <span className="font-semibold">Quality Assured</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

