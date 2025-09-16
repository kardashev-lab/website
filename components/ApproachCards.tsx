'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion';

const ApproachCards = () => {
  const approaches = [
    {
      title: 'Plan',
      description: 'Concrete schedules and policies - advisory first.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: 'Prove',
      description: 'Baselines, assumptions, and measured deltas.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Scale',
      description: 'Automation only where data supports it.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      className="py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={staggerItem}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Approach
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three pillars that guide everything we build
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.title}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="group p-8 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                {approach.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
                {approach.title}
              </h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                {approach.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ApproachCards;
