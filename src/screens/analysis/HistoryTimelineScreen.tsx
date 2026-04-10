import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Briefcase, DollarSign, GraduationCap, Home } from 'lucide-react';

export default function HistoryTimelineScreen() {
  const navigate = useNavigate();

  const timeline = [
    {
      id: 1,
      date: 'Feb 13, 2026',
      title: 'Career Change Decision',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      score: 87,
      status: 'pending',
    },
    {
      id: 2,
      date: 'Feb 10, 2026',
      title: 'Investment Analysis',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      score: 72,
      status: 'completed',
    },
    {
      id: 3,
      date: 'Feb 5, 2026',
      title: "Master's Degree Decision",
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      score: 91,
      status: 'completed',
    },
    {
      id: 4,
      date: 'Jan 28, 2026',
      title: 'Real Estate Purchase',
      icon: Home,
      color: 'from-orange-500 to-orange-600',
      score: 78,
      status: 'completed',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">History Timeline</h1>
          <p className="text-gray-600">Your prediction journey over time</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {timeline.length}
              </p>
              <p className="text-xs text-gray-600">Simulations</p>
            </div>
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                82%
              </p>
              <p className="text-xs text-gray-600">Avg Score</p>
            </div>
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                3
              </p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
          </div>
        </GlassCard>

        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>

          <div className="space-y-6">
            {timeline.map((item) => (
              <div key={item.id} className="relative pl-16">
                {/* Timeline dot */}
                <div className="absolute left-3 top-6">
                  <div className={`w-6 h-6 bg-gradient-to-br ${item.color} rounded-full border-4 border-white shadow-lg`}></div>
                </div>

                <GlassCard
                  onClick={() => navigate('/analytics')}
                  className={`cursor-pointer ${item.status === 'pending' ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">{item.date}</p>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    </div>
                    <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${item.color}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-3 flex items-center space-x-2">
                      <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {item.score}
                      </span>
                      {item.status === 'pending' && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
