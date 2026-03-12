import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Briefcase, DollarSign, Heart, GraduationCap, Dumbbell, Home } from 'lucide-react';

export default function GoalsSetupScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const goals = [
    { id: 'career', label: 'Career', icon: Briefcase, color: 'from-blue-500 to-blue-600' },
    { id: 'finance', label: 'Finance', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { id: 'relationship', label: 'Love', icon: Heart, color: 'from-pink-500 to-pink-600' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'from-purple-500 to-purple-600' },
    { id: 'health', label: 'Health', icon: Dumbbell, color: 'from-orange-500 to-orange-600' },
    { id: 'lifestyle', label: 'Lifestyle', icon: Home, color: 'from-indigo-500 to-indigo-600' },
  ];

  const toggleGoal = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="h-full flex flex-col px-6 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Life Goals</h1>
          <p className="text-sm text-gray-600">What areas do you want to focus on?</p>
        </div>

        <div className="grid grid-cols-2 gap-3 flex-1">
          {goals.map((goal) => (
            <GlassCard
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`cursor-pointer transition-all ${
                selected.includes(goal.id)
                  ? 'ring-2 ring-blue-500 bg-white/90'
                  : 'hover:bg-white/80'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-2 py-2">
                <div className={`w-10 h-10 bg-gradient-to-br ${goal.color} rounded-xl flex items-center justify-center`}>
                  <goal.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-medium text-gray-800">{goal.label}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-6">
          <Button
            onClick={() => navigate('/home')}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}