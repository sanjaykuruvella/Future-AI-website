import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { Brain, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { predictFuture } from '../../api/prediction';

export default function AIProcessingScreenWeb() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runSimulation = async () => {
        const userStr = localStorage.getItem('user');
        const pendingStr = localStorage.getItem('pending_simulation');
        
        if (!userStr || !pendingStr) {
            navigate('/simulation/category');
            return;
        }

        const user = JSON.parse(userStr);
        const pending = JSON.parse(pendingStr);

        try {
            // 1. Predict Future (this also saves to DB on backend)
            await predictFuture({ 
                ...pending.features, 
                category: pending.category, 
                input_text: pending.input,
                current_situation: pending.currentSituation || '',
                desired_outcome: pending.desiredOutcome || '',
                selected_timeline: pending.selectedTimeline || '',
                user_id: user.user_id 
            });
            
            // 2. Clear pending and navigate
            localStorage.removeItem('pending_simulation');
            
            // Give user time to see the animation
            setTimeout(() => navigate('/simulation/prediction-summary'), 2000);
        } catch (err: any) {
            console.error('Simulation failed:', err);
            setError(err.message || 'Failed to complete simulation. Please ensure models are trained.');
        }
    };

    runSimulation();
  }, [navigate]);

  return (
    <WebLayout showSidebar={false} maxWidth="xl">
      <div className="min-h-[600px] flex flex-col items-center justify-center py-20">
        <div className="relative mb-12">
          {/* Animated circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-blue-500/20 rounded-full animate-ping" 
                 style={{ animationDuration: '2s' }}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-purple-500/20 rounded-full animate-ping" 
                 style={{ animationDuration: '1.5s' }}></div>
          </div>
          
          {/* Brain icon */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <Brain className="w-16 h-16 text-white animate-pulse" strokeWidth={2} />
          </div>
        </div>

        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {error ? 'Simulation Error' : 'AI is Analyzing...'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {error ? error : 'Processing thousands of scenarios to predict your future outcomes'}
          </p>

          {error ? (
              <button 
                onClick={() => navigate('/simulation/category')}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold"
              >
                  Try Different Scenario
              </button>
          ) : (
            <>
              {/* Progress indicators */}
              <div className="space-y-4 max-w-md mx-auto">
                <div className="flex items-center space-x-3 text-left">
                  <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                  <p className="text-gray-700">Analyzing decision parameters...</p>
                </div>
                <div className="flex items-center space-x-3 text-left">
                  <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" 
                           style={{ animationDelay: '0.5s' }} />
                  <p className="text-gray-700">Calculating probability distributions...</p>
                </div>
                <div className="flex items-center space-x-3 text-left">
                  <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" 
                           style={{ animationDelay: '1s' }} />
                  <p className="text-gray-700">Generating future timelines...</p>
                </div>
                <div className="flex items-center space-x-3 text-left">
                  <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" 
                           style={{ animationDelay: '1.5s' }} />
                  <p className="text-gray-700">Preparing personalized insights...</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-12">
                <div className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-progress"></div>
                </div>
              </div>
            </>
          )}
        </div>

        <style>{`
          @keyframes progress {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
          
          .animate-progress {
            animation: progress 4s ease-out forwards;
          }
        `}</style>
      </div>
    </WebLayout>
  );
}
