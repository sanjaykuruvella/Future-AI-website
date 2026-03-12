import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';

export default function DecisionInputScreen() {
  const navigate = useNavigate();
  const [decision, setDecision] = useState('');

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen flex flex-col px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Decision</h1>
          <p className="text-gray-600">Describe the choice you're considering</p>
        </div>

        <GlassCard className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What decision are you trying to make?
          </label>
          <textarea
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            className="w-full h-48 px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Example: Should I accept a job offer at a tech startup with lower pay but more growth potential, or stay at my current stable position?"
          />
          
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">Quick Examples:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Change careers',
                'Buy a house',
                'Start a business',
                'Go back to school',
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setDecision(example)}
                  className="px-3 py-1.5 bg-white/70 text-sm text-gray-700 rounded-lg hover:bg-white transition-all"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        <div className="mt-8">
          <Button
            onClick={() => navigate('/simulation/processing')}
            className="w-full"
            disabled={decision.trim().length < 10}
          >
            Continue
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
