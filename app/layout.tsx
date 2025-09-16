import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Kardashev Labs - Accelerating humanity toward Kardashev Type I',
  description: 'We build explainable, open-source software that helps teams plan, prove, and scale efficient use of energy and compute.',
  keywords: ['energy efficiency', 'compute optimization', 'open source', 'sustainability', 'Kardashev scale'],
  authors: [{ name: 'Kardashev Labs' }],
  creator: 'Kardashev Labs',
  publisher: 'Kardashev Labs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kardashevlabs.org'),
  openGraph: {
    title: 'Kardashev Labs - Accelerating humanity toward Kardashev Type I',
    description: 'We build explainable, open-source software that helps teams plan, prove, and scale efficient use of energy and compute.',
    url: '/',
    siteName: 'Kardashev Labs',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Kardashev Labs - Coming Soon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kardashev Labs - Accelerating humanity toward Kardashev Type I',
    description: 'We build explainable, open-source software that helps teams plan, prove, and scale efficient use of energy and compute.',
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
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
