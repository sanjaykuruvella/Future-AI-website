import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Button } from '../../components/Button';
import { Brain, TrendingUp, Shield } from 'lucide-react';

export default function FeatureIntro1ScreenWeb() {
  const navigate = useNavigate();

  return (
    <WebLayout showSidebar={false} maxWidth="xl">
      <div className="max-w-4xl mx-auto py-16">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-12 h-12 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI-Powered Predictions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant insights into how your decisions will shape your future
          </p>
        </div>

        <WebCard className="mb-8">
          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Analysis</h3>
                <p className="text-gray-600">Advanced AI analyzes thousands of scenarios in seconds</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Future Insights</h3>
                <p className="text-gray-600">See how your choices impact your life path</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Risk Assessment</h3>
                <p className="text-gray-600">Understand potential risks and rewards</p>
              </div>
            </div>
          </div>
        </WebCard>

        <div className="flex items-center justify-between">
          <Button 
            onClick={() => navigate('/welcome')}
            variant="outline"
            className="px-8 py-3 text-lg"
          >
            Back
          </Button>
          <Button 
            onClick={() => navigate('/feature-intro-2')}
            className="px-8 py-3 text-lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </WebLayout>
  );
}
