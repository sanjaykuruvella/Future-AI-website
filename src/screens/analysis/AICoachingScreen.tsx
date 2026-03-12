import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Brain, Lightbulb, Target, TrendingUp } from 'lucide-react';

export default function AICoachingScreen() {
  const navigate = useNavigate();

  const coachingCards = [
    {
      icon: Target,
      title: 'Focus on Career Growth',
      description: 'Your current decisions show strong career momentum. Continue prioritizing opportunities that offer learning and advancement.',
      action: 'View Career Roadmap',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: TrendingUp,
      title: 'Improve Financial Planning',
      description: 'Consider building a larger emergency fund before taking startup risks. Aim for 6-9 months of expenses.',
      action: 'Create Financial Plan',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Lightbulb,
      title: 'Work-Life Balance Tips',
      description: 'Set clear boundaries early in new role to prevent burnout. Schedule personal time as non-negotiable.',
      action: 'See Balance Strategies',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Coaching</h1>
          <p className="text-gray-600">Personalized guidance for your journey</p>
        </div>

        <GlassCard className="mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-2">Today's Coaching Focus</h3>
          <p className="text-sm text-gray-700">
            Based on your recent decisions and goals, here are personalized recommendations to optimize your path forward.
          </p>
        </GlassCard>

        <div className="space-y-4 mb-6">
          {coachingCards.map((card, index) => (
            <GlassCard key={index}>
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              </div>
              <button className="w-full py-2 bg-white/70 rounded-lg text-sm font-medium text-gray-800 hover:bg-white transition-all">
                {card.action} →
              </button>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="bg-green-50/50 border-green-200">
          <h3 className="font-semibold text-gray-800 mb-3">This Week's Challenge</h3>
          <p className="text-sm text-gray-700 mb-4">
            Connect with 3 people in your target industry to validate your career decision and gather insights.
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-gradient-to-r from-green-500 to-green-600"></div>
              </div>
              <span className="text-sm text-gray-600">1/3</span>
            </div>
            <button className="text-sm font-medium text-green-600 hover:text-green-700">
              Track Progress
            </button>
          </div>
        </GlassCard>

        <div className="mt-6">
          <Button onClick={() => navigate('/ai-chat')} className="w-full">
            <Brain className="w-5 h-5 mr-2" />
            Chat with AI Coach
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
