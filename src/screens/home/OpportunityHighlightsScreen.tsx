import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { TrendingUp, Zap, Star } from 'lucide-react';

export default function OpportunityHighlightsScreen() {
  const navigate = useNavigate();

  const opportunities = [
    {
      id: 1,
      priority: 'high',
      title: 'Tech Startup Job Offer',
      description: 'AI predicts 92% success rate with this opportunity',
      timeframe: 'Decision window: 5 days',
      impact: 'Career Growth +35%',
      potentialOutcome: '$20K salary increase, leadership role',
    },
    {
      id: 2,
      priority: 'high',
      title: 'Real Estate Investment',
      description: 'Market conditions favorable for the next 30 days',
      timeframe: 'Optimal timing: Next 2 weeks',
      impact: 'Financial Growth +28%',
      potentialOutcome: '15-20% ROI projected over 3 years',
    },
    {
      id: 3,
      priority: 'medium',
      title: 'Networking Event',
      description: 'High probability of valuable connections',
      timeframe: 'Event date: Feb 20, 2026',
      impact: 'Career Opportunities +18%',
      potentialOutcome: 'Potential partnerships and mentorship',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Opportunities</h1>
          <p className="text-gray-600">High-probability success predictions</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 mb-1">Active Opportunities</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {opportunities.length}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
        </GlassCard>

        <div className="space-y-4">
          {opportunities.map((opp) => (
            <GlassCard
              key={opp.id}
              className="border-green-200 bg-gradient-to-br from-white/90 to-green-50/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{opp.title}</h3>
                    <p className="text-sm text-gray-600">{opp.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{opp.timeframe}</span>
                  <span className="font-medium text-green-600">{opp.impact}</span>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Potential outcome:</span> {opp.potentialOutcome}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/simulation-intro')}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Simulate This Decision
              </button>
            </GlassCard>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
