'use client';

import { motion } from 'framer-motion';
import GitHubIcon from '@/components/GitHubIcon';
import LiveTicker from '@/components/LiveTicker';
import { GITHUB_URL } from '@/lib/site';

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Hairline grid, faded toward the edges so it reads as ambient texture,
          not a hard-edged tile */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), ' +
            'linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
        }}
      />

      <div className="relative px-4 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="relative z-10 w-full max-w-6xl mx-auto text-left">
          {/* Eyebrow, a status line, not a badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45"
          >
            <span className="h-1.5 w-1.5 bg-primary animate-pulse-slow" />
            Open source · 5 ISOs · 60s refresh
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="max-w-3xl text-[clamp(2.4rem,5.6vw,4.25rem)] font-bold uppercase leading-[1.05] tracking-tight text-foreground mb-6"
          >
            Grid data the way{' '}
            <span className="text-primary">operators</span> see it.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[1.05rem] text-muted-foreground max-w-xl leading-relaxed mb-10"
          >
            Open-source infrastructure for real-time grid demand,
            interconnection queues, wholesale electricity prices, and
            renewable curtailment. Built for the people working the energy
            transition.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
          >
            <button
              onClick={() => scrollTo('tools')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all duration-200"
            >
              Explore live tools
              <span aria-hidden>→</span>
            </button>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-foreground border border-white/15 hover:border-white/30 hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
            >
              <GitHubIcon className="w-4 h-4" />
              View on GitHub
            </a>

            <button
              onClick={() => scrollTo('vision')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Read the vision
            </button>
          </motion.div>
        </div>
      </div>

      {/* Signature element: the actual live LMP feed, not a decorative graphic */}
      <LiveTicker />
    </section>
  );
};

export default Hero;
