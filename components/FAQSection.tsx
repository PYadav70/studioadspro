'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import Script from 'next/script';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How much does a project cost?',
      answer: 'Our Indian itemized rate card starts at ₹7,999+ for websites, ₹24,999+ for mobile apps, and ₹7,999/mo for Meta Ads management. For custom enterprise software or AI agent builds, we provide a fixed-price proposal after a free 30-minute scoping call.',
    },
    {
      question: "What's the typical timeline?",
      answer: 'Standard websites and landing pages take 7–14 days. MVPs and mobile applications typically ship in 3–6 weeks in 2-week sprints with live weekly staging URL demos.',
    },
    {
      question: 'Will you sign an NDA before we share project details?',
      answer: 'Yes, absolutely. We sign standard mutual NDAs prior to reviewing proprietary wireframes, business data, or system codebases.',
    },
    {
      question: 'Do you offer post-launch support and warranty?',
      answer: 'Every project includes a 30–90 day post-launch warranty covering bug fixes and technical support. We also offer optional monthly SLA maintenance retainers for continuous feature iterations.',
    },
    {
      question: 'Can you build AI agents into an existing codebase?',
      answer: 'Yes — we regularly integrate Gemini / OpenAI agents, vector search databases, and automated webhooks into legacy backend platforms without requiring a full system rewrite.',
    },
    {
      question: 'Do you work with international clients outside India?',
      answer: 'Yes. We work with clients across the US, UK, Middle East, Europe, and APAC, scheduling weekly standups and demos around your local business hours.',
    },
  ];

  // FAQPage structured data drives the FAQ rich result in Google Search —
  // generated directly from the same array rendered below so copy and
  // schema can never drift out of sync.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black dark:text-white mb-3">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
            FAQ
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight mb-4">
            Frequently asked questions.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base">
            Everything you need to know about our process, pricing, and engagements.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer font-['Space_Grotesk'] font-bold text-base sm:text-lg text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center shrink-0 bg-white dark:bg-neutral-800">
                    {isOpen ? <Minus className="w-4 h-4 text-black dark:text-white" /> : <Plus className="w-4 h-4 text-black dark:text-white" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-200/60 dark:border-neutral-800 mt-2">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
