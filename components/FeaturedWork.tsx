'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

interface CaseStudy {
  id: string;
  url: string;
  category: string;
  tag: string;
  title: string;
  summary: string;
  metrics: string;
  imgUrl: string;
  metricLabel1: string;
  metricVal1: string;
  metricLabel2: string;
  metricVal2: string;
  fullDetails: {
    clientOverview: string;
    challenge: string;
    solution: string;
    techStack: string[];
  };
}

export default function FeaturedWork() {
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<CaseStudy | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      id: 'northbridge',
      url: 'app.northbridgehealth.com',
      category: 'Web & Apps',
      tag: 'Healthcare · Web Platform',
      title: 'Northbridge Health',
      summary: 'A unified patient scheduling platform that replaced paper intake across 12 regional clinics.',
      metrics: '63% faster intake · 4.8k patients onboarded',
      imgUrl: 'https://picsum.photos/seed/northbridge/800/450',
      metricLabel1: 'Faster Patient Intake',
      metricVal1: '63%',
      metricLabel2: 'Patients Onboarded',
      metricVal2: '4.8k',
      fullDetails: {
        clientOverview: 'Northbridge Health operates 12 primary care clinics requiring automated HIPAA-compliant digital intake.',
        challenge: 'Manual paper forms created high front-desk bottleneck and patient check-in delays averaging 18 minutes.',
        solution: 'Built a Next.js patient portal with automated SMS intake links, EHR integration, and instant insurance verification.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'HIPAA Firestore', 'Twilio API'],
      },
    },
    {
      id: 'vantage',
      url: 'vantagerealty.app',
      category: 'Web & Apps',
      tag: 'Real Estate · Marketplace',
      title: 'Vantage Realty Group',
      summary: 'A lead-to-close CRM with MLS listing sync and a mobile field application for real estate agents.',
      metrics: '2.1x lead conversion · 30 days to rollout',
      imgUrl: 'https://picsum.photos/seed/vantage/800/450',
      metricLabel1: 'Lead Conversion Boost',
      metricVal1: '2.1x',
      metricLabel2: 'Deployment Timeline',
      metricVal2: '30 Days',
      fullDetails: {
        clientOverview: 'Vantage Realty manages over $180M in residential property transactions annually across 85 agents.',
        challenge: 'Agents were losing leads due to slow follow-up times and disconnected spreadsheet MLS tracking.',
        solution: 'Created an automated lead routing system with instant WhatsApp integration and interactive map search.',
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Meta Ads Webhooks'],
      },
    },
    {
      id: 'fernwell',
      url: 'dispatch.fernwell.io',
      category: 'AI & Software',
      tag: 'Logistics · AI Agent',
      title: 'Fernwell Logistics',
      summary: 'An autonomous AI dispatch agent that optimizes fleet routes and flags delays in real time.',
      metrics: '85% faster dispatch · $0 missed-window penalties',
      imgUrl: 'https://picsum.photos/seed/fernwell/800/450',
      metricLabel1: 'Faster Dispatching',
      metricVal1: '85%',
      metricLabel2: 'Penalty Costs Saved',
      metricVal2: '$0',
      fullDetails: {
        clientOverview: 'Fernwell Logistics manages a fleet of 140 commercial trucks servicing cold-chain transport.',
        challenge: 'Human dispatchers struggled to dynamically re-route drivers when weather or traffic delays occurred.',
        solution: 'Implemented an AI agent powered by Gemini API to continuously re-evaluate weather, traffic, and fuel efficiency.',
        techStack: ['Python', 'Gemini API', 'Node.js', 'Mapbox', 'WebSockets'],
      },
    },
    {
      id: 'kestrel',
      url: 'kestrel.ai/console',
      category: 'AI & Software',
      tag: 'AI Startups · AI Product',
      title: 'Kestrel Labs',
      summary: 'Shipped a customer support AI agent MVP that resolves level-1 technical tickets automatically.',
      metrics: '3 weeks to MVP · 40% tickets automated',
      imgUrl: 'https://picsum.photos/seed/kestrel/800/450',
      metricLabel1: 'Time To Launch',
      metricVal1: '3 Weeks',
      metricLabel2: 'Tickets Automated',
      metricVal2: '40%',
      fullDetails: {
        clientOverview: 'Kestrel Labs is a fast-growing B2B SaaS startup scaling from 5k to 50k active users.',
        challenge: 'Support queue wait times reached 14 hours during peak product release weeks.',
        solution: 'Engineered a vector-database knowledge base RAG agent that answers complex product queries automatically.',
        techStack: ['Gemini 2.5 Flash', 'Pinecone Vector DB', 'Next.js', 'FastAPI'],
      },
    },
    {
      id: 'milestone',
      url: 'milestonehealth.app',
      category: 'Web & Apps',
      tag: 'Healthcare · Mobile App',
      title: 'Milestone Health',
      summary: 'A cross-platform telehealth booking app that cut appointment no-shows with automated SMS reminders.',
      metrics: '38% fewer no-shows · 12k bookings/mo',
      imgUrl: 'https://picsum.photos/seed/milestone/800/450',
      metricLabel1: 'No-Show Reduction',
      metricVal1: '38%',
      metricLabel2: 'Monthly Bookings',
      metricVal2: '12k',
      fullDetails: {
        clientOverview: 'Milestone Health provides virtual mental health counseling and therapy sessions.',
        challenge: 'Late cancellations and missed appointments were costing providers $45k monthly in lost capacity.',
        solution: 'Developed a React Native iOS & Android application with 1-click video calls and calendar sync.',
        techStack: ['React Native', 'Firebase', 'WebRTC Video', 'Stripe Payments'],
      },
    },
    {
      id: 'orbital',
      url: 'orbital.factory/dashboard',
      category: 'Logistics & IoT',
      tag: 'Manufacturing · IoT Dashboard',
      title: 'Orbital Factory',
      summary: 'A factory-floor telemetry monitoring dashboard with real-time IoT sensor anomaly alerts.',
      metrics: '99.2% uptime tracked · 6 factories live',
      imgUrl: 'https://picsum.photos/seed/orbital/800/450',
      metricLabel1: 'Tracked Uptime',
      metricVal1: '99.2%',
      metricLabel2: 'Live Factory Plants',
      metricVal2: '6',
      fullDetails: {
        clientOverview: 'Orbital operates high-volume automotive parts manufacturing facilities.',
        challenge: 'Unplanned machine downtime caused costly assembly line freezes before maintenance teams were notified.',
        solution: 'Built a real-time WebSocket dashboard consuming vibration, temperature, and pressure sensor feeds.',
        techStack: ['Next.js', 'MQTT WebSockets', 'Tailwind CSS', 'TimescaleDB'],
      },
    },
  ];

  const categories = ['All', 'AI & Software', 'Web & Apps', 'Logistics & IoT'];

  const filtered = filter === 'All'
    ? caseStudies
    : caseStudies.filter((item) => item.category === filter);

  return (
    <section id="work" className="py-16 sm:py-24 bg-neutral-100/60 border-t border-b border-neutral-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header & Filter Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black dark:text-white mb-3">
              <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
              Featured Projects
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
              Work that speaks for itself.
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-2xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Case Study Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                key={item.id}
                onClick={() => setActiveProject(item)}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-black dark:hover:border-white hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Mockup Frame Header */}
                  <div className="bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    </div>
                    <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                      {item.url}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                  </div>

                  {/* Project Showcase Image with Skeleton Loader */}
                  <div className="border-b border-neutral-100 dark:border-neutral-800">
                    <ImageWithSkeleton
                      src={item.imgUrl}
                      alt={item.title}
                      aspectRatio="aspect-[16/9]"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium block mb-2">
                      {item.tag}
                    </span>
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-black dark:text-white mb-3 group-hover:underline">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Metrics Caption Footer */}
                <div className="p-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 flex items-center justify-between font-mono text-xs text-neutral-700 dark:text-neutral-300">
                  <span>{item.metrics}</span>
                  <span className="text-black dark:text-white font-semibold text-[11px] underline">Details &rarr;</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold block mb-1">
                {activeProject.tag}
              </span>
              <h3 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4">
                {activeProject.title}
              </h3>

              {/* Showcase Banner Image */}
              <div className="mb-6 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                <ImageWithSkeleton
                  src={activeProject.imgUrl}
                  alt={activeProject.title}
                  aspectRatio="aspect-[16/9]"
                />
              </div>

              {/* Impact Metric Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono block">{activeProject.metricLabel1}</span>
                  <span className="text-2xl font-bold font-['Space_Grotesk'] text-black dark:text-white">{activeProject.metricVal1}</span>
                </div>
                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono block">{activeProject.metricLabel2}</span>
                  <span className="text-2xl font-bold font-['Space_Grotesk'] text-black dark:text-white">{activeProject.metricVal2}</span>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 mb-6">
                <div>
                  <strong className="block text-black dark:text-white font-semibold mb-1">Client Overview</strong>
                  <p>{activeProject.fullDetails.clientOverview}</p>
                </div>
                <div>
                  <strong className="block text-black dark:text-white font-semibold mb-1">The Challenge</strong>
                  <p>{activeProject.fullDetails.challenge}</p>
                </div>
                <div>
                  <strong className="block text-black dark:text-white font-semibold mb-1">Our Solution</strong>
                  <p>{activeProject.fullDetails.solution}</p>
                </div>
              </div>

              <div>
                <strong className="block text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  Tech Stack Implemented
                </strong>
                <div className="flex flex-wrap gap-2">
                  {activeProject.fullDetails.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-mono text-xs font-medium border border-neutral-200 dark:border-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
