'use client';

export default function Stats() {
  const statsList = [
    { number: '20+', label: 'Projects delivered' },
    { number: '25+', label: 'Technologies mastered' },
    { number: '15+', label: 'Industries served' },
    { number: '99%', label: 'Success rate' },
  ];

  return (
    <section className="py-12 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden divide-x divide-y md:divide-y-0 divide-neutral-200 dark:divide-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 shadow-xs">
          {statsList.map((stat, idx) => (
            <div key={idx} className="p-6 sm:p-8 text-center hover:bg-white dark:hover:bg-neutral-900 transition-colors">
              <div className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight mb-2">
                {stat.number}
              </div>
              <div className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
