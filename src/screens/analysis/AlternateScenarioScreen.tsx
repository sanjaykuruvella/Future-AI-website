import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { GitBranch } from 'lucide-react';

export default function AlternateScenarioScreen() {
  const navigate = useNavigate();

  const scenarios = [
    {
      id: 1,
      title: 'Accept Startup Offer',
      score: 87,
      pros: 'High growth, learning, equity',
      cons: 'Risk, uncertainty, long hours',
      selected: true,
    },
    {
      id: 2,
      title: 'Stay at Current Job',
      score: 65,
      pros: 'Stability, known environment',
      cons: 'Limited growth, stagnation',
      selected: false,
    },
    {
      id: 3,
      title: 'Look for Better Options',
      score: 72,
      pros: 'More choices, better fit',
      cons: 'Time delay, uncertainty',
      selected: false,
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GitBranch className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Alternate Scenarios</h1>
          <p className="text-gray-600">Compare different decision paths</p>
        </div>

        <div className="space-y-4">
          {scenarios.map((scenario) => (
            <GlassCard
              key={scenario.id}
              className={scenario.selected ? 'ring-2 ring-blue-500 bg-white/90' : ''}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-800">{scenario.title}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {scenario.score}
                  </div>
                  <p className="text-xs text-gray-600">score</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    style={{ width: `${scenario.score}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-green-50 rounded-lg p-2">
                  <p className="font-medium text-green-700 mb-1">Pros</p>
                  <p className="text-gray-700">{scenario.pros}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-2">
                  <p className="font-medium text-red-700 mb-1">Cons</p>
                  <p className="text-gray-700">{scenario.cons}</p>
                </div>
              </div>

              {!scenario.selected && (
                <Button
                  onClick={() => navigate('/simulation/processing')}
                  variant="secondary"
                  className="w-full mt-3"
                >
                  Simulate This Scenario
                </Button>
              )}
            </GlassCard>
          ))}
        </div>

        <div className="mt-6">
          <Button onClick={() => navigate('/analytics')} className="w-full">
            View Analytics
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
