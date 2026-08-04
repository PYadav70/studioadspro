'use client';

import { motion } from 'motion/react';

export default function TrustedBar() {
  const brands = [
    'Northbridge Health',
    'Vantage Realty Group',
    'Fernwell Logistics',
    'Kestrel Labs',
    'Milestone Health',
    'Orbital Factory',
    'Northbridge Health',
    'Vantage Realty Group',
    'Fernwell Logistics',
    'Kestrel Labs',
    'Milestone Health',
    'Orbital Factory',
  ];

  return (
    <section className="py-10 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.5 }}
        className="max-w-[1200px] mx-auto px-4 mb-6 text-center"
      >
        <p className="font-mono text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400 font-medium">
          Trusted by startups, growing businesses & enterprise brands
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full overflow-hidden mask-gradient"
      >
        <div className="animate-marquee flex items-center gap-12 sm:gap-16">
          {brands.concat(brands).map((brand, idx) => (
            <div
              key={idx}
              className="font-['Space_Grotesk'] font-bold text-lg sm:text-xl text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap tracking-tight"
            >
              {brand}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
