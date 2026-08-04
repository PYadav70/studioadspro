'use client';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black dark:text-white mb-4">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
            About StudioAdsPro
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white tracking-tight leading-tight mb-6">
            Products that grow businesses not just look good.
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            We build high-performance web applications, autonomous AI agents, and intuitive mobile products. Engineered with precision to turn operational bottlenecks into revenue drivers.
          </p>
        </div>
      </div>
    </section>
  );
}
