'use client';

import { motion } from 'framer-motion';

export default function AnimatedMain({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}
