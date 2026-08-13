'use client';

import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import TermsPolicyModal from '@/components/TermsPolicyModal';
import FloatingSocialButtons from '@/components/FloatingSocialButtons';

export default function ContactPage() {
  const marqueeItems = [
    'Engineered To Scale',
    '•',
    'BuilT TO Last',
    '•',
    'Engineered To Scale',
    '•',
    'BuilT TO Last',
    '•',
    'Engineered To Scale',
    '•',
    'BuilT TO Last',
    '•',
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col font-sans transition-colors duration-300">
      <TermsPolicyModal />
      <FloatingSocialButtons />
      <Navbar activeSection="contact" />

      <main className="flex-1">
        {/* ================= CONTACT HERO HEADER ================= */}
        <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
          {/* Blueprint Grid Background Pattern */}
          <div className="blueprint-bg absolute inset-0 opacity-60 dark:opacity-20 pointer-events-none" />

         {/* Left 3D Metallic Graphic - Movable & Floating Animated */}
          <motion.div
            drag
            dragConstraints={{ left: -150, right: 200, top: -120, bottom: 120 }}
            dragElastic={0.2}
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 0, rotate: 0 }}
            animate={{
              y: [-16, 16, -16],
              rotate: [-8, 8, -8],
              scale: [1, 1.05, 1],
            }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="hidden lg:block absolute left-4 xl:left-12 top-1/2 -translate-y-1/2 z-20 cursor-grab active:cursor-grabbing w-48 h-48 xl:w-56 xl:h-56 opacity-90 dark:opacity-80 select-none"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-2xl pointer-events-none">
              <defs>
                <linearGradient id="torusGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#333333" />
                  <stop offset="40%" stopColor="#111111" />
                  <stop offset="80%" stopColor="#050505" />
                  <stop offset="100%" stopColor="#222222" />
                </linearGradient>
                <linearGradient id="torusGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#555555" />
                  <stop offset="50%" stopColor="#1a1a1a" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
                <radialGradient id="specularGlow" cx="30%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Interlocked glossy torus knot rings */}
              <g transform="rotate(-25 100 100)">
                <path
                  d="M 50 100 C 50 60, 150 60, 150 100 C 150 140, 50 140, 50 100 Z"
                  fill="none"
                  stroke="url(#torusGrad1)"
                  strokeWidth="32"
                  strokeLinecap="round"
                />
                <path
                  d="M 100 50 C 140 50, 140 150, 100 150 C 60 150, 60 50, 100 50 Z"
                  fill="none"
                  stroke="url(#torusGrad2)"
                  strokeWidth="28"
                  strokeLinecap="round"
                />
                {/* Specular highlight overlays */}
                <ellipse cx="70" cy="75" rx="30" ry="12" fill="url(#specularGlow)" transform="rotate(-20 70 75)" />
                <ellipse cx="130" cy="120" rx="25" ry="10" fill="url(#specularGlow)" transform="rotate(15 130 120)" />
              </g>
            </svg>
          </motion.div>

          {/* Right 3D Metallic Graphic - Movable & Floating Animated */}
          <motion.div
            drag
            dragConstraints={{ left: -200, right: 150, top: -120, bottom: 120 }}
            dragElastic={0.2}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 0, rotate: 0 }}
            animate={{
              y: [16, -16, 16],
              rotate: [8, -8, 8],
              scale: [1.05, 1, 1.05],
            }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="hidden lg:block absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 z-20 cursor-grab active:cursor-grabbing w-48 h-48 xl:w-56 xl:h-56 opacity-90 dark:opacity-80 select-none"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-2xl pointer-events-none">
              <defs>
                <linearGradient id="blobGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#444444" />
                  <stop offset="50%" stopColor="#151515" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
                <linearGradient id="blobGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2a2a2a" />
                  <stop offset="70%" stopColor="#0a0a0a" />
                  <stop offset="100%" stopColor="#555555" />
                </linearGradient>
              </defs>
              {/* Glossy 3D vertical pebbles / capsule shape */}
              <g transform="rotate(15 100 100)">
                <rect x="70" y="30" width="60" height="110" rx="30" fill="url(#blobGrad1)" />
                <rect x="110" y="80" width="50" height="90" rx="25" fill="url(#blobGrad2)" />
                <circle cx="85" cy="55" r="18" fill="url(#specularGlow)" />
                <circle cx="130" cy="110" r="14" fill="url(#specularGlow)" />
              </g>
            </svg>
          </motion.div>


          {/* Center Heading Content */}
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-extrabold text-black dark:text-white tracking-tight mb-4">
                Contact Us
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-sans">
                We build high-performance web applications, autonomous AI agents, and intuitive mobile products. &amp; Engineered with precision to turn operational bottlenecks into revenue drivers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================= MARQUEE TICKER STRIP ================= */}
        <div className="bg-black text-white dark:bg-white dark:text-black py-3 sm:py-4 overflow-hidden select-none border-y border-black dark:border-white">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-sm sm:text-base md:text-lg font-bold font-sans tracking-wide">
            {marqueeItems.concat(marqueeItems).concat(marqueeItems).concat(marqueeItems).map((item, idx) => (
              <span key={idx} className="flex items-center gap-8">
                <span className={item === '•' ? 'text-neutral-500' : ''}>{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ================= CONTACT FORM & DETAILS SECTION ================= */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
