import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Briefcase, DollarSign, GraduationCap } from 'lucide-react';

export default function DecisionCategoryScreen() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [
    { 
      id: 'career', 
      label: 'Career', 
      icon: Briefcase, 
      color: 'bg-blue-500',
      route: '/simulation/career'
    },
    { 
      id: 'finance', 
      label: 'Finance', 
      icon: DollarSign, 
      color: 'bg-green-500',
      route: '/simulation/finance'
    },
    { 
      id: 'education', 
      label: 'Education', 
      icon: GraduationCap, 
      color: 'bg-purple-600',
      route: '/simulation/education'
    },
  ];

  const handleContinue = () => {
    const selected = categories.find(c => c.id === selectedCategory);
    if (selected) {
      navigate(selected.route);
    }
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen flex flex-col px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Decision Category</h1>
          <p className="text-base text-gray-600">Which area of life does this affect?</p>
        </div>

        <div className="flex-1 space-y-4">
          {categories.map((category) => (
            <GlassCard
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`cursor-pointer transition-all ${
                selectedCategory === category.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50/50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-5 p-4">
                <div className={`w-20 h-20 ${category.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <category.icon className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
                <span className="text-2xl font-semibold text-gray-900">{category.label}</span>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-8">
          <Button
            onClick={handleContinue}
            className="w-full py-4 text-base font-semibold"
            disabled={!selectedCategory}
          >
            Continue
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}