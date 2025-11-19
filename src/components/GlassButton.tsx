import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function GlassButton({
  children,
  variant = 'primary',
  onClick,
  className = '',
  size = 'lg',
}: GlassButtonProps) {
  const baseClasses = 'relative font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 overflow-hidden group';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 border border-blue-500/20',
    secondary: 'bg-gradient-to-r from-white/20 via-white/10 to-white/5 text-white hover:from-white/30 hover:via-white/20 hover:to-white/10 shadow-lg hover:shadow-2xl hover:shadow-white/40 backdrop-blur-xl border border-white/40 hover:border-white/60',
  };

  // Click animation
  const clickVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.button
      onClick={onClick}
      variants={clickVariants}
      initial="initial"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap="tap"
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {/* Animated light reflection/sweep effect - kept from original */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/25 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
        style={{ pointerEvents: 'none' }}
      />

      {/* Subtle glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: variant === 'primary' 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
}
