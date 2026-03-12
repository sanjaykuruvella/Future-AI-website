import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { ArrowRight } from 'lucide-react';

export default function CompareFuturesScreen() {
  const navigate = useNavigate();

  const comparison = [
    { category: 'Success Rate', optionA: '87%', optionB: '65%', winner: 'a' },
    { category: 'Financial Growth', optionA: '+₹28L', optionB: '+₹8L', winner: 'a' },
    { category: 'Career Growth', optionA: 'High', optionB: 'Low', winner: 'a' },
    { category: 'Job Security', optionA: 'Medium', optionB: 'High', winner: 'b' },
    { category: 'Learning Opportunity', optionA: 'Very High', optionB: 'Low', winner: 'a' },
    { category: 'Work-Life Balance', optionA: 'Medium', optionB: 'High', winner: 'b' },
    { category: 'Stress Level', optionA: 'Medium-High', optionB: 'Low', winner: 'b' },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Compare Futures</h1>
          <p className="text-gray-600">Side-by-side decision analysis</p>
        </div>

        {/* Header Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <GlassCard className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-1">Option A</p>
              <p className="font-semibold text-gray-800">Startup Job</p>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
                87
              </div>
            </div>
          </GlassCard>

          <GlassCard className="bg-gradient-to-br from-gray-300/20 to-gray-400/20 border-gray-300">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-1">Option B</p>
              <p className="font-semibold text-gray-800">Stay Current</p>
              <div className="text-3xl font-bold text-gray-600 mt-2">
                65
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Comparison Table */}
        <div className="space-y-2">
          {comparison.map((item, index) => (
            <GlassCard key={index} className="py-3">
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                <div className={`text-right ${item.winner === 'a' ? 'font-semibold text-blue-600' : 'text-gray-600'}`}>
                  {item.optionA}
                </div>
                
                <div className="flex flex-col items-center">
                  <ArrowRight className={`w-4 h-4 ${item.winner === 'a' ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
                  <p className="text-xs text-gray-600 mt-1 whitespace-nowrap">{item.category}</p>
                </div>
                
                <div className={`text-left ${item.winner === 'b' ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                  {item.optionB}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-6 bg-blue-50/50">
          <h3 className="font-semibold text-gray-800 mb-2">Verdict</h3>
          <p className="text-sm text-gray-700">
            <span className="font-medium text-blue-600">Option A (Startup)</span> wins in 5 out of 7 categories. While Option B offers better stability, Option A provides significantly more growth potential aligned with your goals.
          </p>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}