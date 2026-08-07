'use client';

import { motion } from 'motion/react';

interface NavbarLogoProps {
  className?: string;
}

export default function NavbarLogo({ className = '' }: NavbarLogoProps) {
  return (
    <a
      href="#home"
      className={`inline-flex items-center gap-2 sm:gap-3 group select-none ${className}`}
      aria-label="StudioAdsPro Home"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative flex items-center justify-center py-0.5 transition-all duration-300"
      >
        {/* ================= LIGHT THEME LOGO ================= */}
        <div className="block dark:hidden transition-all duration-300">
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* SAP Emblem Light */}
            <svg
              className="h-8 sm:h-9 w-auto shrink-0 transform group-hover:scale-[1.03] transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
              viewBox="0 0 540 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="sapLightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#09090b" />
                  <stop offset="50%" stopColor="#27272a" />
                  <stop offset="100%" stopColor="#52525b" />
                </linearGradient>
                <filter id="lightShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.25" />
                </filter>
              </defs>

              <g filter="url(#lightShadow)">
                {/* Smooth S Curve */}
                <path
                  d="M 160 55 C 100 55 50 85 50 140 C 50 205 155 195 155 245 C 155 275 105 285 55 265"
                  fill="none"
                  stroke="url(#sapLightGradient)"
                  strokeWidth="46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Triangular A Apex */}
                <path
                  d="M 195 280 L 275 55 L 355 280"
                  fill="none"
                  stroke="url(#sapLightGradient)"
                  strokeWidth="46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* P Stem & Loop */}
                <path
                  d="M 375 55 L 375 280"
                  fill="none"
                  stroke="url(#sapLightGradient)"
                  strokeWidth="46"
                  strokeLinecap="round"
                />
                <path
                  d="M 375 55 L 450 55 C 500 55 520 90 520 128 C 520 165 500 200 450 200 L 375 200"
                  fill="none"
                  stroke="url(#sapLightGradient)"
                  strokeWidth="46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>

            {/* Typography Section */}
            <div className="flex flex-col justify-center min-w-[160px]">
              <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                <span className="font-['Space_Grotesk'] font-black text-lg sm:text-xl tracking-tight text-black leading-none whitespace-nowrap">
                  STUDIO<span className="text-neutral-600 font-extrabold">ADSPRO</span>
                </span>
                <span className="px-1.5 py-0.5 rounded font-mono text-[8.5px] font-extrabold uppercase tracking-widest bg-black text-white leading-none shadow-xs shrink-0">
                  AGENCY
                </span>
              </div>
              <span className="font-mono text-[8.5px] sm:text-[9px] text-neutral-500 tracking-wider uppercase font-semibold mt-1 whitespace-nowrap">
                Digital Marketing &amp; Dev
              </span>
            </div>
          </div>
        </div>

        {/* ================= DARK THEME LOGO ================= */}
        <div className="hidden dark:block transition-all duration-300">
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* SAP Emblem Dark (Silver / White Metallic) */}
            <svg
              className="h-8 sm:h-9 w-auto shrink-0 transform group-hover:scale-[1.03] transition-transform duration-300 drop-shadow-[0_0_14px_rgba(255,255,255,0.35)]"
              viewBox="0 0 540 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="sapDarkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#e4e4e7" />
                  <stop offset="100%" stopColor="#a1a1aa" />
                </linearGradient>
                <filter id="darkGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#ffffff" floodOpacity="0.3" />
                </filter>
              </defs>

              <g filter="url(#darkGlow)">
                {/* Smooth S Curve */}
                <path
                  d="M 160 55 C 100 55 50 85 50 140 C 50 205 155 195 155 245 C 155 275 105 285 55 265"
                  fill="none"
                  stroke="url(#sapDarkGradient)"
                  strokeWidth="46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Triangular A Apex */}
                <path
                  d="M 195 280 L 275 55 L 355 280"
                  fill="none"
                  stroke="url(#sapDarkGradient)"
                  strokeWidth="46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* P Stem & Loop */}
                <path
                  d="M 375 55 L 375 280"
                  fill="none"
                  stroke="url(#sapDarkGradient)"
                  strokeWidth="46"
                  strokeLinecap="round"
                />
                <path
                  d="M 375 55 L 450 55 C 500 55 520 90 520 128 C 520 165 500 200 450 200 L 375 200"
                  fill="none"
                  stroke="url(#sapDarkGradient)"
                  strokeWidth="46"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>

            {/* Typography Section */}
            <div className="flex flex-col justify-center min-w-[160px]">
              <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                <span className="font-['Space_Grotesk'] font-black text-lg sm:text-xl tracking-tight text-white leading-none drop-shadow-sm whitespace-nowrap">
                  STUDIO<span className="text-neutral-300 font-extrabold">ADSPRO</span>
                </span>
                <span className="px-1.5 py-0.5 rounded font-mono text-[8.5px] font-extrabold uppercase tracking-widest bg-white text-black leading-none shadow-xs shrink-0">
                  AGENCY
                </span>
              </div>
              <span className="font-mono text-[8.5px] sm:text-[9px] text-neutral-400 tracking-wider uppercase font-semibold mt-1 whitespace-nowrap">
                Digital Marketing &amp; Dev
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </a>
  );
}

