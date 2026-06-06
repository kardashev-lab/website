'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import GitHubIcon from '@/components/GitHubIcon';
import { GITHUB_URL } from '@/lib/site';

const tools = [
  {
    id: 'interconnection',
    live: true,
    eyebrow: 'Interconnection Queue Tracker',
    headline: 'Every US power project waiting to connect to the grid.',
    description:
      'Unified search across all 7 major ISO/RTO interconnection queues — ERCOT, MISO, PJM, CAISO, SPP, NYISO, ISO-NE. Daily refresh via GitHub Actions. One interface for the data that used to require 7 browser tabs.',
    stats: [
      { value: '7', label: 'ISOs covered' },
      { value: 'Daily', label: 'data refresh' },
      { value: 'GW+', label: 'queue capacity tracked' },
    ],
    url: 'https://interconnection-queue.kardashevlabs.org',
    accent: 'from-blue-500/20 to-blue-500/0',
    glow: 'rgba(59,130,246,0.12)',
    badge: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
    dot: 'bg-blue-400',
    button: 'bg-blue-500 hover:bg-blue-400 shadow-[0_0_24px_rgba(59,130,246,0.25)]',
    image: '/images/tool-interconnection.png',
    imageAlt: 'US interconnection queue dashboard preview',
    large: true,
  },
  {
    id: 'grid-demand',
    live: true,
    eyebrow: 'Grid Demand Dashboard',
    headline: 'Real-time US electricity demand across 15 balancing authorities.',
    description:
      'Microservices pipeline — Redis Streams, Postgres, Kubernetes with 17 HPAs. 95% CONUS coverage from EIA data. 23ms chaos recovery, 215 req/s under load.',
    stats: [
      { value: '15', label: 'balancing authorities' },
      { value: '95%', label: 'CONUS coverage' },
      { value: '23ms', label: 'chaos recovery' },
    ],
    url: 'https://grid-demand.kardashevlabs.org',
    accent: 'from-emerald-500/20 to-emerald-500/0',
    glow: 'rgba(16,185,129,0.1)',
    badge: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    dot: 'bg-emerald-400',
    button: 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.25)]',
    image: '/images/tool-grid-demand.png',
    imageAlt: 'Real-time grid demand dashboard preview',
    large: false,
  },
];

const ToolCard = ({
  tool,
  index,
}: {
  tool: (typeof tools)[0];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{
      duration: 0.8,
      delay: index * 0.12,
      ease: [0.16, 1, 0.3, 1],
    }}
    className="h-full"
  >
    {/* Outer shell (double-bezel) */}
    <div className="relative h-full p-px rounded-[2rem] bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02]">
      {/* Ambient glow behind card */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-60"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${tool.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Inner core */}
      <div className="relative h-full flex flex-col rounded-[calc(2rem-1px)] bg-white/[0.025] overflow-hidden p-6 sm:p-8 lg:p-10">
        {/* Top gradient accent */}
        <div
          className={`pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${tool.accent}`}
        />

        {/* Live badge */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8 min-w-0">
          <span
            className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] uppercase tracking-[0.15em] font-medium ring-1 ${tool.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${tool.dot} animate-pulse-slow`} />
            Live
          </span>
          <span className="text-[11px] uppercase tracking-[0.12em] text-white/25 font-medium font-mono truncate min-w-0">
            {tool.eyebrow}
          </span>
        </div>

        {/* Preview */}
        <div className="relative mb-8 aspect-[16/10] rounded-xl overflow-hidden ring-1 ring-white/10">
          <Image
            src={tool.image}
            alt={tool.imageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent" />
        </div>

        {/* Headline */}
        <h3 className="text-xl lg:text-2xl font-semibold text-white leading-snug mb-4">
          {tool.headline}
        </h3>

        {/* Description */}
        <p className="text-[0.88rem] text-white/40 leading-relaxed mb-8 flex-1">
          {tool.description}
        </p>

        {/* Stats strip */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 pb-8 border-b border-white/[0.06]">
          {tool.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-lg font-semibold text-white">
                {stat.value}
              </div>
              <div className="text-[11px] text-white/30 uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA (button-in-button) */}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${tool.button}`}
        >
          Open dashboard
          <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 8L8 2M8 2H4M8 2V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </motion.div>
);

const ToolsShowcase = () => (
  <section id="tools" className="py-16 lg:py-32 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 lg:mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium bg-white/5 ring-1 ring-white/10 text-white/40 mb-6">
          Live tools
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight max-w-xl">
          Open tools for open problems.
        </h2>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        <div className="lg:col-span-7">
          <ToolCard tool={tools[0]} index={0} />
        </div>
        <div className="lg:col-span-5">
          <ToolCard tool={tools[1]} index={1} />
        </div>
      </div>

      {/* GitHub CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 p-px rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 rounded-[calc(1rem-1px)] bg-white/[0.02] p-6 lg:p-8">
          <div className="flex items-start sm:items-center gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/8 ring-1 ring-white/10 flex items-center justify-center text-white/80">
              <GitHubIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">
                Open source on GitHub
              </p>
              <p className="text-[13px] text-white/35 leading-relaxed">
                Source code, data pipelines, and infrastructure — all public
                under kardashev-lab.
              </p>
            </div>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/15 ring-1 ring-white/15 hover:ring-white/25 active:scale-[0.98] transition-all duration-300 whitespace-nowrap self-start sm:self-auto"
          >
            github.com/kardashev-lab
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 8L8 2M8 2H4M8 2V6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ToolsShowcase;
