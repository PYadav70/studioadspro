'use client';

import { motion } from 'motion/react';

export default function WhyChooseUs() {
  const pillars = [
    {
      num: '01',
      title: 'Fast Delivery',
      desc: 'Tight 2-week sprints with transparent milestones — no bloated, open-ended timelines.',
    },
    {
      num: '02',
      title: 'Modern Tech Stack',
      desc: 'Next.js, TypeScript, Python, and cloud-native serverless infra chosen strictly for performance.',
    },
    {
      num: '03',
      title: 'Dedicated Team',
      desc: 'Direct access to senior developers and designers from project kickoff to product deployment.',
    },
    {
      num: '04',
      title: 'Scalable Architecture',
      desc: 'Engineered from day one to handle 10x traffic and transaction volume without requiring a rebuild.',
    },
    {
      num: '05',
      title: 'Transparent Communication',
      desc: 'Weekly live staging demos, a shared Notion/Linear board, and continuous Slack alignment.',
    },
    {
      num: '06',
      title: 'Long-Term Support',
      desc: 'We remain invested post-launch with comprehensive warranty coverage, monitoring, and retainers.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-neutral-100/70 dark:bg-neutral-900/30 border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black dark:text-white mb-3">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
            Why Choose Us
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
            Built for ambitious teams that cannot afford rework.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xs rounded-xl overflow-hidden">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-8 border-r border-b border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50/80 dark:hover:bg-neutral-900/80 transition-colors"
            >
              <span className="font-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500 block mb-4">
                {item.num}
              </span>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-black dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
