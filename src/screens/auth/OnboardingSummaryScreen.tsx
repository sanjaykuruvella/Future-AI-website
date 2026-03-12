import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { User, Target, Sparkles } from 'lucide-react';

export default function OnboardingSummaryScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="h-full flex flex-col px-6 py-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">You're All Set!</h1>
          <p className="text-sm text-gray-600">Here's your profile summary</p>
        </div>

        <div className="space-y-3 flex-1">
          <GlassCard>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Personality Traits</h3>
                <p className="text-xs text-gray-600">Adventurous, Analytical, Creative</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Primary Goals</h3>
                <p className="text-xs text-gray-600">Career, Finance, Health</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200">
            <div className="text-center py-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Your AI is Ready</h3>
              <p className="text-xs text-gray-600">
                We've calibrated your predictions. Start simulating now!
              </p>
            </div>
          </GlassCard>
        </div>

        <div className="mt-6">
          <Button onClick={() => navigate('/home')} className="w-full">
            Start Exploring
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}