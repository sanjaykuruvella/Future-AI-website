import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles } from 'lucide-react';

export default function SplashScreenWeb() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-white/10 rounded-full -bottom-20 -right-20 animate-pulse delay-1000"></div>
        <div className="absolute w-64 h-64 bg-white/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10 px-6">
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-300 rounded-full animate-ping delay-300"></div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          FutureVision AI
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-8">
          Consequence Simulator
        </p>
        
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
        </div>
      </div>

      {/* Version */}
      <div className="absolute bottom-8 text-white/60 text-sm">
        Version 1.0.0 • Powered by Advanced AI
      </div>
    </div>
  );
}