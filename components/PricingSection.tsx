'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Calculator, ArrowRight, ShieldAlert } from 'lucide-react';

export default function PricingSection() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
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

    // Apply combo discount if 2+ major services selected
    const activeCount = [selectedWeb, selectedApp, selectedAds, selectedVideo].filter((s) => s !== null).length;
    let discount = 0;
    if (activeCount >= 3) discount = 0.15;
    else if (activeCount === 2) discount = 0.10;

    const final = total * (1 - discount);
    return { rawTotal: total, discountPercent: discount * 100, finalTotal: Math.round(final) };
  };

  const { rawTotal, discountPercent, finalTotal } = calculateTotal();

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-black dark:bg-neutral-950 text-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white mb-3">
            <span className="w-2 h-2 rounded-full bg-white" />
            Pricing
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Itemized rate card, no surprises.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Every project starts with a free scoping call — figures below are transparent starting rates.
          </p>
        </motion.div>

        {/* Currency & Meta */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-neutral-400 uppercase tracking-wider mb-12 border-b border-neutral-800 pb-6">
          <span>Scope: <strong className="text-white font-normal">Web · App · Ads · Video</strong></span>
          <span>Currency: <strong className="text-white font-normal">INR (₹), excl. GST</strong></span>
          <span>Engagement: <strong className="text-white font-normal">Project & Monthly</strong></span>
        </div>

        {/* Instant Interactive Estimator Toggle Button */}
        <div className="mb-12 text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCalculatorOpen(!calculatorOpen)}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>{calculatorOpen ? 'Close Instant Estimator' : 'Try Interactive Price Estimator'}</span>
          </motion.button>
        </div>

        {/* Interactive Estimator Tool */}
        <AnimatePresence>
          {calculatorOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.98 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 sm:p-8 mb-16 shadow-2xl overflow-hidden"
            >
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white mb-2">
                Custom Package Estimator
              </h3>
              <p className="text-xs text-neutral-400 mb-6 font-mono">
                Select desired tiers across services to calculate immediate estimated cost and combo discounts.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Web */}
                <div className="p-4 bg-black border border-neutral-800 rounded-xl">
                  <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">Website Dev</span>
                  <div className="space-y-2">
                    {['Basic (₹7,999)', 'Standard (₹14,999)', 'Premium (₹24,999)'].map((label, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedWeb(selectedWeb === idx ? null : idx)}
                        className={`w-full py-2 px-3 rounded-md text-xs font-mono text-left transition-colors cursor-pointer ${
                          selectedWeb === idx ? 'bg-white text-black font-bold' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* App */}
                <div className="p-4 bg-black border border-neutral-800 rounded-xl">
                  <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">App Dev</span>
                  <div className="space-y-2">
                    {['Basic (₹24,999)', 'Standard (₹39,999)', 'Premium (₹64,999)'].map((label, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedApp(selectedApp === idx ? null : idx)}
                        className={`w-full py-2 px-3 rounded-md text-xs font-mono text-left transition-colors cursor-pointer ${
                          selectedApp === idx ? 'bg-white text-black font-bold' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ads */}
                <div className="p-4 bg-black border border-neutral-800 rounded-xl">
                  <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">Meta Ads (/mo)</span>
                  <div className="space-y-2">
                    {['Basic (₹7,999)', 'Standard (₹13,999)', 'Premium (₹19,999)'].map((label, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedAds(selectedAds === idx ? null : idx)}
                        className={`w-full py-2 px-3 rounded-md text-xs font-mono text-left transition-colors cursor-pointer ${
                          selectedAds === idx ? 'bg-white text-black font-bold' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video */}
                <div className="p-4 bg-black border border-neutral-800 rounded-xl">
                  <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">Video Shoot + Edit</span>
                  <div className="space-y-2">
                    {['Basic (₹9,999)', 'Standard (₹24,999)', 'Premium (₹59,999)'].map((label, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVideo(selectedVideo === idx ? null : idx)}
                        className={`w-full py-2 px-3 rounded-md text-xs font-mono text-left transition-colors cursor-pointer ${
                          selectedVideo === idx ? 'bg-white text-black font-bold' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total Calculation Output */}
              <div className="p-6 bg-black border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-400 font-mono">Estimated Subtotal:</span>
                    {discountPercent > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
                        {discountPercent}% Combo Discount Applied
                      </span>
                    )}
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold font-['Space_Grotesk'] text-white">
                    ₹{finalTotal.toLocaleString('en-IN')}
                    <span className="text-xs text-neutral-400 font-normal ml-2 font-mono">(excl. 18% GST)</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors"
                >
                  <span>Request Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Service 1: Website Development */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4 }}
          className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950 mb-8"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800">
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Website Development</h3>
            <span className="font-mono text-xs text-neutral-400 uppercase">Delivered in 7–14 days</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            <div className="p-6">
              <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">Basic</span>
              <div className="font-mono text-2xl font-bold text-white mb-2">₹7,999+</div>
              <p className="text-xs text-neutral-400 leading-relaxed">Single-page or small multi-page site, mobile responsive layout, contact form setup.</p>
            </div>
            <div className="p-6 bg-neutral-900/40">
              <span className="font-mono text-xs uppercase text-neutral-300 font-bold block mb-2">Standard (Popular)</span>
              <div className="font-mono text-2xl font-bold text-white mb-2">₹14,999+</div>
              <p className="text-xs text-neutral-400 leading-relaxed">Multi-page business site, custom design sections, on-page SEO basics, CMS ready.</p>
            </div>
            <div className="p-6">
              <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">Premium</span>
              <div className="font-mono text-2xl font-bold text-white mb-1">₹24,999+</div>
              <span className="font-mono text-[11px] text-neutral-500 block mb-2">onward</span>
              <p className="text-xs text-neutral-400 leading-relaxed">Full custom interactive design, animations, advanced SEO setup, priority delivery.</p>
            </div>
          </div>
        </motion.div>

        {/* Service 2: App Development */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950 mb-8"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800">
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">App Development</h3>
            <span className="font-mono text-xs text-neutral-400 uppercase">Android / iOS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            <div className="p-6">
              <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">Basic</span>
              <div className="font-mono text-2xl font-bold text-white mb-2">₹24,999+</div>
              <p className="text-xs text-neutral-400 leading-relaxed">Core-feature app, single platform (Android or iOS), standard UI components.</p>
            </div>
            <div className="p-6 bg-neutral-900/40">
              <span className="font-mono text-xs uppercase text-neutral-300 font-bold block mb-2">Standard</span>
              <div className="font-mono text-2xl font-bold text-white mb-2">₹39,999+</div>
              <p className="text-xs text-neutral-400 leading-relaxed">Custom UI, backend database integration, both Android & iOS platforms, admin panel.</p>
            </div>
            <div className="p-6">
              <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">Premium</span>
              <div className="font-mono text-2xl font-bold text-white mb-2">₹64,999+</div>
              <p className="text-xs text-neutral-400 leading-relaxed">Full custom build, advanced features, payment gateway, scalable cloud backend.</p>
            </div>
          </div>
        </motion.div>

        {/* Service 3: Meta Ads Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950 mb-8"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800">
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Meta Ads Management</h3>
            <span className="font-mono text-xs text-neutral-400 uppercase">Facebook + Instagram</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            <div className="p-6">
              <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">Basic</span>
              <div className="font-mono text-2xl font-bold text-white mb-2">₹7,999<span className="text-xs text-neutral-400 font-normal">/mo</span></div>
              <p className="text-xs text-neutral-400 leading-relaxed">Campaign setup, single ad set, monthly performance report & optimization.</p>
            </div>
            <div className="p-6 bg-neutral-900/40">
              <span className="font-mono text-xs uppercase text-neutral-300 font-bold block mb-2">Standard</span>
              <div className="font-mono text-2xl font-bold text-white mb-2">₹13,999<span className="text-xs text-neutral-400 font-normal">/mo</span></div>
              <p className="text-xs text-neutral-400 leading-relaxed">Multiple ad sets, A/B creative testing, bi-weekly optimization, reporting call.</p>
            </div>
            <div className="p-6">
              <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">Premium</span>
              <div className="font-mono text-2xl font-bold text-white mb-2">₹19,999<span className="text-xs text-neutral-400 font-normal">/mo</span></div>
              <p className="text-xs text-neutral-400 leading-relaxed">Full-funnel retargeting, creative testing, weekly optimization & strategy call.</p>
            </div>
          </div>
          <div className="px-6 py-3 bg-neutral-900 border-t border-neutral-800 text-[11px] font-mono text-neutral-400">
            * Management fee only — ad spend budget is billed directly by Meta and is not included above.
          </div>
        </motion.div>

        {/* Service 4: Video Shoot + Editing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950 mb-12"
        >
          <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800">
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Video Shoot + Editing</h3>
            <span className="font-mono text-xs text-neutral-400 uppercase">Shoot + Edit</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            <div className="p-6">
              <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">Basic</span>
              <div className="font-mono text-2xl font-bold text-white mb-2">₹9,999</div>
              <p className="text-xs text-neutral-400 leading-relaxed">5 raw videos, 2 fully edited. Shot on high-end smartphone.</p>
            </div>
            <div className="p-6 bg-neutral-900/40">
              <span className="font-mono text-xs uppercase text-neutral-300 font-bold block mb-2">Standard</span>
              <div className="font-mono text-2xl font-bold text-white mb-2">₹24,999</div>
              <p className="text-xs text-neutral-400 leading-relaxed">8 videos, 3 fully edited. Shot on phone + mirrorless camera, cinematic edit.</p>
            </div>
            <div className="p-6">
              <span className="font-mono text-xs uppercase text-neutral-400 block mb-2">Premium</span>
              <div className="font-mono text-2xl font-bold text-white mb-2">₹59,999</div>
              <p className="text-xs text-neutral-400 leading-relaxed">8 videos, 5 fully edited. Shot on 4K camera + drone, full cinematic production.</p>
            </div>
          </div>
        </motion.div>

        {/* Combo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div className="border border-neutral-700 bg-neutral-900 rounded-2xl p-6">
            <h4 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-1">Web + App Combo</h4>
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-6">Website · Mobile App</p>
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3 bg-black rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Basic</span>
                <strong className="text-sm text-white block my-1">₹29,999</strong>
                <span className="text-[10px] text-emerald-400 block">Save ₹2,999</span>
              </div>
              <div className="p-3 bg-black rounded-lg border border-neutral-700">
                <span className="text-[10px] text-neutral-300 block uppercase font-bold">Standard</span>
                <strong className="text-sm text-white block my-1">₹44,999</strong>
                <span className="text-[10px] text-emerald-400 block">Save ₹7,999</span>
              </div>
              <div className="p-3 bg-black rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Premium</span>
                <strong className="text-sm text-white block my-1">₹74,999</strong>
                <span className="text-[10px] text-emerald-400 block">Save ₹9,999</span>
              </div>
            </div>
          </div>

          <div className="border border-neutral-700 bg-neutral-900 rounded-2xl p-6">
            <h4 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-1">Web + App + Meta Ads Combo</h4>
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-6">Website · Mobile App · Meta Ads (1st mo)</p>
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3 bg-black rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Basic</span>
                <strong className="text-sm text-white block my-1">₹34,999</strong>
                <span className="text-[10px] text-emerald-400 block">Save ₹5,998</span>
              </div>
              <div className="p-3 bg-black rounded-lg border border-neutral-700">
                <span className="text-[10px] text-neutral-300 block uppercase font-bold">Standard</span>
                <strong className="text-sm text-white block my-1">₹51,999</strong>
                <span className="text-[10px] text-emerald-400 block">Save ₹14,998</span>
              </div>
              <div className="p-3 bg-black rounded-lg border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase">Premium</span>
                <strong className="text-sm text-white block my-1">₹84,999</strong>
                <span className="text-[10px] text-emerald-400 block">Save ₹19,998</span>
              </div>
            </div>
          </div>

        </div>

        {/* Notes Box */}
        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-400 space-y-2 mb-12 font-mono">
          <h4 className="text-neutral-300 font-bold uppercase tracking-wider mb-2">Important Terms & Conditions</h4>
          <p>• All prices are in INR and exclude 18% GST.</p>
          <p>• Meta Ads pricing is a monthly management retainer; ad spend budget is paid directly to Meta.</p>
          <p>• Combo packages include 1 month of Meta Ads management; renews at standalone monthly rate thereafter.</p>
          <p>• Payment schedule: 50% advance upon project signing, 50% upon final staging approval prior to go-live.</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-base hover:bg-neutral-200 transition-colors shadow-xl"
          >
            <span>Book Free Consultation & Custom Quote</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
