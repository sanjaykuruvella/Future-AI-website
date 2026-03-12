import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';

export default function PrivacyEthicsScreen() {
  const navigate = useNavigate();

  const privacyPoints = [
    { icon: Shield, text: 'Data encrypted & secure' },
    { icon: Lock, text: 'Never share your info' },
    { icon: Eye, text: 'Full AI transparency' },
    { icon: CheckCircle2, text: 'You control your data' },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="h-full flex flex-col px-6 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Privacy & Ethics</h1>
          <p className="text-sm text-gray-600">Your trust is our priority</p>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto">
          {privacyPoints.map((point, index) => (
            <GlassCard key={index}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm text-gray-700">{point.text}</p>
              </div>
            </GlassCard>
          ))}

          <GlassCard className="mt-4">
            <p className="text-xs text-gray-600 mb-3">
              Our AI provides suggestions to guide decisions, not guarantees. You remain in full control.
            </p>
          </GlassCard>
        </div>

        <div className="mt-6">
          <Button
            onClick={() => navigate('/home')}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}