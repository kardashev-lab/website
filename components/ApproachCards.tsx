'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const approaches = [
  {
    number: '01',
    title: 'Plan',
    description:
      'Concrete schedules and policies. Evidence first, assumptions labeled, advisory before automation.',
    image: '/images/approach-plan.webp',
    imageAlt: 'Abstract planning and routing visualization',
  },
  {
    number: '02',
    title: 'Prove',
    description:
      'Baselines, assumptions, and measured deltas. If we can\'t explain it, we don\'t deploy it.',
    image: '/images/approach-prove.webp',
    imageAlt: 'Abstract metrics and validation visualization',
  },
  {
    number: '03',
    title: 'Scale',
    description:
      'Automation only where data supports it. Systems that compound without compounding risk.',
    image: '/images/approach-scale.webp',
    imageAlt: 'Abstract scaling and modular growth visualization',
  },
];

const ApproachCards = () => (
  <div id="approach" className="py-16 lg:py-32 px-4 border-t border-white/10">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 lg:mb-16"
      >
        <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
          <span className="h-1.5 w-1.5 bg-primary" />
          How we build
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold uppercase text-foreground leading-tight">
          Three pillars.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {approaches.map((item, i) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group h-full bg-background hover:bg-white/[0.03] transition-colors duration-500 p-7"
          >
            <div className="relative mb-6 aspect-[16/10] overflow-hidden border border-white/10">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="font-mono text-[11px] text-primary/70 uppercase tracking-widest mb-6">
              {item.number}
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {item.title}
            </h3>
            <p className="text-[0.875rem] text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default ApproachCards;
