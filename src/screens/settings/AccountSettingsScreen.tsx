import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { User, Mail, Lock } from 'lucide-react';

export default function AccountSettingsScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="h-full flex flex-col px-6 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Settings</h1>
          <p className="text-sm text-gray-600">Manage your personal information</p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto">
          <GlassCard>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">Profile Information</h3>
                <p className="text-xs text-gray-600">Update your name and photo</p>
              </div>
            </div>
            <div className="space-y-3 pt-3 border-t border-gray-200">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Alex Thompson"
                  className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">Email Address</h3>
                <p className="text-xs text-gray-600">alex.thompson@email.com</p>
              </div>
            </div>
            <button className="w-full mt-2 text-sm text-blue-600 hover:text-blue-700">
              Change Email
            </button>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">Password</h3>
                <p className="text-xs text-gray-600">Last changed 30 days ago</p>
              </div>
            </div>
            <button className="w-full mt-2 text-sm text-blue-600 hover:text-blue-700">
              Change Password
            </button>
          </GlassCard>

        </div>

        <div className="mt-4">
          <Button onClick={() => navigate(-1)} className="w-full">
            Save Changes
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
