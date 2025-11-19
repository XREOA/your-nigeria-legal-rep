import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import SubmitCase from './pages/SubmitCase';
import Process from './pages/Process';
import About from './pages/About';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import { X } from 'lucide-react';

const queryClient = new QueryClient();

const App = () => {
  const [showBusinessCard, setShowBusinessCard] = useState(true);

  useEffect(() => {
    console.log('✅ Business Card popup should be visible');
  }, []);

  const handleCloseBusinessCard = () => {
    console.log('📥 Closing popup and auto-downloading business card...');
    try {
      const link = document.createElement('a');
      link.href = '/business-card.jpeg';
      link.download = 'Your-Nigeria-Legal-Rep-Business-Card.jpeg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
    }
    setShowBusinessCard(false);
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          
          {/* Business Card Popup */}
          <AnimatePresence>
            {showBusinessCard && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={handleCloseBusinessCard}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
                  className="relative max-w-2xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={handleCloseBusinessCard}
                    className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
                  >
                    <X className="h-6 w-6" />
                  </button>

                  {/* Business Card Image */}
                  <motion.img
                    src="/business-card.jpeg"
                    alt="Your Nigeria Legal Rep Business Card"
                    className="w-full h-auto rounded-lg shadow-2xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Info text */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-center mt-6"
                  >
                    <div className="bg-blue-600/20 border border-blue-400/40 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-white font-semibold mb-2">📇 Your Business Card</p>
                      <p className="text-blue-100 text-sm">
                        Save our business card - you'll need it when contacting us or sharing our details! Close this popup to download it automatically.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit-case" element={<SubmitCase />} />
            <Route path="/process" element={<Process />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
