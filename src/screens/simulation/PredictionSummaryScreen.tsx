import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { TrendingUp, Clock, DollarSign, Heart } from 'lucide-react';

export default function PredictionSummaryScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Prediction Results</h1>
          <p className="text-gray-600">Based on your decision parameters</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-200">
          <div className="text-center py-4">
            <p className="text-sm text-gray-700 mb-2">Overall Success Probability</p>
            <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              87%
            </div>
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">High Confidence Prediction</span>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-3 mb-6">
          <GlassCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Timeline</p>
                  <p className="font-semibold text-gray-800">6-12 months</p>
                </div>
              </div>
              <span className="text-2xl">⏱️</span>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Financial Impact</p>
                  <p className="font-semibold text-gray-800">+₹20L - ₹28L</p>
                </div>
              </div>
              <span className="text-2xl">📈</span>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Life Satisfaction</p>
                  <p className="font-semibold text-gray-800">+32% increase</p>
                </div>
              </div>
              <span className="text-2xl">😊</span>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-3">
          <Button onClick={() => navigate('/analytics')} className="w-full">
            View Detailed Analytics
          </Button>
          <Button onClick={() => navigate('/analysis/trends')} variant="secondary" className="w-full">
            See Trends
          </Button>
          <Button onClick={() => navigate('/analysis/growth')} variant="ghost" className="w-full">
            Growth Metrics
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}