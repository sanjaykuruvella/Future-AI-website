import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { GitBranch, Target, Brain } from 'lucide-react';

export default function SimulationIntroScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="min-h-screen flex flex-col px-6 py-12">
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl opacity-20 animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center">
              <GitBranch className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Decision Simulation</h1>
          <p className="text-gray-600">See your future before you decide</p>
        </div>

        <div className="space-y-4 flex-1">
          <GlassCard>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">1️⃣</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Describe Your Decision</h3>
                <p className="text-sm text-gray-600">Tell us what choice you're considering</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">2️⃣</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Set Variables</h3>
                <p className="text-sm text-gray-600">Adjust risk levels and timeframes</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">3️⃣</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">View Predictions</h3>
                <p className="text-sm text-gray-600">Explore multiple future scenarios</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <p className="text-sm text-gray-700">
                Our AI analyzes over 1,000 data points to predict outcomes with high accuracy
              </p>
            </div>
          </GlassCard>
        </div>

        <div className="mt-8">
          <Button onClick={() => navigate('/simulation/category')} className="w-full">
            Start Simulation
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}