'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, FileText, Lock, X, Check } from 'lucide-react';

export default function TermsPolicyModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'terms' | 'privacy'>('summary');
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already accepted terms & policy
    const accepted = localStorage.getItem('studioadspro_terms_accepted');
    if (!accepted) {
      // Small delay for smooth entry after initial page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('studioadspro_terms_accepted', new Date().toISOString());
    setIsOpen(false);
  };

  const handleDecline = () => {
    // Stores refusal state or closes modal with notice
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              mass: 0.8,
            }}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative"
          >
          {/* Top Header */}
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-start justify-between bg-neutral-50/80 dark:bg-neutral-950/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold block">
                  Legal Agreement &amp; Compliance
                </span>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-black dark:text-white">
                  Terms of Service &amp; Privacy Policy
                </h3>
              </div>
            </div>

            <button
              onClick={handleDecline}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Close popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 pt-3 gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('summary')}
              className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
                activeTab === 'summary'
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
                activeTab === 'terms'
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
                activeTab === 'privacy'
                  ? 'border-black dark:border-white text-black dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              Privacy Policy
            </button>
          </div>

          {/* Body Content Box */}
          <div className="p-6 overflow-y-auto max-h-[50vh] text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {activeTab === 'summary' && (
                  <div className="space-y-4">
                    <p>
                      Welcome to <strong className="text-black dark:text-white">StudioAdsPro</strong>. Before exploring our services, web applications, and digital marketing agency solutions, please take a moment to review our Terms of Service and Privacy Policy.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                        <FileText className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <strong className="block text-black dark:text-white font-semibold mb-0.5">Transparent Services</strong>
                          Clear project scopes, SLAs, and deliverables for engineering &amp; marketing.
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                        <Lock className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <strong className="block text-black dark:text-white font-semibold mb-0.5">Data Protection</strong>
                          Your personal and project information is confidential &amp; encrypted.
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 text-xs">
                      By clicking <strong className="font-bold">&quot;Accept &amp; Continue&quot;</strong>, you acknowledge that you have read, understood, and agreed to be bound by StudioAdsPro&apos;s standard service guidelines and privacy practices.
                    </div>
                  </div>
                )}

                {activeTab === 'terms' && (
                  <div className="space-y-3 text-xs leading-relaxed">
                    <h4 className="font-bold text-sm text-black dark:text-white font-['Space_Grotesk']">1. Acceptance of Terms</h4>
                    <p>By accessing or using the StudioAdsPro platform, services, or tools, you agree to comply with and be bound by these Terms of Service. If you do not agree, you may discontinue use of the site.</p>

                    <h4 className="font-bold text-sm text-black dark:text-white font-['Space_Grotesk'] pt-2">2. Services &amp; Intellectual Property</h4>
                    <p>All software architectures, UI/UX designs, branding materials, custom graphics, and code artifacts produced by StudioAdsPro are subject to ownership terms defined under client agreement contracts.</p>

                    <h4 className="font-bold text-sm text-black dark:text-white font-['Space_Grotesk'] pt-2">3. User Conduct</h4>
                    <p>You agree not to misuse our website or attempt unauthorized access to server infrastructure, APIs, database schemas, or hidden administrative consoles.</p>

                    <h4 className="font-bold text-sm text-black dark:text-white font-['Space_Grotesk'] pt-2">4. Modifications &amp; Updates</h4>
                    <p>StudioAdsPro reserves the right to amend these terms at any time. Continued usage constitutes agreement to updated terms.</p>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-3 text-xs leading-relaxed">
                    <h4 className="font-bold text-sm text-black dark:text-white font-['Space_Grotesk']">1. Information Collection</h4>
                    <p>We collect essential contact information submitted via inquiry forms (e.g., name, phone number, project requirements) to process project requests and consultation bookings.</p>

                    <h4 className="font-bold text-sm text-black dark:text-white font-['Space_Grotesk'] pt-2">2. Data Usage &amp; Cookies</h4>
                    <p>We use localized browser storage (localStorage) strictly to save user interface preferences, theme states, and legal compliance acknowledgments. We do not sell user data to third parties.</p>

                    <h4 className="font-bold text-sm text-black dark:text-white font-['Space_Grotesk'] pt-2">3. Security Standards</h4>
                    <p>Industry-standard 256-bit SSL/TLS encryption and cloud security protections guard all communications between your client browser and our application servers.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Action Bar */}
          <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              Last updated: August 2026
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Decline
              </button>

              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center justify-center gap-2 shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Accept &amp; Continue</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
}
