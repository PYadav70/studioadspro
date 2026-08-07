'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, Mail, Sparkles } from 'lucide-react';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

export default function NewsletterSignup({
  title = "Stay Ahead in Tech & Growth",
  description = "Get exclusive weekly insights on digital marketing trends, AI tools, and engineering strategies.",
  className = "",
  compact = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing!');
        setEmail('');

        // Store backup in localStorage
        try {
          const existingLeads = JSON.parse(localStorage.getItem('studioadspro_leads') || '[]');
          existingLeads.push({ email, timestamp: new Date().toISOString() });
          localStorage.setItem('studioadspro_leads', JSON.stringify(existingLeads));
        } catch {
          
        }

        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to subscribe. Please try again.');
      }
    } catch {
      // Fallback local save
      try {
        const existingLeads = JSON.parse(localStorage.getItem('studioadspro_leads') || '[]');
        existingLeads.push({ email, timestamp: new Date().toISOString() });
        localStorage.setItem('studioadspro_leads', JSON.stringify(existingLeads));
      } catch {
        // ignore
      }
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  if (compact) {
    return (
      <div className={`space-y-3 ${className}`}>
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <div className="relative flex-1">
            <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Enter your work email"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-4 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs whitespace-nowrap hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md disabled:opacity-75"
          >
            {status === 'loading' ? (
              <span className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
            ) : status === 'success' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                <span>Subscribed</span>
              </>
            ) : (
              <>
                <span>Join</span>
                <Send className="w-3 h-3" />
              </>
            )}
          </motion.button>
        </form>

        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`text-[11px] font-medium ${
                status === 'error'
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 relative overflow-hidden backdrop-blur-sm ${className}`}>
      {/* Subtle Glow background */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Weekly Growth Dispatch</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-black dark:text-white tracking-tight mb-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
          {description}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Enter your work email address"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-3.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-sm whitespace-nowrap hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg disabled:opacity-75"
          >
            {status === 'loading' ? (
              <span className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
            ) : status === 'success' ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                <span>Subscribed!</span>
              </>
            ) : (
              <>
                <span>Subscribe Free</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </form>

        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-3 text-xs font-medium ${
                status === 'error'
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-3 block">
          No spam, ever. Unsubscribe at any time with one click.
        </span>
      </div>
    </div>
  );
}
