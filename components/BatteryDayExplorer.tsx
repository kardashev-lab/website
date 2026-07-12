'use client';

import { useEffect, useMemo, useState } from 'react';

const NODES = [
  'HB_HOUSTON', 'HB_BUSAVG', 'HB_HUBAVG', 'HB_NORTH', 'HB_PAN', 'HB_SOUTH', 'HB_WEST',
  'LZ_AEN', 'LZ_CPS', 'LZ_HOUSTON', 'LZ_LCRA', 'LZ_NORTH', 'LZ_RAYBN', 'LZ_SOUTH', 'LZ_WEST',
];

type ModeSeries = { charge_mw: number[]; discharge_mw: number[]; soc_mwh: number[] };

type NodeSeries = {
  node: string;
  spec: { power_mw: number; duration_hours: number; max_cycles: number };
  ts: string[];
  rt: number[];
  da: number[];
  forecast_rt: number[];
  hindsight: ModeSeries;
  naive: ModeSeries;
  forecast_driven: ModeSeries;
};

const MODES = [
  { key: 'hindsight' as const, label: 'Hindsight', color: 'rgba(255,255,255,0.55)' },
  { key: 'naive' as const, label: 'Naive TOU', color: 'rgba(255,255,255,0.3)' },
  { key: 'forecast_driven' as const, label: 'Forecast-driven', color: '#FFB020' },
];

const W = 920;
const PRICE_H = 130;
const STRIP_H = 64;
const PAD_L = 56;
const PAD_R = 16;
const PAD_T = 12;
const GAP = 10;
const H = PRICE_H + PAD_T + MODES.length * (STRIP_H + GAP) + 24;

