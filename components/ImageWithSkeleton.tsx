'use client';

import { useState, useRef, useEffect } from 'react';
import { Skeleton } from './ui/Skeleton';

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string; // e.g. "aspect-video" or "aspect-square"
}

export default function ImageWithSkeleton({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'aspect-video',
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) {
      const timer = setTimeout(() => setHasError(true), 0);
      return () => clearTimeout(timer);
    }

    // Check if the image has already completed loading (e.g. cached or local SVG)
    if (imgRef.current?.complete) {
      if (imgRef.current.naturalWidth === 0 && imgRef.current.naturalHeight === 0 && !src.endsWith('.svg')) {
        const timer = setTimeout(() => setHasError(true), 0);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsLoaded(true), 0);
        return () => clearTimeout(timer);
      }
    }
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 ${aspectRatio} ${containerClassName}`}>
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full z-10 pointer-events-none" />
      )}

      {hasError ? (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 text-white flex flex-col items-center justify-center p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm mb-2">
            {alt ? alt.substring(0, 2).toUpperCase() : 'PR'}
          </div>
          <span className="font-['Space_Grotesk'] font-bold text-sm tracking-tight">{alt}</span>
          <span className="font-mono text-[10px] text-neutral-400 mt-1">Live Project Showcase</span>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}
    </div>
  );
}
