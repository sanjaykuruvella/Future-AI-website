import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { BottomNav } from '../../components/BottomNav';
import { Brain, User, HelpCircle, MessageSquare, LogOut, Moon, Globe } from 'lucide-react';

export default function SettingsScreen() {
  const navigate = useNavigate();

  const settingsItems = [
    { icon: Brain, label: 'AI Preferences', route: '/profile/ai-preferences', color: 'from-purple-500 to-purple-600' },
    { icon: User, label: 'Account Settings', route: '/settings/account', color: 'from-blue-500 to-blue-600' },
    { icon: Moon, label: 'Display & Theme', route: '/settings/display', color: 'from-indigo-500 to-indigo-600' },
    { icon: Globe, label: 'Language & Region', route: '/settings/language', color: 'from-green-500 to-green-600' },
    { icon: HelpCircle, label: 'Help & Support', route: '/profile/help', color: 'from-orange-500 to-orange-600' },
    { icon: MessageSquare, label: 'Send Feedback', route: '/profile/feedback', color: 'from-pink-500 to-pink-600' },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-8 pb-20">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-sm text-gray-600">Manage your app preferences</p>
          </div>

          <div className="space-y-3">
            {settingsItems.map((item, index) => (
              <GlassCard
                key={index}
                onClick={() => navigate(item.route)}
                className="cursor-pointer hover:bg-white/90"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-800 text-sm">{item.label}</span>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </GlassCard>
            ))}

            <GlassCard
              onClick={() => navigate('/')}
              className="cursor-pointer bg-red-50/50 border-red-200 hover:bg-red-100/50 mt-6"
            >
              <div className="flex items-center justify-center space-x-2 text-red-600">
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Sign Out</span>
              </div>
            </GlassCard>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Version 1.0.0
          </p>
        </div>
        <BottomNav />
      </div>
    </MobileLayout>
  );
}
