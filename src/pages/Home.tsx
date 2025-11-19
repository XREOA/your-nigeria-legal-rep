import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, FileCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassButton from '@/components/GlassButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Premium Design */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl -z-10 animation-delay-2000 animate-blob" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-blob animation-delay-4000" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Upward Reflection of Badge */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-16 pointer-events-none">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white/20 via-white/10 to-white/5 border border-white/40 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-xl shadow-lg shadow-white/20 opacity-20 blur-sm" style={{ transform: 'scaleY(-1.5)' }}>
              <Shield className="h-4 w-4" style={{ transform: 'scaleY(-1)' }} />
              <span style={{ transform: 'scaleY(-1)' }}>Trusted Nigeria Legal Representative</span>
            </div>
          </div>

          <motion.div
            className="mb-8 inline-flex items-center gap-2 bg-gradient-to-r from-white/20 via-white/10 to-white/5 border border-white/40 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-xl shadow-lg shadow-white/20 hover:border-white/60 transition-all relative overflow-hidden group"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Reflection animation */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
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
            <Shield className="h-4 w-4 relative z-10" />
            <span className="relative z-10">Trusted Nigeria Legal Representative</span>
          </motion.div>

          <motion.h1 
            className="hero-title text-5xl md:text-7xl text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="whitespace-nowrap">Trusted Nigerian Representative for</span><br />
            <span className="text-blue-400 block mt-8">International Scam Victims</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 mb-12 mx-auto leading-relaxed font-light whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Recover lost funds safely with the help of licensed lawyers and local representation
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center relative w-fit mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/submit-case">
              <GlassButton variant="primary" size="lg">
                Submit Your Case Now
                <ArrowRight className="h-5 w-5" />
              </GlassButton>
            </Link>
            <Link to="/process">
              <GlassButton variant="secondary" size="lg">
                Learn How It Works
              </GlassButton>
            </Link>

            {/* Mirror Reflection Effect */}
            <div className="absolute -bottom-24 left-0 right-0 pointer-events-none w-full">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-30 blur-sm">
                {/* Reflected Primary Button */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 text-lg rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg border border-blue-500/20" style={{ transform: 'scaleY(-1)' }}>
                    <span style={{ transform: 'scaleY(-1)' }}>Submit Your Case Now</span>
                    <ArrowRight className="h-5 w-5" style={{ transform: 'scaleY(-1)' }} />
                  </div>
                </div>

                {/* Reflected Secondary Button */}
                <div className="relative">
                  <div className="bg-gradient-to-r from-white/20 via-white/10 to-white/5 text-white px-8 py-4 text-lg rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg backdrop-blur-xl border border-white/40" style={{ transform: 'scaleY(-1)' }}>
                    <span style={{ transform: 'scaleY(-1)' }}>Learn How It Works</span>
                  </div>
                </div>
              </div>

              {/* Gradient fade effect for reflection */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/30 pointer-events-none h-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Premium Design */}
      <section className="py-28 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Our simple three-step process to help you recover your lost funds
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 card-grid-lg relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent transform -translate-y-1/2 z-0" />
            
            {[
              { icon: FileCheck, title: '1. Submit Case & Evidence', desc: 'Fill out our secure form with your case details and upload all relevant evidence including transaction records and communications.' },
              { icon: Users, title: '2. We Coordinate with Lawyers', desc: 'Our team works with licensed Nigerian lawyers and local authorities to build your case and pursue recovery.' },
              { icon: CheckCircle, title: '3. Recover Your Funds', desc: 'We work diligently to recover your lost funds through legal channels and keep you updated throughout the process.' },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className="card-ghost h-full hover:shadow-premium-lg transition-smooth">
                    <CardContent className="pt-10 text-center relative z-10">
                      <motion.div 
                        className="feature-icon mx-auto mb-8"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <Icon className="h-9 w-9 text-blue-600" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide professional, secure, and effective representation for international scam victims
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Experienced Local Representative',
                description: 'Deep understanding of Nigerian legal system and local procedures for maximum effectiveness.',
              },
              {
                title: 'Licensed Lawyer Partnerships',
                description: 'We work exclusively with licensed Nigerian lawyers who specialize in fraud recovery cases.',
              },
              {
                title: 'Secure & Confidential Process',
                description: 'Your information is protected with bank-level security and strict confidentiality protocols.',
              },
              {
                title: 'Transparent Communication',
                description: 'Regular updates on your case progress and clear explanation of each step in the process.',
              },
              {
                title: 'Success-Based Fees',
                description: 'Our fees are based on successful recovery, aligning our interests with yours.',
              },
              {
                title: 'International Support',
                description: 'We understand the challenges of cross-border fraud and provide multilingual support.',
              },
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real results from clients we've helped recover their funds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Client Testimonial',
                location: 'United Kingdom',
                amount: '$15,000',
                quote: 'Professional service and successful recovery. They handled everything with care and kept me informed throughout the process.',
              },
              {
                name: 'Client Testimonial',
                location: 'United States',
                amount: '$8,500',
                quote: 'I was skeptical at first, but they delivered results. Their local knowledge made all the difference in my case.',
              },
              {
                name: 'Client Testimonial',
                location: 'Canada',
                amount: '$12,000',
                quote: 'Excellent communication and transparent process. They worked tirelessly to recover my funds from a crypto scam.',
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{testimonial.name}</span>
                      <span className="text-sm text-blue-600 font-medium">{testimonial.amount} Recovered</span>
                    </div>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Recovery Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Submit your case today and let our experienced team help you recover your lost funds
          </p>
          <Link to="/submit-case">
            <GlassButton variant="secondary" size="lg">
              Submit Your Case Now
              <ArrowRight className="h-5 w-5" />
            </GlassButton>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}