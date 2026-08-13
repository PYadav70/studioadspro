'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import NavbarLogo from './NavbarLogo';

export interface NavbarProps {
  activeSection?: string;
  onSelectSection?: (section: any) => void;
}

export default function Navbar({ activeSection = 'all', onSelectSection }: NavbarProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll when navigating to a section hash from another page (e.g., /contact -> /#work)
  useEffect(() => {
    const handleHashScroll = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const id = window.location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '/#services', id: 'services' },
    { name: 'Work', href: '/#work', id: 'work' },
    { name: 'Process', href: '/#process', id: 'process' },
    { name: 'Pricing', href: '/pricing', id: 'pricing' },
    { name: 'FAQ', href: '/#faq', id: 'faq' },
    { name: 'Contact', href: '/contact', id: 'contact' },
  ];

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    setMobileMenuOpen(false);

    if (id === 'contact') {
      e.preventDefault();
      if (typeof window !== 'undefined' && window.location.pathname === '/contact') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/contact');
      }
      return;
    }

    if (id === 'pricing') {
      e.preventDefault();
      if (typeof window !== 'undefined' && window.location.pathname === '/pricing') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/pricing');
      }
      return;
    }

    const element = typeof document !== 'undefined' ? document.getElementById(id) : null;

    if (element) {
      e.preventDefault();
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
      if (onSelectSection) {
        onSelectSection(id);
      }
    } else {
      e.preventDefault();
      router.push(`/#${id}`);
    }
  };

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 transition-all duration-200 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 ${
        scrolled ? 'shadow-2xs dark:shadow-neutral-900/50' : ''
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-18" aria-label="Primary">
        {/* Logo (Includes both Light and Dark theme logos) */}
        <NavbarLogo />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(link.id, e)}
                className={`text-sm font-medium transition-colors relative group py-1 cursor-pointer ${
                  isActive
                    ? 'text-black dark:text-white font-bold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-black dark:bg-white transition-all duration-200 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Desktop CTA & Theme Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            onClick={(e) => handleNavClick('contact', e)}
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
                  onClick={(e) => handleNavClick(link.id, e)}
                  className={`py-3 text-base font-medium transition-colors ${
                    activeSection === link.id
                      ? 'text-black dark:text-white font-bold'
                      : 'text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={(e) => handleNavClick('contact', e)}
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
