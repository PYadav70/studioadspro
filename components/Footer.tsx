import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f4] border-t border-black pt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Row */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 items-start">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-[34px] h-[34px] rounded-lg bg-black text-white flex items-center justify-center font-bold text-[13px] tracking-tight shrink-0">
                SA
              </div>
              <span className="text-xl font-bold text-black tracking-tight">
                Studio&nbsp;AdsPro
              </span>
            </div>

            <p className="text-[14.5px] leading-relaxed text-neutral-500 max-w-[260px] mb-6">
              A digital engineering studio building software and AI products for
              growing businesses.
            </p>

            <form className="flex gap-2.5 max-w-[400px]">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 min-w-0 px-4 py-3 rounded-[10px] border border-neutral-300 bg-white text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-[10px] bg-black text-white font-semibold text-sm whitespace-nowrap hover:bg-neutral-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-neutral-400 mb-[22px]">
              Company
            </h4>

            <ul className="space-y-[18px] text-[15px] text-neutral-700">
              <li>
                <a
                  href="#about"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#team"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Team
                </a>
              </li>

              <li>
                <a
                  href="#careers"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-neutral-400 mb-[22px]">
              Services
            </h4>

            <ul className="space-y-[18px] text-[15px] text-neutral-700 whitespace-nowrap">
              <li>
                <a
                  href="#services"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Full Stack Development
                </a>
              </li>

              <li>
                <a
                  href="#services"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  AI &amp; Agent Development
                </a>
              </li>

              <li>
                <a
                  href="#services"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Mobile Apps
                </a>
              </li>

              <li>
                <a
                  href="#services"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  UI/UX Design
                </a>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-neutral-400 mb-[22px]">
              Industries
            </h4>

            <ul className="space-y-[18px] text-[15px] text-neutral-700">
              <li>
                <a
                  href="#work"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Healthcare
                </a>
              </li>

              <li>
                <a
                  href="#work"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Real Estate
                </a>
              </li>

              <li>
                <a
                  href="#work"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Logistics
                </a>
              </li>

              <li>
                <a
                  href="#work"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  E-commerce
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-[11.5px] font-medium uppercase tracking-[0.12em] text-neutral-400 mb-[22px]">
              Resources
            </h4>

            <ul className="space-y-[18px] text-[15px] text-neutral-700">
              <li>
                <a
                  href="#case-studies"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Case Studies
                </a>
              </li>

              <li>
                <a
                  href="#faq"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  FAQ
                </a>
              </li>

              <li>
                <a
                  href="#pricing"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="#blog"
                  className="hover:text-black hover:underline underline-offset-4"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Watermark */}
       <div className="mt-16 h-[220px] flex items-end justify-center overflow-hidden select-none pointer-events-none">
  <h2 className="font-black text-neutral-200 tracking-tight leading-none text-[clamp(80px,11vw,190px)] whitespace-nowrap">
    StudioAdsPro
  </h2>
</div>

        {/* Bottom Bar */}
         <div className="mt-10 pt-6 pb-6 border-t border-neutral-300 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[13.5px] text-neutral-500">
            © 2026 StudioAdsPro. All rights reserved.
          </p>

          <div className="flex gap-7">
            <a
              href="#privacy"
              className="text-[13.5px] text-neutral-700 hover:underline underline-offset-4"
            >
              Privacy Policy
            </a>

            <a
              href="#terms"
              className="text-[13.5px] text-neutral-700 hover:underline underline-offset-4"
            >
              Terms
            </a>
          </div>

          <div className="flex gap-2.5">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-[34px] h-[34px] rounded-full border border-neutral-300 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors"
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
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="w-[34px] h-[34px] rounded-full border border-neutral-300 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors"
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
              className="w-[34px] h-[34px] rounded-full border border-neutral-300 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors"
            >
              <Github className="w-[15px] h-[15px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}