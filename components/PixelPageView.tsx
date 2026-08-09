'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export default function PixelPageView() {
  useEffect(() => {
    const trackPageView = () => {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
      }
    };

    window.addEventListener('hashchange', trackPageView);
    return () => window.removeEventListener('hashchange', trackPageView);
  }, []);

  return null;
}