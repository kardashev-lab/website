'use client';

import { motion } from 'framer-motion';
import { fadeInUp, slideInFromLeft, slideInFromRight } from '@/lib/motion';
import DecorativeGraphics from './DecorativeGraphics';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative">
      <DecorativeGraphics />
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="mb-8"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent text-accent-foreground">
            Open source at the core
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
        >
          Accelerating humanity toward{' '}
          <span className="text-primary">Kardashev Type I</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          We build explainable, open-source software that helps teams plan, prove, and scale efficient use of energy and compute.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('notes')}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors focus-visible shadow-lg hover:shadow-xl"
          >
            Join the lab notes
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('vision')}
            className="px-8 py-4 border border-border text-foreground rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors focus-visible"
          >
            Read the vision
          </motion.button>
        </motion.div>

        {/* Subtle animated accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="mt-16 flex justify-center"
        >
          <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent rounded-full opacity-30" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
