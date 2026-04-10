import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';

export default function ScenarioMapScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen flex flex-col px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Future Paths</h1>
          <p className="text-gray-600">Interactive scenario map</p>
        </div>

        <GlassCard className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 300 400" className="w-full h-full">
              {/* Main decision node */}
              <circle cx="150" cy="50" r="30" fill="url(#gradient1)" />
              <text x="150" y="55" textAnchor="middle" fill="white" fontSize="12">Now</text>

              {/* Branch lines */}
              <path d="M 150 80 Q 100 150 80 200" stroke="#3b82f6" strokeWidth="2" fill="none" />
              <path d="M 150 80 L 150 200" stroke="#9333ea" strokeWidth="2" fill="none" />
              <path d="M 150 80 Q 200 150 220 200" stroke="#10b981" strokeWidth="2" fill="none" />

              {/* Scenario nodes */}
              <circle cx="80" cy="200" r="25" fill="#ef4444" opacity="0.8" />
              <text x="80" y="202" textAnchor="middle" fill="white" fontSize="10">Path A</text>
              <text x="80" y="240" textAnchor="middle" fill="#374151" fontSize="11">Risk: High</text>

              <circle cx="150" cy="200" r="25" fill="#3b82f6" opacity="0.8" />
              <text x="150" y="202" textAnchor="middle" fill="white" fontSize="10">Path B</text>
              <text x="150" y="240" textAnchor="middle" fill="#374151" fontSize="11">Balanced</text>

              <circle cx="220" cy="200" r="25" fill="#10b981" opacity="0.8" />
              <text x="220" y="202" textAnchor="middle" fill="white" fontSize="10">Path C</text>
              <text x="220" y="240" textAnchor="middle" fill="#374151" fontSize="11">Safe</text>

              {/* Future outcomes */}
              <path d="M 80 225 L 60 320" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              <path d="M 150 225 L 150 320" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
              <path d="M 220 225 L 240 320" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />

              <circle cx="60" cy="320" r="20" fill="#ef4444" opacity="0.6" />
              <text x="60" y="323" textAnchor="middle" fill="white" fontSize="9">72%</text>

              <circle cx="150" cy="320" r="20" fill="#3b82f6" opacity="0.6" />
              <text x="150" y="323" textAnchor="middle" fill="white" fontSize="9">87%</text>

              <circle cx="240" cy="320" r="20" fill="#10b981" opacity="0.6" />
              <text x="240" y="323" textAnchor="middle" fill="white" fontSize="9">65%</text>

              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </GlassCard>

        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => navigate('/simulation/processing')}
              className="px-4 py-2 bg-red-500/20 rounded-lg text-sm font-medium text-red-700 border border-red-300 transition-all hover:bg-red-500/30"
            >
              Path A
            </button>
            <button
              onClick={() => navigate('/simulation/processing')}
              className="px-4 py-2 bg-blue-500/20 rounded-lg text-sm font-medium text-blue-700 border border-blue-300 transition-all hover:bg-blue-500/30"
            >
              Path B
            </button>
            <button
              onClick={() => navigate('/simulation/processing')}
              className="px-4 py-2 bg-green-500/20 rounded-lg text-sm font-medium text-green-700 border border-green-300 transition-all hover:bg-green-500/30"
            >
              Path C
            </button>
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={() => navigate('/analytics')} className="w-full">
            View Detailed Results
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
