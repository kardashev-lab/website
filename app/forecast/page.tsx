import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ForecastExplorer from '@/components/ForecastExplorer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ERCOT Spread Forecast — Live Track Record | Kardashev Labs',
  description:
    'Daily day-ahead RT-DA spread forecasts for 15 ERCOT hubs and load zones, published before delivery and scored against realized prices. Every forecast is immutable once issued.',
};

const API = (process.env.KARDASHEV_API_URL ?? 'https://data.kardashevlabs.org').replace(/\/$/, '');

type ModelSummary = {
  model: string;
  first_hour: string | null;
  last_hour: string | null;
  node_hours: number;
  mae_model: number | null;
  mae_da: number | null;
  coverage: number | null;
  hours_traded: number;
  hit_rate: number | null;
  total_pnl: number | null;
  daily: Daily[];
};

type Daily = { day: string; pnl: number | null; hours_traded: number; coverage: number | null };

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

// short human label for a model tag, e.g. "tft-v2-2026q3" -> "v2"
function modelLabel(model: string): string {
  const m = model.match(/-v(\d+)-/);
  if (m) return `v${m[1]}`;
  return model.includes('-v2-') ? 'v2' : 'v1';
}

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

function ModelBadge({ model }: { model: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border border-white/10 bg-white/[0.04] text-white/50">
      {modelLabel(model)}
    </span>
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
      <path d={path} fill="none" stroke="#FFB020" strokeWidth="2" />
    </svg>
  );
}

