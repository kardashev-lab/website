import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TOOLS } from '@/lib/site';

export default function NotFound() {
  const featured = TOOLS.slice(0, 4);

  return (
    <>
      <Header />
      <main className="pt-28 pb-24 px-4 min-h-[70vh]">
        <div className="max-w-3xl mx-auto text-left">
          <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-red-400/80">
            <span className="h-1.5 w-1.5 bg-red-400 animate-pulse-slow" />
            Node offline
          </div>

          <h1 className="text-[clamp(3.5rem,12vw,7rem)] font-bold uppercase leading-none tracking-tight text-foreground mb-4">
            404
          </h1>
          <p className="text-[1.05rem] text-muted-foreground max-w-lg leading-relaxed mb-10">
            This page isn&apos;t on our grid. It may have moved, been renamed, or never
            existed at this address.
          </p>

          {/* status readout, small on-brand touch, not a generic error card */}
          <div className="mb-12 border border-white/10 bg-white/[0.02] font-mono text-[12px] text-white/45">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
              <span>REQUEST</span>
              <span className="text-white/70">unresolved</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
              <span>STATUS</span>
              <span className="text-red-400">404</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2.5">
              <span>SUGGESTED ACTION</span>
              <span className="text-white/70">return to a known node</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-16">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all duration-200"
            >
              Back to home
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/#tools"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-foreground border border-white/15 hover:border-white/30 hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
            >
              Explore live tools
            </Link>
          </div>

          <div className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-medium mb-3">
            Or jump straight to
          </div>
          <div className="flex flex-wrap gap-2">
            {featured.map((tool) => (
              <Link
                key={tool.id}
                href={tool.url}
                className="px-3 py-1.5 text-[12px] font-mono border border-white/15 text-white/50 hover:text-foreground hover:border-white/30 transition-colors duration-150"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
