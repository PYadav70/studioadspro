'use client';

import { motion } from 'motion/react';

export default function TechStack() {
  const techGroups = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'NestJS', 'Prisma', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Cloud & Infrastructure',
      items: ['Docker', 'AWS', 'Vercel', 'Google Cloud Run', 'GitHub Actions'],
    },
    {
      category: 'AI & Data',
      items: ['Gemini 2.5 Flash', 'OpenAI API', 'LangChain', 'CrewAI', 'Python', 'Pinecone Vector DB'],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-neutral-100/70 dark:bg-neutral-900/40 border-t border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
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
            Technologies
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
            A modern tech stack, chosen per project requirements.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {techGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs"
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold mb-4 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                {group.category}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map((item, iIdx) => (
                  <li
                    key={iIdx}
                    className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800/80 last:border-none"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
