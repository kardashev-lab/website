# Kardashev Labs — Website

The marketing and landing site for [kardashevlabs.org](https://kardashevlabs.org) — home of open-source tools for the energy transition.

## What is Kardashev Labs?

Kardashev Labs builds open-source software for real-time grid intelligence and interconnection queue analysis. The goal: accelerate humanity toward Kardashev Type I by giving energy professionals the data tooling they've been missing.

## Live Tools

| Tool | URL | Description |
|------|-----|-------------|
| Interconnection Queue Tracker | [interconnection-queue.kardashevlabs.org](https://interconnection-queue.kardashevlabs.org) | Unified search across all 7 US ISO/RTO interconnection queues — ERCOT, MISO, PJM, CAISO, SPP, NYISO, ISO-NE. Daily refresh via GitHub Actions. |
| Grid Demand Dashboard | [grid-demand.kardashevlabs.org](https://grid-demand.kardashevlabs.org) | Real-time US electricity demand across 15 balancing authorities. Microservices pipeline with Redis Streams, Postgres, and Kubernetes. 95% CONUS coverage from EIA data. |

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3
- **Animation:** Framer Motion
- **Email:** Resend (lab notes subscriptions)
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
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL for metadata |

> **Note on Resend:** Without a verified sending domain, Resend can only deliver to the email address registered on your Resend account. Verify `kardashevlabs.org` at [resend.com/domains](https://resend.com/domains) to send to any recipient.

## Deployment

The site deploys to Vercel. Set all environment variables in the Vercel project dashboard before deploying.

```bash
vercel --prod
```

## Project Structure

```
app/
  layout.tsx          # Root layout — fonts, metadata
  page.tsx            # Home page (Hero → Tools → Vision → Approach → Notes)
  api/subscribe/      # POST /api/subscribe — Resend email integration
  globals.css         # Dark-only CSS variables and base styles
components/
  Header.tsx          # Floating glass pill nav with mobile overlay
  Hero.tsx            # Full-viewport hero with background image and CTAs
  ToolsShowcase.tsx   # Asymmetric bento grid of live tools
  ApproachCards.tsx   # Plan / Prove / Scale pillars
  EmailForm.tsx       # Lab notes subscription form
  Footer.tsx          # Footer with tools + connect links
  GitHubIcon.tsx      # GitHub SVG icon component
lib/
  site.ts             # Shared constants (GITHUB_URL, etc.)
public/images/        # Hero, tool screenshots, approach visuals
```

## License

MIT — source code is open. Tools and data pipelines live at [github.com/kardashev-lab](https://github.com/kardashev-lab).
