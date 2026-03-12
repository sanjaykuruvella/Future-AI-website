import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { BottomNav } from '../../components/BottomNav';
import { Briefcase, DollarSign, Dumbbell, GraduationCap } from 'lucide-react';

export default function GoalProgressScreen() {
  const navigate = useNavigate();

  const goals = [
    {
      id: 1,
      title: 'Career Advancement',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      progress: 75,
      target: 'Senior Position by Dec 2026',
      milestones: 3,
      completed: 2,
    },
    {
      id: 2,
      title: 'Financial Independence',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      progress: 60,
      target: '₹40L savings by end of year',
      milestones: 5,
      completed: 3,
    },
    {
      id: 3,
      title: 'Health & Fitness',
      icon: Dumbbell,
      color: 'from-orange-500 to-orange-600',
      progress: 45,
      target: 'Run 5K in under 25 minutes',
      milestones: 4,
      completed: 2,
    },
    {
      id: 4,
      title: 'Skill Development',
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      progress: 85,
      target: 'Complete AI/ML certification',
      milestones: 6,
      completed: 5,
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-8 pb-20">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Goal Progress</h1>
            <p className="text-sm text-gray-600">Track your life objectives</p>
          </div>

          <GlassCard className="mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-2">Overall Progress</p>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                66%
              </div>
              <p className="text-sm text-gray-600">Across all goals</p>
            </div>
          </GlassCard>

          <div className="space-y-4">
            {goals.map((goal) => (
              <GlassCard key={goal.id}>
                <div className="flex items-start space-x-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${goal.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <goal.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{goal.title}</h3>
                    <p className="text-sm text-gray-600">{goal.target}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-800">{goal.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${goal.color} transition-all duration-500`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {goal.completed}/{goal.milestones} milestones
                  </span>
                  <button 
                    onClick={() => navigate('/analysis/growth')}
                    className="text-blue-600 font-medium hover:text-blue-700"
                  >
                    View Details →
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    </MobileLayout>
  );
}