const usd = (v: number) =>
  `${v < 0 ? '-' : ''}$${Math.abs(v).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

export default function BatteryDayExplorer() {
  const [node, setNode] = useState('HB_HOUSTON');
  const [data, setData] = useState<NodeSeries | null>(null);
  const [failed, setFailed] = useState(false);
  const [dayIdx, setDayIdx] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setFailed(false);
    fetch(`/data/battery/${node}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((json: NodeSeries) => {
        if (cancelled) return;
        setData(json);
        setDayIdx(0);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [node]);

  const days = useMemo(() => {
    if (!data) return [];
    const set = new Set<string>();
    for (const t of data.ts) set.add(t.slice(0, 10));
    return Array.from(set).sort();
  }, [data]);

  const dayData = useMemo(() => {
    if (!data || days.length === 0) return null;
    const day = days[Math.min(dayIdx, days.length - 1)];
    const idxs: number[] = [];
    data.ts.forEach((t, i) => {
      if (t.startsWith(day)) idxs.push(i);
    });
    if (idxs.length < 2) return null;

    const hours = idxs.map((i) => Number(data.ts[i].slice(11, 13)));
    const rt = idxs.map((i) => data.rt[i]);
    const forecastRt = idxs.map((i) => data.forecast_rt[i]);

    const modeData = Object.fromEntries(
      MODES.map((m) => {
        const series = data[m.key];
        const charge = idxs.map((i) => series.charge_mw[i]);
        const discharge = idxs.map((i) => series.discharge_mw[i]);
        const soc = idxs.map((i) => series.soc_mwh[i]);
        const revenue = idxs.reduce((acc, i, k) => acc + (discharge[k] - charge[k]) * rt[k], 0);
        return [m.key, { charge, discharge, soc, revenue }];
      })
    ) as Record<'hindsight' | 'naive' | 'forecast_driven', { charge: number[]; discharge: number[]; soc: number[]; revenue: number }>;

    return { day, hours, rt, forecastRt, modeData };
  }, [data, days, dayIdx]);

  const chart = useMemo(() => {
    if (!dayData) return null;
    const n = dayData.hours.length;
    const x = (k: number) => PAD_L + (k / Math.max(n - 1, 1)) * (W - PAD_L - PAD_R);
    const priceVals = [...dayData.rt, ...dayData.forecastRt];
    const minP = Math.min(...priceVals);
    const maxP = Math.max(...priceVals);
    const padP = (maxP - minP) * 0.15 || 1;
    const lo = minP - padP;
    const hi = maxP + padP;
    const yPrice = (v: number) => PAD_T + (1 - (v - lo) / (hi - lo)) * PRICE_H;

    const capacity = data ? data.spec.power_mw * data.spec.duration_hours : 1;
    return { x, yPrice, lo, hi, n, capacity };
  }, [dayData, data]);

  if (failed) {
    return (
      <div className="h-[300px] flex items-center justify-center text-white/35 text-[0.85rem] font-mono border border-white/10 bg-white/[0.02]">
        Couldn&apos;t load hourly data for {node}.
      </div>
    );
  }

  return (
    <div>
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

      {/* Day scrubber */}
      {days.length > 0 && (
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => setDayIdx((i) => Math.max(0, i - 1))}
            disabled={dayIdx === 0}
            className="px-3 py-1.5 text-[12px] font-mono border border-white/15 text-white/50 hover:text-foreground hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none"
          >
            ← prev day
          </button>
          <input
            type="range"
            min={0}
            max={days.length - 1}
            value={dayIdx}
            onChange={(e) => setDayIdx(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <button
            onClick={() => setDayIdx((i) => Math.min(days.length - 1, i + 1))}
            disabled={dayIdx === days.length - 1}
            className="px-3 py-1.5 text-[12px] font-mono border border-white/15 text-white/50 hover:text-foreground hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none"
          >
            next day →
          </button>
          <span className="font-mono text-[13px] text-white/70 w-24 text-right">
            {dayData?.day ?? days[dayIdx]}
          </span>
        </div>
      )}

      {!data && !failed && (
        <div className="h-[300px] flex items-center justify-center text-white/30 text-[0.85rem] font-mono border border-white/10 bg-white/[0.02]">
          Loading {node}…
        </div>
      )}

      {dayData && chart && (
        <div className="border border-white/10 bg-white/[0.02] p-4 sm:p-6">
          {/* Revenue chips for this day */}
          <div className="mb-4 flex flex-wrap gap-3">
            {MODES.map((m) => (
              <div key={m.key} className="px-3 py-2 border border-white/10 bg-white/[0.02]">
                <div className="text-[10px] uppercase tracking-wider text-white/30 font-mono mb-0.5">
                  {m.label}
                </div>
                <div
                  className="font-mono text-sm font-semibold"
                  style={{ color: m.key === 'forecast_driven' ? '#FFB020' : 'rgba(255,255,255,0.8)' }}
                >
                  {usd(dayData.modeData[m.key].revenue)}
                </div>
              </div>
            ))}
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {/* price line */}
            <text x={PAD_L - 8} y={PAD_T + 4} textAnchor="end" className="fill-white/20" style={{ fontSize: 9, fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
              $/MWh
            </text>
            {[chart.lo, (chart.lo + chart.hi) / 2, chart.hi].map((v, i) => (
              <text
                key={i}
                x={PAD_L - 8}
                y={chart.yPrice(v)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-white/30"
                style={{ fontSize: 10, fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                {v.toFixed(0)}
              </text>
            ))}
            <path
              d={dayData.rt.map((v, k) => `${k ? 'L' : 'M'}${chart.x(k)},${chart.yPrice(v)}`).join(' ')}
              fill="none"
              stroke="#FFB020"
              strokeWidth={1.75}
            />
            <path
              d={dayData.forecastRt.map((v, k) => `${k ? 'L' : 'M'}${chart.x(k)},${chart.yPrice(v)}`).join(' ')}
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={1.25}
              strokeDasharray="3 3"
            />
            {dayData.hours.map((h, k) => (
              <text
                key={k}
                x={chart.x(k)}
                y={PRICE_H + PAD_T + 10}
                textAnchor="middle"
                className="fill-white/20"
                style={{ fontSize: 9, fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                {h}h
              </text>
            ))}

            {/* mode strips: charge (down, blue) / discharge (up, amber-tint) bars + SoC line */}
            {MODES.map((m, mi) => {
              const stripTop = PRICE_H + PAD_T + 22 + mi * (STRIP_H + GAP);
              const center = stripTop + STRIP_H / 2;
              const { charge, discharge, soc } = dayData.modeData[m.key];
              const barW = ((W - PAD_L - PAD_R) / chart.n) * 0.7;
              const maxSoc = chart.capacity || 1;
              const socY = (v: number) => stripTop + STRIP_H - (v / maxSoc) * STRIP_H;
              return (
                <g key={m.key}>
                  <text
                    x={PAD_L - 8}
                    y={stripTop + 10}
                    textAnchor="end"
                    className="fill-white/30"
                    style={{ fontSize: 9, fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    {m.label}
                  </text>
                  <line x1={PAD_L} x2={W - PAD_R} y1={center} y2={center} stroke="rgba(255,255,255,0.08)" />
                  {charge.map((c, k) => {
                    if (c <= 0) return null;
                    const hpx = (c / (data!.spec.power_mw || 1)) * (STRIP_H / 2);
                    return (
                      <rect
                        key={`c${k}`}
                        x={chart.x(k) - barW / 2}
                        y={center}
                        width={barW}
                        height={hpx}
                        fill="rgba(96,165,250,0.6)"
                      />
                    );
                  })}
                  {discharge.map((dsc, k) => {
                    if (dsc <= 0) return null;
                    const hpx = (dsc / (data!.spec.power_mw || 1)) * (STRIP_H / 2);
                    return (
                      <rect
                        key={`d${k}`}
                        x={chart.x(k) - barW / 2}
                        y={center - hpx}
                        width={barW}
                        height={hpx}
                        fill={m.key === 'forecast_driven' ? '#FFB020' : 'rgba(255,176,32,0.45)'}
                      />
                    );
                  })}
                  <path
                    d={soc.map((v, k) => `${k ? 'L' : 'M'}${chart.x(k)},${socY(v)}`).join(' ')}
                    fill="none"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth={1}
                    strokeDasharray="2 2"
                  />
                </g>
              );
            })}
          </svg>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-px bg-primary" /> real-time price
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-px bg-white/35" style={{ borderTop: '1px dashed' }} /> forecast price
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5" style={{ background: 'rgba(96,165,250,0.6)' }} /> charging
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 bg-primary" /> discharging
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 border-t border-dashed border-white/55" /> state of charge
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
