'use client';

export default function MarqueeBanner() {
  const words = [
    'Engineered To Scale',
    '•',
    'Built To Last',
    '•',
    'Engineered To Scale',
    '•',
    'Built To Last',
    '•',
    'Engineered To Scale',
    '•',
    'Built To Last',
    '•',
  ];

  return (
    <section className="bg-black dark:bg-neutral-950 py-8 overflow-hidden select-none border-y border-black dark:border-neutral-800 transition-colors duration-300">
      <div className="animate-marquee-banner flex items-center gap-8 whitespace-nowrap">
        {words.concat(words).map((word, idx) => (
          <span
            key={idx}
            className={`font-['Space_Grotesk'] font-bold text-2xl sm:text-4xl tracking-tight ${
              word === '•' ? 'text-neutral-600' : 'text-white'
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}
