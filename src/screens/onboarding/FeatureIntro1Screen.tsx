import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { Button } from '../../components/Button';
import { Sparkles } from 'lucide-react';

export default function FeatureIntro1Screen() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="h-screen flex flex-col items-center justify-between px-8 py-12 bg-gray-50">
        {/* Icon */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-12 shadow-lg">
              <Sparkles className="w-20 h-20 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              AI Driven Guidance
            </h1>
            <p className="text-base text-gray-600 leading-relaxed px-4">
              Advanced algorithms analyze your variables to provide personalized risk assessments and success scores.
            </p>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-purple-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <Button 
            onClick={() => navigate('/feature-intro-2')}
            className="w-full py-4 text-base font-semibold"
          >
            Next
          </Button>
          <button
            onClick={() => navigate('/login')}
            className="w-full text-gray-500 text-base font-medium"
          >
            Skip
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
