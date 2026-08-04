'use client';

export default function TeamSection() {
  const teamMembers = [
    { initials: 'AR', title: 'Founder & CEO', subtitle: 'Product strategy & client partnerships' },
    { initials: 'JM', title: 'Lead Full Stack Developer', subtitle: 'Architecture & delivery' },
    { initials: 'SK', title: 'Backend Engineer', subtitle: 'APIs, databases & infra' },
    { initials: 'NP', title: 'Frontend Engineer', subtitle: 'Interfaces & performance' },
    { initials: 'DV', title: 'AI Engineer', subtitle: 'Agents & automation' },
    { initials: 'LC', title: 'UI/UX Designer', subtitle: 'Research & design systems' },
    { initials: 'TO', title: 'Application Developer', subtitle: 'iOS & Android' },
    { initials: 'RB', title: 'Social Media Strategist', subtitle: 'Content & campaigns' },
    { initials: 'EW', title: 'Creative Designer', subtitle: 'Brand & visual identity' },
    { initials: 'MH', title: 'Video Editor', subtitle: 'Motion & product video' },
  ];

  return (
    <section id="team" className="py-16 sm:py-24 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black dark:text-white mb-3">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
            Team
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
            The people behind the build.
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="group flex flex-col">
              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center font-['Space_Grotesk'] text-2xl font-bold text-black dark:text-white mb-3 group-hover:border-black dark:group-hover:border-white group-hover:scale-[1.02] transition-all">
                {member.initials}
              </div>
              <h3 className="font-['Space_Grotesk'] font-bold text-sm text-black dark:text-white leading-snug">
                {member.title}
              </h3>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 leading-normal mt-0.5">
                {member.subtitle}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
