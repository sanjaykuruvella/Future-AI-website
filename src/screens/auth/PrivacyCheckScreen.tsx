import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Shield, Lock, Eye } from 'lucide-react';

export default function PrivacyCheckScreen() {
  const navigate = useNavigate();
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <MobileLayout>
      <div className="h-full flex flex-col px-6 py-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Privacy First</h1>
          <p className="text-sm text-gray-600">Your data is secure with us</p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto">
          <GlassCard>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">Encrypted Data</h3>
                <p className="text-xs text-gray-600">All your information is encrypted end-to-end</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">No Data Sharing</h3>
                <p className="text-xs text-gray-600">We never sell or share your personal data</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800">You're in Control</h3>
                <p className="text-xs text-gray-600">Delete your data anytime from settings</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="bg-blue-50/50">
            <p className="text-xs text-gray-700 mb-3">
              We use AI to help you make better decisions. Your inputs are only used to generate personalized predictions.
            </p>
            
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-gray-700">
                I understand how my data is used and protected
              </span>
            </label>
          </GlassCard>
        </div>

        <div className="mt-6 space-y-2">
          <Button
            onClick={() => navigate('/home')}
            className="w-full"
            disabled={!acknowledged}
          >
            Continue to Dashboard
          </Button>
          <button
            onClick={() => navigate('/settings')}
            className="w-full text-sm text-blue-600 hover:text-blue-700"
          >
            View Privacy Settings
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
