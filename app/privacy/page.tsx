import { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy - Kardashev Labs',
  description: 'Privacy policy for Kardashev Labs website and services.',
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
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information you provide directly to us, such as when you subscribe to our lab notes. 
                This may include your email address and any other information you choose to provide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to send you lab notes and updates about our work. 
                We do not sell, trade, or otherwise transfer your information to third parties without your consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate security measures to protect your personal information. 
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to unsubscribe from our communications at any time. 
                You can do this by clicking the unsubscribe link in any email we send you, 
                or by contacting us directly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this privacy policy, please contact us at{' '}
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
