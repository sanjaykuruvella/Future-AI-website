import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { HelpCircle, ChevronDown, ChevronUp, Book, MessageCircle, Mail } from 'lucide-react';

export default function HelpCenterScreen() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggleFAQ = (id: number) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const faqs = [
    {
      id: 1,
      question: 'How accurate are the AI predictions?',
      answer: 'Our AI predictions are based on extensive data analysis and machine learning models. Accuracy varies by decision type, but typically ranges from 75-95% based on validation studies.',
    },
    {
      id: 2,
      question: 'Can I trust the AI with important decisions?',
      answer: 'Our AI is designed to support your decision-making, not replace it. Use predictions as one input among many factors when making important life choices.',
    },
    {
      id: 3,
      question: 'How is my data used?',
      answer: 'Your data is used solely to generate personalized predictions. We never sell personal data and you can control all privacy settings in your profile.',
    },
    {
      id: 4,
      question: 'Can I delete my simulation history?',
      answer: 'Yes, you can delete individual simulations or all your data at any time from the Privacy Controls section.',
    },
    {
      id: 5,
      question: 'How do I improve prediction accuracy?',
      answer: 'Provide detailed context, keep your profile updated, and regularly use the app. The AI learns from your patterns to improve over time.',
    },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/profile')}>
      <div className="min-h-screen px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Help Center</h1>
          <p className="text-gray-600">Find answers and support</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <GlassCard onClick={() => navigate('/ai-chat')} className="cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-medium text-gray-800">Live Chat</p>
            </div>
          </GlassCard>

          <GlassCard className="cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Book className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-medium text-gray-800">Guides</p>
            </div>
          </GlassCard>

          <GlassCard onClick={() => navigate('/home')} className="cursor-pointer">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-medium text-gray-800">Contact</p>
            </div>
          </GlassCard>
        </div>

        {/* FAQs */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <GlassCard key={faq.id}>
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between text-left"
              >
                <p className="font-medium text-gray-800 pr-4">{faq.question}</p>
                {expanded.includes(faq.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>
              {expanded.includes(faq.id) && (
                <p className="mt-3 text-sm text-gray-600 border-t border-gray-200 pt-3">
                  {faq.answer}
                </p>
              )}
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mt-6 bg-blue-50/50">
          <p className="text-sm text-gray-700 text-center">
            Can't find what you're looking for?{' '}
            <button
              onClick={() => navigate('/home')}
              className="text-blue-600 font-medium"
            >
              Contact Support
            </button>
          </p>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}
