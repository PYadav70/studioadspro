'use client';

import { useState } from 'react';
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

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${containerClassName}`}>
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 w-full h-full z-10" />
      )}

      {hasError ? (
        <div className="absolute inset-0 w-full h-full bg-neutral-100 flex items-center justify-center font-mono text-xs text-neutral-400">
          <span>Failed to load image</span>
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}
    </div>
  );
}
