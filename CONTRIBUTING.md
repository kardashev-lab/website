# Contributing to the Kardashev Labs Website

Thanks for helping improve the public home for Kardashev Labs. This repo is a good first place to contribute if you like frontend polish, copy, accessibility, SEO, or product storytelling.

## What this repo does

The website explains the live Kardashev Labs tools and routes users to the dashboards:

- Interconnection Queue Tracker
- Grid Demand Dashboard
- Curtailment Tracker
- LMP Dashboard

Stack: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion, Resend, Vercel.

## Local setup

```bash
pnpm install
cp env.example .env
pnpm dev
```

Open `http://localhost:3000`.

For email form work, fill in the Resend values in `.env`. For layout, copy, and visual changes, the defaults are enough.

## Before opening a PR

Run:

```bash
pnpm lint
pnpm type-check
pnpm build
```

If a command fails because of missing local secrets, mention that in the PR.

## Good first contributions

- Improve mobile spacing or touch targets.
- Add missing alt text or improve image descriptions.
- Tighten copy for one tool card.
- Improve metadata, sitemap, or `llms.txt`.
- Fix small visual bugs without changing the whole design system.

## PR guidelines

- Keep PRs small and focused.
- Include screenshots for UI changes.
- Do not commit `.env` files or secrets.
- Prefer existing components and Tailwind patterns.
- Explain the user-facing impact in the PR description.

## Questions

Open an issue with the label `question` or `help wanted`, or start with one of the `good first issue` tickets.
