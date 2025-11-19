import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessBannerProps {
  isVisible: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
  autoCloseDuration?: number;
}

export default function SuccessBanner({
  isVisible,
  type,
  title,
  message,
  onClose,
  autoCloseDuration = 5000,
}: SuccessBannerProps) {
  useEffect(() => {
    if (isVisible && autoCloseDuration > 0) {
      const timer = setTimeout(onClose, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoCloseDuration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Banner */}
          <motion.div
            className={`relative max-w-md w-full rounded-2xl shadow-2xl overflow-hidden ${
              type === 'success'
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
                : 'bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200'
            }`}
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Animated background accent */}
            <motion.div
              className={`absolute top-0 right-0 w-48 h-48 ${
                type === 'success'
                  ? 'bg-green-200/20'
                  : 'bg-red-200/20'
              } rounded-full blur-3xl -z-0`}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative p-8 md:p-10">
              {/* Icon with animation */}
              <motion.div
                className="flex justify-center mb-6"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {type === 'success' ? (
                  <CheckCircle className="h-16 w-16 text-green-600" strokeWidth={1.5} />
                ) : (
                  <AlertCircle className="h-16 w-16 text-red-600" strokeWidth={1.5} />
                )}
              </motion.div>

              {/* Title */}
              <motion.h2
                className={`text-2xl md:text-3xl font-bold text-center mb-3 ${
                  type === 'success' ? 'text-green-900' : 'text-red-900'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {title}
              </motion.h2>

              {/* Message */}
              <motion.p
                className={`text-center text-sm md:text-base mb-8 leading-relaxed ${
                  type === 'success' ? 'text-green-700' : 'text-red-700'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {message}
              </motion.p>

              {/* Progress bar */}
              <motion.div
                className={`h-1 rounded-full ${
                  type === 'success' ? 'bg-green-300' : 'bg-red-300'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: autoCloseDuration / 1000 }}
                style={{ originX: 0 }}
              />

              {/* Close button */}
              <motion.button
                className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${
                  type === 'success'
                    ? 'hover:bg-green-200/50 text-green-600 hover:text-green-700'
                    : 'hover:bg-red-200/50 text-red-600 hover:text-red-700'
                }`}
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
