import { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What Kardashev Labs collects when you subscribe to lab notes, and how we use it.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Kardashev Labs',
    description: 'What Kardashev Labs collects when you subscribe to lab notes, and how we use it.',
    url: '/privacy',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: July 11, 2026
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                What we collect
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you subscribe to lab notes, we store the email address you
                type in. That is it, unless you email us something else on your
                own.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                How we use it
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use that address to send lab notes and occasional updates
                about the tools. We do not sell it. We do not hand it to
                advertisers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We keep the list on a normal email provider with standard
                access controls. Email over the public internet is never
                perfectly private; we treat the list carefully anyway.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Leaving the list
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Every note has an unsubscribe link. You can also email us and
                ask to be removed.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Contact
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about this policy:{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
