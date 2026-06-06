'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const approaches = [
  {
    number: '01',
    title: 'Plan',
    description:
      'Concrete schedules and policies. Evidence first, assumptions labeled, advisory before automation.',
    image: '/images/approach-plan.png',
    imageAlt: 'Abstract planning and routing visualization',
  },
  {
    number: '02',
    title: 'Prove',
    description:
      'Baselines, assumptions, and measured deltas. If we can\'t explain it, we don\'t deploy it.',
    image: '/images/approach-prove.png',
    imageAlt: 'Abstract metrics and validation visualization',
  },
  {
    number: '03',
    title: 'Scale',
    description:
      'Automation only where data supports it. Systems that compound without compounding risk.',
    image: '/images/approach-scale.png',
    imageAlt: 'Abstract scaling and modular growth visualization',
  },
];

const ApproachCards = () => (
  <div id="approach" className="py-32 px-4">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium bg-white/5 ring-1 ring-white/10 text-white/40 mb-6">
          How we build
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
          Three pillars.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {approaches.map((item, i) => (
          <motion.div
            key={item.number}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer shell */}
            <div className="group h-full p-px rounded-[1.5rem] bg-gradient-to-b from-white/8 to-white/[0.02] hover:from-white/12 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              {/* Inner core */}
              <div className="h-full rounded-[calc(1.5rem-1px)] bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-500 p-7">
                <div className="relative mb-6 aspect-[16/10] rounded-xl overflow-hidden ring-1 ring-white/8">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="font-mono text-[11px] text-white/20 uppercase tracking-widest mb-6">
                  {item.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-[0.875rem] text-white/38 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default ApproachCards;
