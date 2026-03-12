import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';

export default function VariablesAdjustmentScreen() {
  const navigate = useNavigate();
  const [risk, setRisk] = useState(50);
  const [timeframe, setTimeframe] = useState(50);
  const [effort, setEffort] = useState(50);
  const [investment, setInvestment] = useState(50);

  const variables = [
    {
      id: 'risk',
      label: 'Risk Tolerance',
      value: risk,
      setValue: setRisk,
      lowLabel: 'Conservative',
      highLabel: 'Aggressive',
    },
    {
      id: 'timeframe',
      label: 'Timeframe',
      value: timeframe,
      setValue: setTimeframe,
      lowLabel: 'Short-term',
      highLabel: 'Long-term',
    },
    {
      id: 'effort',
      label: 'Effort Level',
      value: effort,
      setValue: setEffort,
      lowLabel: 'Minimal',
      highLabel: 'Maximum',
    },
    {
      id: 'investment',
      label: 'Financial Investment',
      value: investment,
      setValue: setInvestment,
      lowLabel: 'Low Budget',
      highLabel: 'High Budget',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen flex flex-col px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Adjust Variables</h1>
          <p className="text-gray-600">Fine-tune your simulation parameters</p>
        </div>

        <div className="space-y-6 flex-1">
          {variables.map((variable) => (
            <GlassCard key={variable.id}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-medium text-gray-800">{variable.label}</label>
                  <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {variable.value}%
                  </span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={variable.value}
                  onChange={(e) => variable.setValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #9333ea ${variable.value}%, #e5e7eb ${variable.value}%, #e5e7eb 100%)`,
                  }}
                />
                
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{variable.lowLabel}</span>
                  <span>{variable.highLabel}</span>
                </div>
              </div>
            </GlassCard>
          ))}

          <GlassCard className="bg-blue-50/50">
            <p className="text-sm text-gray-700 text-center">
              These variables help our AI create more accurate predictions tailored to your situation
            </p>
          </GlassCard>
        </div>

        <div className="mt-8">
          <Button onClick={() => navigate('/simulation/processing')} className="w-full">
            Generate Prediction
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
