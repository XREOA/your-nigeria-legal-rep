import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Users, 
  Scale, 
  FileCheck, 
  Banknote,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassButton from '@/components/GlassButton';

export default function Process() {
  const steps = [
    {
      icon: FileText,
      title: 'Initial Case Submission',
      description: 'You submit your case through our secure online form with all relevant details and evidence.',
      details: [
        'Complete the case submission form',
        'Upload transaction records and evidence',
        'Provide scammer information',
        'Sign digital consent form',
      ],
    },
    {
      icon: Search,
      title: 'Case Review & Assessment',
      description: 'Our team reviews your case and assesses the viability of recovery.',
      details: [
        'Initial case evaluation within 24-48 hours',
        'Verification of evidence and documentation',
        'Assessment of recovery probability',
        'Fee structure discussion',
      ],
    },
    {
      icon: FileCheck,
      title: 'Power of Attorney',
      description: 'You grant us Power of Attorney to act as your representative in Nigeria.',
      details: [
        'Digital POA document preparation',
        'Legal review and notarization',
        'Official registration with authorities',
        'Secure document storage',
      ],
    },
    {
      icon: Users,
      title: 'Lawyer Coordination',
      description: 'We coordinate with licensed Nigerian lawyers specializing in fraud recovery.',
      details: [
        'Assignment to specialized legal team',
        'Case strategy development',
        'Evidence compilation and legal documentation',
        'Regular progress updates to you',
      ],
    },
    {
      icon: Scale,
      title: 'Legal Action & Authority Submission',
      description: 'Lawyers file necessary reports and pursue legal action through proper channels.',
      details: [
        'Filing with Nigerian Police Force',
        'Submission to EFCC (Economic and Financial Crimes Commission)',
        'Bank account freezing requests',
        'Court proceedings if necessary',
      ],
    },
    {
      icon: Banknote,
      title: 'Fund Recovery & Transfer',
      description: 'Upon successful recovery, funds are transferred to you minus agreed fees.',
      details: [
        'Recovered funds secured',
        'Fee deduction as per agreement',
        'International transfer arranged',
        'Final case documentation provided',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl -z-10 animation-delay-2000 animate-blob" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-blob animation-delay-4000" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How Our Recovery Process Works
          </h1>
          <p className="text-xl text-blue-100">
            A transparent, step-by-step approach to recovering your lost funds through legal channels
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="border-2 hover:border-blue-500 transition-all hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Step Number and Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                          {index + 1}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-blue-100 rounded-full p-2">
                          <step.icon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-lg">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Overview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Expected Timeline
          </h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">24-48h</div>
                  <div className="font-semibold mb-2">Initial Response</div>
                  <p className="text-sm text-gray-600">
                    Case review and viability assessment
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">1-2 weeks</div>
                  <div className="font-semibold mb-2">Legal Setup</div>
                  <p className="text-sm text-gray-600">
                    POA processing and lawyer coordination
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">2-6 months</div>
                  <div className="font-semibold mb-2">Recovery Process</div>
                  <p className="text-sm text-gray-600">
                    Legal action and fund recovery (varies by case)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Important Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-3 text-blue-900">What We Do</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Act as your local representative in Nigeria</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Coordinate with licensed lawyers and authorities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Manage all local procedures and documentation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Keep you updated throughout the process</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-3 text-amber-900">Important Disclaimers</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>We are representatives, not lawyers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Success is not guaranteed in all cases</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Fees are based on successful recovery</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>Timeline varies depending on case complexity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Recovery?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Submit your case today and take the first step towards recovering your funds
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