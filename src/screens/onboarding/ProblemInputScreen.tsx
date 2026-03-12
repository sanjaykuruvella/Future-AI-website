import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { AlertCircle } from 'lucide-react';

export default function ProblemInputScreen() {
  const navigate = useNavigate();
  const [problem, setProblem] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    { id: 'career', label: 'Career Issue', emoji: '💼' },
    { id: 'finance', label: 'Money Problem', emoji: '💰' },
    { id: 'relationship', label: 'Relationship', emoji: '❤️' },
    { id: 'health', label: 'Health Concern', emoji: '🏥' },
    { id: 'life', label: 'Life Decision', emoji: '🎯' },
    { id: 'other', label: 'Other', emoji: '💭' },
  ];

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="h-full flex flex-col px-6 py-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">What brings you here?</h1>
          <p className="text-sm text-gray-600">Tell us about your decision or problem</p>
        </div>

        <div className="flex-1 space-y-4">
          <GlassCard>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`py-3 rounded-xl text-xs font-medium transition-all ${
                    category === cat.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105'
                      : 'bg-white/70 text-gray-700 hover:bg-white'
                  }`}
                >
                  <div className="text-xl mb-1">{cat.emoji}</div>
                  {cat.label}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Describe your situation
            </label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              placeholder="Example: I'm considering changing careers but worried about the financial risk..."
            />
            <p className="text-xs text-gray-500 mt-2">
              {problem.length}/500 characters
            </p>
          </GlassCard>
        </div>

        <div className="mt-6">
          <Button
            onClick={handleContinue}
            className="w-full"
            disabled={!category || problem.trim().length < 20}
          >
            Continue Setup
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}