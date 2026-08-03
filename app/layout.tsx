import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import MotionProvider from '@/components/MotionProvider';
import './globals.css';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, TOOLS } from '@/lib/site';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Energy & Grid Intelligence Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    // Brand
    'Kardashev Labs',
    'Kardashev Type I',
    'energy transition',
    'open source energy tools',
    // Interconnection queue
    'US interconnection queue',
    'power project interconnection',
    'ERCOT interconnection queue',
    'MISO interconnection queue',
    'PJM interconnection queue',
    'CAISO interconnection queue',
    'SPP interconnection queue',
    'NYISO interconnection queue',
    'ISO-NE interconnection queue',
    'ISO RTO tracker',
    'grid interconnection data',
    // Large load / ERCOT Batch Zero
    'ERCOT large load queue',
    'ERCOT data center interconnection',
    'large load interconnection Texas',
    'Batch Zero ERCOT',
    'data center power Texas',
    // Grid demand
    'real-time grid demand',
    'US electricity demand',
    'balancing authority data',
    'EIA electricity data',
    'CONUS grid monitoring',
    'grid load monitoring',
    'electricity consumption dashboard',
    // Curtailment
    'solar curtailment',
    'wind curtailment',
    'renewable curtailment data',
    'duck curve',
    // LMP / prices
    'LMP dashboard',
    'locational marginal price',
    'wholesale electricity prices',
    // General
    'energy data tools',
    'grid intelligence',
    'clean energy data',
    'power grid analytics',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'Energy & Technology',
  openGraph: {
    title: `${SITE_NAME} | Energy & Grid Intelligence Tools`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Open-source tools for US grid intelligence`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Energy & Grid Intelligence Tools`,
    description: SITE_DESCRIPTION,
    images: ['/og.png'],
    creator: '@kardashevlabs',
    site: '@kardashevlabs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console / Bing verification tokens here when available
    // google: 'your-token',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
      sameAs: [
        'https://github.com/kardashev-lab',
        'https://www.linkedin.com/company/kardashev-labs',
        'https://pypi.org/project/kardashev/',
      ],
      description: SITE_DESCRIPTION,
      knowsAbout: [
        'US electricity grid',
        'ISO/RTO interconnection queues',
        'real-time grid demand monitoring',
        'renewable energy curtailment',
        'locational marginal prices',
        'energy transition',
        'open-source energy software',
        'EIA electricity data',
        'balancing authorities',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-US',
    },
    ...TOOLS.map((tool) => ({
      '@type': 'WebApplication',
      '@id': `${tool.url}/#app`,
      name: tool.name,
      url: tool.url,
      description: tool.description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: { '@id': `${SITE_URL}/#organization` },
      featureList: tool.features,
      keywords: tool.keywords.join(', '),
    })),
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Kardashev Labs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Kardashev Labs builds free open-source tools for US grid data: carbon intensity, interconnection queues across 7 ISO/RTOs, ERCOT large-load and site clearance, demand, curtailment, LMP dashboards and maps, a scored ERCOT spread forecast, docs at docs.kardashevlabs.org, and the kardashev Python package on PyPI.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the US Interconnection Queue Tracker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Search ERCOT, MISO, PJM, CAISO, SPP, NYISO, and ISO-NE interconnection queues in one place. Daily refresh from public ISO reports.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Large Load Tracker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Tracks ERCOT's large-load queue (data center, crypto, industrial) from LLWG/LFLTF decks. Zone grades from queue depth, gen-side timelines, and price stress. Includes a timeline estimator and a Batch Zero explainer.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is Site Clearance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At clearance.kardashevlabs.org you draw an ERCOT search area, pick gen or large-load MW, and get a strong / mixed / weak county-level grade from public GIS queue, measured timelines, and LMP stress. Not an official interconnection study.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is Batch Zero in ERCOT?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Under Senate Bill 6, ERCOT studies eligible large loads together (PGRR145, NPRR1325) instead of one at a time, then builds one transmission plan for what the grid can support. Batch Zero is the first batch.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Grid Demand Dashboard?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Live electricity demand across 15 balancing authorities (~95% of CONUS), from EIA Open Data via kardashev-data.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which ISOs and RTOs are covered by the interconnection queue tracker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The tracker covers all 7 major US ISO/RTOs: ERCOT (Texas), MISO (Midcontinent), PJM (Mid-Atlantic/Midwest), CAISO (California), SPP (Southwest Power Pool), NYISO (New York), and ISO-NE (New England).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Curtailment Tracker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Daily solar and wind curtailment for CAISO, SPP, and ERCOT, with a 90-day history. High curtailment usually means congestion or missing storage.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the LMP Dashboard?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Real-time and day-ahead locational marginal prices for NYISO, PJM, CAISO, and SPP, with energy / congestion / loss components plus fuel mix, gas, weather, and storage context.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are Kardashev Labs tools free and open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Free to use; source is on GitHub at github.com/kardashev-lab under open-source licenses.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
