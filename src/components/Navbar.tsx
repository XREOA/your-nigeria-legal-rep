import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, Home, Settings, Info, BookOpen, Mail, Shield, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/process', label: 'How It Works', icon: Settings },
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/98 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30 opacity-0"
        animate={{
          opacity: scrolled ? 0.4 : 0.15,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group relative z-10">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                scale: { type: 'spring', stiffness: 400, damping: 17 }
              }}
            >
              <motion.div
                className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                animate={{
                  rotate: [0, 360, 360],
                  scale: [1, 1.1, 1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 5,
                    times: [0, 0.16, 1], // Rotate in first 0.8s, then hold for 4.2s
                    ease: [0.25, 0.46, 0.45, 0.94],
                    repeat: Infinity,
                    repeatDelay: 0,
                  },
                  scale: {
                    duration: 5,
                    times: [0, 0.08, 0.16, 1], // Scale up, then down, then hold
                    ease: [0.25, 0.46, 0.45, 0.94],
                    repeat: Infinity,
                    repeatDelay: 0,
                  },
                }}
                className="relative w-8 h-8 md:w-10 md:h-10"
              >
                {/* Shield */}
                <Shield className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
                {/* Eye - Slides out from right (where name comes from) then spins back to shield front */}
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
                      times: [0, 0.16, 0.86, 1], // Slide in from right during first 0.8s, hold until 4.3s, slide out last 0.7s
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
                      times: [0, 0.16, 0.16, 0.88], // Stay at 0, then spin from 0.16 to 0.88
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
                  <Eye className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex flex-col overflow-hidden relative"
              whileHover={{ x: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <motion.span
                className="font-bold text-lg md:text-xl text-gray-900"
                animate={{
                  x: [-100, 0, 0, -100],
                  opacity: [0, 1, 1, 0],
                  backgroundPosition: ['0%', '100%'],
                }}
                transition={{
                  x: {
                    duration: 5,
                    times: [0, 0.16, 0.88, 1], // Wait 0.8s (shield rotation), slide in 0.6s, hold 3.6s, slide out 0.6s
                    repeat: Infinity,
                    repeatDelay: 0,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                  opacity: {
                    duration: 5,
                    times: [0, 0.16, 0.88, 1],
                    repeat: Infinity,
                    repeatDelay: 0,
                  },
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 1.4, // Start after slide-in completes
                  },
                }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #1e40af, #3b82f6, #1e40af)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Your Nigeria Legal Rep
              </motion.span>
              <motion.span
                className="text-xs text-gray-500 -mt-1"
                animate={{
                  x: [-100, 0, 0, -100],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  x: {
                    duration: 5,
                    times: [0, 0.18, 0.86, 1], // Slightly after main text
                    repeat: Infinity,
                    repeatDelay: 0,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                  opacity: {
                    duration: 5,
                    times: [0, 0.18, 0.86, 1],
                    repeat: Infinity,
                    repeatDelay: 0,
                  },
                }}
              >
                Trusted & Secure
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1 + 0.2,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <Link
                    to={link.path}
                    className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 group ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <motion.div
                      className={`flex items-center justify-center w-5 h-5 ${
                        isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
                      }`}
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                    <span>{link.label}</span>
                    
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-blue-50 rounded-xl -z-10"
                        layoutId="activeNavBackground"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        initial={false}
                      />
                    )}
                    
                    {!isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-0 h-1 bg-blue-600 rounded-full -translate-x-1/2"
                        whileHover={{ width: '70%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ 
                delay: 0.7,
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="ml-6"
            >
              <Link to="/submit-case">
                <motion.div
                  className="relative overflow-hidden rounded-xl"
                  whileHover="hover"
                  initial="initial"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700"
                    variants={{
                      initial: { opacity: 1 },
                      hover: { opacity: 0.95 },
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500"
                    variants={{
                      initial: { x: '-100%' },
                      hover: { x: '100%' },
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  <Button className="relative bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all border-0 px-6">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Submit Your Case
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 relative z-10 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                >
                  <X className="h-6 w-6 text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="md:hidden py-4 space-y-1 relative z-50 bg-white/98 backdrop-blur-xl rounded-b-2xl shadow-2xl border-t border-gray-200"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
              >
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ 
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 300,
                        damping: 25
                      }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <motion.div
                          className={`flex items-center justify-center w-5 h-5 ${
                            isActive ? 'text-blue-600' : 'text-gray-500'
                          }`}
                          animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.div>
                        <span>{link.label}</span>
                        {isActive && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                            layoutId="activeMobileDot"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ 
                    delay: navLinks.length * 0.1 + 0.1,
                    type: 'spring',
                    stiffness: 300,
                    damping: 25
                  }}
                  className="pt-2 px-4"
                >
                  <Link to="/submit-case" onClick={() => setMobileMenuOpen(false)}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg rounded-xl">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Submit Your Case
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
