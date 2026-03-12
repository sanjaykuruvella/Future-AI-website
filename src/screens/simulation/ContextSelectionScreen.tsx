import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Briefcase, DollarSign, Heart, GraduationCap, Home, Dumbbell } from 'lucide-react';

export default function ContextSelectionScreen() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: 'career', label: 'Career', icon: Briefcase, color: 'from-blue-500 to-blue-600' },
    { id: 'finance', label: 'Finance', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'from-purple-500 to-purple-600' },
    { id: 'relationship', label: 'Relationship', icon: Heart, color: 'from-pink-500 to-pink-600' },
    { id: 'lifestyle', label: 'Lifestyle', icon: Home, color: 'from-orange-500 to-orange-600' },
    { id: 'health', label: 'Health', icon: Dumbbell, color: 'from-red-500 to-red-600' },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen flex flex-col px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Decision Category</h1>
          <p className="text-gray-600">Which area of life does this affect?</p>
        </div>

        <div className="grid grid-cols-2 gap-3 flex-1">
          {categories.map((category) => (
            <GlassCard
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`cursor-pointer transition-all ${
                selectedCategory === category.id
                  ? 'ring-2 ring-blue-500 bg-white/90 scale-105'
                  : 'hover:bg-white/80'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3 py-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <p className="font-medium text-gray-800">{category.label}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-8">
          <Button
            onClick={() => navigate('/simulation/processing')}
            className="w-full"
            disabled={!selectedCategory}
          >
            Continue
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
