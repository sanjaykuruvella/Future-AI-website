import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { Button } from '../../components/Button';
import { GitBranch, TrendingUp, Brain } from 'lucide-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="h-full flex flex-col items-center justify-between px-8 py-12">
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          <div className="relative w-64 h-64">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-24 left-8 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <GitBranch className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-24 right-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-blue-400 to-transparent"></div>
            <div className="absolute top-16 left-1/2 w-24 h-0.5 bg-gradient-to-l from-purple-400 to-transparent"></div>
            <div className="absolute top-16 right-1/2 w-24 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">
              Simulate Your Future
            </h1>
            <p className="text-gray-600 max-w-xs">
              Make better decisions by seeing the potential outcomes before you commit
            </p>
          </div>
        </div>

        <div className="mt-auto space-y-4 w-full">
          <Button onClick={() => navigate('/feature-intro-1')} className="w-full">
            Get Started
          </Button>
          <button
            onClick={() => navigate('/login')}
            className="w-full text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            I already have an account
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}