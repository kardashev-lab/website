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
      <Header />
      <main>
        <Hero />
        <ToolsShowcase />

        {/* Vision */}
        <section id="vision" className="py-16 lg:py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium bg-white/5 ring-1 ring-white/10 text-white/40 mb-6">
                  Vision
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                  Energy and compute, used with unprecedented wisdom.
                </h2>
                <p className="text-[0.9rem] text-white/40 leading-relaxed">
                  Evidence replaces guesswork. Efficiency becomes the default
                  interface to power. We build the tools that help teams make
                  data-driven decisions that scale — toward a civilization that
                  uses every joule and every FLOP with intention.
                </p>
              </div>

              <div className="space-y-5">
                <div className="p-px rounded-[2rem] bg-gradient-to-br from-white/8 to-white/[0.02]">
                  <div className="relative aspect-[4/3] rounded-[calc(2rem-1px)] overflow-hidden">
                    <Image
                      src="/images/vision-energy-future.webp"
                      alt="Planetary-scale energy and civilization visualization"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/50 via-transparent to-transparent" />
                  </div>
                </div>

                <div className="p-px rounded-[2rem] bg-gradient-to-br from-white/8 to-white/[0.02]">
                  <div className="rounded-[calc(2rem-1px)] bg-white/[0.02] p-8 lg:p-10">
                    <blockquote className="text-lg font-medium text-white/70 leading-relaxed italic border-l-2 border-blue-500/40 pl-6">
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
          </div>
        </section>

        <ApproachCards />
        <EmailForm />
      </main>
      <Footer />
    </>
  );
}
