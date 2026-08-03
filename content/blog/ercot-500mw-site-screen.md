---
title: "Where can a 500 MW load get power in ERCOT?"
description: "Five Texas footprints screened with Site Clearance: generation queue, zone peer timelines, LMP stress, HIFLD density, and a GridSFM DC power-flow check. Public data only — not an ERCOT study."
date: "2026-08-02"
category: "Methods"
image: "/blog/ercot-500mw-site-screen.png"
imageAlt: "Bar charts comparing peer timelines, negative price hours, and DC local impact across five Texas counties for a 500 MW load screen"
---

The question hyperscaler and landlord energy teams keep asking is narrow: for a few candidate land pads, which ones look less ugly on public grid data?

We ran that screen for a synthetic **500 MW large load** on five Texas footprints using [Site Clearance](https://clearance.kardashevlabs.org/). Same MW, same mode, same pipeline. County resolution. Not an interconnection study.

Large-load mode does not invent a firm grade yet — ERCOT still does not publish project-level load-queue pins — so this writeup compares the **signals**, not a fake ranking trophy.

## What we measured

For each footprint:

1. **Generation GIS queue** in scored counties (pressure on the same wires, not the load queue itself)
2. **Peer timelines** for the CDR zone those counties historically map to
3. **Market stress** — trailing negative RT hours on the mapped load zone
4. **HIFLD line density** vs the Texas median
5. **DC power-flow screen** — GridSFM Texas model, 500 MW withdrawal, local branches only

Wire and DC blocks are proxies. They are not in any grade math. Full honesty lives on the [methodology](https://clearance.kardashevlabs.org/methodology) page.

## Five footprints

| Footprint | CDR zone | Gen pending in counties | Peer median | Neg. price hrs | HIFLD vs TX median | DC local \|Δ\| @ 500 MW |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| Harris | HOUSTON | 6,659 MW | 2.8 yr | 1.6% | 5.1× (dense) | 0.10 |
| Midland | WEST | 836 MW | 2.9 yr | 10.5% | 2.1× (dense) | 0.19 |
| Williamson | SOUTH | 449 MW | 3.6 yr | 2.3% | 1.3× (typical) | 0.11 |
| Dallas | NORTH | 867 MW | 3.6 yr | 3.1% | 5.6× (dense) | 0.10 |
| Brewster | WEST | 229 MW | 2.9 yr | 10.5% | 0.11× (sparse) | 0.64 |

Open each screen (draw box is a small county-centered pad, not a parcel survey):

- [Harris · 500 MW load](https://clearance.kardashevlabs.org/#eyJwb2x5Z29uIjp7InR5cGUiOiJQb2x5Z29uIiwiY29vcmRpbmF0ZXMiOltbWy05NS40NTY1NjIzMTY5MTYxOCwyOS44MDEzNTIwNjc0OTQyXSxbLTk1LjMzNjU2MjMxNjkxNjE3LDI5LjgwMTM1MjA2NzQ5NDJdLFstOTUuMzM2NTYyMzE2OTE2MTcsMjkuOTIxMzUyMDY3NDk0MTk4XSxbLTk1LjQ1NjU2MjMxNjkxNjE4LDI5LjkyMTM1MjA2NzQ5NDE5OF0sWy05NS40NTY1NjIzMTY5MTYxOCwyOS44MDEzNTIwNjc0OTQyXV1dfSwibW9kZSI6ImxvYWQiLCJtdyI6NTAwfQ)
- [Midland · 500 MW load](https://clearance.kardashevlabs.org/#eyJwb2x5Z29uIjp7InR5cGUiOiJQb2x5Z29uIiwiY29vcmRpbmF0ZXMiOltbWy0xMDIuMDkxNTY4MjEyNTM0LDMxLjgwOTA0MTI3OTgzNzc1XSxbLTEwMS45NzE1NjgyMTI1MzQsMzEuODA5MDQxMjc5ODM3NzVdLFstMTAxLjk3MTU2ODIxMjUzNCwzMS45MjkwNDEyNzk4Mzc3NDddLFstMTAyLjA5MTU2ODIxMjUzNCwzMS45MjkwNDEyNzk4Mzc3NDddLFstMTAyLjA5MTU2ODIxMjUzNCwzMS44MDkwNDEyNzk4Mzc3NV1dXX0sIm1vZGUiOiJsb2FkIiwibXciOjUwMH0)
- [Williamson · 500 MW load](https://clearance.kardashevlabs.org/#eyJwb2x5Z29uIjp7InR5cGUiOiJQb2x5Z29uIiwiY29vcmRpbmF0ZXMiOltbWy05Ny42NTgwMjExMzA0NTg5LDMwLjU4NzIwMjA0NTU2Mjk1XSxbLTk3LjUzODAyMTEzMDQ1ODksMzAuNTg3MjAyMDQ1NTYyOTVdLFstOTcuNTM4MDIxMTMwNDU4OSwzMC43MDcyMDIwNDU1NjI5NDhdLFstOTcuNjU4MDIxMTMwNDU4OSwzMC43MDcyMDIwNDU1NjI5NDhdLFstOTcuNjU4MDIxMTMwNDU4OSwzMC41ODcyMDIwNDU1NjI5NV1dXX0sIm1vZGUiOiJsb2FkIiwibXciOjUwMH0)
- [Dallas · 500 MW load](https://clearance.kardashevlabs.org/#eyJwb2x5Z29uIjp7InR5cGUiOiJQb2x5Z29uIiwiY29vcmRpbmF0ZXMiOltbWy05Ni44Mzc4Mzg4NTM5MTU0OSwzMi43MDY2ODA2NjU0NjM3N10sWy05Ni43MTc4Mzg4NTM5MTU0OCwzMi43MDY2ODA2NjU0NjM3N10sWy05Ni43MTc4Mzg4NTM5MTU0OCwzMi44MjY2ODA2NjU0NjM3NzZdLFstOTYuODM3ODM4ODUzOTE1NDksMzIuODI2NjgwNjY1NDYzNzc2XSxbLTk2LjgzNzgzODg1MzkxNTQ5LDMyLjcwNjY4MDY2NTQ2Mzc3XV1dfSwibW9kZSI6ImxvYWQiLCJtdyI6NTAwfQ)
- [Brewster · 500 MW load](https://clearance.kardashevlabs.org/#eyJwb2x5Z29uIjp7InR5cGUiOiJQb2x5Z29uIiwiY29vcmRpbmF0ZXMiOltbWy0xMDMuMzEyMDEyMDUwNzMxNDcsMjkuNzUwMDg0MDcwMDUxMTddLFstMTAzLjE5MjAxMjA1MDczMTQ2LDI5Ljc1MDA4NDA3MDA1MTE3XSxbLTEwMy4xOTIwMTIwNTA3MzE0NiwyOS44NzAwODQwNzAwNTExNjddLFstMTAzLjMxMjAxMjA1MDczMTQ3LDI5Ljg3MDA4NDA3MDA1MTE2N10sWy0xMDMuMzEyMDEyMDUwNzMxNDcsMjkuNzUwMDg0MDcwMDUxMTddXV19LCJtb2RlIjoibG9hZCIsIm13Ijo1MDB9)

## What jumps out

**Houston peers are the fastest on the generation film.** Harris maps to HOUSTON at 2.8 yr median screening-to-energization. That is *generation* history, not a large-load energization clock. Still useful as a process-speed prior for the ISO pocket.

**West Texas is fast on peers and ugly on prices.** Midland and Brewster both sit on WEST (~2.9 yr). Both show ~10.5% negative RT hours on the mapped west load zone. If your site story cares about wholesale cannibalization or curtailment-adjacent stress, that shows up before the peer clock does.

**Sparse wires are not subtle.** Brewster's HIFLD density is ~0.11× the Texas median. The DC screen's local impact jumps to **0.64 pu** on a 500 MW withdrawal — an order of magnitude above Harris/Dallas. Dense urban counties can still show high absolute loading on some branches; the *delta* from adding 500 MW is the clearer footprint comparison here.

**Dallas and Williamson look “fine” and slow.** NORTH/SOUTH peers sit at 3.6 yr. Markets are calmer than West. HIFLD is typical-to-dense. Nothing screams; nothing is fast.

**Gen pending MW is context, not the load queue.** Harris has thousands of MW of pending generation in-county. That does not mean the load cannot connect. It means other projects are already asking the same neighborhood of the grid for attention.

## How to read this without lying to yourself

**Can claim:** on these five public screens, HOUSTON shows the shortest generation peer median; WEST shows elevated negative-price hours; Brewster's sparse public transmission layer and DC local impact stand out under a 500 MW withdrawal; Site Clearance can reproduce each row from a share URL.

**Cannot claim:** which site will clear an ERCOT large-load study; available MW at a POI; N-1 security; that GridSFM is ERCOT's planning model; that HIFLD densities are thermal ratings; that large-load wait times equal generation peer years.

For the load-queue explosion that makes this question urgent, see [the ERCOT large-load queue was climbing before 2026](/blog/ercot-large-load-explosion). For generation zone/fuel clocks, see [measured interconnection timelines](/blog/ercot-interconnection-timelines).

## Run your own

1. Open [Site Clearance](https://clearance.kardashevlabs.org/)
2. Draw a search area in Texas
3. Set **Large load** and **500 MW**
4. Compare queue, timelines, market, and the wire appendix
5. Copy the link if you want someone else to see the same polygon

Related tools: [Large Load Tracker](https://large-load-tracker.kardashevlabs.org/), [Interconnection timelines](https://interconnection-queue.kardashevlabs.org/interconnection-timelines), [LMP map](https://lmp-map.kardashevlabs.org/).

Method: Site Clearance `POST /clearance/score` on 2026-08-02 against the June 2026 GIS snapshot, zone peer tables, `ercot_zone_stats`, HIFLD density proxy, and GridSFM Texas DC scenarios. County-centered ~0.12° pads. Scores will move when the underlying month updates.
