import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from 'lucide-react';

/**
 * Footer
 * 
 * Comprehensive footer with brand info, links, contact, and legal information.
 */
export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when scrolled > 500px
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle link clicks with scroll to top
  const handleLinkClick = () => {
    scrollToTop();
  };

  return (
    <>
      <footer className="bg-neutral-900 text-neutral-300">
        <div className="container py-8 mobile:py-6">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-4 mobile:gap-3 mb-6 mobile:mb-4">
            {/* Column 1 - Brand & Description */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <ShoppingBag className="h-7 w-7 text-primary-500 group-hover:text-primary-400 transition-colors" />
                <span className="font-heading text-xl font-bold text-white">
                  ByteCart
                </span>
              </Link>
              <p className="text-sm text-neutral-400 mb-2 font-semibold">
                Your one-stop shop for premium electronics
              </p>
              <p className="text-sm text-neutral-400 mb-6">
                We curate the best tech products to enhance your digital lifestyle. Quality guaranteed, customer satisfaction assured.
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary-600 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary-600 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary-600 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-primary-600 hover:text-white transition-all duration-200 hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h3 className="text-base mobile:text-sm font-semibold text-white mb-3 mobile:mb-2">Quick Links</h3>
              <nav className="space-y-1 mobile:space-y-1">
                <Link
                  to="/"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
                <Link
                  to="/faq"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  FAQ
                </Link>
                <Link
                  to="/blog"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  Blog
                </Link>
              </nav>
            </div>

            {/* Column 3 - Customer Service */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
              <nav className="space-y-2">
                <Link
                  to="/shipping"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  Shipping & Delivery
                </Link>
                <Link
                  to="/returns"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  Returns & Refunds
                </Link>
                <Link
                  to="/orders"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  Track Your Order
                </Link>
                <Link
                  to="/support"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  Help & Support
                </Link>
                <Link
                  to="/size-guide"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  Size Guide
                </Link>
                <Link
                  to="/payment"
                  className="block text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-200 hover:underline"
                  onClick={handleLinkClick}
                >
                  Payment Methods
                </Link>
              </nav>
            </div>

            {/* Column 4 - Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:khiasu2vis@gmail.com"
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    khiasu2vis@gmail.com
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <a
                    href="tel:+919876543210"
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <address className="text-sm text-neutral-400 not-italic">
                    Chumoukedima<br />
                    PIN: 797115<br />
                    Nagaland, India
                  </address>
                </div>

                {/* Business Hours */}
                <div className="mt-4 pt-4 border-t border-neutral-800">
                  <p className="text-xs font-semibold text-neutral-300 mb-2">Business Hours:</p>
                  <p className="text-xs text-neutral-400">
                    Mon-Fri: 9AM-6PM IST<br />
                    Sat-Sun: 10AM-4PM IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-800 my-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
            {/* Left - Copyright */}
            <div className="text-xs text-neutral-500">
              © 2025 ByteCart. All rights reserved. | Powered by TechieHelp
            </div>

            {/* Center - Payment Info */}
            <div className="flex items-center gap-4 text-neutral-500">
              <span className="text-xs">Secure payments available</span>
            </div>

            {/* Right - Legal Links */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Link
                to="/privacy"
                className="text-neutral-500 hover:text-primary-400 transition-colors"
                onClick={handleLinkClick}
              >
                Privacy Policy
              </Link>
              <span className="text-neutral-600">|</span>
              <Link
                to="/terms"
                className="text-neutral-500 hover:text-primary-400 transition-colors"
                onClick={handleLinkClick}
              >
                Terms of Service
              </Link>
              <span className="text-neutral-600">|</span>
              <Link
                to="/cookies"
                className="text-neutral-500 hover:text-primary-400 transition-colors"
                onClick={handleLinkClick}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
