import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ShimmerProps {
  children: ReactNode;
  className?: string;
}

export default function Shimmer({ children, className = '' }: ShimmerProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {children}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          translateX: ['100%', '200%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}

