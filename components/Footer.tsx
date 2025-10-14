"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white font-display font-bold text-2xl px-4 py-2 rounded-lg shadow-md">
                KD's
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Professional pressure washing, painting, and restoration services across Southwest Florida.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-lg hover:bg-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-lg hover:bg-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-lg hover:bg-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Pressure Washing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Exterior Painting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Interior Painting
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  House Washing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Commercial Services
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Fence & Deck Staining
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#estimate" className="hover:text-white transition-colors">
                  Free Estimate
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="tel:+12395551234"
                    className="hover:text-white transition-colors"
                  >
                    (239) 555-1234
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:info@kdspressurewashing.com"
                    className="hover:text-white transition-colors break-all"
                  >
                    info@kdspressurewashing.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Lehigh Acres, FL</p>
                  <p className="text-sm mt-1">
                    Serving all of SWFL
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Areas */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="font-semibold text-center mb-4">Service Areas</h4>
          <p className="text-center text-gray-400">
            Lehigh Acres • Fort Myers • Naples • Estero • Bonita Springs • Punta Gorda • Cape Coral • San Carlos Park • Gateway
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>
            © {currentYear} KD's Pressure Washing & Services. All rights reserved.
          </p>
          <p className="mt-2">
            Licensed & Insured | Serving Southwest Florida with Pride
          </p>
        </div>
      </div>
    </footer>
  );
}

