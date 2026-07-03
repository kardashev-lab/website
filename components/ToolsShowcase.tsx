'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import GitHubIcon from '@/components/GitHubIcon';
import { GITHUB_URL, TOOLS, type Tool } from '@/lib/site';

const ToolCard = ({
  tool,
  index,
}: {
  tool: Tool;
  index: number;
}) => {
  const motionProps = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] },
  } as const;

  const content = (
    <>
      {/* Live badge */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8 min-w-0">
        <span
          className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] uppercase tracking-[0.15em] font-medium ring-1 ${tool.theme.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${tool.theme.dot} animate-pulse-slow`} />
          Live
        </span>
        <span className="text-[11px] uppercase tracking-[0.12em] text-white/25 font-medium font-mono truncate min-w-0">
          {tool.name}
        </span>
      </div>

      {/* Headline */}
      <h3 className="text-xl lg:text-2xl font-semibold text-white leading-snug mb-4">
        {tool.headline}
      </h3>

      {/* Description */}
      <p className="text-[0.88rem] text-white/40 leading-relaxed mb-8 flex-1">
        {tool.blurb}
      </p>

      {/* Stats strip */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 pb-8 border-b border-white/[0.06]">
        {tool.stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-mono text-lg font-semibold text-white">{stat.value}</div>
            <div className="text-[11px] text-white/30 uppercase tracking-wider mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${tool.theme.button}`}
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
    </>
  );

  return (
    <motion.div className="h-full" {...motionProps}>
      <div className="relative h-full p-px rounded-[2rem] bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02]">
        <div
          className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-60"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${tool.theme.glow} 0%, transparent 70%)`,
          }}
        />
        <div className="relative h-full flex flex-col rounded-[calc(2rem-1px)] bg-white/[0.025] overflow-hidden p-6 sm:p-8 lg:p-10">
          <div
            className={`pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${tool.theme.accent}`}
          />

          {/* Preview image */}
          {tool.image && (
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
          )}

          {content}
        </div>
      </div>
    </motion.div>
  );
};

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

      {/* Tools grid: 2 per row, last card spans full width if count is odd */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
        {TOOLS.map((tool, i) => (
          <div
            key={tool.id}
            className={
              TOOLS.length % 2 !== 0 && i === TOOLS.length - 1
                ? 'lg:col-span-2'
                : ''
            }
          >
            <ToolCard tool={tool} index={i} />
          </div>
        ))}
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
                Source code, data pipelines, and infrastructure, all public
                under kardashev-lab.
              </p>
            </div>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/15 ring-1 ring-white/15 hover:ring-white/25 active:scale-[0.98] transition-all duration-300 sm:whitespace-nowrap self-start sm:self-auto"
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
