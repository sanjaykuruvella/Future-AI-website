import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { MessageSquare, Star } from 'lucide-react';

export default function FeedbackScreen() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['Bug Report', 'Feature Request', 'General Feedback', 'Support'];

  const handleSubmit = () => {
    // Simulate submission
    alert('Thank you for your feedback!');
    navigate('/profile');
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate('/profile')}>
      <div className="min-h-screen flex flex-col px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Send Feedback</h1>
          <p className="text-gray-600">Help us improve Future Path</p>
        </div>

        <GlassCard className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How would you rate your experience?
          </label>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Feedback Category
          </label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/70 text-gray-700 hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="flex-1 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Your Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full h-40 px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Tell us what you think... Your input helps us improve!"
          />
        </GlassCard>

        <GlassCard className="mb-6 bg-blue-50/50">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Your privacy matters:</span> Feedback is anonymous unless you choose to include contact information.
          </p>
        </GlassCard>

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={!rating || !category || feedback.trim().length < 10}
        >
          Submit Feedback
        </Button>
      </div>
    </MobileLayout>
  );
}
