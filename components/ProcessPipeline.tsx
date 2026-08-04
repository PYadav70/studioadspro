'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, Palette, Code, ShieldCheck, Rocket, CheckCircle } from 'lucide-react';

export default function ProcessPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Discovery',
      icon: Search,
      short: 'Goals and constraints, so we solve the right problem.',
      details: 'In-depth stakeholder interviews, technical audits, competitive research, and target user workflow mapping. We identify real ROI drivers before writing any code.',
      deliverables: ['Product Requirements Document (PRD)', 'Tech Stack Recommendation', 'System Architecture Outline'],
    },
    {
      num: '02',
      title: 'Strategy',
      icon: Compass,
      short: 'Scope and a milestone plan you can hold us to.',
      details: 'Creating a granular 2-week sprint roadmap with clear acceptance criteria, fixed deliverables, and risk mitigation strategies.',
      deliverables: ['Sprint Milestone Roadmap', 'API Data Flow Model', 'Fixed Scope Statement'],
    },
    {
      num: '03',
      title: 'Design',
      icon: Palette,
      short: 'Wireframes to UI, validated before code ships.',
      details: 'Crafting high-contrast design systems, responsive wireframes, and interactive Figma prototypes tested for accessibility and conversion.',
      deliverables: ['Figma Design System', 'Clickable Prototype', 'Component Style Guide'],
    },
    {
      num: '04',
      title: 'Development',
      icon: Code,
      short: 'Sprint-based builds with weekly demos on staging.',
      details: 'Surgical execution using Next.js, TypeScript, and clean modular code. Continuous integration keeps live preview links updated weekly.',
      deliverables: ['Live Staging URL', 'Clean Git Repository', 'Automated CI/CD Pipeline'],
    },
    {
      num: '05',
      title: 'Testing',
      icon: ShieldCheck,
      short: 'QA and security review before go-live.',
      details: 'End-to-end unit testing, cross-browser compatibility checks, security vulnerability auditing, and real mobile device responsiveness verification.',
      deliverables: ['QA Test Execution Log', 'Security & Penetration Audit', 'Performance Lighthouse Report'],
    },
    {
      num: '06',
      title: 'Launch & Support',
      icon: Rocket,
      short: 'Deployment, monitoring, and an ongoing support window.',
      details: 'Zero-downtime production deployment to Cloud Run/Vercel, real-time error tracking setup, and a guaranteed post-launch warranty period.',
      deliverables: ['Production Deployment', 'Documentation & Video Walkthrough', '30–90 Day Warranty Support'],
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-white dark:bg-neutral-950 transition-colors duration-300">
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
            Development Process
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight mb-4">
            One pipeline, from first call to launch day.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
            Click any step to inspect our exact engineering deliverables and phase workflow.
          </p>
        </motion.div>

        {/* Pipeline Steps Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-12"
        >
          {/* Progress track background */}
          <div className="hidden lg:block absolute top-[22px] left-8 right-8 h-0.5 bg-neutral-200 dark:bg-neutral-800 z-0" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col items-center text-center p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-md scale-105'
                      : 'bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-mono font-bold text-sm mb-3 transition-colors ${
                      isSelected
                        ? 'bg-white dark:bg-black text-black dark:text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-['Space_Grotesk'] font-bold text-sm mb-1">
                    {step.title}
                  </h3>
                  <span className={`text-[11px] font-mono ${isSelected ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-500 dark:text-neutral-400'}`}>
                    Step {idx + 1} of 6
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Step Details Card */}
        {(() => {
          const current = steps[activeStep];
          const Icon = current.icon;
          return (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                      Stage {current.num} Workflow
                    </span>
                    <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-black dark:text-white">
                      {current.title}
                    </h3>
                  </div>
                </div>
                <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-full font-mono text-xs text-neutral-600 dark:text-neutral-300 self-start md:self-auto">
                  Phase {activeStep + 1} / 6
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-7">
                  <h4 className="font-semibold text-black dark:text-white text-base mb-2">Overview</h4>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                    {current.details}
                  </p>
                </div>

                <div className="md:col-span-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold mb-3">
                    Stage Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {current.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-sm text-black dark:text-white">
                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })()}

      </div>
    </section>
  );
}
