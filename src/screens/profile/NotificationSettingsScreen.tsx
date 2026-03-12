import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Bell, Sparkles, TrendingUp, AlertTriangle, Target } from 'lucide-react';

export default function NotificationSettingsScreen() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    dailyInsights: true,
    opportunities: true,
    riskAlerts: true,
    goalProgress: false,
    weeklyReports: true,
    pushNotifications: true,
    emailNotifications: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationTypes = [
    {
      key: 'dailyInsights' as const,
      icon: Sparkles,
      title: 'Daily AI Insights',
      description: 'Receive daily predictions and recommendations',
      color: 'from-blue-500 to-blue-600',
    },
    {
      key: 'opportunities' as const,
      icon: TrendingUp,
      title: 'Opportunity Alerts',
      description: 'Get notified of high-probability opportunities',
      color: 'from-green-500 to-green-600',
    },
    {
      key: 'riskAlerts' as const,
      icon: AlertTriangle,
      title: 'Risk Warnings',
      description: 'Important alerts about potential risks',
      color: 'from-red-500 to-red-600',
    },
    {
      key: 'goalProgress' as const,
      icon: Target,
      title: 'Goal Updates',
      description: 'Track progress on your life goals',
      color: 'from-purple-500 to-purple-600',
    },
    {
      key: 'weeklyReports' as const,
      icon: Bell,
      title: 'Weekly Summary',
      description: 'Comprehensive weekly activity reports',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/profile')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
          <p className="text-gray-600">Manage your alert preferences</p>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Types</h2>
        <div className="space-y-3 mb-6">
          {notificationTypes.map((type) => (
            <GlassCard key={type.key}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-10 h-10 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center`}>
                    <type.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{type.title}</p>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting(type.key)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    settings[type.key] ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings[type.key] ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">Delivery Methods</h2>
        <div className="space-y-3 mb-6">
          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive alerts on your device</p>
              </div>
              <button
                onClick={() => toggleSetting('pushNotifications')}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  settings.pushNotifications ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.pushNotifications ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Email Notifications</p>
                <p className="text-sm text-gray-600">Get updates via email</p>
              </div>
              <button
                onClick={() => toggleSetting('emailNotifications')}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.emailNotifications ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="bg-blue-50/50">
          <p className="text-sm text-gray-700 text-center">
            You can change these settings anytime. Critical security alerts will always be sent.
          </p>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
