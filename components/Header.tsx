"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Gallery", href: "/gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-3"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white font-display font-bold text-2xl md:text-3xl px-4 py-2 rounded-lg shadow-md">
              QSN
            </div>
            <div className="hidden md:block">
              <div className="font-display font-bold text-gray-900 text-lg leading-tight">
                Quality Services Now
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>Fort Myers, FL</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+12396713894"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-semibold">(239) 671-3894</span>
            </a>
            <a
              href="#estimate"
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-md hover:shadow-lg"
            >
              Free Estimate
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="tel:+12396713894"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors py-2"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold">(239) 671-3894</span>
              </a>
              <a
                href="#estimate"
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Free Estimate
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

