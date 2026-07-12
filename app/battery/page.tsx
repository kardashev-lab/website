import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BatteryExplorer from '@/components/BatteryExplorer';
import BatteryDayExplorer from '@/components/BatteryDayExplorer';

export const metadata: Metadata = {
  title: 'Battery Dispatch Simulator | Kardashev Labs',
  description:
    'What our ERCOT price forecast is actually worth in dollars: a battery dispatch optimizer compared against a perfect-foresight ceiling and a naive fixed-schedule baseline, on real settlement prices.',
};

export default function BatteryPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
            <span className="h-1.5 w-1.5 bg-primary animate-pulse-slow" />
            Built on the ERCOT spread forecast
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold uppercase text-foreground leading-tight mb-5">
            What is our forecast actually worth?
            <br />
            Ask a battery.
          </h1>
          <p className="text-[0.95rem] text-muted-foreground leading-relaxed max-w-2xl mb-10">
            Accuracy metrics don&apos;t mean much on their own. This turns the forecast into a
            dollar figure: an optimizer plans a battery&apos;s daily charge/discharge schedule
            against our published forecast, then settles at what actually happened. Compared
            against a perfect-foresight ceiling and a naive fixed-schedule baseline, on the
            same real ERCOT settlement prices.
          </p>

          {/* Plain-language explainer */}
          <details className="mb-12 border border-white/10 bg-white/[0.02] open:pb-2">
            <summary className="cursor-pointer px-6 py-4 text-[0.9rem] font-medium text-white/70 select-none">
              New to energy markets? How to read this page
            </summary>
            <div className="px-6 pb-4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 text-[0.85rem] text-white/40 leading-relaxed">
              <div>
                <span className="text-white/60 font-medium">Why a battery.</span>{' '}
                A battery earns money by buying electricity when it&apos;s cheap and selling
                it back when it&apos;s expensive. How well it does depends entirely on how
                well it knows future prices — which makes it a clean way to price a forecast
                in dollars instead of abstract error metrics.
              </div>
              <div>
                <span className="text-white/60 font-medium">Hindsight ceiling.</span>{' '}
                The best possible outcome: a battery that already knows exactly what every
                price will be. No real battery can do this — it&apos;s the theoretical
                maximum everything else is measured against.
              </div>
              <div>
                <span className="text-white/60 font-medium">Naive TOU.</span>{' '}
                What a non-technical operator would run: charge on a fixed clock schedule
                (midday, when solar makes power cheap) and discharge on another fixed
                schedule (evening peak). No price awareness at all — and it can lose money
                outright when the real price pattern doesn&apos;t match the assumption, which
                happens most winters.
              </div>
              <div>
                <span className="text-white/60 font-medium">Forecast-driven.</span>{' '}
                The realistic case: each day, before it starts, the optimizer plans a
                schedule against our model&apos;s forecast for that day — the same forecast
                published live on the{' '}
                <a href="/forecast" className="text-primary hover:underline">
                  spread forecast page
                </a>
                . Once the day happens, the battery settles at the real price. The gap
                between this and the hindsight ceiling is the cost of not knowing the future
                — including whatever our model still gets wrong.
              </div>
            </div>
          </details>

          <h2 className="text-xl font-semibold uppercase text-foreground mb-2">
            Watch the battery trade, hour by hour
          </h2>
          <p className="text-[0.85rem] text-white/35 mb-6 max-w-2xl">
            Pick a node and scrub through any day of the last 12 months. Blue bars are the
            battery charging, amber bars discharging, the dashed line is state of charge — for
            all three modes on the same day, side by side.
          </p>
          <BatteryDayExplorer />

          <h2 className="text-xl font-semibold uppercase text-foreground mt-14 mb-2">
            Twelve months, real prices
          </h2>
          <p className="text-[0.85rem] text-white/35 mb-6 max-w-2xl">
            Same three modes, zoomed out to monthly totals.
          </p>
          <BatteryExplorer />

          {/* Methodology */}
          <h2 className="text-xl font-semibold uppercase text-foreground mt-14 mb-5">
            Methodology
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-[0.88rem] text-white/40 leading-relaxed">
            <div className="space-y-4">
              <p>
                Dispatch is solved as a linear program (OR-Tools GLOP): continuous
                charge/discharge variables, separate charge and discharge round-trip
                efficiency, a state-of-charge balance constraint per hour, and a daily
                cycle-throughput cap. All three modes use the identical solver and battery
                spec (1&nbsp;MW / 2&nbsp;MWh, 1 cycle/day cap) — only the price input differs.
              </p>
              <p>
                Hindsight and forecast-driven are both solved one calendar day at a time, not
                as one long window, so the cycle-cap cadence is identical between them. Solving
                hindsight over a full month while forecast-driven resets daily would hand
                hindsight an artificially tighter cycle budget and understate the gap between
                them — an early version of this had exactly that bug.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Forecast-driven prices come from <code>day-ahead price + predicted spread</code>,
                using the same walk-forward, never-seen-in-training TFT forecast behind the{' '}
                <a href="/forecast" className="text-primary hover:underline">
                  spread forecast page
                </a>
                . The schedule is planned on the forecast; revenue is computed against the
                real settlement price for that hour, exactly as a live operator would
                experience it.
              </p>
              <p>
                Backtests can flatter; that is what the hindsight and naive baselines are for.
                No market impact modeled, no degradation cost applied in the figures shown
                here, paper dispatch only — no real capital at stake.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
