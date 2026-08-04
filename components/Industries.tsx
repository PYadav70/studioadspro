'use client';

export default function Industries() {
  const industryList = [
    'Healthcare & Telehealth',
    'Real Estate & PropTech',
    'Logistics & Supply Chain',
    'AI Startups & LLMs',
    'E-commerce & Retail',
    'Finance & FinTech',
    'Construction & Field Work',
    'Education & EdTech',
    'Manufacturing & IoT',
    'Travel & Hospitality',
    'Food Delivery',
    'Enterprise SaaS',
  ];

  return (
    <section className="py-16 sm:py-20 bg-neutral-50/50 dark:bg-neutral-900/40 border-t border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black dark:text-white mb-2">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
            Industries
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
            Domain experience across 15+ sectors.
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {industryList.map((item, idx) => (
            <div
              key={idx}
              className="px-5 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 text-sm font-medium hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all cursor-default shadow-2xs"
            >
              {item}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
