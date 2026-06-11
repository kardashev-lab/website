'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Makes every framer-motion animation respect the OS-level
 * prefers-reduced-motion setting (framer-motion is opt-in here).
 */
const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

export default MotionProvider;
