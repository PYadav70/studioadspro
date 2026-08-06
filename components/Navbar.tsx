'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 transition-all duration-200 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 ${
        scrolled ? 'shadow-2xs dark:shadow-neutral-900/50' : ''
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-18" aria-label="Primary">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group select-none">
          <motion.div
            whileHover={{ scale: 1.06, rotate: 3 }}
            whileTap={{ scale: 0.94 }}
            className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-900 via-black to-neutral-800 dark:from-white dark:via-neutral-100 dark:to-neutral-200 text-white dark:text-black flex items-center justify-center shadow-md shadow-black/10 dark:shadow-white/10 border border-neutral-800 dark:border-neutral-200 overflow-hidden"
          >
            {/* Subtle Metallic/Glow Overlay */}
            <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 dark:via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Premium Custom SVG Emblem (Fusion of S, A, and Growth Arrow) */}
            <svg
              className="w-5 h-5 text-white dark:text-black transform group-hover:scale-110 transition-transform duration-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Outer Hex/Diamond Structure */}
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            
            {/* Glowing Corner Dot */}
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-600 animate-pulse" />
          </motion.div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-['Space_Grotesk'] font-bold text-xl sm:text-2xl tracking-tight text-black dark:text-white leading-none">
                Studio<span className="font-black bg-gradient-to-r from-neutral-900 via-neutral-700 to-black dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">AdsPro</span>
              </span>
              <span className="px-1.5 py-0.5 rounded-md font-mono text-[9px] font-extrabold uppercase tracking-widest bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 leading-none">
                AGENCY
              </span>
            </div>
            <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 tracking-wider uppercase font-medium">
              Digital Marketing &amp; Dev
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA & Theme Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-xs"
          >
            <span>Book Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* Mobile Toggle and Theme Switcher */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white focus:outline-hidden cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-base font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-base font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all text-center shadow-md"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

