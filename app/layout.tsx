import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

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
  title: 'Kardashev Labs — Energy & Grid Intelligence Tools',
  description:
    'Open-source tools for US grid demand monitoring and interconnection queue tracking. Accelerating humanity toward Kardashev Type I.',
  keywords: [
    'energy data',
    'grid demand',
    'interconnection queue',
    'ISO',
    'balancing authority',
    'EIA',
    'open source',
    'Kardashev',
  ],
  authors: [{ name: 'Kardashev Labs' }],
  creator: 'Kardashev Labs',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://kardashevlabs.org'
  ),
  openGraph: {
    title: 'Kardashev Labs — Energy & Grid Intelligence Tools',
    description:
      'Open-source tools for US grid demand monitoring and interconnection queue tracking.',
    url: '/',
    siteName: 'Kardashev Labs',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Kardashev Labs' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kardashev Labs — Energy & Grid Intelligence Tools',
    description:
      'Open-source tools for US grid demand monitoring and interconnection queue tracking.',
    images: ['/og.png'],
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <Analytics />
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
