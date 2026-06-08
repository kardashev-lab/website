# Kardashev Labs

The marketing and landing site for [kardashevlabs.org](https://www.kardashevlabs.org) — home of open-source tools for US grid intelligence.

## What is Kardashev Labs?

Kardashev Labs builds open-source software for US energy grid intelligence — real-time demand monitoring, interconnection queue search, renewable curtailment tracking, and locational marginal prices. The goal: accelerate humanity toward Kardashev Type I by giving energy professionals the data tooling they've been missing.

Source code and data pipelines live at [github.com/kardashev-lab](https://github.com/kardashev-lab). Shared grid datasets are served by [data.kardashevlabs.org](https://data.kardashevlabs.org) via the [kardashev-data](https://github.com/kardashev-lab/kardashev-data) ingest service.

## Live Tools

| Tool | URL | Description |
|------|-----|-------------|
| Interconnection Queue Tracker | [interconnection-queue.kardashevlabs.org](https://interconnection-queue.kardashevlabs.org) | Unified search across all 7 US ISO/RTO interconnection queues — ERCOT, MISO, PJM, CAISO, SPP, NYISO, ISO-NE. Daily refresh via GitHub Actions. |
| Grid Demand Dashboard | [grid-demand.kardashevlabs.org](https://grid-demand.kardashevlabs.org) | Real-time US electricity demand across 15 balancing authorities (~95% CONUS). Microservices pipeline with Redis Streams, Postgres, and Kubernetes. EIA data. |
| Curtailment Tracker | [curtailment-tracker.kardashevlabs.org](https://curtailment-tracker.kardashevlabs.org/) | Daily solar and wind curtailment across CAISO, SPP, and ERCOT. 90-day rolling history. Data from [kardashev-data](https://github.com/kardashev-lab/kardashev-data), refreshed each morning. |
| LMP Dashboard | [lmp.kardashevlabs.org](https://lmp.kardashevlabs.org) | Real-time and day-ahead locational marginal prices across NYISO, PJM, CAISO, and SPP. Energy, congestion, and loss components; fuel mix, gas prices, and market signals. 5-minute RT refresh. |

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3
- **Animation:** Framer Motion
- **Email:** Resend (lab notes subscriptions)
- **Analytics:** Vercel Analytics
- **Language:** TypeScript
- **Package manager:** pnpm
- **Fonts:** Space Grotesk + JetBrains Mono (via `next/font/google`)

## Local Development

```bash
pnpm install
cp env.example .env
# fill in RESEND_API_KEY and other values in .env
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `env.example` to `.env` and fill in:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | API key from [resend.com](https://resend.com) |
| `RESEND_NOTIFY_TO` | Yes | Email that receives new subscriber notifications |
| `RESEND_AUDIENCE_ID` | No | Resend audience ID for contact list management |
| `RESEND_FROM_EMAIL` | No | Verified sender domain email (e.g. `hello@kardashevlabs.org`). Defaults to `onboarding@resend.dev` if unset. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL for metadata (default: `https://kardashevlabs.org`) |

> **Note on Resend:** Without a verified sending domain, Resend can only deliver to the email address registered on your Resend account. Verify `kardashevlabs.org` at [resend.com/domains](https://resend.com/domains) to send to any recipient.

## Deployment

The site deploys to Vercel from [github.com/kardashev-lab/website](https://github.com/kardashev-lab/website). Set all environment variables in the Vercel project dashboard before deploying.

```bash
vercel --prod
```

If Git-triggered deploys do not run, trigger a redeploy from the Vercel dashboard or push an empty commit.

## Project Structure

```
app/
  layout.tsx          # Root layout — fonts, metadata
  page.tsx            # Home page (Hero → Tools → Vision → Approach → Notes)
  privacy/page.tsx    # Privacy policy
  api/subscribe/      # POST /api/subscribe — Resend email integration (rate-limited)
  globals.css         # Dark-only CSS variables and base styles
  sitemap.ts          # Sitemap generation
  robots.txt          # Crawler rules
components/
  Header.tsx          # Floating glass pill nav with mobile overlay
  Hero.tsx            # Full-viewport hero with background image and CTAs
  ToolsShowcase.tsx   # Asymmetric bento grid of live tools (4 dashboards)
  ApproachCards.tsx   # Plan / Prove / Scale pillars
  EmailForm.tsx       # Lab notes subscription form
  Footer.tsx          # Footer with tools + connect links
  GitHubIcon.tsx      # GitHub SVG icon component
  LinkedInIcon.tsx    # LinkedIn SVG icon component
lib/
  site.ts             # Shared constants (TOOLS, GITHUB_URL, contact, metadata)
  rate-limit.ts       # In-memory rate limiter for /api/subscribe
public/
  images/             # Hero, tool screenshots, approach visuals
  llms.txt            # LLM-readable site summary
```

## Contact

- **Email:** [ashutosh@kardashevlabs.org](mailto:ashutosh@kardashevlabs.org)
- **LinkedIn:** [linkedin.com/company/kardashev-labs](https://www.linkedin.com/company/kardashev-labs)
- **GitHub:** [github.com/kardashev-lab](https://github.com/kardashev-lab)

## License

MIT — source code is open. Tools and data pipelines live at [github.com/kardashev-lab](https://github.com/kardashev-lab).
