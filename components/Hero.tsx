'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import SapHeroEmblem from './SapHeroEmblem';

export default function Hero() {
  return (
    <section id="home" className="relative pt-6 sm:pt-8 lg:pt-10 pb-12 lg:pb-16 overflow-hidden bg-white dark:bg-neutral-950 hero-pattern border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neutral-200/50 dark:bg-neutral-800/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono tracking-wider uppercase text-black dark:text-neutral-200 mb-6 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse" />
              StudioAdsPro / Digital Engineering Studio
            </motion.div>

            {/* Main Headline */}
            <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-black dark:text-white tracking-tight leading-[1.08] mb-6">
              Software & <span className="text-neutral-800 dark:text-neutral-200 underline decoration-neutral-300 dark:decoration-neutral-700 decoration-2 underline-offset-6">AI Agents</span> That Grow Your Business.
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-xl mb-8 leading-relaxed font-normal">
              One full-stack team for scalable web applications, autonomous AI agents, and mobile products engineered to launch fast with zero agency handoffs.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-md"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#work"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white dark:bg-neutral-900 text-black dark:text-white border border-neutral-300 dark:border-neutral-700 font-semibold text-base hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-black dark:hover:border-white transition-all shadow-2xs"
              >
                <span>View Featured Work</span>
              </motion.a>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-neutral-200 w-full">
              <div>
                <span className="block font-sans text-2xl font-bold text-black">25+</span>
                <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wide">Projects Delivered</span>
              </div>
              <div>
                <span className="block font-sans text-2xl font-bold text-black">20+</span>
                <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wide">Happy Clients</span>
              </div>
              <div>
                <span className="block font-sans text-2xl font-bold text-black">99%</span>
                <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wide">Satisfaction</span>
              </div>
              <div>
                <span className="block font-sans text-2xl font-bold text-black">24/7</span>
                <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wide">Support Coverage</span>
              </div>
            </div>

          </motion.div>

          {/* Right Visual Column — 3D SAP Pedestal Emblem Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full flex items-center justify-center"
          >
            <SapHeroEmblem />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
