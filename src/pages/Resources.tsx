import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  FileText, 
  TrendingUp,
  Users,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassButton from '@/components/GlassButton';

export default function Resources() {
  const articles = [
    {
      icon: AlertTriangle,
      title: 'How to Spot Common Crypto Scams: Ponzi Schemes and Rug Pulls',
      category: 'Scam Prevention',
      description: 'Cryptocurrency scams including Ponzi schemes (promising unrealistic returns), pump-and-dump schemes, and "rug pulls" where developers abandon projects after collecting funds. Learn how fraudsters use fake social media hype and celebrity endorsements to lure victims into these schemes.',
      readTime: '8 min read',
      url: 'https://www.coingecko.com/learn/what-is-a-rug-pull',
    },
    {
      icon: Shield,
      title: 'Protecting Yourself from P2P Trading Fraud: Escrow and Verification',
      category: 'Safety Tips',
      description: 'Guide to safe peer-to-peer cryptocurrency transactions. Covers escrow services, identity verification, payment method verification, and the risks of local meetups. Includes real examples of common P2P scams like overpayment fraud and fake payment proofs.',
      readTime: '7 min read',
      url: 'https://blog.ueex.com/p2p-crypto-scams/',
    },
    {
      icon: Lock,
      title: 'Secure Your Digital Assets: Wallets, Keys, and Two-Factor Authentication',
      category: 'Crypto Safety',
      description: 'Comprehensive guide to cryptocurrency security: hardware wallets vs software wallets, private key management, two-factor authentication (2FA), seed phrases, and cold storage. Learn why exchanges are vulnerable and why self-custody matters.',
      readTime: '9 min read',
      url: 'https://www.bitdegree.org/crypto/tutorials/crypto-wallet-security',
    },
    {
      icon: Users,
      title: 'Romance Scams and Investment Fraud: The Social Engineering Factor',
      category: 'Scam Prevention',
      description: 'How romance scammers build trust over months to eventually request cryptocurrency or investment opportunities. Covers common grooming tactics, AI-generated profiles, and how scammers exploit emotional vulnerability to bypass critical thinking.',
      readTime: '10 min read',
      url: 'https://www.investopedia.com/pig-butchering-scams-explained-11830383',
    },
    {
      icon: TrendingUp,
      title: 'Investment Fraud Red Flags: MLMs, Forex Scams, and Recovery Schemes',
      category: 'Investment Safety',
      description: 'Recognize fraudulent investment schemes including multi-level marketing (MLMs), forex trading scams with guaranteed returns, and recovery scams that target previous victims. Learn how regulatory bodies like SEC identify unregistered investment schemes.',
      readTime: '8 min read',
      url: 'https://www.insightxtra.com/2025/04/10-red-flags-to-avoid-investment-scams.html',
    },
    {
      icon: FileText,
      title: 'Steps to Take If You\'ve Been Scammed: Recovery and Reporting',
      category: 'Recovery Guide',
      description: 'Immediate action plan after discovering fraud: gathering evidence, reporting to banks and cryptocurrency exchanges, filing complaints with EFCC, FBI IC3, and Interpol. Includes documentation templates and timeline for escalating your case for maximum recovery potential.',
      readTime: '12 min read',
      url: 'https://blog.blockatm.net/en-us/how-to-recover-scammed-crypto/',
    },
  ];

  const caseStudies = [
    {
      title: 'Crypto Exchange Scam Recovery',
      amount: '$45,000',
      location: 'United Kingdom',
      description: 'Client lost funds to a fake cryptocurrency exchange. We coordinated with Nigerian authorities to trace and freeze the scammer\'s accounts, recovering 80% of the lost amount.',
    },
    {
      title: 'P2P Trading Fraud Case',
      amount: '$18,500',
      location: 'United States',
      description: 'Victim was scammed during a P2P Bitcoin transaction. Through legal action and bank coordination, we successfully recovered the full amount within 3 months.',
    },
    {
      title: 'Investment Ponzi Scheme',
      amount: '$32,000',
      location: 'Canada',
      description: 'Client invested in a fraudulent investment scheme. We worked with EFCC to prosecute the scammers and recover funds for multiple victims.',
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
            Resources & Education
          </h1>
          <p className="text-xl text-blue-100">
            Learn how to protect yourself from scams and what to do if you've been victimized
          </p>
        </div>
      </section>

      {/* Educational Articles */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Educational Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with our comprehensive guides on scam prevention and digital security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Card className="hover:shadow-lg transition-all cursor-pointer group h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <article.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {article.readTime}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                        {article.category}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full group-hover:bg-blue-50">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real cases where we successfully helped victims recover their funds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">{study.amount}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      Recovered
                    </span>
                  </div>
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                  <CardDescription className="flex items-center space-x-1">
                    <span>{study.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{study.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Safety Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Essential guidelines to protect yourself from online scams
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Before Investing or Trading</span>
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Verify the legitimacy of the platform or person</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Never send money to someone you haven't met in person</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Be skeptical of guaranteed returns or "too good to be true" offers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Research the company's registration and licenses</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Use escrow services for large transactions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <span>Red Flags to Watch For</span>
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Pressure to act quickly or miss an opportunity</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Requests for payment via cryptocurrency or gift cards</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Poor grammar or spelling in official communications</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Unwillingness to provide verifiable contact information</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-amber-600 mt-1">•</span>
                    <span>Promises of high returns with little or no risk</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              External Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Helpful links to official agencies and organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'EFCC Nigeria',
                description: 'Economic and Financial Crimes Commission',
                url: 'https://efccnigeria.org',
              },
              {
                name: 'Nigerian Police',
                description: 'Report cybercrime and fraud',
                url: 'https://npf.gov.ng',
              },
              {
                name: 'FBI IC3',
                description: 'Internet Crime Complaint Center',
                url: 'https://ic3.gov',
              },
              {
                name: 'Interpol',
                description: 'International crime reporting',
                url: 'https://interpol.int',
              },
            ].map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{resource.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm flex items-center space-x-1"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Been Scammed? We Can Help
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Don't wait. The sooner you act, the better your chances of recovery.
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