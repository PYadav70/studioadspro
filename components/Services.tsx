'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Layout,
  Database,
  Bot,
  Smartphone,
  Figma,
  Megaphone,
  Video,
  X,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function Services() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(0);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 16
      : 280;
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < serviceList.length) {
      setActiveCarouselIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 16
      : 280;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveCarouselIndex(index);
  };

  const serviceList = [
    {
      icon: Code2,
      title: 'Full Stack Development',
      description: 'End-to-end web architectures, owned by one senior team from database schema to responsive frontend UI.',
      features: ['Custom Next.js & React App Architecture', 'PostgreSQL / Supabase / Firebase Integration', 'Automated CI/CD Pipeline Setup', '99.9% SLA & Server Monitoring']
    },
    {
      icon: Layout,
      title: 'Frontend Development',
      description: 'Ultra-fast, accessible interfaces built with Next.js, React, and Tailwind CSS optimized for conversion.',
      features: ['Lighthouse Performance Score 95+', 'Fully Responsive & Mobile Optimized', 'Accessibility WCAG AA Compliant', 'Framer Motion Interactive Micro-animations']
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Robust Node.js & Python REST/GraphQL APIs, microservices, and database systems engineered for production load.',
      features: ['High Throughput Express & Fastify Servers', 'PostgreSQL, Redis & Cloud SQL Infrastructure', 'OAuth2 / Webhooks & Payment Gateways', 'Rate Limiting & Security Hardening']
    },
    {
      icon: Bot,
      title: 'AI & Agent Development',
      description: 'Autonomous AI agents, RAG search engines, and LLM integrations tailored directly to your business workflows.',
      features: ['Gemini 2.5 & OpenAI API Integrations', 'Custom RAG (Retrieval-Augmented Generation)', 'Automated Customer Support Chatbots', 'Workflow Automation & Web Scraping']
    },
    {
      icon: Smartphone,
      title: 'Mobile Application Development',
      description: 'High-performance cross-platform iOS & Android mobile apps built with React Native and Flutter.',
      features: ['Cross-Platform iOS & Android Codebase', 'Native Camera, GPS & Push Notifications', 'Offline First Data Synchronization', 'App Store & Google Play Publishing']
    },
    {
      icon: Figma,
      title: 'UI/UX Design',
      description: 'Research-backed wireframing, high-fidelity UI design systems, and rapid interactive prototyping in Figma.',
      features: ['User Journey Mapping & Wireframing', 'Custom Figma Component Design Systems', 'Interactive High-Fidelity Prototypes', 'Conversion-Focused Visual Hierarchy']
    },
    {
      icon: Megaphone,
      title: 'Social Media Marketing',
      description: 'Full-funnel Meta, Google & LinkedIn ad campaigns, targeted ad creatives, and growth marketing.',
      features: ['ROAS-Optimized Meta & Google Ads', 'Audience Research & A/B Testing', 'Copywriting & Campaign Analytics', 'Retargeting Funnels & Lead Gen']
    },
    {
      icon: Video,
      title: 'Video Editing & Graphic Design',
      description: 'High-converting launch reels, product demos, brand identity guidelines, and motion graphics produced in-house.',
      features: ['Viral Short-Form Reels & Shorts', 'Product Demo & Explainer Animation', 'Brand Identity & Logo Guidelines', 'Custom 3D & Vector Assets']
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-neutral-50/50 dark:bg-neutral-900/40 border-t border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black dark:text-white mb-3">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
            Core Capabilities
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight mb-4">
            Everything you need to design, build, and scale.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
            One engineering & growth studio replacing multiple fragmented agency handoffs.
          </p>
        </motion.div>

        {/* Mobile / Responsive Carousel */}
        <div className="block md:hidden my-6">
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar py-2 -mx-4 px-4 justify-start"
          >
            {serviceList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedService(idx)}
                  className="w-[82vw] max-w-[320px] shrink-0 snap-center bg-white dark:bg-neutral-950 border border-neutral-200/90 dark:border-neutral-800/90 rounded-2xl p-6 shadow-md transition-all group flex flex-col justify-between cursor-pointer active:scale-[0.99]"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-black dark:text-white mb-5 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-['Space_Grotesk'] text-lg font-bold text-black dark:text-white mb-2.5">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                    <span>Service {String(idx + 1).padStart(2, '0')}</span>
                    <span className="font-semibold flex items-center gap-1">
                      Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {serviceList.map((_, idx) => {
              const isActive = idx === activeCarouselIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-7 h-2 bg-black dark:bg-white'
                      : 'w-2 h-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to service ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Desktop Services Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setSelectedService(idx)}
                className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-black dark:hover:border-white hover:shadow-lg group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-black dark:text-white mb-5 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-black dark:text-white mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400 dark:text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                  <span>Service {String(idx + 1).padStart(2, '0')}</span>
                  <span className="font-semibold flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Interactive Service Detail Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-black dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {(() => {
                const s = serviceList[selectedService];
                const Icon = s.icon;
                return (
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-1">
                      Service {String(selectedService + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-black dark:text-white mb-3">
                      {s.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6">
                      {s.description}
                    </p>

                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black dark:text-white mb-3">
                      Included Scope & Standards
                    </h4>
                    <ul className="space-y-2.5 mb-8">
                      {s.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-sm text-neutral-800 dark:text-neutral-200">
                          <CheckCircle2 className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-3">
                      <a
                        href="#contact"
                        onClick={() => setSelectedService(null)}
                        className="flex-1 py-3 px-5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-semibold text-center hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-md"
                      >
                        Inquire About This Service
                      </a>
                      <button
                        onClick={() => setSelectedService(null)}
                        className="py-3 px-5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white text-sm font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
