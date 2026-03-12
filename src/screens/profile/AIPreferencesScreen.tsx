import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Brain } from 'lucide-react';

export default function AIPreferencesScreen() {
  const navigate = useNavigate();
  const [accuracy, setAccuracy] = useState(75);
  const [riskTolerance, setRiskTolerance] = useState(60);
  const [detailLevel, setDetailLevel] = useState(80);
  const [timeHorizon, setTimeHorizon] = useState(50);

  const preferences = [
    {
      id: 'accuracy',
      label: 'Prediction Accuracy Priority',
      value: accuracy,
      setValue: setAccuracy,
      lowLabel: 'Speed',
      highLabel: 'Precision',
      description: 'Balance between quick predictions and detailed analysis',
    },
    {
      id: 'risk',
      label: 'Risk Sensitivity',
      value: riskTolerance,
      setValue: setRiskTolerance,
      lowLabel: 'Conservative',
      highLabel: 'Aggressive',
      description: 'How AI weights risk factors in predictions',
    },
    {
      id: 'detail',
      label: 'Detail Level',
      value: detailLevel,
      setValue: setDetailLevel,
      lowLabel: 'Summary',
      highLabel: 'Comprehensive',
      description: 'Amount of detail in prediction reports',
    },
    {
      id: 'horizon',
      label: 'Time Horizon Focus',
      value: timeHorizon,
      setValue: setTimeHorizon,
      lowLabel: 'Short-term',
      highLabel: 'Long-term',
      description: 'Emphasis on immediate vs future outcomes',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/profile')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Preferences</h1>
          <p className="text-gray-600">Customize your AI predictions</p>
        </div>

        <div className="space-y-6 mb-6">
          {preferences.map((pref) => (
            <GlassCard key={pref.id}>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-medium text-gray-800">{pref.label}</label>
                    <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {pref.value}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{pref.description}</p>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={pref.value}
                  onChange={(e) => pref.setValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #9333ea ${pref.value}%, #e5e7eb ${pref.value}%, #e5e7eb 100%)`,
                  }}
                />
                
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{pref.lowLabel}</span>
                  <span>{pref.highLabel}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="bg-blue-50/50">
          <h3 className="font-semibold text-gray-800 mb-2">Your AI Profile</h3>
          <p className="text-sm text-gray-700">
            Based on your settings, you prefer detailed, long-term predictions with moderate risk tolerance and high accuracy.
          </p>
        </GlassCard>

        <div className="mt-6 space-y-3">
          <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg">
            Save Preferences
          </button>
          <button className="w-full py-3 bg-white/70 rounded-xl text-gray-800 font-medium">
            Reset to Defaults
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
