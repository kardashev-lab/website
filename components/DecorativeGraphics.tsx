'use client';

import { motion } from 'framer-motion';

const DecorativeGraphics = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-20 left-10 w-16 h-16"
      >
        <svg viewBox="0 0 64 64" className="w-full h-full text-primary">
          <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="32" cy="32" r="4" fill="currentColor" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute top-40 right-20 w-12 h-12"
      >
        <svg viewBox="0 0 48 48" className="w-full h-full text-primary">
          <polygon points="24,4 44,20 36,44 12,44 4,20" fill="none" stroke="currentColor" strokeWidth="1" />
          <polygon points="24,16 36,24 32,36 16,36 12,24" fill="currentColor" opacity="0.3" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 1.1 }}
        className="absolute bottom-32 left-20 w-20 h-20"
      >
        <svg viewBox="0 0 80 80" className="w-full h-full text-primary">
          <rect x="10" y="10" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="20" y="20" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" />
          <rect x="30" y="30" width="20" height="20" fill="currentColor" opacity="0.2" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 2, delay: 1.4 }}
        className="absolute bottom-20 right-10 w-14 h-14"
      >
        <svg viewBox="0 0 56 56" className="w-full h-full text-primary">
          <path d="M28,4 L52,28 L28,52 L4,28 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M28,12 L44,28 L28,44 L12,28 Z" fill="currentColor" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Subtle grid pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 3, delay: 1 }}
        className="absolute inset-0"
      >
        <svg width="100%" height="100%" className="text-primary">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Energy flow lines */}
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, delay: 2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <svg width="100%" height="100%" className="text-primary opacity-15">
          <path
            d="M0,200 Q200,100 400,200 T800,200"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M0,300 Q300,200 600,300 T1200,300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M0,400 Q400,300 800,400 T1600,400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default DecorativeGraphics;
