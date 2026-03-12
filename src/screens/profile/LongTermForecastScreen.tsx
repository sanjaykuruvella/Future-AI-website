import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Calendar, TrendingUp } from 'lucide-react';

export default function LongTermForecastScreen() {
  const navigate = useNavigate();

  const yearlyProjections = [
    { year: '2026', career: 85, finance: 72, life: 78 },
    { year: '2027', career: 90, finance: 80, life: 82 },
    { year: '2028', career: 92, finance: 85, life: 85 },
    { year: '2029', career: 94, finance: 88, life: 87 },
    { year: '2030', career: 95, finance: 90, life: 90 },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/profile')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">5-Year Forecast</h1>
          <p className="text-gray-600">Long-term trajectory prediction</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 mb-1">Projected Growth</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                +18%
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-600" />
          </div>
        </GlassCard>

        {/* Chart */}
        <GlassCard className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">5-Year Projection Chart</h3>
          <div className="h-48">
            <svg viewBox="0 0 300 150" className="w-full h-full">
              {/* Grid */}
              <line x1="40" y1="20" x2="280" y2="20" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="50" x2="280" y2="50" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="80" x2="280" y2="80" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="110" x2="280" y2="110" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Axes */}
              <line x1="40" y1="130" x2="280" y2="130" stroke="#9ca3af" strokeWidth="2" />
              <line x1="40" y1="10" x2="40" y2="130" stroke="#9ca3af" strokeWidth="2" />
              
              {/* Career line */}
              <path
                d="M 60 80 L 110 60 L 160 50 L 210 40 L 260 30"
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
              />
              
              {/* Finance line */}
              <path
                d="M 60 95 L 110 75 L 160 65 L 210 55 L 260 48"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
              />
              
              {/* Life line */}
              <path
                d="M 60 88 L 110 70 L 160 60 L 210 50 L 260 42"
                stroke="#9333ea"
                strokeWidth="2"
                fill="none"
              />
              
              {/* Year labels */}
              <text x="60" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">2026</text>
              <text x="110" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">2027</text>
              <text x="160" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">2028</text>
              <text x="210" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">2029</text>
              <text x="260" y="145" textAnchor="middle" fill="#6b7280" fontSize="10">2030</text>
            </svg>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Career</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Finance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Life Balance</span>
            </div>
          </div>
        </GlassCard>

        {/* Yearly breakdown */}
        <div className="space-y-3">
          {yearlyProjections.map((projection) => (
            <GlassCard key={projection.year}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800">{projection.year}</h3>
                <span className="text-sm text-gray-600">Projected Scores</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Career</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${projection.career}%` }}
                      />
                    </div>
                    <span className="font-medium text-blue-600 w-8">{projection.career}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Finance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${projection.finance}%` }}
                      />
                    </div>
                    <span className="font-medium text-green-600 w-8">{projection.finance}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Life Balance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: `${projection.life}%` }}
                      />
                    </div>
                    <span className="font-medium text-purple-600 w-8">{projection.life}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
