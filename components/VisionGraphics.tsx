'use client';

import { motion } from 'framer-motion';

const VisionGraphics = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Central energy core */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.2, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.2 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32"
      >
        <svg viewBox="0 0 128 128" className="w-full h-full text-primary">
          <circle cx="64" cy="64" r="60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <circle cx="64" cy="64" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <circle cx="64" cy="64" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="64" cy="64" r="8" fill="currentColor" opacity="0.6" />
          
          {/* Energy rays */}
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <line x1="64" y1="4" x2="64" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="124" y1="64" x2="108" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="64" y1="124" x2="64" y2="108" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <line x1="4" y1="64" x2="20" y2="64" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Orbiting elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48"
      >
        <motion.svg
          viewBox="0 0 192 192"
          className="w-full h-full text-primary"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="96" cy="96" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <circle cx="96" cy="16" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="176" cy="96" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="96" cy="176" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="16" cy="96" r="3" fill="currentColor" opacity="0.4" />
        </motion.svg>
      </motion.div>

      {/* Data flow visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute inset-0"
      >
        <svg width="100%" height="100%" className="text-primary">
          <defs>
            <pattern id="dataFlow" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0,30 Q30,0 60,30 T120,30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <path d="M0,30 Q30,60 60,30 T120,30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dataFlow)" />
        </svg>
      </motion.div>
    </div>
  );
};

export default VisionGraphics;
