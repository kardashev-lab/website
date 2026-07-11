'use client';

import { useEffect, useMemo, useState } from 'react';

const API = 'https://data.kardashevlabs.org';

const NODES = [
  'HB_HOUSTON', 'HB_BUSAVG', 'HB_HUBAVG', 'HB_NORTH', 'HB_PAN', 'HB_SOUTH', 'HB_WEST',
  'LZ_AEN', 'LZ_CPS', 'LZ_HOUSTON', 'LZ_LCRA', 'LZ_NORTH', 'LZ_RAYBN', 'LZ_SOUTH', 'LZ_WEST',
];

const DAY_OPTIONS = [3, 7, 14] as const;

type HistoryRow = {
  ts: string;
  p10: number;
  p50: number;
  p90: number;
  da: number;
  issued_at: string;
  model: string;
  rt: number | null;
  spread: number | null;
  covered: boolean | null;
  side: number | null;
  pnl: number | null;
};

// short human label for a model tag, e.g. "tft-v2-2026q3" -> "v2"
function modelLabel(model: string): string {
  const m = model.match(/-v(\d+)-/);
  if (m) return `v${m[1]}`;
  return 'v1';
}

const W = 920;
const H = 320;
const PAD_L = 52;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 28;

export default function ForecastExplorer() {
  const [mode, setMode] = useState<'history' | 'live'>('history');
  const [node, setNode] = useState('HB_HOUSTON');
  const [days, setDays] = useState<number>(7);
  const [rows, setRows] = useState<HistoryRow[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [hoverTs, setHoverTs] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setRows(null);
    setFailed(false);
    setHoverTs(null);

    const url =
      mode === 'history'
        ? `${API}/forecast/spread/history?node_id=${node}&days=${days}`
        : `${API}/forecast/spread/latest?node_id=${node}`;

    fetch(url, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data: Array<Partial<HistoryRow>>) => {
        if (cancelled) return;
        if (!Array.isArray(data) || data.length === 0) {
          setFailed(true);
          return;
        }
        // /spread/latest doesn't carry realized-outcome fields at all (nothing
        // has happened yet) — normalize to the same shape as history rows.
        const normalized: HistoryRow[] = data.map((r) => ({
          ts: r.ts!,
          p10: r.p10!,
          p50: r.p50!,
          p90: r.p90!,
          da: r.da!,
          issued_at: r.issued_at!,
          model: r.model!,
          rt: r.rt ?? null,
          spread: r.spread ?? null,
          covered: r.covered ?? null,
          side: r.side ?? null,
          pnl: r.pnl ?? null,
        }));
        setRows(normalized.sort((a, b) => +new Date(a.ts) - +new Date(b.ts)));
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [node, days, mode]);

  const chart = useMemo(() => {
    if (!rows || rows.length === 0) return null;

    const times = rows.map((r) => +new Date(r.ts));
    const minT = Math.min(...times);
    const maxT = Math.max(...times);
    const spanT = maxT - minT || 1;

    const values: number[] = [];
    for (const r of rows) {
      values.push(r.p10, r.p90);
      if (r.spread != null) values.push(r.spread);
    }
    const minV = Math.min(...values);
    const maxV = Math.max(...values);
    const padV = (maxV - minV) * 0.1 || 1;
    const lo = minV - padV;
    const hi = maxV + padV;

    const x = (t: number) => PAD_L + ((t - minT) / spanT) * (W - PAD_L - PAD_R);
    const y = (v: number) => PAD_T + (1 - (v - lo) / (hi - lo)) * (H - PAD_T - PAD_B);

    const byModel = new Map<string, HistoryRow[]>();
    for (const r of rows) {
      byModel.set(r.model, [...(byModel.get(r.model) ?? []), r]);
    }
    const models = Array.from(byModel.entries()).sort(
      (a, b) => +new Date(a[1][0].ts) - +new Date(b[1][0].ts)
    );

    // vertical marker where the active model switches — only meaningful in
    // history mode. In live mode both models forecast the same upcoming
    // window concurrently, so there's no real "switch" to point at.
    const transitionT =
      mode === 'history' && models.length > 1 ? +new Date(models[1][1][0].ts) : null;

    const zeroY = y(0);

    return { x, y, models, minT, maxT, lo, hi, zeroY, transitionT };
  }, [rows, mode]);

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!rows || rows.length === 0) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    let closestTs = rows[0].ts;
    let closestDist = Infinity;
    rows.forEach((r) => {
      const t = +new Date(r.ts);
      const rx = chart ? chart.x(t) : 0;
      const d = Math.abs(rx - px);
      if (d < closestDist) {
        closestDist = d;
        closestTs = r.ts;
      }
    });
    setHoverTs(closestTs);
  };

  // both models can hold a forecast for the same hour now, so show every
  // call for the hovered timestamp rather than picking one arbitrarily
  const hoveredRows = useMemo(
    () => (hoverTs && rows ? rows.filter((r) => r.ts === hoverTs) : []),
    [hoverTs, rows]
  );

  const hasRealized = mode === 'history';

  return (
    <div>
      {/* Mode toggle */}
      <div className="mb-5 flex gap-2">
        {(
          [
            { key: 'history' as const, label: 'History', hint: 'already scored' },
            { key: 'live' as const, label: 'Live', hint: "next 24h, unresolved" },
          ]
        ).map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2 text-[12px] font-mono uppercase tracking-wider border transition-colors duration-150 flex items-center gap-2 ${
              mode === m.key
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-white/15 text-white/50 hover:text-foreground hover:border-white/30'
            }`}
          >
            {m.key === 'live' && (
              <span className={`h-1.5 w-1.5 ${mode === 'live' ? 'bg-primary-foreground' : 'bg-primary'} animate-pulse-slow`} />
            )}
            {m.label}
          </button>
        ))}
        <span className="self-center text-[0.78rem] text-white/30 font-mono ml-1">
          {mode === 'history' ? 'already scored against reality' : "hasn't happened yet — pure forecast"}
        </span>
      </div>

      {/* Node picker */}
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-medium mb-2">
          Pick a node
        </div>
        <div className="flex flex-wrap gap-2">
          {NODES.map((n) => (
            <button
              key={n}
              onClick={() => setNode(n)}
              className={`px-3 py-1.5 text-[12px] font-mono border transition-colors duration-150 ${
                n === node
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-white/15 text-white/50 hover:text-foreground hover:border-white/30'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Day range picker (history mode only — live is always "next 24h") */}
      {mode === 'history' && (
        <div className="mb-6 flex items-center gap-4">
          <div className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-medium">
            Window
          </div>
          <div className="flex gap-2">
            {DAY_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1 text-[12px] font-mono border transition-colors duration-150 ${
                  d === days
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-white/15 text-white/50 hover:text-foreground hover:border-white/30'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
      )}
      {mode === 'live' && <div className="mb-6" />}

      <div className="border border-white/10 bg-white/[0.02] p-4 sm:p-6">
        {failed && (
          <div className="h-[320px] flex items-center justify-center text-white/35 text-[0.85rem] font-mono text-center px-6">
            {mode === 'history'
              ? `No scored history for ${node} in the last ${days} days yet.`
              : `No live forecast issued for ${node} yet.`}
          </div>
        )}

        {!failed && !rows && (
          <div className="h-[320px] flex items-center justify-center text-white/30 text-[0.85rem] font-mono">
            Loading {node}…
          </div>
        )}

        {!failed && rows && chart && (
          <>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto"
              onMouseMove={handleMove}
              onMouseLeave={() => setHoverTs(null)}
            >
              {/* zero line */}
              <line
                x1={PAD_L} x2={W - PAD_R} y1={chart.zeroY} y2={chart.zeroY}
                stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4"
              />
              {/* y-axis labels */}
              {[chart.lo, (chart.lo + chart.hi) / 2, chart.hi].map((v, i) => (
                <text
                  key={i}
                  x={PAD_L - 8}
                  y={chart.y(v)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-white/30"
                  style={{ fontSize: 10, fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  {v.toFixed(0)}
                </text>
              ))}

              {/* model transition marker (history mode only) */}
              {chart.transitionT && (
                <>
                  <line
                    x1={chart.x(chart.transitionT)} x2={chart.x(chart.transitionT)}
                    y1={PAD_T} y2={H - PAD_B}
                    stroke="rgba(255,255,255,0.2)" strokeDasharray="2 3"
                  />
                  <text
                    x={chart.x(chart.transitionT) + 4}
                    y={PAD_T + 10}
                    className="fill-white/35"
                    style={{ fontSize: 9, fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    model switch
                  </text>
                </>
              )}

              {/* per-model band + p50 line */}
              {chart.models.map(([model, mrows], mi) => {
                const color = mi === chart.models.length - 1 ? '#FFB020' : 'rgba(255,255,255,0.4)';
                const upper = mrows.map((r) => `${chart.x(+new Date(r.ts))},${chart.y(r.p90)}`);
                const lower = mrows
                  .slice()
                  .reverse()
                  .map((r) => `${chart.x(+new Date(r.ts))},${chart.y(r.p10)}`);
                const bandPath = `M${upper.join(' L')} L${lower.join(' L')} Z`;
                const p50Path = mrows
                  .map((r, i) => `${i ? 'L' : 'M'}${chart.x(+new Date(r.ts))},${chart.y(r.p50)}`)
                  .join(' ');
                return (
                  <g key={model}>
                    <path d={bandPath} fill={color} fillOpacity={0.12} />
                    <path d={p50Path} fill="none" stroke={color} strokeWidth={1.5} />
                  </g>
                );
              })}

              {/* realized spread markers (history mode only) */}
              {hasRealized &&
                rows
                  .filter((r) => r.spread != null)
                  .map((r, i) => (
                    <circle
                      key={i}
                      cx={chart.x(+new Date(r.ts))}
                      cy={chart.y(r.spread!)}
                      r={2.5}
                      fill={r.covered ? '#FFB020' : '#f87171'}
                    />
                  ))}

              {/* hover guideline */}
              {hoveredRows.length > 0 && (
                <line
                  x1={chart.x(+new Date(hoveredRows[0].ts))} x2={chart.x(+new Date(hoveredRows[0].ts))}
                  y1={PAD_T} y2={H - PAD_B}
                  stroke="rgba(255,255,255,0.25)"
                />
              )}
            </svg>

            {/* legend + tooltip */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-px bg-primary" /> current model band / median
              </span>
              {chart.models.length > 1 && (
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-px bg-white/40" /> earlier model
                </span>
              )}
              {hasRealized && (
                <>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary" /> realized, inside range
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-400" /> realized, missed range
                  </span>
                </>
              )}
            </div>

            <div className="mt-4 min-h-[60px] border-t border-white/10 pt-4">
              {hoveredRows.length > 0 ? (
                <div className="space-y-1.5">
                  <div className="text-white/50 text-[0.82rem] font-mono">
                    {hoveredRows[0].ts.replace('T', ' ').slice(0, 16)} UTC
                  </div>
                  {hoveredRows.map((r) => (
                    <div key={r.model} className="flex flex-wrap gap-x-8 gap-y-1 text-[0.82rem] font-mono">
                      <span className="text-white/30 w-8">{modelLabel(r.model)}</span>
                      <span className="text-white/70">
                        called p10/p50/p90: {r.p10.toFixed(2)} / {r.p50.toFixed(2)} / {r.p90.toFixed(2)}
                      </span>
                      {r.spread != null ? (
                        <span className={r.covered ? 'text-primary' : 'text-red-400'}>
                          actual: {r.spread.toFixed(2)} ({r.covered ? 'inside range' : 'missed range'})
                        </span>
                      ) : (
                        <span className="text-white/30">
                          {mode === 'live' ? 'not delivered yet' : 'not settled yet'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[0.8rem] text-white/30 font-mono">
                  Hover the chart to see the model&apos;s exact call for any hour.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
