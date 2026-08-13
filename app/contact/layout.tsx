import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with StudioAdsPro for a free 30-minute scoping call. We build custom software, AI agents, mobile apps, and performance marketing for ambitious businesses in India and worldwide.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact StudioAdsPro — Book a Free Consultation',
    description:
      'Get in touch with StudioAdsPro for a free 30-minute scoping call. We build custom software, AI agents, mobile apps, and performance marketing for ambitious businesses.',
    url: 'https://www.studioadspro.com/contact',
    type: 'website',
  },
  twitter: {
    title: 'Contact StudioAdsPro — Book a Free Consultation',
    description:
      'Get in touch with StudioAdsPro for a free 30-minute scoping call. We build custom software, AI agents, mobile apps, and performance marketing.',
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
