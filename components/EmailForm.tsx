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
        body: JSON.stringify({ email }),
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
    <section id="notes" className="py-16 lg:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Outer shell */}
          <div className="p-px rounded-[2rem] bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02]">
            <div className="rounded-[calc(2rem-1px)] bg-white/[0.02] p-6 sm:p-10 lg:p-16">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium bg-white/5 ring-1 ring-white/10 text-white/40 mb-6">
                  Lab Notes
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  Stay close to the work.
                </h2>
                <p className="text-[0.9rem] text-white/38 mb-10 leading-relaxed">
                  Occasional notes on what we&apos;re building, what the data
                  shows, and where we&apos;re going. No spam. Unsubscribe
                  anytime.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Input outer shell */}
                    <div className="flex-1 p-px rounded-full bg-white/8">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        disabled={status === 'loading'}
                        className="w-full px-5 py-3 rounded-full bg-white/[0.04] text-white placeholder:text-white/25 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-40"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold active:scale-[0.98] disabled:opacity-40 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_0_24px_rgba(59,130,246,0.25)] whitespace-nowrap"
                    >
                      {status === 'loading' ? 'Subscribing…' : 'Get notes'}
                      {status !== 'loading' && (
                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      )}
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailForm;
