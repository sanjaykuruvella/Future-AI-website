import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { HelpCircle, MessageSquare, LogOut, ChevronRight } from 'lucide-react';

export default function SettingsScreenWeb() {
  const navigate = useNavigate();

  return (
    <WebLayout maxWidth="xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Privacy & Policy */}
        <SettingCard
          icon={<span className="w-6 h-6 text-2xl flex items-center justify-center pt-1.5">🛡️</span>}
          title="Privacy & Policy"
          description="View our privacy policy and terms"
          onClick={() => navigate('/settings/privacy-policy')}
        />





        {/* AI Preferences */}
        <SettingCard
          icon={<span className="text-2xl">🤖</span>}
          title="AI Preferences"
          description="Customize AI behavior and recommendations"
          onClick={() => navigate('/settings/ai-preferences')}
        />

        {/* Help Center */}
        <SettingCard
          icon={<HelpCircle className="w-6 h-6 text-cyan-600" />}
          title="Help & Support"
          description="FAQs, tutorials, and contact support"
          onClick={() => navigate('/settings/help')}
        />

        {/* Feedback */}
        <SettingCard
          icon={<MessageSquare className="w-6 h-6 text-indigo-600" />}
          title="Send Feedback"
          description="Share your thoughts and suggestions"
          onClick={() => navigate('/settings/feedback')}
        />
      </div>

      {/* Danger Zone */}
      <WebCard className="border-red-200 bg-red-50/30">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Account Actions</h3>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl hover:bg-red-50 transition-all border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <LogOut className="w-5 h-5 text-red-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-800">Sign Out</p>
                <p className="text-sm text-gray-600">Log out from this device</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </WebCard>

      {/* Version Info */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>FutureVision AI v1.0.0</p>
        <p>© 2026 All rights reserved</p>
      </div>
    </WebLayout>
  );
}

function SettingCard({ icon, title, description, onClick }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <WebCard onClick={onClick} hover>
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
      </div>
    </WebCard>
  );
}
