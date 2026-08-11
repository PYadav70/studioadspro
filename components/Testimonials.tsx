'use client';

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Star } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

interface Testimonial {
  id: string;
  initials: string;
  role: string;
  company: string;
  quote: string;
  impact: string;
  stars: number;
  avatarUrl: string;
}

export default function Testimonials() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(0);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 16
      : 280;
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < testimonials.length) {
      setActiveCarouselIndex(index);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 16
      : 280;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveCarouselIndex(index);
  };

  const testimonials: Testimonial[] = [
    {
      id: 'od',
      initials: 'OD',
      role: 'Operations Director',
      company: 'Northbridge Health',
      quote: 'StudioAdsPro overhauled our patient scheduling across 12 clinics in less than a month. Front-desk check-in times dropped by over 60% immediately.',
      impact: '63% Faster Check-in',
      stars: 5,
      avatarUrl: 'https://picsum.photos/seed/director/400/500',
    },
    {
      id: 'mb',
      initials: 'MB',
      role: 'Managing Broker',
      company: 'Vantage Realty Group',
      quote: 'The lead-to-close CRM and agent field app gave our brokers immediate speed to lead. We saw a 2.1x conversion bump in 30 days.',
      impact: '2.1x Conversion Bump',
      stars: 5,
      avatarUrl: 'https://picsum.photos/seed/broker/400/500',
    },
    {
      id: 'ho',
      initials: 'HO',
      role: 'Head of Operations',
      company: 'Fernwell Logistics',
      quote: 'Their AI dispatch agent dynamically routes our 140 trucks around weather and delays. Zero missed-window penalties since launch.',
      impact: '85% Faster Dispatch',
      stars: 5,
      avatarUrl: 'https://picsum.photos/seed/operations/400/500',
    },
    {
      id: 'pl',
      initials: 'PL',
      role: 'Product Lead',
      company: 'Kestrel Labs',
      quote: 'We went from initial design kick-off to a live AI support agent in 3 weeks flat. 40% of tier-1 technical support is now automated.',
      impact: '40% Tickets Automated',
      stars: 5,
      avatarUrl: 'https://picsum.photos/seed/productlead/400/500',
    },
  ];

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-neutral-900 dark:bg-neutral-950 text-white transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-12 sm:mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full border border-neutral-700 bg-neutral-800 text-xs font-mono tracking-wider uppercase text-neutral-300 mb-4">
            Client Testimonials
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Happy Clients Testimonials
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Direct outcomes and feedback shared by operating leaders.
          </p>
        </motion.div>

        {/* Mobile / Responsive Carousel */}
        <div className="block md:hidden my-6">
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-1 py-2 -mx-4 px-4 justify-start"
          >
            {testimonials.map((item) => {
              const isPlaying = playingId === item.id;
              return (
                <div
                  key={item.id}
                  className="w-[82vw] max-w-[320px] shrink-0 snap-center bg-black border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-neutral-600 transition-all"
                >
                  {/* Visual Video Simulation Thumbnail */}
                  <div className="relative aspect-3/4 bg-neutral-950 flex items-center justify-center border-b border-neutral-800 overflow-hidden">
                    <ImageWithSkeleton
                      src={item.avatarUrl}
                      alt={item.company}
                      aspectRatio="aspect-[3/4]"
                      containerClassName="w-full h-full absolute inset-0 opacity-40 group-hover:opacity-55 transition-opacity"
                      className="object-cover"
                    />
                    
                    {/* Subtle dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Rating Stars */}
                    <div className="absolute top-4 left-4 flex gap-1">
                      {Array.from({ length: item.stars }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Play Button */}
                    <button
                      onClick={() => togglePlay(item.id)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                      aria-label={isPlaying ? 'Pause testimonial audio' : 'Play testimonial audio'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                    </button>

                    {/* Mute Button */}
                    <button
                      onClick={() => setMuted(!muted)}
                      className="absolute top-4 right-15 w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors cursor-pointer"
                      aria-label={muted ? 'Unmute' : 'Mute'}
                    >
                      {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    {/* Waveform indicator when playing */}
                    {isPlaying && (
                      <div className="absolute inset-x-0 bottom-16 flex items-center justify-center gap-1 h-6">
                        <span className="w-1 h-4 bg-emerald-400 animate-pulse" />
                        <span className="w-1 h-6 bg-emerald-400 animate-bounce" />
                        <span className="w-1 h-3 bg-emerald-400 animate-pulse" />
                        <span className="w-1 h-5 bg-emerald-400 animate-bounce" />
                      </div>
                    )}

                    {/* Bottom overlay badge */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-left">
                      <strong className="block text-white text-sm font-semibold">{item.role}</strong>
                      <span className="text-xs text-neutral-400 font-mono">{item.company}</span>
                    </div>
                  </div>

                  {/* Quote Text */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-neutral-900/60">
                    <p className="text-xs text-neutral-300 leading-relaxed italic mb-4">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-emerald-400 font-semibold">
                      <span>{item.impact}</span>
                      <span className="text-neutral-500">Verified</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {testimonials.map((_, idx) => {
              const isActive = idx === activeCarouselIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-7 h-2 bg-white'
                      : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, idx) => {
            const isPlaying = playingId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-black border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-neutral-600 transition-all"
              >
                {/* Visual Video Simulation Thumbnail */}
                <div className="relative aspect-3/4 bg-neutral-950 flex items-center justify-center border-b border-neutral-800 overflow-hidden">
                  <ImageWithSkeleton
                    src={item.avatarUrl}
                    alt={item.company}
                    aspectRatio="aspect-[3/4]"
                    containerClassName="w-full h-full absolute inset-0 opacity-40 group-hover:opacity-55 transition-opacity"
                    className="object-cover"
                  />
                  
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Rating Stars */}
                  <div className="absolute top-4 left-4 flex gap-1">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => togglePlay(item.id)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                    aria-label={isPlaying ? 'Pause testimonial audio' : 'Play testimonial audio'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                  </button>

                  {/* Mute Button */}
                  <button
                    onClick={() => setMuted(!muted)}
                    className="absolute top-4 right-15 w-8 h-8 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition-colors cursor-pointer"
                    aria-label={muted ? 'Unmute' : 'Mute'}
                  >
                    {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  {/* Waveform indicator when playing */}
                  {isPlaying && (
                    <div className="absolute inset-x-0 bottom-16 flex items-center justify-center gap-1 h-6">
                      <span className="w-1 h-4 bg-emerald-400 animate-pulse" />
                      <span className="w-1 h-6 bg-emerald-400 animate-bounce" />
                      <span className="w-1 h-3 bg-emerald-400 animate-pulse" />
                      <span className="w-1 h-5 bg-emerald-400 animate-bounce" />
                    </div>
                  )}

                  {/* Bottom overlay badge */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-left">
                    <strong className="block text-white text-sm font-semibold">{item.role}</strong>
                    <span className="text-xs text-neutral-400 font-mono">{item.company}</span>
                  </div>
                </div>

                {/* Quote Text */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-neutral-900/60">
                  <p className="text-xs text-neutral-300 leading-relaxed italic mb-4">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-emerald-400 font-semibold">
                    <span>{item.impact}</span>
                    <span className="text-neutral-500">Verified</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
