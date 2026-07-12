'use client';

import { useMemo, useState } from 'react';
import battery from '@/data/battery-dispatch.json';

const NODES = [
  'HB_HOUSTON', 'HB_BUSAVG', 'HB_HUBAVG', 'HB_NORTH', 'HB_PAN', 'HB_SOUTH', 'HB_WEST',
  'LZ_AEN', 'LZ_CPS', 'LZ_HOUSTON', 'LZ_LCRA', 'LZ_NORTH', 'LZ_RAYBN', 'LZ_SOUTH', 'LZ_WEST',
];

type MonthRow = {
  month: string;
  hindsight: number;
  naive: number;
  forecast_driven: number;
  capture_vs_hindsight: number | null;
};

type BatteryData = {
  spec: { power_mw: number; duration_hours: number; max_cycles: number };
  nodes: Record<string, MonthRow[]>;
};

const DATA = battery as unknown as BatteryData;

const W = 920;
const H = 320;
const PAD_L = 56;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 32;

const usd = (v: number) =>
  `${v < 0 ? '-' : ''}$${Math.abs(v).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

const monthLabel = (m: string) => {
  const [y, mo] = m.split('-');
  return new Date(Number(y), Number(mo) - 1, 1).toLocaleDateString('en-US', {
    month: 'short',
    year: '2-digit',
  });
};

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="p-5 border border-white/10 bg-white/[0.02]">
      <div className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-medium mb-2">
        {label}
      </div>
      <div className="font-mono text-2xl font-semibold text-foreground">{value}</div>
      {sub && <div className="text-[0.78rem] text-white/35 mt-1">{sub}</div>}
    </div>
  );
}

export default function BatteryExplorer() {
  const [node, setNode] = useState('HB_HOUSTON');
  const [hoverMonth, setHoverMonth] = useState<string | null>(null);

  const rows = useMemo(() => DATA.nodes[node] ?? [], [node]);

  const totals = useMemo(() => {
    if (rows.length === 0) return null;
    const sum = (k: 'hindsight' | 'naive' | 'forecast_driven') =>
      rows.reduce((acc, r) => acc + r[k], 0);
    const hindsight = sum('hindsight');
    const naive = sum('naive');
    const forecastDriven = sum('forecast_driven');
    const captures = rows.map((r) => r.capture_vs_hindsight).filter((c): c is number => c != null);
    const avgCapture = captures.reduce((a, b) => a + b, 0) / captures.length;
    return { hindsight, naive, forecastDriven, avgCapture, edge: forecastDriven - naive };
  }, [rows]);

  const chart = useMemo(() => {
    if (rows.length === 0) return null;
    const allValues = rows.flatMap((r) => [r.hindsight, r.naive, r.forecast_driven]);
    const minV = Math.min(0, ...allValues);
    const maxV = Math.max(...allValues);
    const padV = (maxV - minV) * 0.1 || 1;
    const lo = minV - padV;
    const hi = maxV + padV;

    const groupW = (W - PAD_L - PAD_R) / rows.length;
    const barW = groupW / 5;

    const y = (v: number) => PAD_T + (1 - (v - lo) / (hi - lo)) * (H - PAD_T - PAD_B);
    const zeroY = y(0);

    return { lo, hi, y, zeroY, groupW, barW };
  }, [rows]);

  const hovered = rows.find((r) => r.month === hoverMonth) ?? null;

  return (
    <div>
      {/* Node picker */}
      <div className="mb-6">
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

      {/* Summary stats */}
      {totals && (
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat label="Hindsight ceiling" value={usd(totals.hindsight)} sub="perfect foresight, 12mo" />
          <Stat label="Naive TOU" value={usd(totals.naive)} sub="fixed clock schedule" />
          <Stat label="Forecast-driven" value={usd(totals.forecastDriven)} sub="our TFT model, 12mo" />
          <Stat
            label="Model edge vs. naive"
            value={usd(totals.edge)}
            sub={`${(totals.avgCapture * 100).toFixed(0)}% avg capture of ceiling`}
          />
        </div>
      )}

      <p className="mb-3 text-[0.8rem] text-white/35 max-w-2xl leading-relaxed">
        1MW / 2MWh battery, {DATA.spec.max_cycles} cycle/day cap. Three modes solved on real
        ERCOT settlement prices: <span className="text-white/55">hindsight</span> plans against
        prices that already happened (the ceiling no real operator can reach);{' '}
        <span className="text-white/55">naive TOU</span> follows a fixed charge/discharge clock
        with no price awareness at all; <span className="text-primary">forecast-driven</span>{' '}
        plans each day against our published TFT forecast, then settles at the real price —
        what this battery would actually have earned running the model live.
      </p>

      <div className="border border-white/10 bg-white/[0.02] p-4 sm:p-6">
        {chart && (
          <>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto"
              onMouseLeave={() => setHoverMonth(null)}
            >
              {/* zero line */}
              <line
                x1={PAD_L} x2={W - PAD_R} y1={chart.zeroY} y2={chart.zeroY}
                stroke="rgba(255,255,255,0.15)"
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
                  {usd(v)}
                </text>
              ))}

              {/* bars */}
              {rows.map((r, i) => {
                const gx = PAD_L + i * chart.groupW;
                const bars: { key: string; v: number; color: string; dx: number }[] = [
                  { key: 'hindsight', v: r.hindsight, color: 'rgba(255,255,255,0.35)', dx: 0.5 },
                  { key: 'naive', v: r.naive, color: 'rgba(255,255,255,0.15)', dx: 1.6 },
                  { key: 'forecast_driven', v: r.forecast_driven, color: '#FFB020', dx: 2.7 },
                ];
                return (
                  <g
                    key={r.month}
                    onMouseEnter={() => setHoverMonth(r.month)}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect
                      x={gx} y={PAD_T} width={chart.groupW} height={H - PAD_T - PAD_B}
                      fill={hoverMonth === r.month ? 'rgba(255,255,255,0.03)' : 'transparent'}
                    />
                    {bars.map((b) => {
                      const barY = Math.min(chart.y(b.v), chart.zeroY);
                      const barH = Math.abs(chart.y(b.v) - chart.zeroY);
                      return (
                        <rect
                          key={b.key}
                          x={gx + b.dx * chart.barW}
                          y={barY}
                          width={chart.barW * 0.9}
                          height={Math.max(barH, 0.5)}
                          fill={b.color}
                        />
                      );
                    })}
                    <text
                      x={gx + chart.groupW / 2}
                      y={H - PAD_B + 16}
                      textAnchor="middle"
                      className="fill-white/30"
                      style={{ fontSize: 10, fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                    >
                      {monthLabel(r.month)}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* legend */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5" style={{ background: 'rgba(255,255,255,0.35)' }} /> hindsight
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5" style={{ background: 'rgba(255,255,255,0.15)' }} /> naive TOU
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 bg-primary" /> forecast-driven
              </span>
            </div>

            <div className="mt-4 min-h-[52px] border-t border-white/10 pt-4">
              {hovered ? (
                <div className="flex flex-wrap gap-x-8 gap-y-1 text-[0.82rem] font-mono">
                  <span className="text-white/50 w-16">{monthLabel(hovered.month)}</span>
                  <span className="text-white/70">hindsight {usd(hovered.hindsight)}</span>
                  <span className="text-white/70">naive {usd(hovered.naive)}</span>
                  <span className="text-primary">
                    forecast-driven {usd(hovered.forecast_driven)}
                    {hovered.capture_vs_hindsight != null &&
                      ` (${(hovered.capture_vs_hindsight * 100).toFixed(0)}% capture)`}
                  </span>
                </div>
              ) : (
                <div className="text-[0.8rem] text-white/30 font-mono">
                  Hover a month to see exact figures.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
