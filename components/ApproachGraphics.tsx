'use client';

import { motion } from 'framer-motion';

const ApproachGraphics = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.02 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <svg width="100%" height="100%" className="text-primary">
          <defs>
            <pattern id="approachPattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.3" />
              <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.2" />
              <circle cx="60" cy="60" r="1" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#approachPattern)" />
        </svg>
      </motion.div>

      {/* Floating connection lines */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0"
      >
        <svg width="100%" height="100%" className="text-primary">
          <motion.path
            d="M200,200 Q400,150 600,200 T1000,200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, delay: 1 }}
          />
          <motion.path
            d="M200,400 Q400,350 600,400 T1000,400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, delay: 1.5 }}
          />
          <motion.path
            d="M200,600 Q400,550 600,600 T1000,600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, delay: 2 }}
          />
        </svg>
      </motion.div>

      {/* Corner accents */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute top-10 left-10 w-16 h-16"
      >
        <svg viewBox="0 0 64 64" className="w-full h-full text-primary">
          <path d="M0,0 L64,0 L64,16 L16,16 L16,64 L0,64 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute top-10 right-10 w-16 h-16"
      >
        <svg viewBox="0 0 64 64" className="w-full h-full text-primary">
          <path d="M64,0 L0,0 L0,16 L48,16 L48,64 L64,64 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1.6 }}
        className="absolute bottom-10 left-10 w-16 h-16"
      >
        <svg viewBox="0 0 64 64" className="w-full h-full text-primary">
          <path d="M0,64 L64,64 L64,48 L16,48 L16,0 L0,0 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-10 right-10 w-16 h-16"
      >
        <svg viewBox="0 0 64 64" className="w-full h-full text-primary">
          <path d="M64,64 L0,64 L0,48 L48,48 L48,0 L64,0 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
};

export default ApproachGraphics;
