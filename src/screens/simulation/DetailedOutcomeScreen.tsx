import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function DetailedOutcomeScreen() {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>(['positive']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const outcomes = [
    {
      id: 'positive',
      title: 'Positive Outcomes (72%)',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50/50 border-green-200',
      items: [
        'Significant career growth and leadership opportunities',
        'Increased earning potential within 12-18 months',
        'Enhanced skill development in emerging technologies',
        'Stronger professional network in tech industry',
      ],
    },
    {
      id: 'challenges',
      title: 'Potential Challenges (18%)',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50/50 border-yellow-200',
      items: [
        'Initial learning curve may be steep',
        'Temporary reduction in work-life balance',
        'Need to adapt to startup culture quickly',
        'Financial uncertainty in first 6 months',
      ],
    },
    {
      id: 'risks',
      title: 'Risks to Consider (10%)',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50/50 border-red-200',
      items: [
        'Startup may not secure next funding round',
        'Industry competition could intensify',
        'Potential relocation requirements',
      ],
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Detailed Outcomes</h1>
          <p className="text-gray-600">Comprehensive prediction analysis</p>
        </div>

        <div className="space-y-3">
          {outcomes.map((outcome) => (
            <GlassCard key={outcome.id} className={outcome.bgColor}>
              <button
                onClick={() => toggleSection(outcome.id)}
                className="w-full flex items-center justify-between"
              >
                <h3 className="font-semibold text-gray-800">{outcome.title}</h3>
                {expandedSections.includes(outcome.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              
              {expandedSections.includes(outcome.id) && (
                <div className="mt-4 space-y-2">
                  {outcome.items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-gray-400 mt-1">•</span>
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-6 bg-blue-50/50">
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">AI Recommendation</h3>
            <p className="text-sm text-gray-700">
              Based on your personality profile and goals, this decision aligns well with your long-term objectives. The predicted success rate is above average, and potential challenges are manageable with proper planning.
            </p>
            <div className="pt-3 border-t border-gray-200">
              <button
                onClick={() => navigate('/analytics')}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View Actionable Recommendations →
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
