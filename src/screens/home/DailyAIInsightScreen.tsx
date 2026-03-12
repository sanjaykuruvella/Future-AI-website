import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Sparkles, TrendingUp } from 'lucide-react';

export default function DailyAIInsightScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="min-h-screen flex flex-col px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Today's Insight</h1>
          <p className="text-gray-600">Friday, February 13, 2026</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-200">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Opportunity Forecast</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Today is ideal for career decisions
            </h2>
            <p className="text-gray-700">
              Based on your recent patterns and goals, our AI predicts a 92% positive outcome for career-related decisions made today. Your analytical mindset aligns perfectly with current opportunities.
            </p>
          </div>
        </GlassCard>

        <GlassCard className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Recommended Actions</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-sm text-gray-700">Schedule important meetings or interviews</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-sm text-gray-700">Review and submit project proposals</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs">✓</span>
              </div>
              <p className="text-sm text-gray-700">Network with industry professionals</p>
            </div>
          </div>
        </GlassCard>

        <div className="mt-auto">
          <Button onClick={() => navigate('/simulation-intro')} className="w-full">
            Test This Prediction
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
