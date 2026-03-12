import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Brain, Database, TrendingUp, Users } from 'lucide-react';

export default function AIExplanationScreen() {
  const navigate = useNavigate();

  const factors = [
    {
      icon: Database,
      title: 'Historical Data',
      weight: 35,
      description: 'Analysis of 10,000+ similar career transitions',
    },
    {
      icon: Users,
      title: 'Your Profile',
      weight: 30,
      description: 'Personality traits, skills, and preferences alignment',
    },
    {
      icon: TrendingUp,
      title: 'Market Trends',
      weight: 25,
      description: 'Current tech industry growth and demand patterns',
    },
    {
      icon: Brain,
      title: 'AI Pattern Recognition',
      weight: 10,
      description: 'Machine learning predictions based on success factors',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Explanation</h1>
          <p className="text-gray-600">How we calculated your prediction</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3">Prediction Breakdown</h3>
          <p className="text-sm text-gray-700">
            Your 87% success probability is calculated using multiple data sources and AI algorithms. Here's how each factor contributed:
          </p>
        </GlassCard>

        <div className="space-y-4 mb-6">
          {factors.map((factor, index) => (
            <GlassCard key={index}>
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <factor.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{factor.title}</h3>
                    <span className="text-sm font-bold text-blue-600">{factor.weight}%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{factor.description}</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      style={{ width: `${factor.weight}%` }}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="bg-blue-50/50">
          <h3 className="font-semibold text-gray-800 mb-3">Transparency Note</h3>
          <p className="text-sm text-gray-700 mb-2">
            Our AI uses explainable machine learning models to ensure you understand the reasoning behind each prediction.
          </p>
          <p className="text-sm text-gray-600">
            All predictions include confidence intervals and are based on verifiable data sources.
          </p>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
