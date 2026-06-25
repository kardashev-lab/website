export const GITHUB_URL = 'https://github.com/kardashev-lab';
export const CONTACT_EMAIL = 'ashutosh@kardashevlabs.org';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/kardashev-labs';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kardashevlabs.org';
export const SITE_NAME = 'Kardashev Labs';
export const SITE_DESCRIPTION =
  'Open-source software for US energy grid intelligence — real-time CO2 carbon intensity, grid demand monitoring, interconnection queue tracking across all 7 major US ISO/RTOs, wholesale electricity prices (LMP), and daily solar & wind curtailment data. Built for the energy transition.';

export type Tool = {
  id: string;
  name: string;
  url: string;
  description: string;
  keywords: string[];
  features: string[];
  // Showcase presentation
  headline: string;
  blurb: string;
  stats: { value: string; label: string }[];
  image: string;
  imageAlt: string;
  theme: {
    accent: string;
    glow: string;
    badge: string;
    dot: string;
    button: string;
  };
};

export const TOOLS: Tool[] = [
  {
    id: 'carbon-intensity',
    name: 'Carbon Intensity Dashboard',
    url: 'https://carbon-dashboard.kardashevlabs.org',
    description:
      'Real-time CO2 intensity (lbs CO2/MWh) for all 7 primary US ISOs plus 20+ smaller balancing authorities via EIA-930. Weighted average of live fuel mix using EPA eGRID 2023 emission factors. 24-hour history chart, fuel mix breakdown, and staleness indicators.',
    keywords: [
      'carbon intensity',
      'CO2 emissions',
      'grid carbon',
      'clean electricity',
      'EPA eGRID',
      'CAISO carbon',
      'ERCOT carbon',
      'lbs CO2 per MWh',
      'US grid emissions',
      'carbon tracking',
    ],
    features: [
      'All 7 primary ISOs plus 20+ smaller BAs via EIA-930',
      'EPA eGRID 2023 emission factors',
      '24-hour carbon intensity history per ISO',
      'Live fuel mix breakdown with staleness indicators',
    ],
    headline: 'Real-time CO₂ intensity across every US grid region.',
    blurb:
      'Weighted average lbs CO₂/MWh from live fuel mix data. Covers all 7 primary ISOs (CAISO, ERCOT, MISO, PJM, NYISO, ISONE, SPP) plus 20+ smaller balancing authorities via EIA-930. EPA eGRID 2023 emission factors. 60-second polling.',
    stats: [
      { value: '27+', label: 'regions covered' },
      { value: '60s', label: 'polling interval' },
      { value: 'eGRID 2023', label: 'emission factors' },
    ],
    image: '/images/tool-carbon.webp',
    imageAlt: 'US carbon intensity dashboard preview',
    theme: {
      accent: 'from-amber-500/20 to-amber-500/0',
      glow: 'rgba(245,158,11,0.12)',
      badge: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
      dot: 'bg-amber-400',
      button: 'bg-amber-500 hover:bg-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.25)]',
    },
  },
  {
    id: 'interconnection-queue',
    name: 'Interconnection Queue Tracker',
    url: 'https://interconnection-queue.kardashevlabs.org',
    description:
      'Unified search across all 7 major US ISO/RTO interconnection queues — ERCOT, MISO, PJM, CAISO, SPP, NYISO, and ISO-NE. Tracks every power project waiting to connect to the US grid. Data refreshed daily via GitHub Actions.',
    keywords: [
      'interconnection queue',
      'ERCOT queue',
      'MISO interconnection',
      'PJM queue',
      'CAISO interconnection',
      'SPP queue',
      'NYISO interconnection',
      'ISO-NE queue',
      'power project interconnection',
      'US grid interconnection',
    ],
    features: [
      'Search across ERCOT, MISO, PJM, CAISO, SPP, NYISO, and ISO-NE queues',
      'Daily data refresh via GitHub Actions',
      'Filter by fuel type, capacity, and project status',
      'Download queue data as CSV',
    ],
    headline: 'Every US power project waiting to connect to the grid.',
    blurb:
      'Unified search across all 7 major ISO/RTO interconnection queues — ERCOT, MISO, PJM, CAISO, SPP, NYISO, ISO-NE. Daily refresh via GitHub Actions. One interface for the data that used to require 7 browser tabs.',
    stats: [
      { value: '7', label: 'ISOs covered' },
      { value: 'Daily', label: 'data refresh' },
      { value: 'GW+', label: 'queue capacity tracked' },
    ],
    image: '/images/tool-interconnection.webp',
    imageAlt: 'US interconnection queue dashboard preview',
    theme: {
      accent: 'from-blue-500/20 to-blue-500/0',
      glow: 'rgba(59,130,246,0.12)',
      badge: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
      dot: 'bg-blue-400',
      button: 'bg-blue-500 hover:bg-blue-400 shadow-[0_0_24px_rgba(59,130,246,0.25)]',
    },
  },
  {
    id: 'grid-demand',
    name: 'Grid Demand Dashboard',
    url: 'https://grid-demand.kardashevlabs.org',
    description:
      'Real-time US electricity demand monitoring across 15 balancing authorities covering 95% of the continental US (CONUS). EIA and ISO data served through the kardashev-data platform, with a distributed Redis Streams + Postgres + Kubernetes pipeline.',
    keywords: [
      'grid demand',
      'real-time electricity demand',
      'balancing authority',
      'EIA electricity data',
      'CONUS electricity',
      'US power grid monitoring',
      'electricity consumption',
      'grid load',
    ],
    features: [
      'Real-time demand across 15 balancing authorities',
      '95% CONUS electricity coverage',
      'Regional map, treemap, and 48-hour trends',
      'Historical demand comparison',
    ],
    headline: 'Real-time US electricity demand across 15 balancing authorities.',
    blurb:
      'Microservices pipeline — Redis Streams, Postgres, Kubernetes with 17 HPAs. 95% CONUS coverage. 23ms chaos recovery, 215 req/s under load.',
    stats: [
      { value: '15', label: 'balancing authorities' },
      { value: '95%', label: 'CONUS coverage' },
      { value: '23ms', label: 'chaos recovery' },
    ],
    image: '/images/tool-grid-demand.webp',
    imageAlt: 'Real-time grid demand dashboard preview',
    theme: {
      accent: 'from-emerald-500/20 to-emerald-500/0',
      glow: 'rgba(16,185,129,0.1)',
      badge: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
      dot: 'bg-emerald-400',
      button: 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.25)]',
    },
  },
  {
    id: 'curtailment-tracker',
    name: 'Curtailment Tracker',
    url: 'https://curtailment-tracker.kardashevlabs.org',
    description:
      'Daily solar and wind curtailment across CAISO (California), SPP (Southwest Power Pool), and ERCOT (Texas). 90-day rolling history. Shows where the grid is congested and where storage is needed most.',
    keywords: [
      'solar curtailment',
      'wind curtailment',
      'CAISO curtailment',
      'SPP curtailment',
      'ERCOT curtailment',
      'renewable curtailment',
      'duck curve',
      'grid congestion',
      'energy storage',
      'US grid curtailment',
    ],
    features: [
      'Daily solar and wind curtailment by ISO',
      'CAISO, SPP, and ERCOT coverage',
      '90-day rolling history with trend charts',
      'Duck curve and congestion context',
    ],
    headline: 'How much clean energy gets thrown away — every day, by ISO.',
    blurb:
      'Daily solar and wind curtailment across CAISO (California), SPP (Great Plains), and ERCOT (Texas). 90-day rolling history. Reveals where the grid is congested and where storage is needed most. Refreshed each morning.',
    stats: [
      { value: '3', label: 'ISOs tracked' },
      { value: '90d', label: 'rolling history' },
      { value: 'Daily', label: 'data refresh' },
    ],
    image: '/images/tool-curtailment.webp',
    imageAlt: 'US curtailment tracker dashboard preview',
    theme: {
      accent: 'from-rose-500/20 to-rose-500/0',
      glow: 'rgba(251,113,133,0.12)',
      badge: 'bg-rose-500/10 text-rose-400 ring-rose-500/20',
      dot: 'bg-rose-400',
      button: 'bg-rose-500 hover:bg-rose-400 shadow-[0_0_24px_rgba(251,113,133,0.25)]',
    },
  },
  {
    id: 'lmp-dashboard',
    name: 'LMP Dashboard',
    url: 'https://lmp.kardashevlabs.org',
    description:
      'Real-time and day-ahead locational marginal prices (LMP) across NYISO, PJM, CAISO, and SPP — energy, congestion, and loss components per hub, plus fuel mix, gas prices, weather, curtailment, and battery storage in one terminal.',
    keywords: [
      'LMP',
      'locational marginal price',
      'wholesale electricity prices',
      'NYISO LMP',
      'PJM LMP',
      'CAISO LMP',
      'SPP LMP',
      'day-ahead market',
      'real-time market',
      'grid congestion pricing',
    ],
    features: [
      'Real-time and day-ahead LMP across NYISO, PJM, CAISO, and SPP',
      'Energy, congestion, and loss components per hub',
      'Fuel mix, gas prices, weather, and battery storage context',
      '5-minute price refresh',
    ],
    headline: 'Electricity spot prices across the US grid — every 5 minutes.',
    blurb:
      'Real-time and day-ahead locational marginal prices across NYISO, PJM, CAISO, and SPP. Energy, congestion, and loss components per hub node. Fuel mix by source, Henry Hub gas prices, grid temperatures, renewable curtailment, and battery storage — all in one terminal.',
    stats: [
      { value: '4', label: 'ISOs covered' },
      { value: '5-min', label: 'RT price refresh' },
      { value: 'RT + DA', label: 'market depth' },
    ],
    image: '/images/tool-lmp.webp',
    imageAlt: 'LMP dashboard preview showing CAISO real-time prices',
    theme: {
      accent: 'from-violet-500/20 to-violet-500/0',
      glow: 'rgba(139,92,246,0.12)',
      badge: 'bg-violet-500/10 text-violet-400 ring-violet-500/20',
      dot: 'bg-violet-400',
      button: 'bg-violet-500 hover:bg-violet-400 shadow-[0_0_24px_rgba(139,92,246,0.25)]',
    },
  },
];
