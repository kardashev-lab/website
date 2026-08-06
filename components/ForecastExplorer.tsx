'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Axis,
  BandSeries,
  LineSeries,
  createTimeLinearScales,
  padDomain,
  splitByGap,
  toMs,
  clientToViewBoxX,
  closestIndex,
  substationTheme,
} from 'kardashev-charts';

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

function modelLabel(model: string): string {
  const m = model.match(/-v(\d+)-/);
  if (m) return `v${m[1]}`;
  return 'v1';
}

const W = 920;
const H = 320;
const PAD = { top: 16, right: 16, bottom: 28, left: 52 };

function fmtTick(t: number, spanHours: number): string {
  const d = new Date(t);
  const hour = d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: false, timeZone: 'UTC' }) + 'h';
  if (spanHours <= 30) return hour;
  const date = d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', timeZone: 'UTC' });
  return `${date} ${hour}`;
}

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
        setRows(normalized.sort((a, b) => toMs(a.ts) - toMs(b.ts)));
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

    const times = rows.map((r) => toMs(r.ts));
    const minT = Math.min(...times);
    const maxT = Math.max(...times);
    const spanT = maxT - minT || 1;

    const values: number[] = [];
    for (const r of rows) {
      values.push(r.p10, r.p90);
      if (r.spread != null) values.push(r.spread);
    }
    const [lo, hi] = padDomain(Math.min(...values), Math.max(...values), 0.1);

    const scales = createTimeLinearScales({
      width: W,
      height: H,
      xDomain: [minT, maxT],
      yDomain: [lo, hi],
      padding: PAD,
    });

    const byModel = new Map<string, HistoryRow[]>();
    for (const r of rows) {
      byModel.set(r.model, [...(byModel.get(r.model) ?? []), r]);
    }
    const models = Array.from(byModel.entries()).sort(
      (a, b) => toMs(a[1][0].ts) - toMs(b[1][0].ts)
    );

    const transitionT =
      mode === 'history' && models.length > 1 ? toMs(models[1][1][0].ts) : null;

    const zeroY = scales.y(0);
    const spanHours = spanT / 3_600_000;
    const tickCount = 6;
    const xTicks = Array.from({ length: tickCount }, (_, i) => {
      const t = minT + (spanT * i) / (tickCount - 1);
      return { value: new Date(t), label: fmtTick(t, spanHours) };
    });
    const yTicks = [lo, (lo + hi) / 2, hi].map((v) => ({
      value: v,
      label: v.toFixed(0),
    }));

    return { scales, models, lo, hi, zeroY, transitionT, xTicks, yTicks };
  }, [rows, mode]);

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!rows || rows.length === 0 || !chart) return;
    const px = clientToViewBoxX(e.currentTarget, e.clientX, W);
    const xs = rows.map((r) => chart.scales.x(new Date(r.ts)));
    const idx = closestIndex(xs, px);
    if (idx >= 0) setHoverTs(rows[idx].ts);
  };

  const hoveredRows = useMemo(
    () => (hoverTs && rows ? rows.filter((r) => r.ts === hoverTs) : []),
    [hoverTs, rows]
  );

  const hasRealized = mode === 'history';
  const theme = substationTheme;

  return (
    <div>
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
          {mode === 'history' ? 'already scored against reality' : "hasn't happened yet, pure forecast"}
        </span>
      </div>

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

      <p className="mb-3 text-[0.8rem] text-white/35 max-w-2xl leading-relaxed">
        The shaded area is the range the model claims 80% of outcomes will land in; the
        thin line inside it is its single best guess.
        {hasRealized
          ? ' The dots are what actually happened: amber if it landed inside the claimed range, red if the model missed.'
          : " Nothing's dotted yet because none of these hours have happened."}
      </p>

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
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={chart.zeroY}
                y2={chart.zeroY}
                stroke={theme.faint}
                strokeDasharray="4 4"
              />

              <Axis
                x={chart.scales.x}
                y={chart.scales.y}
                width={W}
                height={H}
                padding={PAD}
                theme="substation"
                xTicks={chart.xTicks}
                yTicks={chart.yTicks}
                yLabel="$/MWh"
                showGrid={false}
              />

              {chart.transitionT && (
                <>
                  <line
                    x1={chart.scales.x(new Date(chart.transitionT))}
                    x2={chart.scales.x(new Date(chart.transitionT))}
                    y1={PAD.top}
                    y2={H - PAD.bottom}
                    stroke="rgba(255,255,255,0.2)"
                    strokeDasharray="2 3"
                  />
                  <text
                    x={chart.scales.x(new Date(chart.transitionT)) + 4}
                    y={PAD.top + 10}
                    className="fill-white/35"
                    style={{ fontSize: 9, fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    model switch
                  </text>
                </>
              )}

              {chart.models.map(([model, mrows], mi) => {
                const color = mi === chart.models.length - 1 ? theme.accent : 'rgba(255,255,255,0.4)';
                const segments = splitByGap(mrows);
                return (
                  <g key={model}>
                    {segments.map((seg, si) => {
                      if (seg.length < 2) return null;
                      const bandPts = seg.map((r) => ({
                        x: chart.scales.x(new Date(r.ts)),
                        y0: chart.scales.y(r.p10),
                        y1: chart.scales.y(r.p90),
                      }));
                      const p50Pts = seg.map((r) => ({
                        x: chart.scales.x(new Date(r.ts)),
                        y: chart.scales.y(r.p50),
                      }));
                      return (
                        <g key={si}>
                          <BandSeries points={bandPts} fill={color} fillOpacity={0.12} curve="linear" />
                          <LineSeries points={p50Pts} stroke={color} strokeWidth={1.5} curve="linear" />
                        </g>
                      );
                    })}
                  </g>
                );
              })}

              {hasRealized &&
                rows
                  .filter((r) => r.spread != null)
                  .map((r, i) => (
                    <circle
                      key={i}
                      cx={chart.scales.x(new Date(r.ts))}
                      cy={chart.scales.y(r.spread!)}
                      r={2.5}
                      fill={r.covered ? theme.accent : theme.danger}
                    />
                  ))}

              {hoveredRows.length > 0 && (
                <line
                  x1={chart.scales.x(new Date(hoveredRows[0].ts))}
                  x2={chart.scales.x(new Date(hoveredRows[0].ts))}
                  y1={PAD.top}
                  y2={H - PAD.bottom}
                  stroke="rgba(255,255,255,0.25)"
                />
              )}
            </svg>

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
