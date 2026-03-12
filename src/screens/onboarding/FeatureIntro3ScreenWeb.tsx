import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Button } from '../../components/Button';
import { Shield, Lock, Eye } from 'lucide-react';

export default function FeatureIntro3ScreenWeb() {
  const navigate = useNavigate();

  return (
    <WebLayout showSidebar={false} maxWidth="xl">
      <div className="max-w-4xl mx-auto py-16">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Privacy First
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your data is encrypted and completely under your control
          </p>
        </div>

        <WebCard className="mb-8">
          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Storage</h3>
                <p className="text-gray-600">End-to-end encryption for all your data</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Full Control</h3>
                <p className="text-gray-600">Delete or export your data anytime</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Transparency</h3>
                <p className="text-gray-600">Clear privacy policies and data usage</p>
              </div>
            </div>
          </div>
        </WebCard>

        <div className="flex items-center justify-between">
          <Button 
            onClick={() => navigate('/feature-intro-2')}
            variant="outline"
            className="px-8 py-3 text-lg"
          >
            Back
          </Button>
          <Button 
            onClick={() => navigate('/home')}
            className="px-8 py-3 text-lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </WebLayout>
  );
}
