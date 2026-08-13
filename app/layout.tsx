import type { Metadata, Viewport } from 'next';
// @ts-ignore: side-effect import for global styles
import './globals.css';
import Script from 'next/script';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.studioadspro.com'),

  title: {
    default: 'StudioAdsPro — AI, Web & Performance Marketing Agency',
    template: '%s | StudioAdsPro',
  },

  description:
    'StudioAdsPro designs, builds, and scales custom software, AI agents, mobile apps, and performance marketing for ambitious businesses.',

  keywords: [
    'StudioAdsPro',
    'software development agency',
    'AI agent development',
    'mobile app development company',
    'Flutter development',
    'web development agency India',
    'digital marketing agency',
    'performance marketing',
    'Next.js development',
    'full stack engineering',
    'UI UX design agency',
    'Greater Noida software company',
  ],

  authors: [{ name: 'StudioAdsPro Team', url: 'https://www.studioadspro.com' }],
  creator: 'StudioAdsPro',
  publisher: 'StudioAdsPro',

  alternates: {
    canonical: 'https://www.studioadspro.com',
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    title: 'StudioAdsPro — AI, Web & Performance Marketing Agency',
    description:
      'StudioAdsPro designs, builds, and scales custom software, AI agents, mobile apps, and performance marketing for ambitious businesses.',
    url: 'https://www.studioadspro.com',
    siteName: 'StudioAdsPro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StudioAdsPro — AI, Web & Performance Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'StudioAdsPro — AI, Web & Performance Marketing Agency',
    description:
      'Custom software, AI agents, mobile apps, and performance marketing for modern businesses.',
    images: ['/og-image.png'],
    creator: '@studioadspro',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

// Sitewide structured data: describes the business entity and the website
// itself so Google can render a Knowledge Panel / sitelinks search box and
// understand brand, contact, and social profile signals.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://www.studioadspro.com/#organization',
  name: 'StudioAdsPro',
  alternateName: 'Studio Ads Pro',
  url: 'https://www.studioadspro.com',
  logo: 'https://www.studioadspro.com/favicon-512x512.png',
  image: 'https://www.studioadspro.com/og-image.png',
  description:
    'StudioAdsPro is a digital engineering studio designing, building, and scaling custom software, AI agents, mobile apps, and performance marketing for ambitious businesses.',
  email: 'studioadspro888@gmail.com',
  telephone: '+91-9876543210',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Greater Noida',
    addressRegion: 'NCR',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Place', name: 'United States' },
    { '@type': 'Place', name: 'United Kingdom' },
    { '@type': 'Place', name: 'Middle East' },
    { '@type': 'Place', name: 'Europe' },
    { '@type': 'Place', name: 'APAC' },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'studioadspro888@gmail.com',
      telephone: '+91-9876543210',
      areaServed: 'Worldwide',
      availableLanguage: ['en'],
    },
  ],
  sameAs: ['https://x.com/StudioAdsPro5'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.studioadspro.com/#website',
  url: 'https://www.studioadspro.com',
  name: 'StudioAdsPro',
  description:
    'Custom software, AI agents, mobile apps, and performance marketing for ambitious businesses.',
  publisher: { '@id': 'https://www.studioadspro.com/#organization' },
  inLanguage: 'en-US',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="bg-[var(--bg-page)] text-[var(--text-main)] antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>

        {/* Structured data: Organization + WebSite (sitewide) */}
        <Script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];
            t=b.createElement(e);
            t.async=!0;
            t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1567182034815621');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1567182034815621&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
