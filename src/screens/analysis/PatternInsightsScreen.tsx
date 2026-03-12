import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Brain, Clock, Target, Zap } from 'lucide-react';

export default function PatternInsightsScreen() {
  const navigate = useNavigate();

  const patterns = [
    {
      icon: Zap,
      title: 'Quick Decision Maker',
      description: 'You tend to make career decisions faster than average',
      color: 'from-yellow-500 to-yellow-600',
      frequency: '78%',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Your decisions consistently align with long-term goals',
      color: 'from-blue-500 to-blue-600',
      frequency: '92%',
    },
    {
      icon: Brain,
      title: 'Analytical Approach',
      description: 'You prefer data-driven decisions over intuition',
      color: 'from-purple-500 to-purple-600',
      frequency: '85%',
    },
    {
      icon: Clock,
      title: 'Strategic Timing',
      description: 'You often wait for optimal conditions before acting',
      color: 'from-green-500 to-green-600',
      frequency: '67%',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pattern Insights</h1>
          <p className="text-gray-600">Understanding your decision-making style</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3">Your Decision Profile</h3>
          <p className="text-sm text-gray-700">
            Based on analysis of your past simulations, we've identified key patterns in how you approach decisions.
          </p>
        </GlassCard>

        <div className="space-y-4 mb-6">
          {patterns.map((pattern, index) => (
            <GlassCard key={index}>
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${pattern.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <pattern.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{pattern.title}</h3>
                    <span className="text-sm font-bold text-blue-600">{pattern.frequency}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${pattern.color}`}
                      style={{ width: pattern.frequency }}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="bg-green-50/50 border-green-200">
          <h3 className="font-semibold text-gray-800 mb-3">Strengths</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Strong alignment between values and choices</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Data-informed decision-making process</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>Good balance of speed and consideration</span>
            </li>
          </ul>
        </GlassCard>

        <GlassCard className="mt-4 bg-yellow-50/50 border-yellow-200">
          <h3 className="font-semibold text-gray-800 mb-3">Growth Areas</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-0.5">→</span>
              <span>Consider emotional factors more in personal decisions</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-yellow-600 mt-0.5">→</span>
              <span>Build in reflection time before major commitments</span>
            </li>
          </ul>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
