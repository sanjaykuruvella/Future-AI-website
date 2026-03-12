import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Shield, Lock, Eye, Database, Trash2 } from 'lucide-react';

export default function PrivacyControlsScreen() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    dataCollection: true,
    personalizedPredictions: true,
    analyticsSharing: false,
    thirdPartySharing: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate('/profile')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Controls</h1>
          <p className="text-gray-600">Manage your data and privacy</p>
        </div>

        <div className="space-y-4 mb-6">
          <GlassCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Data Collection</p>
                  <p className="text-sm text-gray-600">Allow AI to learn from your decisions</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('dataCollection')}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  settings.dataCollection ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.dataCollection ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Personalized Predictions</p>
                  <p className="text-sm text-gray-600">Use your profile for better accuracy</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('personalizedPredictions')}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  settings.personalizedPredictions ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.personalizedPredictions ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Analytics Sharing</p>
                  <p className="text-sm text-gray-600">Share anonymous data for research</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('analyticsSharing')}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  settings.analyticsSharing ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.analyticsSharing ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Third-Party Sharing</p>
                  <p className="text-sm text-gray-600">Share data with partner services</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting('thirdPartySharing')}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  settings.thirdPartySharing ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.thirdPartySharing ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Data Management</h3>
          <div className="space-y-3">
            <button className="w-full py-3 bg-white/70 rounded-xl text-sm font-medium text-gray-800 hover:bg-white transition-all">
              Download My Data
            </button>
            <button className="w-full py-3 bg-red-50 rounded-xl text-sm font-medium text-red-600 hover:bg-red-100 transition-all flex items-center justify-center space-x-2">
              <Trash2 className="w-4 h-4" />
              <span>Delete All My Data</span>
            </button>
          </div>
        </GlassCard>

        <GlassCard className="bg-blue-50/50">
          <p className="text-sm text-gray-700 text-center">
            Your privacy is our priority. We never sell your personal data and use industry-standard encryption to protect your information.
          </p>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
