import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Briefcase, DollarSign, GraduationCap, TrendingUp, AlertTriangle } from 'lucide-react';

export default function PredictionsHistoryScreen() {
  const navigate = useNavigate();

  const predictions = [
    {
      id: 1,
      title: 'Career Change to Tech',
      date: 'Feb 10, 2026',
      category: 'career',
      icon: Briefcase,
      score: 87,
      status: 'positive',
    },
    {
      id: 2,
      title: 'Investment in Stocks',
      date: 'Feb 8, 2026',
      category: 'finance',
      icon: DollarSign,
      score: 72,
      status: 'neutral',
    },
    {
      id: 3,
      title: 'Master\'s Degree Program',
      date: 'Feb 5, 2026',
      category: 'education',
      icon: GraduationCap,
      score: 91,
      status: 'positive',
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'positive') return 'from-green-500 to-green-600';
    if (status === 'neutral') return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'positive') return TrendingUp;
    return AlertTriangle;
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Predictions History</h1>
          <p className="text-gray-600">Your past simulations and outcomes</p>
        </div>

        <div className="space-y-3">
          {predictions.map((prediction) => {
            const StatusIcon = getStatusIcon(prediction.status);
            return (
              <GlassCard
                key={prediction.id}
                onClick={() => navigate('/analytics')}
                className="cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getStatusColor(prediction.status)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <prediction.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{prediction.title}</h3>
                      <p className="text-sm text-gray-600">{prediction.date}</p>
                    </div>
                  </div>
                  <StatusIcon className={`w-5 h-5 ${prediction.status === 'positive' ? 'text-green-600' : 'text-yellow-600'}`} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-full bg-gradient-to-r ${getStatusColor(prediction.status)} rounded-full`}
                        style={{ width: `${prediction.score}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {prediction.score}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <GlassCard className="mt-6 bg-blue-50/50">
          <div className="text-center">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Average Success Rate: 83%</span>
              <br />
              Based on {predictions.length} predictions
            </p>
          </div>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
