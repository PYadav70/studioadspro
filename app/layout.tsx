import type { Metadata } from 'next';
// @ts-expect-error
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'StudioAdsPro',
  description: 'StudioAdsPro designs, builds, and scales custom software, AI agents, mobile apps, and digital marketing for ambitious businesses.',
  keywords: ['software development', 'AI agents', 'mobile apps', 'digital marketing', 'full stack engineering', 'Next.js', 'StudioAdsPro'],
  authors: [{ name: 'StudioAdsPro Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-[var(--bg-page)] text-[var(--text-main)] antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

