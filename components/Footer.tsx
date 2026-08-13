'use client';
import NewsletterSignup from '@/components/NewsletterSignup';
import NavbarLogo from '@/components/NavbarLogo';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f4] dark:bg-neutral-950 border-t border-black dark:border-neutral-800 pt-12 sm:pt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Prominent Lead Generation Newsletter Banner */}
        <div className="mb-14">
          {/* <NewsletterSignup /> */}
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 items-start">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-5 overflow-visible">
              <NavbarLogo />
            </div>

            <p className="text-[14.5px] leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-[280px] mb-6">
              A digital engineering studio building software and AI products for
              growing businesses.
            </p>

            <NewsletterSignup compact />
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500 mb-[22px]">
              Company
            </h4>

            <ul className="space-y-[18px] text-[15px] text-neutral-700 dark:text-neutral-300">
              <li>
                <a
                  href="/#services"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="/#team"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Team
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500 mb-[22px]">
              Services
            </h4>

            <ul className="space-y-[18px] text-[15px] text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
              <li>
                <a
                  href="/#services"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Full Stack Development
                </a>
              </li>

              <li>
                <a
                  href="/#services"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  AI &amp; Agent Development
                </a>
              </li>

              <li>
                <a
                  href="/#services"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Mobile Apps
                </a>
              </li>

              <li>
                <a
                  href="/#services"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  UI/UX Design
                </a>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500 mb-[22px]">
              Industries
            </h4>

            <ul className="space-y-[18px] text-[15px] text-neutral-700 dark:text-neutral-300">
              <li>
                <a
                  href="/#work"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Healthcare
                </a>
              </li>

              <li>
                <a
                  href="/#work"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Real Estate
                </a>
              </li>

              <li>
                <a
                  href="/#work"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Logistics
                </a>
              </li>

              <li>
                <a
                  href="/#work"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  E-commerce
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500 mb-[22px]">
              Resources
            </h4>

            <ul className="space-y-[18px] text-[15px] text-neutral-700 dark:text-neutral-300">
              <li>
                <a
                  href="/#work"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Case Studies
                </a>
              </li>

              <li>
                <a
                  href="/#faq"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  FAQ
                </a>
              </li>

              <li>
                <a
                  href="/#pricing"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Watermark — decorative wordmark, not a real heading */}
        <div
          className="mt-8 sm:mt-12 md:mt-16 h-[80px] sm:h-[140px] md:h-[220px] flex items-end justify-center overflow-hidden select-none pointer-events-none w-full px-2"
          aria-hidden="true"
        >
          <p className="font-black text-neutral-200 dark:text-neutral-900 tracking-tight leading-none text-[clamp(32px,10.5vw,190px)] whitespace-nowrap text-center">
            StudioAdsPro
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 pb-6 border-t border-neutral-300 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[13.5px] text-neutral-500 dark:text-neutral-400">
            © 2026 StudioAdsPro. All rights reserved.
          </p>

          <div className="flex gap-7">
            <button
              onClick={() => {
                localStorage.removeItem('studioadspro_terms_accepted');
                window.location.reload();
              }}
              className="text-[13.5px] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('studioadspro_terms_accepted');
                window.location.reload();
              }}
              className="text-[13.5px] text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors cursor-pointer"
            >
              Terms &amp; Policy
            </button>
          </div>

          <div className="flex gap-2.5">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-[34px] h-[34px] rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center justify-center text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-black dark:hover:border-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[15px] h-[15px]"
              >
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23h-4V8z" />
              </svg>
            </a>

            {/* X */}
            <a
              href="https://x.com/StudioAdsPro5"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="w-[34px] h-[34px] rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center justify-center text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-black dark:hover:border-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[15px] h-[15px]"
              >
                <path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.2-9.3L1 2h7l4.8 6.4L18.9 2zm-1.2 18h1.9L7 3.9H5l12.7 16.1z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-[34px] h-[34px] rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center justify-center text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:border-black dark:hover:border-white transition-colors"
            >
              <Github className="w-[15px] h-[15px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
