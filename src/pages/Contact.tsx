import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageSquare, Send, Clock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingAnimation from '@/components/LoadingAnimation';
import SuccessBanner from '@/components/SuccessBanner';
import { sendTelegramMessage, formatContactFormMessage } from '@/lib/telegram';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bannerState, setBannerState] = useState({
    isVisible: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const message = formatContactFormMessage(formData);
      const success = await sendTelegramMessage(message);
      
      if (success) {
        setBannerState({
          isVisible: true,
          type: 'success',
          title: 'Message Sent Successfully!',
          message: 'Thank you for contacting us. We will respond within 24 hours.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setBannerState({
          isVisible: true,
          type: 'error',
          title: 'Failed to Send',
          message: 'We encountered an issue sending your message. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setBannerState({
        isVisible: true,
        type: 'error',
        title: 'An Error Occurred',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'For general inquiries and case submissions',
      contact: 'support@nigerialegalrep.com',
      link: 'mailto:support@nigerialegalrep.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Monday to Friday, 9AM - 5PM WAT',
      contact: '+234 9013139157',
      link: 'tel:+2349013139157',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      description: 'For urgent matters and quick responses',
      contact: '+234 9013139157',
      link: 'https://wa.me/2349013139157',
    },
    {
      icon: Globe,
      title: 'Telegram',
      description: 'Fast messaging and support',
      contact: '@nigerialegalrep',
      link: 'https://t.me/nigerialegalrep',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <Navbar />
      <LoadingAnimation isVisible={isLoading} message="Sending your message..." />
      <SuccessBanner
        isVisible={bannerState.isVisible}
        type={bannerState.type}
        title={bannerState.title}
        message={bannerState.message}
        onClose={() => setBannerState({ ...bannerState, isVisible: false })}
        autoCloseDuration={5000}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl -z-10 animation-delay-2000 animate-blob" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-blob animation-delay-4000" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/40 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm"
          >
            <Mail className="h-4 w-4" />
            Get In Touch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            We're Here to Help
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Have questions about our services or need assistance? Reach out through any of our communication channels.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        {/* Main Content - Form and Info */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Form - Left Side (takes 2 cols on large screens) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="card-ghost h-full shadow-premium overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/30 border-b border-gray-200 dark:border-gray-700 pb-8">
                <CardTitle className="text-3xl md:text-4xl text-gray-900 dark:text-white mb-2">
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
                  We'll get back to you within 24 hours. Fill out the form below to get started.
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-10 md:pt-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Form Section 1: Contact Information */}
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Contact Information</h3>
                    </div>

                    {/* Name Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      className="mb-6"
                    >
                      <Label htmlFor="name" className="text-gray-900 dark:text-white font-semibold mb-3 block text-base">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                        />
                      </div>
                    </motion.div>

                    {/* Email & Phone Row */}
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        <Label htmlFor="email" className="text-gray-900 dark:text-white font-semibold mb-3 block text-base">
                          Email Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                      >
                        <Label htmlFor="subject" className="text-gray-900 dark:text-white font-semibold mb-3 block text-base">
                          Subject <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="e.g., Case Inquiry, Support Request"
                          className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

                  {/* Form Section 2: Message */}
                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Message</h3>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <Label htmlFor="message" className="text-gray-900 dark:text-white font-semibold mb-3 block text-base">
                        Message <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us more about your inquiry... Be as detailed as possible so we can better assist you."
                        rows={7}
                        className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none placeholder-gray-400 dark:placeholder-gray-500 font-base leading-relaxed"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Minimum 10 characters • Maximum 1000 characters
                      </p>
                    </motion.div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

                  {/* Submit Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="pt-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isLoading}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 hover:from-blue-700 hover:via-blue-700 hover:to-blue-800 text-white font-bold py-4 md:py-5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center gap-3 text-lg group"
                    >
                      <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      {isLoading ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </motion.button>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                      💬 We typically respond within <span className="font-semibold text-gray-900 dark:text-white">24 hours</span>
                    </p>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar - Business Info and Hours */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Business Hours */}
            <Card className="card-ghost shadow-premium">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <CardTitle className="text-lg md:text-xl text-gray-900 dark:text-white">
                    Business Hours
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Monday - Friday</p>
                    <p className="text-gray-600 dark:text-gray-400">9:00 AM - 5:00 PM WAT</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Saturday</p>
                    <p className="text-gray-600 dark:text-gray-400">10:00 AM - 2:00 PM WAT</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Sunday</p>
                    <p className="text-gray-600 dark:text-gray-400">Closed</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                    * Emergency cases may be handled outside business hours
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="card-ghost shadow-premium">
              <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <CardTitle className="text-lg md:text-xl text-gray-900 dark:text-white">
                    Office Locations
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Lagos Office</p>
                    <p className="text-sm">(Address provided to active clients)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Abuja Office</p>
                    <p className="text-sm">(Address provided to active clients)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Kwara Office</p>
                    <p className="text-sm">(Address provided to active clients)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="card-ghost shadow-premium bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader className="border-b border-blue-200 dark:border-blue-800">
                <CardTitle className="text-lg text-blue-900 dark:text-blue-300">
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3 text-sm text-blue-900 dark:text-blue-200">
                <p>
                  <span className="font-semibold">📋</span> Have your case details ready
                </p>
                <p>
                  <span className="font-semibold">📸</span> Gather relevant evidence/screenshots
                </p>
                <p>
                  <span className="font-semibold">⏱️</span> Responses within 24 hours
                </p>
                <p>
                  <span className="font-semibold">🚀</span> WhatsApp for urgent matters
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contact Methods Grid - Below Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full card-ghost hover:shadow-premium-lg transition-smooth cursor-pointer">
                  <CardContent className="pt-8">
                    <motion.div
                      className="bg-blue-100 dark:bg-blue-900/40 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/60 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                      {method.description}
                    </p>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 text-center group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      {method.contact}
                    </p>
                  </CardContent>
                </Card>
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}