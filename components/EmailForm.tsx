'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          website: (e.target as HTMLFormElement).website?.value ?? '',
        }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage("You're in. Lab notes incoming.");
        setEmail('');
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Try again.');
    }
  };

  return (
    <section id="notes" className="py-16 lg:py-32 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border border-white/10 bg-white/[0.02] p-6 sm:p-10 lg:p-16"
        >
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
              <span className="h-1.5 w-1.5 bg-primary" />
              Lab Notes
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold uppercase text-foreground mb-4 leading-tight">
              Stay close to the work.
            </h2>
            <p className="text-[0.9rem] text-muted-foreground mb-10 leading-relaxed">
              Occasional notes on what we&apos;re building, what the data
              shows, and where we&apos;re going. No spam. Unsubscribe
              anytime.
            </p>

            <form onSubmit={handleSubmit} className="relative">
              {/* Honeypot: hidden from users, catches bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute opacity-0 h-0 w-0 pointer-events-none"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  disabled={status === 'loading'}
                  className="flex-1 px-5 py-3 border border-white/15 bg-white/[0.04] text-foreground placeholder:text-white/25 text-base sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/40 transition-all duration-300 disabled:opacity-40"
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:brightness-110 text-primary-foreground text-sm font-semibold active:scale-[0.98] disabled:opacity-40 transition-all duration-200 whitespace-nowrap"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Get notes'}
                  {status !== 'loading' && <span aria-hidden>→</span>}
                </button>
              </div>

              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-sm ${
                    status === 'success' ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {message}
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailForm;
