'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ArrowRight, Check, ShieldCheck, Zap, Layers, Sparkles, HelpCircle } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TermsPolicyModal from '@/components/TermsPolicyModal';
import FloatingSocialButtons from '@/components/FloatingSocialButtons';

export default function PricingPage() {
  const [calculatorOpen, setCalculatorOpen] = useState(true);
  const [selectedWeb, setSelectedWeb] = useState<number | null>(1); // Standard default
  const [selectedApp, setSelectedApp] = useState<number | null>(null);
  const [selectedAds, setSelectedAds] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const webPrices = [7999, 14999, 24999];
  const appPrices = [24999, 39999, 64999];
  const adsPrices = [7999, 13999, 19999];
  const videoPrices = [9999, 24999, 59999];

  const calculateTotal = () => {
    let total = 0;
    if (selectedWeb !== null) total += webPrices[selectedWeb];
    if (selectedApp !== null) total += appPrices[selectedApp];
    if (selectedAds !== null) total += adsPrices[selectedAds];
    if (selectedVideo !== null) total += videoPrices[selectedVideo];

    const activeCount = [selectedWeb, selectedApp, selectedAds, selectedVideo].filter((s) => s !== null).length;
    let discount = 0;
    if (activeCount >= 3) discount = 0.15;
    else if (activeCount === 2) discount = 0.10;

    const final = total * (1 - discount);
    return { rawTotal: total, discountPercent: discount * 100, finalTotal: Math.round(final) };
  };

  const { discountPercent, finalTotal } = calculateTotal();

  const marqueeItems = [
    'Itemized Rate Card',
    '•',
    'Guaranteed Deliverables',
    '•',
    'Transparent Pricing',
    '•',
    'Zero Hidden Fees',
    '•',
    'Custom Package Estimator',
    '•',
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col font-sans transition-colors duration-300">
      <TermsPolicyModal />
      <FloatingSocialButtons />
      <Navbar activeSection="pricing" />

      <main className="flex-1">
        {/* ================= HERO HEADER ================= */}
        <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
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
                <linearGradient id="p-torus1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#333333" />
                  <stop offset="40%" stopColor="#111111" />
                  <stop offset="100%" stopColor="#222222" />
                </linearGradient>
                <radialGradient id="p-specular" cx="30%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g transform="rotate(-25 100 100)">
                <path d="M 50 100 C 50 60, 150 60, 150 100 C 150 140, 50 140, 50 100 Z" fill="none" stroke="url(#p-torus1)" strokeWidth="32" strokeLinecap="round" />
                <ellipse cx="70" cy="75" rx="30" ry="12" fill="url(#p-specular)" transform="rotate(-20 70 75)" />
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
                <linearGradient id="p-blob1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#444444" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
              </defs>
              <g transform="rotate(20 100 100)">
                <rect x="70" y="30" width="60" height="110" rx="30" fill="url(#p-blob1)" />
                <circle cx="85" cy="55" r="18" fill="url(#p-specular)" />
              </g>
            </svg>
          </motion.div>

          {/* Center Heading Content */}
          <div className="max-w-[850px] mx-auto px-4 sm:px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 font-mono text-xs tracking-widest uppercase text-black dark:text-white mb-4 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-black dark:text-white" />
                Transparent Rates &amp; Packages
              </div>
              
              <h1 className="font-['Space_Grotesk'] text-4xl sm:text-6xl font-extrabold text-black dark:text-white tracking-tight mb-4">
                Itemized rate card, zero surprises.
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Every project begins with a free scoping call figures below are transparent starting rates with 100% source code ownership.
              </p>

              {/* Currency & Meta Badges */}
              <div className="mt-8 flex flex-wrap justify-center items-center gap-3 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                <span className="px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  Currency: <strong className="text-black dark:text-white font-semibold">INR (₹), excl. 18% GST</strong>
                </span>
                <span className="px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  Engagement: <strong className="text-black dark:text-white font-semibold">Project &amp; Monthly Retainer</strong>
                </span>
              </div>
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

        {/* ================= MAIN PRICING CONTENT SECTION ================= */}
        <section className="py-16 sm:py-24 bg-neutral-50/50 dark:bg-neutral-900/40 relative">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

            {/* Toggle Button for Interactive Package Estimator */}
            <div className="mb-12 text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCalculatorOpen(!calculatorOpen)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-lg cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>{calculatorOpen ? 'Hide Interactive Price Estimator' : 'Open Custom Price Estimator'}</span>
              </motion.button>
            </div>

            {/* ================= INTERACTIVE ESTIMATOR ================= */}
            <AnimatePresence>
              {calculatorOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="bg-black text-white dark:bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl overflow-hidden relative"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
                    <div>
                      <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400 mb-1">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Custom Package Estimator
                      </div>
                      <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-white">
                        Build your project scope
                      </h2>
                    </div>
                    <p className="text-xs text-neutral-400 font-mono max-w-sm">
                      Select service tiers below to calculate real-time estimated investments and bundle discounts.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Website Dev */}
                    <div className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl">
                      <span className="font-mono text-xs uppercase text-neutral-400 font-semibold block mb-3">Website Dev</span>
                      <div className="space-y-2">
                        {['Basic (₹7,999)', 'Standard (₹14,999)', 'Premium (₹24,999)'].map((label, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedWeb(selectedWeb === idx ? null : idx)}
                            className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-mono text-left transition-all cursor-pointer flex items-center justify-between ${
                              selectedWeb === idx ? 'bg-white text-black font-bold shadow-md' : 'bg-black text-neutral-300 hover:bg-neutral-800'
                            }`}
                          >
                            <span>{label}</span>
                            {selectedWeb === idx && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* App Dev */}
                    <div className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl">
                      <span className="font-mono text-xs uppercase text-neutral-400 font-semibold block mb-3">App Dev</span>
                      <div className="space-y-2">
                        {['Basic (₹24,999)', 'Standard (₹39,999)', 'Premium (₹64,999)'].map((label, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedApp(selectedApp === idx ? null : idx)}
                            className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-mono text-left transition-all cursor-pointer flex items-center justify-between ${
                              selectedApp === idx ? 'bg-white text-black font-bold shadow-md' : 'bg-black text-neutral-300 hover:bg-neutral-800'
                            }`}
                          >
                            <span>{label}</span>
                            {selectedApp === idx && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Meta Ads */}
                    <div className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl">
                      <span className="font-mono text-xs uppercase text-neutral-400 font-semibold block mb-3">Meta Ads (/mo)</span>
                      <div className="space-y-2">
                        {['Basic (₹7,999)', 'Standard (₹13,999)', 'Premium (₹19,999)'].map((label, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedAds(selectedAds === idx ? null : idx)}
                            className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-mono text-left transition-all cursor-pointer flex items-center justify-between ${
                              selectedAds === idx ? 'bg-white text-black font-bold shadow-md' : 'bg-black text-neutral-300 hover:bg-neutral-800'
                            }`}
                          >
                            <span>{label}</span>
                            {selectedAds === idx && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Video Shoot */}
                    <div className="p-5 bg-neutral-900/90 border border-neutral-800 rounded-2xl">
                      <span className="font-mono text-xs uppercase text-neutral-400 font-semibold block mb-3">Video Shoot + Edit</span>
                      <div className="space-y-2">
                        {['Basic (₹9,999)', 'Standard (₹24,999)', 'Premium (₹59,999)'].map((label, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedVideo(selectedVideo === idx ? null : idx)}
                            className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-mono text-left transition-all cursor-pointer flex items-center justify-between ${
                              selectedVideo === idx ? 'bg-white text-black font-bold shadow-md' : 'bg-black text-neutral-300 hover:bg-neutral-800'
                            }`}
                          >
                            <span>{label}</span>
                            {selectedVideo === idx && <Check className="w-3.5 h-3.5" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Estimator Result Box */}
                  <div className="p-6 sm:p-8 bg-neutral-900 border border-neutral-700 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-neutral-400 font-mono">Estimated Subtotal:</span>
                        {discountPercent > 0 && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                            {discountPercent}% Combo Discount Applied
                          </span>
                        )}
                      </div>
                      <div className="text-3xl sm:text-5xl font-bold font-['Space_Grotesk'] text-white">
                        ₹{finalTotal.toLocaleString('en-IN')}
                        <span className="text-xs text-neutral-400 font-normal ml-2 font-mono">(excl. 18% GST)</span>
                      </div>
                    </div>

                    <a
                      href="/contact"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
                    >
                      <span>Request Custom Proposal</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ================= CORE SERVICE RATE CARDS ================= */}
            <div className="space-y-8 mb-16">
              
              {/* Service 1: Website Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 gap-2">
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-black dark:text-white" />
                    <h2 className="font-['Space_Grotesk'] text-xl font-bold text-black dark:text-white">Website Development</h2>
                  </div>
                  <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-medium">Delivered in 7–14 days</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
                  <div className="p-6">
                    <span className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 block mb-2 font-semibold">Basic</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-2">₹7,999+</div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Single-page or small multi-page site, mobile responsive layout, contact form setup, fast load speed.
                    </p>
                  </div>
                  <div className="p-6 bg-neutral-50 dark:bg-neutral-900/40 relative">
                    <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono text-[10px] font-bold uppercase tracking-wider">
                      Most Chosen
                    </div>
                    <span className="font-mono text-xs uppercase text-black dark:text-white font-bold block mb-2">Standard</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-2">₹14,999+</div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Multi-page business site, custom design sections, on-page SEO basics, CMS ready &amp; high performance.
                    </p>
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 block mb-2 font-semibold">Premium</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-1">₹24,999+</div>
                    <span className="font-mono text-[11px] text-neutral-500 block mb-2">onward</span>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Full custom interactive design, rich animations, advanced SEO setup, priority delivery &amp; full maintenance.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Service 2: App Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 gap-2">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-black dark:text-white" />
                    <h2 className="font-['Space_Grotesk'] text-xl font-bold text-black dark:text-white">App Development</h2>
                  </div>
                  <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-medium">Android / iOS</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
                  <div className="p-6">
                    <span className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 block mb-2 font-semibold">Basic</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-2">₹24,999+</div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Core-feature app, single platform (Android or iOS), standard UI components, API integration.
                    </p>
                  </div>
                  <div className="p-6 bg-neutral-50 dark:bg-neutral-900/40">
                    <span className="font-mono text-xs uppercase text-black dark:text-white font-bold block mb-2">Standard</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-2">₹39,999+</div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Custom UI, backend database integration, both Android &amp; iOS platforms, dedicated admin panel.
                    </p>
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 block mb-2 font-semibold">Premium</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-2">₹64,999+</div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Full custom build, advanced features, payment gateway, scalable cloud backend, store publishing support.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Service 3: Meta Ads Management */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 gap-2">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-black dark:text-white" />
                    <h2 className="font-['Space_Grotesk'] text-xl font-bold text-black dark:text-white">Meta Ads Management</h2>
                  </div>
                  <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-medium">Facebook + Instagram</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
                  <div className="p-6">
                    <span className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 block mb-2 font-semibold">Basic</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-2">
                      ₹7,999+<span className="text-xs text-neutral-500 font-normal">/mo</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Campaign setup, single ad set, monthly performance report &amp; audience targeting optimization.
                    </p>
                  </div>
                  <div className="p-6 bg-neutral-50 dark:bg-neutral-900/40">
                    <span className="font-mono text-xs uppercase text-black dark:text-white font-bold block mb-2">Standard</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-2">
                      ₹13,999+<span className="text-xs text-neutral-500 font-normal">/mo</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Multiple ad sets, A/B creative testing, bi-weekly optimization, dedicated reporting call.
                    </p>
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 block mb-2 font-semibold">Premium</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-2">
                      ₹19,999+<span className="text-xs text-neutral-500 font-normal">/mo</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Full-funnel retargeting, creative testing, weekly optimization &amp; strategy call with growth expert.
                    </p>
                  </div>
                </div>
                <div className="px-6 py-3 bg-neutral-100/60 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                  * Management fee only — ad spend budget is billed directly by Meta and is not included above.
                </div>
              </motion.div>

              {/* Service 4: Video Shoot + Editing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 gap-2">
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-black dark:text-white" />
                    <h2 className="font-['Space_Grotesk'] text-xl font-bold text-black dark:text-white">Video Shoot + Editing</h2>
                  </div>
                  <span className="font-mono text-xs text-neutral-600 dark:text-neutral-400 uppercase font-medium">Shoot + Edit</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
                  <div className="p-6">
                    <span className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 block mb-2 font-semibold">Basic</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-2">₹9,999+</div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      5 raw videos, 2 fully edited. Shot on high-end smartphone with clean lighting &amp; audio.
                    </p>
                  </div>
                  <div className="p-6 bg-neutral-50 dark:bg-neutral-900/40">
                    <span className="font-mono text-xs uppercase text-black dark:text-white font-bold block mb-2">Standard</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-2">₹24,999</div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      8 videos, 3 fully edited. Shot on phone + mirrorless camera, cinematic color edit.
                    </p>
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-xs uppercase text-neutral-500 dark:text-neutral-400 block mb-2 font-semibold">Premium</span>
                    <div className="font-mono text-3xl font-bold text-black dark:text-white mb-2">₹59,999+</div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      8 videos, 5 fully edited. Shot on 4K camera + drone, full cinematic production &amp; sound design.
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* ================= COMBO BUNDLES ================= */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold block mb-1">
                  Bundled Savings
                </span>
                <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-black dark:text-white">
                  Popular Service Combo Bundles
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Combo 1 */}
                <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-lg">
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-black dark:text-white mb-1">Web + App Combo</h3>
                  <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-6">Website · Mobile App</p>
                  <div className="grid grid-cols-3 gap-3 font-mono text-center">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block uppercase font-medium">Basic</span>
                      <strong className="text-sm sm:text-base text-black dark:text-white block my-1">₹29,999+</strong>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">Save ₹2,999</span>
                    </div>
                    <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-300 dark:border-neutral-700">
                      <span className="text-[10px] text-black dark:text-white block uppercase font-bold">Standard</span>
                      <strong className="text-sm sm:text-base text-black dark:text-white block my-1">₹44,999+</strong>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">Save ₹7,999</span>
                    </div>
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block uppercase font-medium">Premium</span>
                      <strong className="text-sm sm:text-base text-black dark:text-white block my-1">₹74,999+</strong>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">Save ₹9,999</span>
                    </div>
                  </div>
                </div>

                {/* Combo 2 */}
                <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-lg">
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-black dark:text-white mb-1">Web + App + Meta Ads Combo</h3>
                  <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-6">Website · Mobile App · Meta Ads (1st mo)</p>
                  <div className="grid grid-cols-3 gap-3 font-mono text-center">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block uppercase font-medium">Basic</span>
                      <strong className="text-sm sm:text-base text-black dark:text-white block my-1">₹34,999+</strong>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">Save ₹5,998</span>
                    </div>
                    <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-300 dark:border-neutral-700">
                      <span className="text-[10px] text-black dark:text-white block uppercase font-bold">Standard</span>
                      <strong className="text-sm sm:text-base text-black dark:text-white block my-1">₹51,999+</strong>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">Save ₹14,998</span>
                    </div>
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block uppercase font-medium">Premium</span>
                      <strong className="text-sm sm:text-base text-black dark:text-white block my-1">₹84,999+</strong>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-semibold">Save ₹19,998</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= WHAT IS INCLUDED IN EVERY PROJECT ================= */}
            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 mb-12 shadow-md">
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-black dark:text-white mb-6">
                What is included in every project?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800">
                  <ShieldCheck className="w-6 h-6 text-black dark:text-white mb-2" />
                  <strong className="block text-sm font-bold text-black dark:text-white mb-1">100% IP Ownership</strong>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Full transfer of source code, design assets, and production credentials upon project completion.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800">
                  <Check className="w-6 h-6 text-black dark:text-white mb-2" />
                  <strong className="block text-sm font-bold text-black dark:text-white mb-1">Dedicated PM</strong>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Direct access via WhatsApp &amp; Slack for real-time updates and weekly status check-ins.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800">
                  <Zap className="w-6 h-6 text-black dark:text-white mb-2" />
                  <strong className="block text-sm font-bold text-black dark:text-white mb-1">30-Day Support</strong>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Complimentary post-launch maintenance, bug fixes, and performance tuning for 30 days.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800">
                  <HelpCircle className="w-6 h-6 text-black dark:text-white mb-2" />
                  <strong className="block text-sm font-bold text-black dark:text-white mb-1">QA &amp; Security</strong>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Thorough multi-device testing, SSL encryption, and speed optimization before public go-live.
                  </p>
                </div>
              </div>
            </div>

            {/* ================= TERMS & CONDITIONS BOX ================= */}
            <div className="p-6 sm:p-8 bg-neutral-900 text-white border border-neutral-800 rounded-2xl text-xs sm:text-sm font-mono space-y-2 mb-16 shadow-lg">
              <h4 className="text-white font-bold uppercase tracking-wider mb-3 text-sm font-['Space_Grotesk'] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Important Terms &amp; Conditions
              </h4>
              <p>• All prices are in INR (₹) and exclude 18% GST.</p>
              <p>• Meta Ads management pricing is a monthly retainer; ad spend budget is paid directly to Meta.</p>
              <p>• Combo packages include 1 month of Meta Ads management; renews at standalone monthly rate thereafter.</p>
              <p>• Standard payment terms: 50% advance upon agreement signing, 50% upon final staging approval prior to go-live.</p>
            </div>

            {/* ================= BOTTOM CTA ================= */}
            <div className="bg-black text-white dark:bg-white dark:text-black rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Ready to build your next project?
              </h2>
              <p className="text-neutral-400 dark:text-neutral-600 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Book a free 20-minute scoping call with our technical team. We&apos;ll discuss your requirements and send a custom itemized proposal within 24 hours.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black dark:bg-black dark:text-white font-bold text-base hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all shadow-xl cursor-pointer"
              >
                <span>Book Free Consultation &amp; Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
