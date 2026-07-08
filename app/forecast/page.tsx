import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ERCOT Spread Forecast — Live Track Record | Kardashev Labs',
  description:
    'Daily day-ahead RT-DA spread forecasts for 15 ERCOT hubs and load zones, published before delivery and scored against realized prices. Every forecast is immutable once issued.',
};

const API = (process.env.KARDASHEV_API_URL ?? 'https://data.kardashevlabs.org').replace(/\/$/, '');

type Summary = {
  first_hour: string | null;
  last_hour: string | null;
  node_hours: number;
  mae_model: number | null;
  mae_da: number | null;
  coverage: number | null;
  hours_traded: number;
  hit_rate: number | null;
  total_pnl: number | null;
};

type Daily = { day: string; pnl: number | null; hours_traded: number; coverage: number | null };

type ForecastRow = {
  ts: string;
  node_id: string;
  issued_at: string;
  p10: number;
  p50: number;
  p90: number;
  da: number;
};

async function getJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const fmt = (v: number | null | undefined, digits = 2) =>
  v == null ? '—' : Number(v).toFixed(digits);
const pct = (v: number | null | undefined) =>
  v == null ? '—' : `${(Number(v) * 100).toFixed(1)}%`;
const usd = (v: number | null | undefined) =>
  v == null ? '—' : `${v < 0 ? '-' : ''}$${Math.abs(Number(v)).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const day = (s: string) => s.slice(0, 10);

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06]">
      <div className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-medium mb-2">
        {label}
      </div>
      <div className="font-mono text-2xl font-semibold text-white">{value}</div>
      {sub && <div className="text-[0.78rem] text-white/35 mt-1">{sub}</div>}
    </div>
  );
}

function PnlSpark({ daily }: { daily: Daily[] }) {
  const pts = daily.filter((d) => d.pnl != null);
  if (pts.length < 2) return null;
  let cum = 0;
  const series = pts.map((d) => (cum += Number(d.pnl)));
  const min = Math.min(0, ...series);
  const max = Math.max(0, ...series);
  const W = 720;
  const H = 120;
  const x = (i: number) => (i / (series.length - 1)) * W;
  const y = (v: number) => H - ((v - min) / (max - min || 1)) * H;
  const path = series.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-28 mt-6" preserveAspectRatio="none">
      <line x1="0" x2={W} y1={y(0)} y2={y(0)} stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" />
      <path d={path} fill="none" stroke="#4ade80" strokeWidth="2" />
    </svg>
  );
}

export default async function ForecastPage() {
  const [track, latest] = await Promise.all([
    getJSON<{ summary: Summary; daily: Daily[] }>('/forecast/track-record'),
    getJSON<ForecastRow[]>('/forecast/spread/latest'),
  ]);

  const s = track?.summary;
  const hasScores = !!s && Number(s.node_hours) > 0;
  const daily = (track?.daily ?? []).slice(-30);

  // condense the latest issuance to one row per node
  const byNode = new Map<string, ForecastRow[]>();
  for (const r of latest ?? []) {
    byNode.set(r.node_id, [...(byNode.get(r.node_id) ?? []), r]);
  }
  const issuedAt = latest?.[0]?.issued_at;

  return (
    <>
      <Header />
      <main className="pt-28 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium bg-white/5 ring-1 ring-white/10 text-white/40 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live forward test
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-5">
            ERCOT day-ahead spread forecast.
            <br />
            Scored in public, every day.
          </h1>
          <p className="text-[0.95rem] text-white/40 leading-relaxed max-w-2xl mb-10">
            Each day, before delivery, our model publishes P10/P50/P90 forecasts of the
            RT&minus;DA price spread for the next 24 hours across 15 ERCOT hubs and load
            zones. Forecasts are written once and never revised. After the hours settle,
            they are scored against realized real-time prices. Everything below is
            computed from that immutable log.
          </p>

          {/* Plain-language explainer */}
          <details className="mb-12 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] open:pb-2">
            <summary className="cursor-pointer px-6 py-4 text-[0.9rem] font-medium text-white/70 select-none">
              New to energy markets? How to read this page
            </summary>
            <div className="px-6 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 text-[0.85rem] text-white/40 leading-relaxed">
              <div>
                <span className="text-white/60 font-medium">What&apos;s being predicted.</span>{' '}
                Texas electricity is priced twice: a price locked the day before
                (day-ahead) and the live price during the actual hour (real-time).
                They never quite match. We predict the gap — will the live price come
                in above or below the locked one, and by how much, for every hour,
                at 15 locations.
              </div>
              <div>
                <span className="text-white/60 font-medium">&quot;Our miss vs market&apos;s miss.&quot;</span>{' '}
                The locked day-ahead price is itself the market&apos;s best guess of
                real-time. So it&apos;s our benchmark: if our average error is smaller
                than the market&apos;s, the model adds real information. Both numbers
                are averages in dollars per megawatt-hour.
              </div>
              <div>
                <span className="text-white/60 font-medium">&quot;Promise kept&quot; (coverage).</span>{' '}
                Every prediction is a range, like a circle drawn before throwing a
                dart: &quot;80% of outcomes will land inside.&quot; This tile counts how
                often reality actually landed inside our ranges. Near 80% = the model
                knows exactly how uncertain it is. Well below = overconfident; well
                above = uselessly cautious.
              </div>
              <div>
                <span className="text-white/60 font-medium">Paper trading.</span>{' '}
                A simulated bet, only placed when the model&apos;s entire range clears
                zero — i.e., even its pessimistic case agrees on direction. Most calm
                days that never happens and no bet is placed; that discipline is a
                feature. Results shown are after estimated fees, with no real money
                at stake.
              </div>
            </div>
          </details>

          {/* Track record */}
          <h2 className="text-xl font-semibold text-white mb-5">Live track record</h2>
          {hasScores ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat
                  label="Predictions scored"
                  value={Number(s!.node_hours).toLocaleString()}
                  sub={`one per hour per location · ${day(s!.first_hour!)} → ${day(s!.last_hour!)}`}
                />
                <Stat
                  label="Our miss vs market's miss"
                  value={`${fmt(s!.mae_model)} / ${fmt(s!.mae_da)}`}
                  sub="avg error in $/MWh — ours first. Smaller than the market's number = we forecast better than the price the market locked in"
                />
                <Stat
                  label="Promise kept?"
                  value={pct(s!.coverage)}
                  sub="every forecast is a range we claim catches the real outcome 80% of the time — this is how often it actually did"
                />
                <Stat
                  label="Paper trading P&L"
                  value={Number(s!.hours_traded) === 0 ? 'no trades yet' : usd(s!.total_pnl)}
                  sub={
                    Number(s!.hours_traded) === 0
                      ? 'the model only bets when its entire range clears zero — calm days = no bet, by design'
                      : `${Number(s!.hours_traded).toLocaleString()} hours traded · ${pct(s!.hit_rate)} winners · after $0.75/MWh fees`
                  }
                />
              </div>
              <PnlSpark daily={daily} />
              {daily.length > 0 && (
                <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-white/[0.06]">
                  <table className="w-full text-[0.82rem] font-mono">
                    <thead>
                      <tr className="text-white/30 text-left uppercase tracking-wider text-[10px]">
                        <th className="px-4 py-3">Day (UTC)</th>
                        <th className="px-4 py-3 text-right">Node-hours traded</th>
                        <th className="px-4 py-3 text-right">Net P&L</th>
                        <th className="px-4 py-3 text-right">Coverage</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      {[...daily].reverse().map((d) => (
                        <tr key={d.day} className="border-t border-white/[0.05]">
                          <td className="px-4 py-2.5">{day(d.day)}</td>
                          <td className="px-4 py-2.5 text-right">{d.hours_traded}</td>
                          <td className={`px-4 py-2.5 text-right ${Number(d.pnl) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {usd(d.pnl)}
                          </td>
                          <td className="px-4 py-2.5 text-right">{pct(d.coverage)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] text-white/40 text-[0.9rem]">
              The forward test is live. The first issued forecasts are maturing now —
              scores appear here as soon as the first delivery day settles.
            </div>
          )}

          {/* Latest issuance */}
          {issuedAt && (
            <>
              <h2 className="text-xl font-semibold text-white mt-14 mb-2">Latest issued forecast</h2>
              <p className="text-[0.82rem] text-white/35 mb-5 font-mono">
                issued {issuedAt.replace('T', ' ').slice(0, 16)} UTC · next 24 delivery hours ·
                values are mean RT&minus;DA spread, $/MWh
              </p>
              <div className="overflow-x-auto rounded-2xl ring-1 ring-white/[0.06]">
                <table className="w-full text-[0.82rem] font-mono">
                  <thead>
                    <tr className="text-white/30 text-left uppercase tracking-wider text-[10px]">
                      <th className="px-4 py-3">Node</th>
                      <th className="px-4 py-3 text-right">P10</th>
                      <th className="px-4 py-3 text-right">P50</th>
                      <th className="px-4 py-3 text-right">P90</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    {Array.from(byNode.entries()).map(([node, rows]) => {
                      const mean = (k: 'p10' | 'p50' | 'p90') =>
                        rows.reduce((a, r) => a + Number(r[k]), 0) / rows.length;
                      return (
                        <tr key={node} className="border-t border-white/[0.05]">
                          <td className="px-4 py-2.5">{node}</td>
                          <td className="px-4 py-2.5 text-right text-white/45">{fmt(mean('p10'))}</td>
                          <td className="px-4 py-2.5 text-right">{fmt(mean('p50'))}</td>
                          <td className="px-4 py-2.5 text-right text-white/45">{fmt(mean('p90'))}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Methodology */}
          <h2 className="text-xl font-semibold text-white mt-14 mb-5">Methodology</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[0.88rem] text-white/40 leading-relaxed">
            <div className="space-y-4">
              <p>
                The model is a global temporal fusion transformer trained on hourly ERCOT
                settlement prices from 2019 onward (self-collected from ERCOT MIS archives)
                plus ERCOT load, day-ahead load forecast, wind and solar generation from
                EIA-930. It forecasts the distribution of the next 24 hours&apos; RT&minus;DA
                spread per node and is retrained quarterly.
              </p>
              <p>
                The setup is leak-free: at issuance the model sees only information available
                before delivery — the cleared day-ahead price, the day-ahead load forecast,
                and real-time history through the last settled hour.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                The paper trading rule is deliberately simple: long the spread when P10 &gt; 0,
                short when P90 &lt; 0, flat otherwise, 1&nbsp;MWh per node-hour, haircut
                $0.75/MWh for fees. In a 13-month holdout backtest (Jul 2025 – Jul 2026) this
                beat the day-ahead price as a forecaster by 11% MAE and produced a positive
                month 13 of 13 times.
              </p>
              <p>
                Backtests can flatter; that is what this page is for. Paper fills at hub
                settlement prices, modeled fees, no market impact. Judge the live numbers.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
