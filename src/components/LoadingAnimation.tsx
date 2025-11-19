import { motion } from 'framer-motion';
import { Shield, Eye } from 'lucide-react';

interface LoadingAnimationProps {
  isVisible: boolean;
  message?: string;
}

export default function LoadingAnimation({ isVisible, message = 'Processing your request...' }: LoadingAnimationProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col items-center justify-center space-y-6 max-w-sm mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
      >
        {/* Animated Shield with Eye - Same as Navbar */}
        <motion.div
          animate={{
            rotate: [0, 360, 360],
            scale: [1, 1.1, 1, 1],
          }}
          transition={{
            rotate: {
              duration: 5,
              times: [0, 0.16, 1],
              ease: [0.25, 0.46, 0.45, 0.94],
              repeat: Infinity,
              repeatDelay: 0,
            },
            scale: {
              duration: 5,
              times: [0, 0.08, 0.16, 1],
              ease: [0.25, 0.46, 0.45, 0.94],
              repeat: Infinity,
              repeatDelay: 0,
            },
          }}
          className="relative w-24 h-24 md:w-32 md:h-32"
        >
          {/* Shield */}
          <Shield className="h-24 w-24 md:h-32 md:w-32 text-blue-600" />
          {/* Eye - Slides out from right then spins back to shield front */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            animate={{
              x: [50, 0, 0, 50],
              opacity: [0, 1, 1, 0],
              rotate: [0, 0, -360, -360],
              zIndex: [0, 10, 10, 0],
            }}
            transition={{
              x: {
                duration: 5,
                times: [0, 0.16, 0.86, 1],
                repeat: Infinity,
                repeatDelay: 0,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
              opacity: {
                duration: 5,
                times: [0, 0.16, 0.86, 1],
                repeat: Infinity,
                repeatDelay: 0,
              },
              rotate: {
                duration: 5,
                times: [0, 0.16, 0.16, 0.88],
                repeat: Infinity,
                repeatDelay: 0,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
              zIndex: {
                duration: 5,
                times: [0, 0.16, 0.86, 1],
                repeat: Infinity,
                repeatDelay: 0,
              },
            }}
            style={{ pointerEvents: 'none' }}
          >
            <Eye className="h-10 w-10 md:h-14 md:w-14 text-blue-600" />
          </motion.div>
        </motion.div>

        {/* Animated dots */}
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-600 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <motion.div
          className="text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-gray-800 font-semibold text-lg md:text-xl">
            {message}
          </p>
          <motion.p
            className="text-sm text-gray-500 mt-2"
            animate={{
              content: ['', '.', '..', '...', ''],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {Array.from('.'.repeat((Math.floor(Date.now() / 500) % 4))).join('')}
          </motion.p>
        </motion.div>

        {/* Subtle background animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent rounded-2xl -z-10 opacity-0"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
