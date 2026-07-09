import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ERCOT Load Forecast Accuracy — Live Tracker | Kardashev Labs',
  description:
    "How accurate is ERCOT's own day-ahead load forecast? A public, immutable, daily-scored track record — 2019 to today, updated automatically.",
};

const API = (process.env.KARDASHEV_API_URL ?? 'https://data.kardashevlabs.org').replace(/\/$/, '');

type Summary = {
  first_hour: string | null;
  last_hour: string | null;
  hours_scored: number;
  mape: number | null;
  bias: number | null;
  mae_mw: number | null;
};

type Daily = { day: string; mape: number | null; bias: number | null; mae_mw: number | null };

async function getJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 0 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const pct = (v: number | null | undefined, digits = 2) =>
  v == null ? '—' : `${(Number(v) * 100).toFixed(digits)}%`;
const mw = (v: number | null | undefined) =>
  v == null ? '—' : `${Math.round(Number(v)).toLocaleString('en-US')} MW`;
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

function MapeSpark({ daily }: { daily: Daily[] }) {
  const pts = daily.filter((d) => d.mape != null).slice(-90);
  if (pts.length < 2) return null;
  const vals = pts.map((d) => Number(d.mape) * 100);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const W = 720;
  const H = 120;
  const x = (i: number) => (i / (vals.length - 1)) * W;
  const y = (v: number) => H - ((v - min) / (max - min || 1)) * H;
  const path = vals.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-28 mt-6" preserveAspectRatio="none">
      <path d={path} fill="none" stroke="#60a5fa" strokeWidth="2" />
    </svg>
  );
}

export default async function LoadForecastPage() {
  const track = await getJSON<{ summary: Summary; daily: Daily[] }>('/load-forecast/track-record');
  const s = track?.summary;
  const hasScores = !!s && Number(s.hours_scored) > 0;
  const daily = (track?.daily ?? []).slice(-30);

  return (
    <>
      <Header />
      <main className="pt-28 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium bg-white/5 ring-1 ring-white/10 text-white/40 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Live accuracy tracker
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-5">
            How good is ERCOT&apos;s own load forecast?
          </h1>
          <p className="text-[0.95rem] text-white/40 leading-relaxed max-w-2xl mb-10">
            Every day, ERCOT publishes a day-ahead forecast of how much electricity Texas
            will use, hour by hour. This isn&apos;t our model — it&apos;s the grid
            operator&apos;s own official number, scored automatically against what actually
            happened. History goes back to 2019 and updates daily, immutably. This is the
            forecast that transmission planning, reserve margins, and market prices are
            built on — if it&apos;s wrong, everything downstream feels it.
          </p>

          <details className="mb-12 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] open:pb-2">
            <summary className="cursor-pointer px-6 py-4 text-[0.9rem] font-medium text-white/70 select-none">
              How to read this page
            </summary>
            <div className="px-6 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 text-[0.85rem] text-white/40 leading-relaxed">
              <div>
                <span className="text-white/60 font-medium">MAPE (mean absolute % error).</span>{' '}
                On average, how far off is the day-ahead forecast from what actually
                happened, as a percentage of actual demand. Lower is better. Utility-grade
                load forecasts typically run 1-3% MAPE.
              </div>
              <div>
                <span className="text-white/60 font-medium">Bias.</span>{' '}
                Whether the forecast consistently runs high or low. Positive means ERCOT
                systematically under-forecasts (actual load comes in higher than predicted);
                negative means it over-forecasts. Near zero is best — a small nonzero bias
                that&apos;s stable is normal and not necessarily a flaw.
              </div>
              <div className="lg:col-span-2">
                <span className="text-white/60 font-medium">Why this matters.</span>{' '}
                ERCOT commits reserves and clears the day-ahead market based on this
                forecast. A forecast that runs low on hot summer afternoons is exactly the
                condition that produces scarcity pricing and reliability risk. Tracking this
                publicly turns a number buried in operational reports into something
                anyone can watch.
              </div>
            </div>
          </details>

          <h2 className="text-xl font-semibold text-white mb-5">Live track record</h2>
          {hasScores ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat
                  label="Hours scored"
                  value={Number(s!.hours_scored).toLocaleString()}
                  sub={`${day(s!.first_hour!)} → ${day(s!.last_hour!)}`}
                />
                <Stat label="MAPE" value={pct(s!.mape)} sub="mean absolute % error, all-time" />
                <Stat
                  label="Bias"
                  value={pct(s!.bias, 2)}
                  sub={Number(s!.bias) >= 0 ? 'ERCOT under-forecasts, on average' : 'ERCOT over-forecasts, on average'}
                />
                <Stat label="MAE" value={mw(s!.mae_mw)} sub="mean absolute error in megawatts" />
              </div>
              <MapeSpark daily={track!.daily} />
              {daily.length > 0 && (
                <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-white/[0.06]">
                  <table className="w-full text-[0.82rem] font-mono">
                    <thead>
                      <tr className="text-white/30 text-left uppercase tracking-wider text-[10px]">
                        <th className="px-4 py-3">Day (UTC)</th>
                        <th className="px-4 py-3 text-right">MAPE</th>
                        <th className="px-4 py-3 text-right">Bias</th>
                        <th className="px-4 py-3 text-right">MAE</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/70">
                      {[...daily].reverse().map((d) => (
                        <tr key={d.day} className="border-t border-white/[0.05]">
                          <td className="px-4 py-2.5">{day(d.day)}</td>
                          <td className="px-4 py-2.5 text-right">{pct(d.mape)}</td>
                          <td className={`px-4 py-2.5 text-right ${Number(d.bias) >= 0 ? 'text-sky-400' : 'text-orange-400'}`}>
                            {pct(d.bias, 2)}
                          </td>
                          <td className="px-4 py-2.5 text-right">{mw(d.mae_mw)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] text-white/40 text-[0.9rem]">
              Scoring in progress — check back shortly.
            </div>
          )}

          <h2 className="text-xl font-semibold text-white mt-14 mb-5">Methodology</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[0.88rem] text-white/40 leading-relaxed">
            <div className="space-y-4">
              <p>
                Forecast and actual load come from EIA-930 (respondent ERCO): the DF series
                is ERCOT&apos;s published day-ahead demand forecast, the D series is realized
                demand. Both are hourly, system-wide. Every hour is scored exactly once,
                permanently — nothing here is revised after the fact.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                This is a companion to our{' '}
                <a href="/forecast" className="text-white/60 underline decoration-white/20 hover:decoration-white/50">
                  RT-DA spread forecast
                </a>
                {' '}— that page scores our own model&apos;s price predictions; this one
                scores ERCOT&apos;s own load forecast. Same discipline: public, immutable,
                updated daily.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
