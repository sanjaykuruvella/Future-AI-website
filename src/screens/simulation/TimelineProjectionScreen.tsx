import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Clock } from 'lucide-react';

export default function TimelineProjectionScreen() {
  const navigate = useNavigate();

  const milestones = [
    {
      id: 1,
      title: 'Decision Made',
      date: 'Week 1',
      description: 'Accept the position and give notice',
      status: 'current',
    },
    {
      id: 2,
      title: 'Transition Period',
      date: 'Week 2-4',
      description: 'Knowledge transfer and onboarding preparation',
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'First Month',
      date: 'Month 1',
      description: 'Learning phase, establishing relationships',
      status: 'upcoming',
    },
    {
      id: 4,
      title: 'Momentum Building',
      date: 'Month 3-6',
      description: 'Contributing to key projects, proving value',
      status: 'upcoming',
    },
    {
      id: 5,
      title: 'Growth Phase',
      date: 'Month 6-12',
      description: 'Leadership opportunities, salary review',
      status: 'upcoming',
    },
    {
      id: 6,
      title: 'Long-term Success',
      date: 'Year 2+',
      description: 'Senior role, industry recognition',
      status: 'upcoming',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Timeline Projection</h1>
          <p className="text-gray-600">Your predicted journey over time</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 mb-1">Projected Duration</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                18-24 Months
              </p>
            </div>
            <Clock className="w-12 h-12 text-blue-600" />
          </div>
        </GlassCard>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>

          <div className="space-y-6">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="relative pl-16">
                {/* Timeline dot */}
                <div className="absolute left-3 top-3">
                  {milestone.status === 'current' ? (
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full"></div>
                  )}
                </div>

                <GlassCard className={milestone.status === 'current' ? 'ring-2 ring-blue-500' : ''}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{milestone.title}</h3>
                    <span className="text-sm font-medium text-blue-600">{milestone.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        <GlassCard className="mt-8 bg-blue-50/50">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-medium">Success probability increases over time</span>
            <br />
            Each milestone builds toward your ultimate goal
          </p>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
