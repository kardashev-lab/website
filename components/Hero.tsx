'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import GitHubIcon from '@/components/GitHubIcon';
import { GITHUB_URL } from '@/lib/site';

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center px-4 overflow-hidden">
      {/* Hero background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-energy-grid.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/90 via-[#030712]/70 to-[#030712]" />
      </div>

      {/* Radial orb — blue, top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full animate-orb-drift"
        style={{
          background:
            'radial-gradient(circle at center, rgba(59,130,246,0.13) 0%, transparent 70%)',
        }}
      />
      {/* Radial orb — emerald, bottom left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(16,185,129,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid bg-dot-sm opacity-100"
        style={{
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center pt-20 md:pt-0">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium bg-white/5 ring-1 ring-white/10 text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-slow" />
            Open Source · Kardashev Type I
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-white mb-6"
        >
          Building tools that{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
            }}
          >
            accelerate
          </span>
          <br />
          humanity&apos;s energy future
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
          className="text-[1.1rem] text-white/45 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Open-source software for real-time grid demand, interconnection
          queues, wholesale electricity prices, and renewable curtailment —
          built for the humans working on the energy transition.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          {/* Primary */}
          <button
            onClick={() => scrollTo('tools')}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-blue-500 text-white text-sm font-semibold hover:bg-blue-400 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_0_32px_rgba(59,130,246,0.3)]"
          >
            Explore Live Tools
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          {/* GitHub */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white ring-1 ring-white/15 hover:ring-white/30 bg-white/[0.06] hover:bg-white/10 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <GitHubIcon className="w-4 h-4" />
            View on GitHub
          </a>

          {/* Ghost */}
          <button
            onClick={() => scrollTo('vision')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white/50 hover:text-white/80 ring-1 ring-white/10 hover:ring-white/20 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            Read the vision
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-white/20">
            <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
