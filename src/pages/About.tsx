import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Users, Target, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassButton from '@/components/GlassButton';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <Navbar />

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
            <Shield className="h-4 w-4" />
            Trusted Since 2020
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            About Nigerian Legal Representation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Your trusted partner in recovering funds lost to international scams
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="leading-relaxed">
                  Nigerian Legal Representation was founded to bridge the gap between international scam victims 
                  and the Nigerian legal system. We recognized that many victims face significant challenges when 
                  trying to recover funds lost to scammers operating in Nigeria.
                </p>
                <p className="leading-relaxed">
                  With deep knowledge of local procedures, established relationships with licensed lawyers, and 
                  a commitment to transparency, we provide the local representation that international victims need 
                  to navigate the complex recovery process.
                </p>
                <p className="leading-relaxed">
                  Our team has successfully helped recover millions of dollars for victims across the globe, 
                  working tirelessly to ensure that justice is served and funds are returned to their rightful owners.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="card-ghost shadow-premium border-0">
                <CardContent className="pt-8 md:pt-10">
                  <div className="grid grid-cols-2 gap-6 md:gap-8">
                    <motion.div 
                      className="text-center"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">500+</div>
                      <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400">Cases Handled</div>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">$5M+</div>
                      <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400">Funds Recovered</div>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">50+</div>
                      <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400">Countries Served</div>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ y: -5 }}
                    >
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">85%</div>
                      <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400">Success Rate</div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-slate-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Mission & Vision
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="card-ghost h-full shadow-premium border-0 hover:shadow-premium-lg transition-all">
                <CardContent className="pt-8 md:pt-10">
                  <motion.div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/40">
                    <Target className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To provide professional, effective, and compassionate representation for international scam 
                    victims, helping them navigate the Nigerian legal system and recover their lost funds through 
                    legitimate legal channels.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="card-ghost h-full shadow-premium border-0 hover:shadow-premium-lg transition-all">
                <CardContent className="pt-8 md:pt-10">
                  <motion.div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/40">
                    <Award className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To be the most trusted and effective representation service for international fraud victims in 
                    Nigeria, setting the standard for transparency, professionalism, and successful fund recovery.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              Industry-leading expertise and proven results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Local Expertise',
                description: 'Deep understanding of Nigerian legal procedures, law enforcement agencies, and banking systems.',
              },
              {
                icon: Shield,
                title: 'Licensed Partnerships',
                description: 'Exclusive partnerships with licensed Nigerian lawyers specializing in fraud and financial crimes.',
              },
              {
                icon: CheckCircle,
                title: 'Proven Track Record',
                description: 'Hundreds of successful cases with millions recovered for victims worldwide.',
              },
              {
                icon: Target,
                title: 'Transparent Process',
                description: 'Clear communication, regular updates, and no hidden fees throughout the recovery process.',
              },
              {
                icon: Award,
                title: 'Success-Based Fees',
                description: 'Our fees are tied to successful recovery, aligning our interests with yours.',
              },
              {
                icon: Users,
                title: 'Multilingual Support',
                description: 'Support in multiple languages to serve our international client base effectively.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-ghost h-full shadow-premium border-0 hover:shadow-premium-lg transition-all group">
                  <CardContent className="pt-8 md:pt-10 text-center">
                    <motion.div 
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/40 mb-6 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/60 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <item.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Role */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Understanding Our Role
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
              Clear responsibilities and transparency
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="card-ghost shadow-premium border-0">
              <CardContent className="pt-8 md:pt-10">
                <div className="space-y-8">
                  {[
                    {
                      title: 'We Are Your Local Representative',
                      description: 'We act as your authorized representative in Nigeria, handling all local procedures, communications, and coordination on your behalf. This includes working with lawyers, law enforcement, and financial institutions.'
                    },
                    {
                      title: 'We Coordinate with Licensed Lawyers',
                      description: 'All legal work is performed by licensed Nigerian lawyers who specialize in fraud recovery. We manage the relationship, ensure quality service, and keep you informed of all developments.'
                    },
                    {
                      title: 'We Are Not Providing Legal Advice',
                      description: 'While we coordinate with lawyers, we are not lawyers ourselves and do not provide legal advice. All legal guidance comes from our licensed legal partners.'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/40">
                          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Let Us Help You Recover Your Funds
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              With our experience, local knowledge, and professional partnerships, we're ready to help you get your money back
            </p>
            <Link to="/submit-case">
              <GlassButton variant="secondary" size="lg">
                Submit Your Case Now
                <ArrowRight className="h-5 w-5" />
              </GlassButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}