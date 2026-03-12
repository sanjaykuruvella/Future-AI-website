import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { TrendingUp, Award, Target, Sparkles } from 'lucide-react';

export default function GrowthMetricsScreen() {
  const navigate = useNavigate();

  const metrics = [
    {
      label: 'Decision Quality',
      current: 87,
      previous: 72,
      change: '+15',
      icon: Target,
    },
    {
      label: 'Success Rate',
      current: 82,
      previous: 76,
      change: '+6',
      icon: TrendingUp,
    },
    {
      label: 'Goal Alignment',
      current: 91,
      previous: 85,
      change: '+6',
      icon: Sparkles,
    },
    {
      label: 'Risk Management',
      current: 78,
      previous: 65,
      change: '+13',
      icon: Award,
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Growth Metrics</h1>
          <p className="text-gray-600">Your personal development journey</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-200">
          <div className="text-center py-2">
            <p className="text-sm text-gray-700 mb-2">Overall Growth Score</p>
            <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              +10%
            </div>
            <p className="text-sm text-gray-600">Compared to last month</p>
          </div>
        </GlassCard>

        <div className="space-y-4 mb-6">
          {metrics.map((metric, index) => (
            <GlassCard key={index}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{metric.label}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        {metric.current}
                      </span>
                      <span className="text-sm text-green-600 font-medium">{metric.change}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${metric.current}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Previous: {metric.previous}</span>
                  <span>Current: {metric.current}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="bg-blue-50/50">
          <h3 className="font-semibold text-gray-800 mb-3">Key Achievements</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Award className="w-4 h-4 text-yellow-600" />
              <span>Made 15 successful predictions this month</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Improved decision speed by 25%</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Award className="w-4 h-4 text-green-600" />
              <span>Maintained 90%+ goal alignment for 3 months</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
