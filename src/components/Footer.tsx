import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowRight, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Please enter a valid email address');
      setTimeout(() => {
        setSubscriptionStatus('idle');
        setSubscriptionMessage('');
      }, 3000);
      return;
    }

    // Simulate subscription (replace with actual API call)
    setSubscriptionStatus('success');
    setSubscriptionMessage('Successfully subscribed! Check your email for confirmation.');
    setEmail('');
    
    setTimeout(() => {
      setSubscriptionStatus('idle');
      setSubscriptionMessage('');
    }, 4000);
  };

  return (
    <footer className="bg-gradient-to-b from-gray-950 to-gray-900 text-gray-300 border-t border-gray-800">
      {/* Newsletter Section */}
      <div className="relative overflow-hidden py-16 px-4 md:py-20">
        {/* Animated background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/40 px-4 py-2 rounded-full backdrop-blur-sm">
                <Mail className="h-4 w-4 text-blue-300" />
                <span className="text-sm font-semibold text-blue-200">Newsletter</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Stay Updated with<br />
                <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  Recovery Insights
                </span>
              </h3>
              
              <p className="text-base text-gray-300 max-w-md">
                Get the latest tips on scam prevention, recovery strategies, and legal updates delivered straight to your inbox. Join thousands of informed users.
              </p>

              {/* Trust indicators */}
              <div className="flex gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Easy unsubscribe</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl text-gray-900 bg-white border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-0 transition-all placeholder:text-gray-400 font-medium"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 -z-10 opacity-0 group-focus-within:opacity-20 blur-lg transition-opacity" />
                </div>

                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/30"
                >
                  <span>Subscribe Now</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </motion.button>

                {/* Status Messages */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: subscriptionStatus !== 'idle' ? 1 : 0, 
                    y: subscriptionStatus !== 'idle' ? 0 : -10 
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
                    subscriptionStatus === 'success'
                      ? 'bg-green-500/20 border border-green-500/40 text-green-300'
                      : subscriptionStatus === 'error'
                      ? 'bg-red-500/20 border border-red-500/40 text-red-300'
                      : ''
                  }`}
                >
                  {subscriptionStatus === 'success' && (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{subscriptionMessage}</span>
                    </>
                  )}
                  {subscriptionStatus === 'error' && (
                    <>
                      <AlertCircle className="h-4 w-4" />
                      <span>{subscriptionMessage}</span>
                    </>
                  )}
                </motion.div>
              </form>

              {/* Privacy note */}
              <p className="text-xs text-gray-500 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <motion.div className="flex items-center space-x-3">
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
                  className="relative w-8 h-8"
                >
                  {/* Shield */}
                  <Shield className="h-8 w-8 text-blue-400" />
                  {/* Eye - Slides out and spins */}
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
                    <Eye className="h-4 w-4 text-blue-400" />
                  </motion.div>
                </motion.div>
                <motion.div
                  className="flex flex-col overflow-hidden relative"
                >
                  <motion.span
                    className="font-bold text-lg text-white"
                    animate={{
                      x: [-100, 0, 0, -100],
                      opacity: [0, 1, 1, 0],
                      backgroundPosition: ['0%', '100%'],
                    }}
                    transition={{
                      x: {
                        duration: 5,
                        times: [0, 0.16, 0.88, 1],
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
                        delay: 1.4,
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
                    className="text-xs text-gray-400 -mt-1"
                    animate={{
                      x: [-100, 0, 0, -100],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      x: {
                        duration: 5,
                        times: [0, 0.18, 0.86, 1],
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
              </motion.div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Trusted Nigerian representative for international scam victims. We help you recover lost funds safely with licensed lawyers and local expertise.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">How It Works</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">Resources</span>
                </Link>
              </li>
              <li>
                <Link to="/submit-case" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">Submit Case</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#cookie" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-6 text-lg">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <Mail className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a href="mailto:support@nigerialegalrep.com" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    support@nigerialegalrep.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <a href="tel:+2349013139157" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    +234 9013139157
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs text-gray-500">Locations</p>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Lagos, Nigeria</p>
                    <p>Abuja, Nigeria</p>
                    <p>Kwara, Nigeria</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Your Nigeria Legal Rep. All rights reserved.
            </p>
          </div>
          <div className="text-center text-xs text-gray-500">
            <p>We are representatives, not lawyers. We coordinate with licensed Nigerian lawyers on your behalf.</p>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>Made with <span className="text-red-500">❤</span> for justice</p>
          </div>
        </div>
      </div>
    </footer>
  );
}