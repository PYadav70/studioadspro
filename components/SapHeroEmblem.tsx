'use client';

import { motion } from 'motion/react';

export default function SapHeroEmblem() {
  return (
    <div className="relative w-full max-w-[580px] mx-auto flex items-center justify-center p-2 sm:p-4 select-none">
      
      {/* Background Soft Glow Aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-indigo-500/20 via-pink-500/20 to-amber-500/20 dark:from-indigo-600/30 dark:via-pink-600/30 dark:to-orange-500/30 blur-[75px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full"
      >
        <svg
          viewBox="0 0 680 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Logo S Gradient (Blue -> Violet) */}
            <linearGradient id="sGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            {/* Logo A Gradient (Orange -> Deep Coral) */}
            <linearGradient id="aGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>

            {/* Logo P Gradient (Pink -> Magenta) */}
            <linearGradient id="pGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="60%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>

            {/* Glass Card Inner Gradient */}
            <linearGradient id="glassCardBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b2e" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#161224" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#0d0914" stopOpacity="0.98" />
            </linearGradient>

            {/* Glass Border Highlight */}
            <linearGradient id="glassBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.5" />
            </linearGradient>

            {/* Orbit Ring Gradient */}
            <linearGradient id="orbitRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            </linearGradient>

            {/* Pedestal Top Face Gradient */}
            <linearGradient id="pedestalTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1c1917" />
              <stop offset="50%" stopColor="#262626" />
              <stop offset="100%" stopColor="#171717" />
            </linearGradient>

            {/* Pedestal Front Body Gradient */}
            <linearGradient id="pedestalBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="40%" stopColor="#09090b" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Soft Shadow Filter */}
            <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="24" stdDeviation="28" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* 1. BACK ORBITAL DASHED RING WITH ANIMATED NODES */}
          <g id="orbital-system">
            {/* Dashed Oval Orbit Line */}
            <ellipse
              cx="340"
              cy="230"
              rx="290"
              ry="195"
              fill="none"
              stroke="url(#orbitRingGrad)"
              strokeWidth="2"
              strokeDasharray="6 8"
              opacity="0.8"
            />

            {/* Secondary Inner Solid Ring */}
            <ellipse
              cx="340"
              cy="230"
              rx="315"
              ry="212"
              fill="none"
              stroke="#e11d48"
              strokeWidth="1"
              opacity="0.2"
            />

            {/* Orbiting Particle Node 1 (Cyan Dot Top Left) */}
            <motion.circle
              animate={{
                cx: [160, 340, 520, 340, 160],
                cy: [120, 40, 120, 420, 120],
              }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
              r="7"
              fill="#06b6d4"
              filter="url(#neonGlow)"
            />

            {/* Orbiting Particle Node 2 (Magenta Dot Top Right) */}
            <motion.rect
              animate={{
                x: [540, 340, 140, 340, 540],
                y: [80, 40, 240, 410, 80],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              width="12"
              height="12"
              rx="3"
              fill="#ec4899"
              filter="url(#neonGlow)"
            />

            {/* Orbiting Particle Node 3 (Blue Dot Left Mid) */}
            <motion.circle
              animate={{
                cx: [80, 340, 600, 340, 80],
                cy: [230, 430, 230, 30, 230],
              }}
              transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
              r="6"
              fill="#3b82f6"
              filter="url(#neonGlow)"
            />

            {/* Orbiting Particle Node 4 (Red Diamond Right Mid) */}
            <motion.circle
              animate={{
                cx: [580, 340, 100, 340, 580],
                cy: [280, 25, 280, 435, 280],
              }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
              r="8"
              fill="#f43f5e"
              filter="url(#neonGlow)"
            />
          </g>

          {/* 2. FLOATING GLASS CARD WITH LOGO (MAIN EMBLEM) */}
          <motion.g
            id="floating-glass-card"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            filter="url(#cardShadow)"
          >
            {/* Glass Card Background Container */}
            <rect
              x="115"
              y="70"
              width="450"
              height="295"
              rx="36"
              fill="url(#glassCardBg)"
              stroke="url(#glassBorder)"
              strokeWidth="2.5"
            />

            {/* Subtle Inner Card Glass Highlight Reflection */}
            <path
              d="M 125,106 C 125,86 141,70 161,70 L 519,70 C 539,70 555,86 555,106 L 555,160 Q 340,110 125,160 Z"
              fill="#ffffff"
              opacity="0.04"
            />

            {/* PIXEL FLOATING ACCENT SQUARES (TOP RIGHT OF CARD) */}
            <g id="card-pixel-accents">
              <motion.rect
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                x="525" y="42" width="18" height="18" rx="4" fill="#f43f5e"
              />
              <motion.rect
                animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                x="498" y="76" width="14" height="14" rx="3" fill="#be123c"
              />
              <motion.rect
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 0.6 }}
                x="528" y="98" width="12" height="12" rx="2.5" fill="#a855f7"
              />
            </g>

            {/* SAP LOGO ARTWORK (VIVID GRADIENTS & EXACT STYLING FROM IMAGE 1) */}
            <g id="sap-gradient-logo" transform="translate(148, 115)">
              
              {/* --- LETTER 'S' --- */}
              {/* S Smooth Curved Path */}
              <path
                d="M 98 42 C 60 42 22 62 22 100 C 22 145 88 142 88 175 C 88 200 52 208 24 196"
                fill="none"
                stroke="url(#sGrad)"
                strokeWidth="36"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* --- LETTER 'A' --- */}
              {/* Delta Outer Left Leg */}
              <path
                d="M 124 205 L 174 42 L 224 205"
                fill="none"
                stroke="url(#aGrad)"
                strokeWidth="36"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* A Center Delta Inner Triangular Cutout */}
              <polygon
                points="174,102 152,185 196,185"
                fill="#161224"
              />

              {/* --- LETTER 'P' --- */}
              {/* P Vertical Stem */}
              <path
                d="M 238 42 L 238 205"
                fill="none"
                stroke="url(#pGrad)"
                strokeWidth="36"
                strokeLinecap="round"
              />
              {/* P Rounded Top Loop */}
              <path
                d="M 238 42 L 290 42 C 322 42 334 68 334 94 C 334 120 322 144 290 144 L 238 144"
                fill="none"
                stroke="url(#pGrad)"
                strokeWidth="36"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </g>
          </motion.g>

          {/* 3. PEDESTAL BASE STAGE (SLIDE / PODIUM FROM IMAGE 1) */}
          <g id="pedestal-podium" transform="translate(0, 30)">
            
            {/* Stage Ground Glow Drop Shadow */}
            <ellipse
              cx="340"
              cy="480"
              rx="250"
              ry="32"
              fill="#000000"
              opacity="0.6"
              filter="blur(20px)"
            />

            {/* Pedestal Curved Base Container */}
            <g filter="url(#cardShadow)">
              {/* Main Dark Pedestal Body Path */}
              <path
                d="M 68,425 Q 340,400 612,425 L 612,490 Q 340,545 68,490 Z"
                fill="url(#pedestalBody)"
                stroke="#262626"
                strokeWidth="1.5"
              />

              {/* Pedestal Top Glossy Rim Lid */}
              <path
                d="M 68,425 Q 340,400 612,425 Q 340,448 68,425 Z"
                fill="url(#pedestalTop)"
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.4"
              />

              {/* Pedestal Top Lip Inner Arc Highlight */}
              <path
                d="M 72,427 Q 340,403 608,427"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.6"
              />

              {/* LEFT VERTICAL NEON EDGE BAR (CYAN/BLUE GLOW) */}
              <rect
                x="94"
                y="435"
                width="4"
                height="48"
                rx="2"
                fill="#38bdf8"
                filter="url(#neonGlow)"
              />

              {/* RIGHT VERTICAL NEON EDGE BAR (ORANGE/RED GLOW) */}
              <rect
                x="582"
                y="435"
                width="4"
                height="48"
                rx="2"
                fill="#f97316"
                filter="url(#neonGlow)"
              />

              {/* PEDESTAL CENTER TYPOGRAPHY (MATCHING IMAGE 1) */}
              <g textAnchor="middle" className="select-none">
                <text
                  x="340"
                  y="470"
                  fill="#ffffff"
                  fontFamily="JetBrains Mono, monospace, system-ui"
                  fontWeight="700"
                  fontSize="14"
                  letterSpacing="7"
                  opacity="0.95"
                >
                  STUDIO ADS PRO <tspan fill="#ec4899"> • </tspan> GREATER NOIDA
                </text>
              </g>

              {/* Pedestal Bottom Rim Curve Accent */}
              <path
                d="M 70,490 Q 340,545 610,490"
                fill="none"
                stroke="#525252"
                strokeWidth="1.2"
                opacity="0.5"
              />
            </g>
          </g>

        </svg>
      </motion.div>
    </div>
  );
}
