import Image from 'next/image';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ToolsShowcase from '@/components/ToolsShowcase';
import ApproachCards from '@/components/ApproachCards';
import EmailForm from '@/components/EmailForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-50 -translate-y-24 focus:translate-y-0 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform duration-200"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <ToolsShowcase />

        {/* Vision */}
        <section id="vision" className="py-16 lg:py-32 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
                  <span className="h-1.5 w-1.5 bg-primary" />
                  Vision
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold uppercase text-foreground leading-tight mb-6">
                  Energy and compute, used with unprecedented wisdom.
                </h2>
                <p className="text-[0.9rem] text-muted-foreground leading-relaxed">
                  Evidence replaces guesswork. Efficiency becomes the default
                  interface to power. We build the tools that help teams make
                  data-driven decisions that scale, toward a civilization that
                  uses every joule and every FLOP with intention.
                </p>
              </div>

              <div className="space-y-5">
                <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                  <Image
                    src="/images/vision-energy-future.webp"
                    alt="Planetary-scale energy and civilization visualization"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                </div>

                <div className="border border-white/10 bg-white/[0.02] p-8 lg:p-10">
                  <blockquote className="text-lg font-medium text-foreground/80 leading-relaxed italic border-l-2 border-primary/50 pl-6">
                    &ldquo;If we can&apos;t explain it, we don&apos;t deploy
                    it.&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-8 h-px bg-white/10" />
                    <span className="text-[12px] uppercase tracking-widest text-white/25 font-mono">
                      Kardashev Labs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ApproachCards />
        <EmailForm />
      </main>
      <Footer />
    </>
  );
}
