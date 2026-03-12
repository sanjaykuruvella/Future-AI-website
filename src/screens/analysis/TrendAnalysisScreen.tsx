import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function TrendAnalysisScreen() {
  const navigate = useNavigate();

  const trends = [
    {
      category: 'Career Decisions',
      trend: 'up',
      change: '+12%',
      current: 87,
      description: 'Success rate improving over time',
    },
    {
      category: 'Financial Choices',
      trend: 'stable',
      change: '0%',
      current: 72,
      description: 'Consistent decision quality',
    },
    {
      category: 'Life Balance',
      trend: 'down',
      change: '-5%',
      current: 68,
      description: 'May need more attention',
    },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return TrendingUp;
    if (trend === 'down') return TrendingDown;
    return Minus;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Trend Analysis</h1>
          <p className="text-gray-600">Your decision-making patterns over time</p>
        </div>

        {/* Chart */}
        <GlassCard className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Success Rate Trends</h3>
          <div className="h-48">
            <svg viewBox="0 0 300 150" className="w-full h-full">
              {/* Grid lines */}
              <line x1="30" y1="20" x2="270" y2="20" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="30" y1="50" x2="270" y2="50" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="30" y1="80" x2="270" y2="80" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="30" y1="110" x2="270" y2="110" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Axes */}
              <line x1="30" y1="130" x2="270" y2="130" stroke="#9ca3af" strokeWidth="2" />
              <line x1="30" y1="10" x2="30" y2="130" stroke="#9ca3af" strokeWidth="2" />
              
              {/* Trend line */}
              <path
                d="M 30 100 Q 90 95 120 70 T 210 40 L 270 30"
                stroke="url(#trendGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Data points */}
              <circle cx="30" cy="100" r="4" fill="#3b82f6" />
              <circle cx="90" cy="85" r="4" fill="#3b82f6" />
              <circle cx="150" cy="65" r="4" fill="#3b82f6" />
              <circle cx="210" cy="45" r="4" fill="#9333ea" />
              <circle cx="270" cy="30" r="5" fill="#9333ea" />
              
              {/* Labels */}
              <text x="30" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">Jan</text>
              <text x="90" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">Feb</text>
              <text x="150" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">Mar</text>
              <text x="210" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">Apr</text>
              <text x="270" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">May</text>
              
              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </GlassCard>

        {/* Trend Cards */}
        <div className="space-y-3">
          {trends.map((trend, index) => {
            const TrendIcon = getTrendIcon(trend.trend);
            return (
              <GlassCard key={index}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{trend.category}</h3>
                    <p className="text-sm text-gray-600">{trend.description}</p>
                  </div>
                  <div className={`flex items-center space-x-1 ${getTrendColor(trend.trend)}`}>
                    <TrendIcon className="w-5 h-5" />
                    <span className="font-semibold">{trend.change}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                        style={{ width: `${trend.current}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {trend.current}
                  </span>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <GlassCard className="mt-6 bg-blue-50/50">
          <h3 className="font-semibold text-gray-800 mb-2">Insight</h3>
          <p className="text-sm text-gray-700">
            Your career decision-making has improved significantly. Focus on maintaining work-life balance to optimize overall success.
          </p>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
