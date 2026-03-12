import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Briefcase, DollarSign, Heart, Dumbbell } from 'lucide-react';

export default function LifeBalanceMetricsScreen() {
  const navigate = useNavigate();

  const metrics = [
    { label: 'Career', score: 85, icon: Briefcase, color: 'from-blue-500 to-blue-600' },
    { label: 'Finance', score: 72, icon: DollarSign, color: 'from-green-500 to-green-600' },
    { label: 'Relationships', score: 68, icon: Heart, color: 'from-pink-500 to-pink-600' },
    { label: 'Health', score: 79, icon: Dumbbell, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Life Balance</h1>
          <p className="text-gray-600">Your current life metrics overview</p>
        </div>

        {/* Radar Chart Representation */}
        <GlassCard className="mb-6">
          <div className="aspect-square relative flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Grid circles */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="100" cy="100" r="20" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Axes */}
              <line x1="100" y1="100" x2="100" y2="20" stroke="#d1d5db" strokeWidth="1" />
              <line x1="100" y1="100" x2="180" y2="100" stroke="#d1d5db" strokeWidth="1" />
              <line x1="100" y1="100" x2="100" y2="180" stroke="#d1d5db" strokeWidth="1" />
              <line x1="100" y1="100" x2="20" y2="100" stroke="#d1d5db" strokeWidth="1" />
              
              {/* Data polygon */}
              <polygon
                points="100,32 168,100 100,163 47,100"
                fill="url(#gradient)"
                fillOpacity="0.3"
                stroke="url(#gradient)"
                strokeWidth="2"
              />
              
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </GlassCard>

        {/* Metric Cards */}
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <GlassCard key={index}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{metric.label}</p>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {metric.score}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-6 bg-blue-50/50">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-medium">Overall Balance Score: 76/100</span>
            <br />
            Focus on relationships for better balance
          </p>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
