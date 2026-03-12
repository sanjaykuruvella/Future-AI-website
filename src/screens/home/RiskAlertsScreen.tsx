import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { AlertTriangle, AlertCircle, XCircle } from 'lucide-react';

export default function RiskAlertsScreen() {
  const navigate = useNavigate();

  const alerts = [
    {
      id: 1,
      level: 'high',
      icon: XCircle,
      title: 'Investment Risk Detected',
      description: 'Your planned cryptocurrency investment shows 68% probability of loss',
      recommendation: 'Consider diversifying or reducing investment amount',
      time: '2h ago',
    },
    {
      id: 2,
      level: 'medium',
      icon: AlertTriangle,
      title: 'Career Timing Warning',
      description: 'Job switch timing may conflict with market conditions',
      recommendation: 'Wait 3-6 months for better opportunities',
      time: '1d ago',
    },
    {
      id: 3,
      level: 'low',
      icon: AlertCircle,
      title: 'Relationship Decision',
      description: 'Moving in together may need more planning',
      recommendation: 'Discuss financial expectations first',
      time: '3d ago',
    },
  ];

  const getLevelColor = (level: string) => {
    if (level === 'high') return 'from-red-500 to-red-600';
    if (level === 'medium') return 'from-yellow-500 to-yellow-600';
    return 'from-blue-500 to-blue-600';
  };

  const getLevelBg = (level: string) => {
    if (level === 'high') return 'bg-red-50/50 border-red-200';
    if (level === 'medium') return 'bg-yellow-50/50 border-yellow-200';
    return 'bg-blue-50/50 border-blue-200';
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Risk Alerts</h1>
          <p className="text-gray-600">Decisions that need attention</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-red-500/10 to-yellow-500/10 border-red-200">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <p className="font-semibold text-gray-800">Active Alerts: {alerts.length}</p>
              <p className="text-sm text-gray-600">Review these before proceeding</p>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <GlassCard key={alert.id} className={getLevelBg(alert.level)}>
              <div className="flex items-start space-x-3 mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${getLevelColor(alert.level)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <alert.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-800 mb-1">Recommendation:</p>
                    <p className="text-sm text-gray-600">{alert.recommendation}</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-3 py-2 bg-white/70 rounded-lg text-sm font-medium text-gray-800 hover:bg-white transition-all">
                Review Decision
              </button>
            </GlassCard>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
