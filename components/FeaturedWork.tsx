'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import Script from 'next/script';
import ImageWithSkeleton from './ImageWithSkeleton';

interface CaseStudy {
  id: string;
  url: string;
  liveUrl: string;
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
      id: 'srm-dry-cleaners',
      url: 'srmdrycleaners.com',
      liveUrl: 'https://www.srmdrycleaners.com/',
      category: 'Web & Apps',
      tag: 'E-Commerce & Service · Web Platform',
      title: 'SRM Dry Cleaners',
      summary: 'Doorstep pickup, premium eco-friendly dry cleaning, laundry booking, and order tracking web application.',
      metrics: '10k+ Garments Serviced · Doorstep Delivery',
      imgUrl: '/srm-dry-cleaners.svg',
      metricLabel1: 'Garments Serviced',
      metricVal1: '10,000+',
      metricLabel2: 'Turnaround Time',
      metricVal2: '24 Hours',
      fullDetails: {
        clientOverview: 'SRM Dry Cleaners is a leading professional laundry & garment care provider offering fabric care, doorstep pickup, and scheduled delivery services.',
        challenge: 'Legacy phone-based bookings led to schedule conflicts, lost tracking, and slow customer updates.',
        solution: 'Built an intuitive online booking workflow with real-time slot selection, automated status alerts, and interactive service catalogs.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'REST API'],
      },
    },
    {
      id: 'arogya-crm',
      url: 'arogyacrm.vercel.app',
      liveUrl: 'https://arogyacrm.vercel.app/login',
      category: 'AI & Software',
      tag: 'Healthcare · Clinic Management CRM',
      title: 'Arogya CRM',
      summary: 'Modern healthcare CRM platform for clinic workflows, patient appointment scheduling, digital medical records, and doctor portals.',
      metrics: '45+ Medical Clinics · Real-time Cloud CRM',
      imgUrl: '/arogya-crm.svg',
      metricLabel1: 'Active Clinics',
      metricVal1: '45+',
      metricLabel2: 'Patient Records Managed',
      metricVal2: '25,000+',
      fullDetails: {
        clientOverview: 'Arogya CRM provides specialized practice management software for multi-specialty medical clinics and practitioners.',
        challenge: 'Inconsistent patient tracking and manual appointment management across multiple clinic branches.',
        solution: 'Engineered a secure cloud CRM with instant role-based access for doctors, receptionists, and patients with prescription tracking.',
        techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel Cloud'],
      },
    },
    {
      id: 'arogya-bio',
      url: 'arogyabio.com',
      liveUrl: 'https://www.arogyabio.com/',
      category: 'AI & Software',
      tag: 'BioTech & Health · Enterprise Web',
      title: 'Arogya Bio',
      summary: 'Enterprise web platform showcasing biomedical products, pharmaceutical innovations, and clinical research solutions.',
      metrics: 'Global Catalog · High Performance Platform',
      imgUrl: '/arogya-bio.svg',
      metricLabel1: 'Biomedical Products',
      metricVal1: '100+',
      metricLabel2: 'Global Market Reach',
      metricVal2: 'International',
      fullDetails: {
        clientOverview: 'Arogya Bio is a pioneer in biomedical product research, laboratory distribution, and medical equipment manufacturing.',
        challenge: 'Needed a modern, high-trust digital presence to present scientific product lines and facilitate wholesale inquiry leads.',
        solution: 'Designed and developed a responsive, ultra-fast web application with structured product catalogs and inquiry submission pipelines.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'SEO Engine'],
      },
    },
      {
      id: 'nikunj-heritage',
      url: 'nikunjheritage.com',
      liveUrl: 'https://www.nikunjheritageinfrabuilds.com/',
      category: 'Web & Apps',
      tag: 'PropTech & Real Estate · Advisory Portal',
      title: 'Nikunj Heritage Infrabuild',
      summary: 'Sacred growth belt real estate & property advisory platform featuring ROI calculators, corridor comparisons, and site booking.',
      metrics: 'Mathura-Vrindavan Belt · ROI Calculator Engine',
      imgUrl: '/nikunj-heritage.svg',
      metricLabel1: 'Corridor Listings',
      metricVal1: '150+ Prime',
      metricLabel2: 'Site Visit Bookings',
      metricVal2: '3,500+',
      fullDetails: {
        clientOverview: 'Nikunj Heritage Infrabuild is a premier real estate advisory firm serving the sacred Mathura-Vrindavan investment and development corridor.',
        challenge: 'High-intent property buyers needed transparent registry verification, ROI comparison tools, and seamless site visit scheduling.',
        solution: 'Developed a high-performance multilingual PropTech portal with interactive ROI calculator, location comparative engine, and instant WhatsApp/Callback lead routing.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lead Analytics'],
      },
    },
    {
      id: 'samrajya-ayodhyaa',
      url: 'samrajyaayodhyaa.com',
      liveUrl: 'https://www.samrajyaayodhyaa.com/',
      category: 'Web & Apps',
      tag: 'Real Estate & Hospitality · Web Portal',
      title: 'Samrajya Ayodhyaa',
      summary: 'Premium township and luxury real estate portal showcasing prime residential and commercial properties in Ayodhya.',
      metrics: '250+ High-intent Leads · Virtual Gallery',
      imgUrl: '/samrajya-ayodhyaa.svg',
      metricLabel1: 'Property Inquiries',
      metricVal1: '250+',
      metricLabel2: 'Virtual Site Visits',
      metricVal2: '1,200+',
      fullDetails: {
        clientOverview: 'Samrajya Ayodhyaa is a flagship real estate development in historic Ayodhya, offering premium land parcels and luxury stays.',
        challenge: 'Needed an immersive web experience to attract high-net-worth buyers and tourists seeking real estate in Ayodhya.',
        solution: 'Created an elegant, image-rich portal featuring interactive site maps, amenity showcases, and direct lead capture.',
        techStack: ['React', 'Next.js', 'Tailwind CSS', 'Responsive Layouts', 'Lead Analytics'],
      },
    },
    {
      id: 'girija-devi-trust',
      url: 'girijadevitrust.com',
      liveUrl: 'https://www.girijadevitrust.com/',
      category: 'Web & Apps',
      tag: 'Non-Profit & Social Impact · Web Platform',
      title: 'Girija Devi Trust',
      summary: 'Official non-profit foundation platform driving social welfare, educational programs, healthcare drives, and donor transparency.',
      metrics: '5,000+ Lives Impacted · Transparent Portal',
      imgUrl: '/girija-devi-trust.svg',
      metricLabel1: 'Lives Impacted',
      metricVal1: '5,000+',
      metricLabel2: 'Social Programs',
      metricVal2: '12 Active',
      fullDetails: {
        clientOverview: 'Girija Devi Trust is a charitable organization committed to community development, women empowerment, and healthcare.',
        challenge: 'Required an accessible, transparent digital foundation to publish impact reports and organize social initiatives.',
        solution: 'Built an inspiring, mobile-first web portal with event updates, initiative showcases, and seamless donor interaction.',
        techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive Design', 'Vercel'],
      },
    },
  ];

  const categories = ['All', 'AI & Software', 'Web & Apps', 'Logistics & IoT'];

  const filtered = filter === 'All'
    ? caseStudies
    : caseStudies.filter((item) => item.category === filter);

  // Portfolio structured data — each case study becomes an indexable
  // CreativeWork entity linking back to the live client project.
  const portfolioJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: caseStudies.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'CreativeWork',
        name: item.title,
        description: item.summary,
        url: item.liveUrl,
        image: `https://www.studioadspro.com${item.imgUrl}`,
        creator: { '@id': 'https://www.studioadspro.com/#organization' },
        about: item.tag,
      },
    })),
  };

  return (
    <section id="work" className="py-16 sm:py-24 bg-neutral-100/60 border-t border-b border-neutral-200">
      <Script
        id="ld-portfolio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />
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
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-[11px] text-neutral-600 dark:text-neutral-400 font-medium hover:text-black dark:hover:text-white hover:underline flex items-center gap-1"
                    >
                      {item.url}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Project Showcase Image with Skeleton Loader */}
                  <div className="border-b border-neutral-100 dark:border-neutral-800">
                    <ImageWithSkeleton
                      src={item.imgUrl}
                      alt={`${item.title} — ${item.tag} case study by StudioAdsPro`}
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
                  alt={`${activeProject.title} — ${activeProject.tag} case study by StudioAdsPro`}
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

              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Visit Live Website</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setActiveProject(null)}
                  className="px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
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
