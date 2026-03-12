import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Sparkles, TrendingUp, AlertTriangle, Target } from 'lucide-react';

export default function NotificationsScreen() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'insight',
      icon: Sparkles,
      color: 'from-blue-500 to-purple-600',
      title: 'New Daily Insight Available',
      message: 'Your AI has generated today\'s prediction',
      time: '5m ago',
    },
    {
      id: 2,
      type: 'opportunity',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      title: 'High-Probability Opportunity',
      message: 'Career decision window closing in 2 days',
      time: '2h ago',
    },
    {
      id: 3,
      type: 'alert',
      icon: AlertTriangle,
      color: 'from-yellow-500 to-yellow-600',
      title: 'Risk Alert',
      message: 'Financial decision may need reconsideration',
      time: '1d ago',
    },
    {
      id: 4,
      type: 'goal',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      title: 'Goal Progress Update',
      message: 'You\'re 75% towards your career goal',
      time: '2d ago',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
          <p className="text-gray-600">Stay updated on your predictions</p>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <GlassCard key={notification.id} className="cursor-pointer hover:bg-white/80">
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${notification.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <notification.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
