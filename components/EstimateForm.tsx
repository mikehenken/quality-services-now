"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, User } from "lucide-react";

export default function EstimateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Web3Forms API (free email service)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",
          subject: "New Estimate Request - KD's Pressure Washing",
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          service: formData.service,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          service: "",
          message: "",
        });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Failed to send message. Please try again or call us directly.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to send message. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="estimate" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
              Request an <span className="text-primary-600">Estimate</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your free, no-obligation quote today. We'll respond within 24 hours!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-600 to-primary-800 p-8 md:p-12 rounded-2xl text-white"
            >
              <h3 className="font-display font-bold text-3xl mb-6">
                Get In Touch
              </h3>
              <p className="text-white/90 mb-8 text-lg">
                Have questions? Ready to schedule? We're here to help! Contact us today for a free consultation.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a
                      href="tel:+12396922083"
                      className="text-white/90 hover:text-white transition-colors text-lg"
                    >
                      (239) 692-2083
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:info@kdspressurewashing.com"
                      className="text-white/90 hover:text-white transition-colors"
                    >
                      info@kdspressurewashing.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Service Areas</h4>
                    <p className="text-white/90">
                      Lehigh Acres, Fort Myers, Naples, Estero, Bonita Springs, Punta Gorda & surrounding SWFL areas
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <h4 className="font-semibold mb-3">Business Hours</h4>
                <div className="space-y-2 text-white/90">
                  <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                  <p>Saturday: 8:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-2xl shadow-xl"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 text-green-700 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600">
                    We've received your request and will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Phone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                          placeholder="(239) 692-2083"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Service Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                        placeholder="123 Main St, Lehigh Acres, FL"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                    >
                      <option value="">Select a service...</option>
                      <option value="pressure-washing">Pressure Washing</option>
                      <option value="house-washing">House Washing</option>
                      <option value="exterior-painting">Exterior Painting</option>
                      <option value="interior-painting">Interior Painting</option>
                      <option value="fence-staining">Fence & Deck Staining</option>
                      <option value="commercial">Commercial Services</option>
                      <option value="other">Other / Multiple Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Project Details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Request Free Estimate</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

