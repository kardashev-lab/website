import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
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
    default: `${SITE_NAME} — Energy & Grid Intelligence Tools`,
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
    // Grid demand
    'real-time grid demand',
    'US electricity demand',
    'balancing authority data',
    'EIA electricity data',
    'CONUS grid monitoring',
    'grid load monitoring',
    'electricity consumption dashboard',
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
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} — Energy & Grid Intelligence Tools`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Open-source tools for US grid intelligence`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Energy & Grid Intelligence Tools`,
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
      ],
      description: SITE_DESCRIPTION,
      knowsAbout: [
        'US electricity grid',
        'ISO/RTO interconnection queues',
        'real-time grid demand monitoring',
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
    {
      '@type': 'WebApplication',
      '@id': `${TOOLS[0].url}/#app`,
      name: TOOLS[0].name,
      url: TOOLS[0].url,
      description: TOOLS[0].description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: { '@id': `${SITE_URL}/#organization` },
      featureList: [
        'Search across ERCOT, MISO, PJM, CAISO, SPP, NYISO, and ISO-NE queues',
        'Daily data refresh via GitHub Actions',
        'Filter by fuel type, capacity, and project status',
        'Download queue data as CSV',
      ],
      keywords: TOOLS[0].keywords.join(', '),
    },
    {
      '@type': 'WebApplication',
      '@id': `${TOOLS[1].url}/#app`,
      name: TOOLS[1].name,
      url: TOOLS[1].url,
      description: TOOLS[1].description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: { '@id': `${SITE_URL}/#organization` },
      featureList: [
        'Real-time demand across 15 balancing authorities',
        '95% CONUS electricity coverage',
        'EIA data integration',
        'Historical demand comparison',
      ],
      keywords: TOOLS[1].keywords.join(', '),
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Kardashev Labs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Kardashev Labs is an open-source organization building free software tools for US energy grid intelligence. Their tools include a unified interconnection queue tracker covering all 7 major ISO/RTOs and a real-time grid demand dashboard covering 95% of the continental US.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the US Interconnection Queue Tracker?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Interconnection Queue Tracker is a free web tool that provides unified search across all 7 major US ISO/RTO interconnection queues: ERCOT, MISO, PJM, CAISO, SPP, NYISO, and ISO-NE. It tracks every power project waiting to connect to the US grid, with data refreshed daily via GitHub Actions.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Grid Demand Dashboard?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Grid Demand Dashboard is a free real-time electricity demand monitoring tool covering 15 balancing authorities and 95% of the continental United States (CONUS). It sources data from the EIA (US Energy Information Administration) via a microservices pipeline.',
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
          name: 'Are Kardashev Labs tools free and open source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All Kardashev Labs tools are free to use and the source code is publicly available on GitHub at github.com/kardashev-lab under open-source licenses.',
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
