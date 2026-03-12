import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Brain, GitBranch, Compass, Shield } from 'lucide-react';

export default function AppOverviewScreen() {
  const navigate = useNavigate();

  const features = [
    { icon: Brain, title: 'AI Predictions', description: 'Get intelligent forecasts based on your decisions' },
    { icon: GitBranch, title: 'Life Simulation', description: 'Visualize multiple future paths before choosing' },
    { icon: Compass, title: 'Smart Guidance', description: 'Receive personalized recommendations' },
    { icon: Shield, title: 'Privacy First', description: 'Your data stays secure and private' },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="h-full flex flex-col px-6 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">How It Works</h1>
          <p className="text-sm text-gray-600">Powerful features to guide your decisions</p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto">
          {features.map((feature, index) => (
            <GlassCard key={index}>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-6">
          <Button onClick={() => navigate('/signup')} className="w-full">
            Continue
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}