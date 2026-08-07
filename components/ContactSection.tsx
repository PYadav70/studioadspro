'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Linkedin, Twitter, Github } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 relative overflow-hidden transition-colors duration-300">
      <div className="blueprint-bg absolute inset-0 opacity-40 dark:opacity-10" />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black dark:text-white mb-3">
              <span className="w-2 h-2 rounded-full bg-black dark:bg-white" />
              Let&apos;s Build
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight mb-4">
              Ready to build something extraordinary?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base mb-8 leading-relaxed">
              Tell us about your project — we&apos;ll reply with a scoping plan and itemized proposal within one business day.
            </p>

            <div className="space-y-6 mb-10">
              <a
                href="mailto:studioadspro888@gmail.com"
                className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 hover:bg-neutral-100/80 dark:hover:bg-neutral-900 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm font-semibold text-black dark:text-white">Email Us</strong>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">studioadspro888@gmail.com</span>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 hover:bg-neutral-100/80 dark:hover:bg-neutral-900 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm font-semibold text-black dark:text-white">Mobile / Phone</strong>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">+91 98765 43210</span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60">
                <div className="p-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm font-semibold text-black dark:text-white">Headquarters</strong>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Greater Noida, NCR, India</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60">
                <div className="p-2.5 rounded-lg bg-black dark:bg-white text-white dark:text-black shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-sm font-semibold text-black dark:text-white">Response Time</strong>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Guaranteed within 1 business day</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-3">
                Follow & Connect
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/StudioAdsPro5"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors"
                  aria-label="X Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-lg"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-name" className="block font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2 font-medium">
                      Your Name *
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-sm text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="block font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2 font-medium">
                      Email Address *
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-sm text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-phone" className="block font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2 font-medium">
                      Mobile Number
                    </label>
                    <input
                      id="cf-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-sm text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-company" className="block font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2 font-medium">
                      Company / Organization
                    </label>
                    <input
                      id="cf-company"
                      type="text"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-sm text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-service" className="block font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2 font-medium">
                      Primary Service Interested In
                    </label>
                    <select
                      id="cf-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-sm text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                    >
                      <option value="">Select a service</option>
                      <option>Full Stack Development</option>
                      <option>AI & Agent Development</option>
                      <option>Mobile App Development</option>
                      <option>UI/UX Design</option>
                      <option>Social Media & Meta Ads</option>
                      <option>Video Editing & Graphic Design</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cf-budget" className="block font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2 font-medium">
                      Budget Range
                    </label>
                    <select
                      id="cf-budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-sm text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                    >
                      <option value="">Select budget range</option>
                      <option>Under ₹25,000</option>
                      <option>₹25,000 – ₹75,000</option>
                      <option>₹75,000 – ₹2,00,000</option>
                      <option>₹2,00,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="cf-message" className="block font-mono text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2 font-medium">
                    Project Details & Goals *
                  </label>
                  <textarea
                    id="cf-message"
                    required
                    rows={4}
                    placeholder="Tell us what you're building, target launch date, or specific technical goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-sm text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-medium">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    <span>Sending Proposal Request...</span>
                  ) : (
                    <>
                      <span>Send Project Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center font-mono text-xs text-neutral-500 dark:text-neutral-400">
                  We respect your privacy. No spam — strictly business consultation.
                </p>
              </form>
            ) : (
              <div className="py-12 text-center animate-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-black dark:text-white mb-2">
                  Message & Proposal Request Received!
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 max-w-md mx-auto text-sm leading-relaxed mb-6">
                  Thank you for reaching out to StudioAdsPro. Our team will review your requirements and reply to <strong className="text-black dark:text-white">{formData.email}</strong> within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
