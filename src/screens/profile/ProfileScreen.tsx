import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { User, Calendar, TrendingUp, BookOpen } from 'lucide-react';

export default function ProfileScreen() {
  const navigate = useNavigate();

  const quickStats = [
    { label: 'Avg Score', value: '87', color: 'from-blue-600 to-purple-600' },
    { label: 'Predictions', value: '15', color: 'from-green-600 to-blue-600' },
    { label: 'Days Active', value: '45', color: 'from-purple-600 to-pink-600' },
  ];

  const menuItems = [
    { icon: Calendar, label: 'Analytics', route: '/analytics', color: 'from-green-500 to-green-600' },
    { icon: TrendingUp, label: 'Trend Analysis', route: '/analysis/trends', color: 'from-purple-500 to-purple-600' },
    { icon: BookOpen, label: 'Growth Metrics', route: '/analysis/growth', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="h-full flex flex-col px-6 py-8">
        {/* Profile Header */}
        <GlassCard className="mb-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">Alex Thompson</h2>
          <p className="text-sm text-gray-600 mb-4">alex.thompson@email.com</p>
          
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
            {quickStats.map((stat, index) => (
              <div key={index}>
                <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Profile Menu */}
        <div className="flex-1 space-y-3 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Your Progress</h3>
          {menuItems.map((item, index) => (
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
        </div>
      </div>
    </MobileLayout>
  );
}
