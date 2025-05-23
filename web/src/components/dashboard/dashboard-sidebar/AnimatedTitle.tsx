'use client';

import { AnimatePresence, motion } from 'framer-motion';

const AnimatedSectionTitle = ({ children, isVisible }: { children: React.ReactNode; isVisible: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.p
        key={children?.toString()}
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 'auto' }}
        exit={{ opacity: 0, width: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="text-grey-400 text-sm font-semibold shrink-0 whitespace-nowrap"
      >
        {children}
      </motion.p>
    )}
  </AnimatePresence>
);

export default AnimatedSectionTitle;
