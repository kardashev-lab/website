'use client';

import { useEffect, useState } from 'react';

type LmpPoint = {
  iso: string;
  node_name: string;
  lmp: number;
};

const FEED_ISOS = ['CAISO', 'NYISO', 'SPP', 'ERCOT', 'PJM'] as const;

async function fetchIso(iso: string): Promise<LmpPoint[]> {
  const res = await fetch(
    `https://data.kardashevlabs.org/lmp?iso=${iso}&market=RT&limit=4`,
    { cache: 'no-store' }
  );
  if (!res.ok) return [];
  const rows = (await res.json()) as Array<{
    iso: string;
    node_name: string;
    lmp: number;
  }>;
  return rows.map((r) => ({ iso: r.iso, node_name: r.node_name, lmp: r.lmp }));
}

const TickerRow = ({ points }: { points: LmpPoint[] }) => (
  <div className="flex items-center gap-10 pr-10" aria-hidden>
    {points.map((p, i) => (
      <span
        key={`${p.iso}-${p.node_name}-${i}`}
        className="flex items-center gap-2 font-mono text-[13px] tracking-tight whitespace-nowrap"
      >
        <span className="text-white/35">{p.iso}</span>
        <span className="text-white/60">{p.node_name}</span>
        <span className="text-primary font-medium">
          ${p.lmp.toFixed(2)}
        </span>
        <span className="text-white/20">/MWh</span>
      </span>
    ))}
  </div>
);

const clockFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const LiveClock = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(clockFormatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="flex-shrink-0 font-mono text-[13px] tabular-nums text-white/40 border-l border-white/10 pl-4">
      {time} ET
    </span>
  );
};

const LiveTicker = () => {
  const [points, setPoints] = useState<LmpPoint[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all(FEED_ISOS.map(fetchIso))
      .then((results) => {
        if (cancelled) return;
        const flat = results.flat();
        if (flat.length === 0) {
          setFailed(true);
        } else {
          setPoints(flat);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative border-y border-white/10 bg-white/[0.015] overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-4 py-3">
          <span className="flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
            Live LMP
          </span>

          {failed && (
            <a
              href="https://lmp.kardashevlabs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[13px] text-white/40 hover:text-white/70 transition-colors"
            >
              Feed unavailable right now — view the live dashboard →
            </a>
          )}

          {!failed && !points && (
            <span className="font-mono text-[13px] text-white/30">
              Connecting to live feed…
            </span>
          )}

          {!failed && points && (
            <div className="relative flex-1 overflow-hidden">
              <div className="flex animate-ticker-scroll motion-reduce:animate-none hover:[animation-play-state:paused]">
                <TickerRow points={points} />
                <TickerRow points={points} />
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
            </div>
          )}

          {!failed && points && <LiveClock />}
        </div>
      </div>
    </div>
  );
};

export default LiveTicker;
