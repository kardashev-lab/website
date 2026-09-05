---
title: "LBNL's ERCOT queue data has real gaps. Here's how many our filing history can close."
description: "LBNL's Queued Up is the reference dataset most of the industry builds on. Cross-referenced against our own ERCOT GIS filing history, some of its ERCOT gaps are fillable, some aren't, and one class of value shouldn't be trusted at all."
date: "2026-09-04"
category: "Methods"
---

Lawrence Berkeley National Lab's [Queued Up](https://emp.lbl.gov/queues) is the closest thing the US interconnection-queue world has to a reference dataset. GridStatus, Yes Energy, LandGate, and GridTracker all build on it or cite it. It's also, by LBNL's own documentation, incomplete: a meaningful share of records are missing an interconnection agreement (IA) date, a withdrawal date, or a valid commercial operation date (COD).

We track ERCOT's own monthly GIS Report filings back to December 2018 — the same milestone-level history behind [our ERCOT timeline work](/blog/ercot-interconnection-timelines). That's a plausible source to close some of LBNL's ERCOT gaps directly from the filings themselves. We ran the cross-reference to find out how much of that is actually true, not assumed.

## Method

Join LBNL's ERCOT rows to our `ercot_gis_snapshots` table on queue ID (`q_id` / `queue_id` — these turned out to be the exact same string format, no entity resolution needed). For each LBNL row missing a target field, check whether our filing history has a derived value, then apply two checks before trusting it:

1. **A sanity floor.** A derived IA-signed date can't predate the project's own LBNL-recorded queue-request date. If it does, that's a red flag, not a value.
2. **An accuracy backtest, where possible.** For withdrawal dates specifically, LBNL already has 491 ERCOT withdrawal dates on file. We used those as ground truth to measure our proxy's error before applying it anywhere LBNL doesn't already have an answer.

## What we found

| Field | LBNL missing (ERCOT) | Actually addressable | We can supply | Confidence |
|---|---:|---:|---:|---|
| IA agreement date | 2,550 | 167 — the rest are `active` projects that haven't reached an IA yet, which isn't a gap, it's LBNL correctly reporting "not yet" | 111 (66.5% of the addressable set) | 56 candidate values were caught and discarded by the sanity floor — see below |
| Commercial operation date | 94 | 0 | 0 | Real ceiling: all 94 are pre-2018 projects that had already left ERCOT's active queue before our filing history starts. A different, older source would be needed; this one can't reach it |
| Withdrawal date | 594 | 594, of which 116 have a clean signal | 116 candidates | Backtested against 491 known cases: median error 43 days, **93% land within 90 days of the true date** |

## The anomaly the sanity floor caught

Of 167 IA-date candidates, 56 failed the floor check outright. Example: queue ID `17INR0053` shows `ia_signed = 2009-06-26` consistently across a dozen consecutive monthly ERCOT filings — but LBNL records that project's own interconnection request as filed in 2016. The agreement can't predate the request by seven years. That's not a parsing error on our end; ERCOT's own filing is internally consistent on this bad value across dozens of months, which points to legacy queue-ID reuse in ERCOT's own systems, not a one-off typo. We excluded all 56 rather than guess.

This is the actual value of cross-referencing two independent sources: neither dataset alone would have surfaced this. LBNL has no reason to doubt a date ERCOT filed. We wouldn't have doubted it either, without a second dataset's request date to check it against.

## What this can and cannot claim

**Can claim:** for ERCOT specifically, roughly two-thirds of the addressable missing IA dates in LBNL's data can be filled from ERCOT's own monthly filings, with a built-in check that already caught real bad data. Our withdrawal-date proxy is accurate to within 90 days about 93% of the time, measured against LBNL's own known answers, not assumed.

**Cannot claim:** that this generalizes to other ISOs (PJM, MISO, and SPP have redistribution restrictions we haven't cleared for this kind of work — see our data-rights review), that LBNL's dataset is "wrong" (it's a massive, valuable aggregation across 50+ balancing areas; ERCOT is one region with an unusually rich public filing history to check against), or that the withdrawal proxy is exact rather than a dated approximation.

## Why this matters

If you're using LBNL's queue data to model completion risk or timing, a blank IA-date field on an `active` ERCOT project usually just means "hasn't happened yet" — that's the majority case and it's not a gap. But where LBNL is missing a withdrawal date on a project it already knows withdrew, or an IA date on a project that reached IA per ERCOT's own phase history, there's a real, fillable hole, and now a measured way to know how much you can trust filling it.

Method: Kardashev Labs cross-reference of LBNL Queued Up (2026 edition, ERCOT rows) against ERCOT GIS Report monthly snapshots (Dec 2018–Aug 2026, 99 filings). LBNL data used under [CC BY 4.0](https://emp.lbl.gov/queues), attributed to Lawrence Berkeley National Laboratory and GridTracker.

## Related

- [ERCOT Full Process is not one number.](/blog/ercot-interconnection-timelines) — the same GIS filing history, used for timeline measurement instead of gap-filling
- [Interconnection Queue Tracker](https://interconnection-queue.kardashevlabs.org/): live search across all 7 US ISO/RTO queues
