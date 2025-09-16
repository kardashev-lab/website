'use client';

import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion';

const ValueStrip = () => {
  const values = [
    {
      title: 'Plan',
      description: 'Concrete schedules and policies - advisory first.',
    },
    {
      title: 'Prove',
      description: 'Baselines, assumptions, and measured deltas.',
    },
    {
      title: 'Scale',
      description: 'Automation only where data supports it.',
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={staggerItem}
              className="text-center p-6 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ValueStrip;
