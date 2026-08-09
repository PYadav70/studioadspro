import type { Metadata, Viewport } from 'next';
// @ts-ignore: side-effect import for global styles
import './globals.css';
import Script from 'next/script';
import { ThemeProvider } from '@/components/ThemeProvider';
import PixelPageView from '@/components/PixelPageView';

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
    'software development',
    'AI agents',
    'mobile apps',
    'Flutter development',
    'web development',
    'digital marketing',
    'performance marketing',
    'Next.js',
    'full stack engineering',
    'UI UX design',
  ],

  authors: [{ name: 'StudioAdsPro Team' }],
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
        url: '/favicon-512x512.png',
        width: 512,
        height: 512,
        alt: 'StudioAdsPro SAP Logo',
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
    images: ['/favicon-512x512.png'],
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

        <PixelPageView />

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
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}