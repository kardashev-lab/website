import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ValueStrip from '@/components/ValueStrip';
import ApproachCards from '@/components/ApproachCards';
import Countdown from '@/components/Countdown';
import EmailForm from '@/components/EmailForm';
import Footer from '@/components/Footer';
import VisionGraphics from '@/components/VisionGraphics';
import ApproachGraphics from '@/components/ApproachGraphics';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        
        <Section id="vision" className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <VisionGraphics />
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="prose prose-lg mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
                Vision
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We envision a future where energy and compute are used with unprecedented wisdom. 
                Evidence replaces guesswork, and efficiency becomes the default interface to power. 
                Our tools help teams make data-driven decisions that scale sustainably.
              </p>
              <blockquote className="text-xl font-medium text-foreground border-l-4 border-primary pl-6 italic">
                "If we can't explain it, we don't deploy it."
              </blockquote>
            </div>
          </div>
        </Section>

        <Section id="approach" className="relative">
          <ApproachGraphics />
          <div className="relative z-10">
            <ApproachCards />
          </div>
        </Section>

        <Section>
          <Countdown />
        </Section>

        <Section id="notes">
          <EmailForm />
        </Section>
      </main>
      <Footer />
    </>
  );
}
