import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Briefcase, DollarSign, GraduationCap } from 'lucide-react';

export default function QuickSimulationHub() {
  const navigate = useNavigate();

  const categories = [
    { id: 'career', label: 'Career Decision', icon: Briefcase, color: 'from-blue-500 to-blue-600', description: 'Job offers, promotions, career changes', route: '/simulation/category' },
    { id: 'finance', label: 'Financial Choice', icon: DollarSign, color: 'from-green-500 to-green-600', description: 'Investments, purchases, savings', route: '/simulation/category' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'from-purple-500 to-purple-600', description: 'Courses, degrees, certifications', route: '/simulation/category' },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🎯</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quick Simulation</h1>
          <p className="text-gray-600">Choose a category for your decision</p>
        </div>

        <div className="space-y-3">
          {categories.map((category) => (
            <GlassCard
              key={category.id}
              onClick={() => navigate(category.route)}
              className="cursor-pointer hover:scale-102 transition-transform"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{category.label}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}