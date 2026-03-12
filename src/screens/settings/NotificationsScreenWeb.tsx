import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Bell, Mail, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';

export default function NotificationsScreenWeb() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    simulationComplete: true,
    weeklyReport: true,
    aiInsights: true,
    achievementUnlocked: false,
    systemUpdates: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <WebLayout maxWidth="xl">
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings')}
          className="text-blue-600 hover:text-blue-700 mb-4 font-medium"
        >
          ← Back to Settings
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
        <p className="text-gray-600">Control your alerts and email preferences</p>
      </div>

      <div className="max-w-[1200px] space-y-6">
        {/* General Notifications */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">General Notifications</h3>
              <p className="text-sm text-gray-600">Manage notification channels</p>
            </div>
          </div>
          <div className="space-y-4">
            <NotificationToggle
              title="Email Notifications"
              description="Receive updates via email"
              checked={settings.emailNotifications}
              onChange={() => toggleSetting('emailNotifications')}
              icon={<Mail className="w-5 h-5 text-purple-600" />}
            />
            <NotificationToggle
              title="Push Notifications"
              description="Get instant notifications in app"
              checked={settings.pushNotifications}
              onChange={() => toggleSetting('pushNotifications')}
              icon={<MessageSquare className="w-5 h-5 text-green-600" />}
            />
          </div>
        </WebCard>

        {/* Simulation Alerts */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Simulation Alerts</h3>
              <p className="text-sm text-gray-600">Stay updated on your simulations</p>
            </div>
          </div>
          <div className="space-y-4">
            <NotificationToggle
              title="Simulation Complete"
              description="When your AI simulation finishes processing"
              checked={settings.simulationComplete}
              onChange={() => toggleSetting('simulationComplete')}
              icon={<Bell className="w-5 h-5 text-blue-600" />}
            />
            <NotificationToggle
              title="Weekly Report"
              description="Summary of your decisions and outcomes"
              checked={settings.weeklyReport}
              onChange={() => toggleSetting('weeklyReport')}
              icon={<TrendingUp className="w-5 h-5 text-orange-600" />}
            />
          </div>
        </WebCard>

        {/* AI Insights */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">AI Insights</h3>
              <p className="text-sm text-gray-600">Personalized recommendations</p>
            </div>
          </div>
          <div className="space-y-4">
            <NotificationToggle
              title="AI Insights"
              description="Receive personalized AI-powered suggestions"
              checked={settings.aiInsights}
              onChange={() => toggleSetting('aiInsights')}
              icon={<span className="text-lg">💡</span>}
            />
            <NotificationToggle
              title="Achievement Unlocked"
              description="When you reach new milestones"
              checked={settings.achievementUnlocked}
              onChange={() => toggleSetting('achievementUnlocked')}
              icon={<span className="text-lg">🏆</span>}
            />
          </div>
        </WebCard>

        {/* System Updates */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">System Updates</h3>
              <p className="text-sm text-gray-600">Important announcements</p>
            </div>
          </div>
          <div className="space-y-4">
            <NotificationToggle
              title="System Updates"
              description="New features and important updates"
              checked={settings.systemUpdates}
              onChange={() => toggleSetting('systemUpdates')}
              icon={<AlertCircle className="w-5 h-5 text-red-600" />}
            />
          </div>
        </WebCard>

        {/* Save Button */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={() => navigate('/settings')}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </WebLayout>
  );
}

function NotificationToggle({ 
  title, 
  description, 
  checked, 
  onChange,
  icon 
}: { 
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}