function ModelTrackRecord({ m, isActive }: { m: ModelSummary; isActive: boolean }) {
  const daily = (m.daily ?? []).slice(-30);
  return (
    <div className={isActive ? '' : 'opacity-70'}>
      <div className="flex items-center gap-3 mb-4">
        <ModelBadge model={m.model} />
        <span className="text-[0.78rem] text-white/35 font-mono">
          {m.first_hour ? day(m.first_hour) : '—'} → {m.last_hour ? day(m.last_hour) : '—'}
        </span>
        {isActive && (
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-primary/80 font-medium">
            <span className="h-1.5 w-1.5 bg-primary animate-pulse-slow" />
            current model
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          label="Predictions scored"
          value={Number(m.node_hours).toLocaleString()}
          sub="one per hour per location"
        />
        <Stat
          label="Our miss vs market's miss"
          value={`${fmt(m.mae_model)} / ${fmt(m.mae_da)}`}
          sub="avg error in $/MWh — ours first. Smaller than the market's number = we forecast better than the price the market locked in"
        />
        <Stat
          label="Promise kept?"
          value={pct(m.coverage)}
          sub="every forecast is a range we claim catches the real outcome 80% of the time — this is how often it actually did"
        />
        <Stat
          label="Paper trading P&L"
          value={Number(m.hours_traded) === 0 ? 'no trades yet' : usd(m.total_pnl)}
          sub={
            Number(m.hours_traded) === 0
              ? 'the model only bets when its entire range clears zero — calm days = no bet, by design'
              : `${Number(m.hours_traded).toLocaleString()} hours traded · ${pct(m.hit_rate)} winners · after $0.75/MWh fees`
          }
        />
      </div>
      <PnlSpark daily={daily} />
      {daily.length > 0 && (
        <div className="mt-8 overflow-x-auto border border-white/10">
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
                <tr key={d.day} className="border-t border-white/10">
                  <td className="px-4 py-2.5">{day(d.day)}</td>
                  <td className="px-4 py-2.5 text-right">{d.hours_traded}</td>
                  <td className={`px-4 py-2.5 text-right ${Number(d.pnl) >= 0 ? 'text-primary' : 'text-red-400'}`}>
                    {usd(d.pnl)}
                  </td>
                  <td className="px-4 py-2.5 text-right">{pct(d.coverage)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default async function ForecastPage() {
  const track = await getJSON<{ models: ModelSummary[]; overall: ModelSummary | null }>(
    '/forecast/track-record'
  );

  const models = (track?.models ?? []).filter((m) => Number(m.node_hours) > 0);
  const hasScores = models.length > 0;
  // newest-first; the API orders by first_hour ascending
  const modelsNewestFirst = [...models].reverse();
  const activeModel = modelsNewestFirst[0]?.model;

  return (
    <>
      <Header />
      <main className="pt-28 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
            <span className="h-1.5 w-1.5 bg-primary animate-pulse-slow" />
            Live forward test
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold uppercase text-foreground leading-tight mb-5">
            ERCOT day-ahead spread forecast.
            <br />
            Scored in public, every day.
          </h1>
          <p className="text-[0.95rem] text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Each day, before delivery, our model publishes P10/P50/P90 forecasts of the
            RT&minus;DA price spread for the next 24 hours across 15 ERCOT hubs and load
            zones. Forecasts are written once and never revised. After the hours settle,
            they are scored against realized real-time prices. Everything below is
            computed from that immutable log. When the model changes, the old model&apos;s
            scored history stays exactly as it was — nothing is ever merged or hidden.
          </p>

          {/* Plain-language explainer */}
          <details className="mb-12 border border-white/10 bg-white/[0.02] open:pb-2">
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
              <div className="lg:col-span-2">
                <span className="text-white/60 font-medium">Model versions.</span>{' '}
                The model is retrained periodically as we add better data. Each version
                gets its own scored track record below, tagged v1, v2, etc — an older
                version&apos;s numbers are never revised or folded into the new one, so
                you can see exactly how each version performed on its own.
              </div>
            </div>
          </details>

          {/* Track record */}
          <h2 className="text-xl font-semibold uppercase text-foreground mb-5">Live track record</h2>
          {hasScores ? (
            <div className="space-y-14">
              {modelsNewestFirst.map((m) => (
                <ModelTrackRecord key={m.model} m={m} isActive={m.model === activeModel} />
              ))}
            </div>
          ) : (
            <div className="p-6 border border-white/10 bg-white/[0.02] text-white/40 text-[0.9rem]">
              The forward test is live. The first issued forecasts are maturing now —
              scores appear here as soon as the first delivery day settles.
            </div>
          )}

          {/* Explorer: pick a node, watch the model's call vs. what happened,
              or see the live unresolved call for the next 24 hours */}
          <h2 className="text-xl font-semibold uppercase text-foreground mt-14 mb-2">
            Explore the calls
          </h2>
          <p className="text-[0.85rem] text-white/35 mb-6 max-w-2xl">
            Pick a node. See already-scored history, or the live, unresolved call for the
            next 24 hours — nothing in Live mode has happened yet.
          </p>
          <ForecastExplorer />

          {/* Methodology */}
          <h2 className="text-xl font-semibold uppercase text-foreground mt-14 mb-5">Methodology</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[0.88rem] text-white/40 leading-relaxed">
            <div className="space-y-4">
              <p>
                The model is a global temporal fusion transformer trained on hourly ERCOT
                settlement prices from 2019 onward (self-collected from ERCOT MIS archives)
                plus ERCOT load, day-ahead load forecast, wind and solar generation from
                EIA-930. The current version (v2) adds ERCOT&apos;s own day-ahead wind/solar
                forecasts, planned outage capacity, ancillary clearing prices and natural
                gas price as further leak-free inputs. It forecasts the distribution of the
                next 24 hours&apos; RT&minus;DA spread per node and is retrained quarterly.
              </p>
              <p>
                The setup is leak-free: at issuance the model sees only information available
                before delivery — the cleared day-ahead price, published forecasts, and
                real-time history through the last settled hour.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                The paper trading rule is deliberately simple: long the spread when P10 &gt; 0,
                short when P90 &lt; 0, flat otherwise, 1&nbsp;MWh per node-hour, haircut
                $0.75/MWh for fees. In backtest v2 beat v1 on both accuracy (MAE, RMSE) and
                trading P&amp;L on the same held-out year, with uncertainty bands calibrated
                using a conformal widening fit on a separate calibration window.
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
