import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export default function RiskVsRewardScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Risk vs Reward</h1>
          <p className="text-gray-600">Comprehensive analysis breakdown</p>
        </div>

        {/* Risk-Reward Chart */}
        <GlassCard className="mb-6">
          <div className="h-64 relative">
            <svg viewBox="0 0 300 200" className="w-full h-full">
              {/* Axes */}
              <line x1="30" y1="170" x2="270" y2="170" stroke="#9ca3af" strokeWidth="2" />
              <line x1="30" y1="30" x2="30" y2="170" stroke="#9ca3af" strokeWidth="2" />
              
              {/* Labels */}
              <text x="150" y="195" textAnchor="middle" fill="#6b7280" fontSize="12">Risk Level</text>
              <text x="15" y="100" textAnchor="middle" fill="#6b7280" fontSize="12" transform="rotate(-90 15 100)">Reward Potential</text>
              
              {/* Grid lines */}
              <line x1="30" y1="130" x2="270" y2="130" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="30" y1="90" x2="270" y2="90" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="30" y1="50" x2="270" y2="50" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
              
              <line x1="90" y1="30" x2="90" y2="170" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="150" y1="30" x2="150" y2="170" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="210" y1="30" x2="210" y2="170" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="3,3" />
              
              {/* Data point - Your Decision */}
              <circle cx="180" cy="70" r="15" fill="url(#gradient2)" opacity="0.9" />
              <text x="180" y="74" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">You</text>
              
              {/* Comparison points */}
              <circle cx="90" cy="130" r="8" fill="#10b981" opacity="0.6" />
              <text x="90" y="150" textAnchor="middle" fill="#6b7280" fontSize="9">Safe</text>
              
              <circle cx="240" cy="50" r="8" fill="#ef4444" opacity="0.6" />
              <text x="240" y="40" textAnchor="middle" fill="#6b7280" fontSize="9">Risky</text>
              
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <GlassCard className="bg-green-50/50 border-green-200">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-gray-800">Rewards</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Career advancement</li>
              <li>• +$30K salary</li>
              <li>• New skills</li>
              <li>• Industry network</li>
            </ul>
          </GlassCard>

          <GlassCard className="bg-red-50/50 border-red-200">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="font-semibold text-gray-800">Risks</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Startup uncertainty</li>
              <li>• Learning curve</li>
              <li>• Work-life balance</li>
              <li>• Relocation</li>
            </ul>
          </GlassCard>
        </div>

        <GlassCard className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3">AI Analysis</h3>
          <p className="text-sm text-gray-700 mb-3">
            This decision represents a <span className="font-medium">moderate-high risk with high reward potential</span>. The risk-reward ratio is favorable based on your profile.
          </p>
          <div className="bg-white/60 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Recommendation:</span> The potential rewards significantly outweigh the risks. Your personality profile suggests you can handle the challenges effectively.
            </p>
          </div>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
