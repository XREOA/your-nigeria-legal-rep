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
  const [showBusinessCard, setShowBusinessCard] = useState(false);

  useEffect(() => {
    // Check if user has already seen and downloaded the business card (only show once per session)
    const hasSeenBusinessCard = sessionStorage.getItem('businessCardShown');
    
    if (!hasSeenBusinessCard) {
      // Show business card only on first page load
      const timer = setTimeout(() => {
        setShowBusinessCard(true);
      }, 500); // Small delay for better UX
      
      // Mark that they've seen it in this session
      sessionStorage.setItem('businessCardShown', 'true');
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseBusinessCard = () => {
    // Download the business card when user closes the popup
    try {
      const link = document.createElement('a');
      link.href = '/business-card.jpeg';
      link.download = 'Your-Nigeria-Legal-Rep-Business-Card.jpeg';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Clean up with a small delay to ensure download starts
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    } catch (error) {
      console.error('Error downloading business card:', error);
    }
    
    // Close the popup
    setShowBusinessCard(false);
  };

  return (
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
                      We've prepared our business card for you. Save it because you'll need it when you contact us or share our details with others. Close this popup to download it.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit-case" element={<SubmitCase />} />
            <Route path="/process" element={<Process />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
