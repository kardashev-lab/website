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
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: {
      duration: 0.55,
      delay: Math.min(index * 0.05, 0.35),
      ease: [0.16, 1, 0.3, 1],
    },
  } as const;

  return (
    <motion.div className="h-full" {...motionProps}>
      <div className="relative h-full flex flex-col border border-white/10 bg-white/[0.02] overflow-hidden p-4 sm:p-5">
        <div
          className={`pointer-events-none absolute top-0 left-0 right-0 h-px ${tool.theme.dot}`}
        />

        {tool.image ? (
          <div className="relative mb-4 aspect-[16/9] overflow-hidden border border-white/10">
            <Image
              src={tool.image}
              alt={tool.imageAlt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
          </div>
        ) : null}

        <div className="flex items-center gap-2 mb-3 min-w-0 font-mono text-[10px] uppercase tracking-[0.12em]">
          <span className="flex-shrink-0 flex items-center gap-1.5 text-white/45">
            <span className={`w-1.5 h-1.5 ${tool.theme.dot} animate-pulse-slow`} />
            Live
          </span>
          <span className="text-white/25 truncate min-w-0">{tool.name}</span>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-foreground leading-snug mb-2">
          {tool.headline}
        </h3>

        <p className="text-[0.8rem] text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
          {tool.blurb}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 pb-4 border-b border-white/10">
          {tool.stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-sm font-semibold text-foreground">
                {stat.value}
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <a
          href={tool.url}
          {...(tool.url.startsWith('http')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          className="group self-start inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] font-semibold text-foreground border border-white/15 hover:border-white/30 hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
        >
          {tool.url.startsWith('http') ? 'Open dashboard' : 'Open track record'}
          <span
            aria-hidden
            className="group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300"
          >
            →
          </span>
        </a>
      </div>
    </motion.div>
  );
};

const ToolsShowcase = () => (
  <section id="tools" className="py-14 lg:py-24 px-4 border-t border-white/10">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 lg:mb-12"
      >
        <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
          <span className="h-1.5 w-1.5 bg-primary" />
          Live tools
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold uppercase text-foreground leading-tight max-w-xl">
          Open tools for open problems.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
        {TOOLS.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-white/10 bg-white/[0.02] p-4 lg:p-5"
      >
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex-shrink-0 w-9 h-9 border border-white/10 flex items-center justify-center text-white/80">
            <GitHubIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-0.5">
              Open source on GitHub
            </p>
            <p className="text-[12px] text-white/35 leading-relaxed">
              Source code, data pipelines, and infrastructure, all public under
              kardashev-lab.
            </p>
          </div>
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 px-4 py-2 text-[13px] font-semibold text-foreground border border-white/15 hover:border-white/30 hover:bg-white/5 active:scale-[0.98] transition-all duration-200 sm:whitespace-nowrap self-start sm:self-auto"
        >
          github.com/kardashev-lab
          <span
            aria-hidden
            className="group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300"
          >
            →
          </span>
        </a>
      </motion.div>
    </div>
  </section>
);

export default ToolsShowcase;
