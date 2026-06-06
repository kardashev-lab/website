export const GITHUB_URL = 'https://github.com/kardashev-lab';

export const SITE_URL = 'https://kardashevlabs.org';
export const SITE_NAME = 'Kardashev Labs';
export const SITE_DESCRIPTION =
  'Open-source software for US energy grid intelligence — real-time grid demand monitoring across 15 balancing authorities and unified interconnection queue tracking across all 7 major US ISO/RTOs. Built for the energy transition.';

export const TOOLS = [
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
  },
  {
    id: 'grid-demand',
    name: 'Grid Demand Dashboard',
    url: 'https://grid-demand.kardashevlabs.org',
    description:
      'Real-time US electricity demand monitoring across 15 balancing authorities covering 95% of the continental US (CONUS). Powered by EIA data via a microservices pipeline with Redis Streams, Postgres, and Kubernetes.',
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
  },
];
