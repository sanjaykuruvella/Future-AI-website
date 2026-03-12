import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { CheckCircle2, Star, Lightbulb } from 'lucide-react';

export default function RecommendationsScreen() {
  const navigate = useNavigate();

  const recommendations = [
    {
      priority: 'high',
      title: 'Negotiate Equity Package',
      description: 'Request 0.5-1% equity vesting over 4 years to maximize long-term value',
      impact: 'Potential +$50K value',
    },
    {
      priority: 'high',
      title: 'Build Emergency Fund',
      description: 'Save 6 months expenses before transition to mitigate startup risk',
      impact: 'Risk reduction: 40%',
    },
    {
      priority: 'medium',
      title: 'Network in Industry',
      description: 'Connect with 5+ people in target company before joining',
      impact: 'Success rate: +15%',
    },
    {
      priority: 'medium',
      title: 'Skill Gap Analysis',
      description: 'Take online courses in AI/ML to reduce learning curve',
      impact: 'Onboarding time: -30%',
    },
    {
      priority: 'low',
      title: 'Plan Work-Life Balance',
      description: 'Set boundaries early to maintain personal well-being',
      impact: 'Satisfaction: +20%',
    },
  ];

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'from-red-500 to-orange-500';
    if (priority === 'medium') return 'from-yellow-500 to-yellow-600';
    return 'from-blue-500 to-blue-600';
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Recommendations</h1>
          <p className="text-gray-600">Actions to optimize your outcome</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-200">
          <div className="flex items-center space-x-3">
            <Star className="w-8 h-8 text-green-600" />
            <div>
              <p className="font-semibold text-gray-800">5 Actionable Steps</p>
              <p className="text-sm text-gray-600">Follow these to increase success probability</p>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <GlassCard key={index}>
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${getPriorityColor(rec.priority)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{rec.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <div className="bg-green-50 rounded-lg px-3 py-1.5">
                    <p className="text-xs text-green-700 font-medium">{rec.impact}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-6 bg-blue-50/50">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <p className="font-semibold text-gray-800">Track Your Progress</p>
          </div>
          <p className="text-sm text-gray-700">
            Complete these recommendations to increase your success rate from 87% to 95%
          </p>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
