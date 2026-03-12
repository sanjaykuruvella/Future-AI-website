import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { Brain } from 'lucide-react';

export default function AIProcessingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/analytics');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileLayout>
      <div className="h-screen flex flex-col items-center justify-center px-8">
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-30"></div>
          </div>
          <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <Brain className="w-16 h-16 text-white animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Processing
          </h1>
          <div className="space-y-2">
            <p className="text-gray-600">Analyzing decision parameters...</p>
            <p className="text-sm text-gray-500">Generating future scenarios</p>
          </div>
        </div>

        <div className="mt-12 flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-8 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        <div className="mt-12 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-loading"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-loading {
          animation: loading 3s ease-in-out;
        }
      `}</style>
    </MobileLayout>
  );
}
