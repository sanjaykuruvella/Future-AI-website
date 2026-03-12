import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Calendar, TrendingUp, Target, Brain } from 'lucide-react';

export default function WeeklySummaryScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout showBackButton onBack={() => navigate('/profile')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Weekly Summary</h1>
          <p className="text-gray-600">Feb 7 - Feb 13, 2026</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <GlassCard className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-1">Simulations</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                3
              </p>
            </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-200">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-1">Avg Score</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                84
              </p>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="mb-4">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">AI Insights Used</h3>
              <p className="text-sm text-gray-600">12 predictions analyzed</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="mb-4">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Progress Made</h3>
              <p className="text-sm text-gray-600">+15% in decision quality</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="mb-4">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Goals Aligned</h3>
              <p className="text-sm text-gray-600">92% goal alignment rate</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3">Week Highlights</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Made important career decision with 87% confidence</li>
            <li>• Completed 3 comprehensive simulations</li>
            <li>• Improved risk assessment skills</li>
            <li>• Maintained consistent decision-making quality</li>
          </ul>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
