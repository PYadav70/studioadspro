'use client';

import { motion } from 'motion/react';
import { MessageCircle, Instagram, Send, X } from 'lucide-react';
import { useState } from 'react';

interface FloatingSocialButtonsProps {
  whatsappNumber?: string;
  whatsappMessage?: string;
  instagramUsername?: string;
}

export default function FloatingSocialButtons({
  whatsappNumber = '919876543210',
  whatsappMessage = 'Hello StudioAdsPro! I would like to inquire about your services.',
  instagramUsername = 'studioadspro',
}: FloatingSocialButtonsProps) {
  const [showQuickChat, setShowQuickChat] = useState(false);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const instagramUrl = `https://www.instagram.com/studioadspro/?hl=en${instagramUsername}`;

  return (
    <>
      {/* Floating Instagram Button - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -7, 0],
          }}
          transition={{
            scale: { type: 'spring', stiffness: 300, damping: 20 },
            opacity: { duration: 0.4 },
            y: {
              duration: 3,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            },
          }}
          whileHover={{ scale: 1.15, y: -8, rotate: [0, -4, 4, 0] }}
          whileTap={{ scale: 0.92 }}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/60 transition-shadow duration-300 cursor-pointer"
          title="Follow us on Instagram"
          aria-label="Instagram Page"
        >
          {/* Animated Glowing Outer Aura */}
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.35, 0.75, 0.35],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] blur-md group-hover:opacity-90 -z-10"
          />

          {/* Instagram Camera Icon SVG */}
          <motion.svg
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-md"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </motion.svg>

          {/* Hover Tooltip Label */}
          <span className="absolute left-full ml-3 px-3.5 py-1.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-mono text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl border border-neutral-800 dark:border-neutral-200">
            @studioadspro
          </span>
        </motion.a>
      </div>

      {/* Floating WhatsApp Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -7, 0],
          }}
          transition={{
            scale: { type: 'spring', stiffness: 300, damping: 20, delay: 0.1 },
            opacity: { duration: 0.4 },
            y: {
              duration: 3.2,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
              delay: 0.4,
            },
          }}
          whileHover={{ scale: 1.15, y: -8, rotate: [0, 4, -4, 0] }}
          whileTap={{ scale: 0.92 }}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#25D366] text-white shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/70 transition-shadow duration-300 cursor-pointer"
          title="Chat on WhatsApp"
          aria-label="WhatsApp Contact"
        >
          {/* Animated Glowing Ring Effect */}
          <motion.span
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.4, 0.85, 0.4],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -inset-1.5 rounded-2xl sm:rounded-3xl bg-[#25D366] blur-md group-hover:opacity-95 -z-10"
          />

          {/* WhatsApp Icon SVG with gentle pulse */}
          <motion.svg
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-8 h-8 sm:w-9 sm:h-9 fill-current drop-shadow-md"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </motion.svg>

          {/* Hover Tooltip Label */}
          <span className="absolute right-full mr-3 px-3.5 py-1.5 rounded-xl bg-[#25D366] text-white font-mono text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-xl border border-emerald-400">
            Chat on WhatsApp
          </span>
        </motion.a>
      </div>
    </>
  );
}
