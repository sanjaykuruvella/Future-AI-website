import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { MessageSquare, ThumbsUp, ThumbsDown, Star, CheckCircle } from 'lucide-react';

export default function SendFeedbackScreenWeb() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'improvement' | 'praise' | ''>('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <WebLayout maxWidth="xl">
        <div className="max-w-2xl mx-auto">
          <WebCard className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your feedback has been submitted successfully. We appreciate you taking the time to help us improve FutureVision AI.
            </p>
            <button
              onClick={() => navigate('/settings')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
            >
              Back to Settings
            </button>
          </WebCard>
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout maxWidth="xl">
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings')}
          className="text-blue-600 hover:text-blue-700 mb-4 font-medium"
        >
          ← Back to Settings
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Send Feedback</h1>
        <p className="text-gray-600">Share your thoughts and help us improve</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Overall Experience */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">How's Your Experience?</h3>
              <p className="text-sm text-gray-600">Rate your overall satisfaction</p>
            </div>
          </div>
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-12 h-12 ${
                    star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-gray-600">
              {rating === 5 && "⭐ Excellent! We're thrilled you love it!"}
              {rating === 4 && "😊 Great! Thanks for the positive feedback!"}
              {rating === 3 && "👍 Good! We'll keep improving!"}
              {rating === 2 && "😕 We can do better. Tell us how!"}
              {rating === 1 && "😞 We're sorry. Help us improve!"}
            </p>
          )}
        </WebCard>

        {/* Feedback Type */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">What's This About?</h3>
              <p className="text-sm text-gray-600">Select the type of feedback</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FeedbackTypeCard
              icon="🐛"
              title="Report a Bug"
              description="Something's not working"
              selected={feedbackType === 'bug'}
              onClick={() => setFeedbackType('bug')}
            />
            <FeedbackTypeCard
              icon="💡"
              title="Feature Request"
              description="Suggest a new feature"
              selected={feedbackType === 'feature'}
              onClick={() => setFeedbackType('feature')}
            />
            <FeedbackTypeCard
              icon="🔧"
              title="Improvement"
              description="Make something better"
              selected={feedbackType === 'improvement'}
              onClick={() => setFeedbackType('improvement')}
            />
            <FeedbackTypeCard
              icon="❤️"
              title="Praise"
              description="Share what you love"
              selected={feedbackType === 'praise'}
              onClick={() => setFeedbackType('praise')}
            />
          </div>
        </WebCard>

        {/* Feedback Form */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">✍️</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Tell Us More</h3>
              <p className="text-sm text-gray-600">Share your detailed feedback</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Brief summary of your feedback"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Details
              </label>
              <textarea
                rows={6}
                placeholder="Please provide as much detail as possible. For bugs, include steps to reproduce. For features, describe the use case."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Which area does this relate to?
              </label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                <option>AI Simulations</option>
                <option>Dashboard & Analytics</option>
                <option>User Interface</option>
                <option>Account & Settings</option>
                <option>Performance</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex items-start space-x-2 pt-2">
              <input
                type="checkbox"
                id="followup"
                className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="followup" className="text-sm text-gray-700">
                I'd like to be contacted about this feedback
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold text-lg"
            >
              Submit Feedback
            </button>
          </form>
        </WebCard>

        {/* Quick Reactions */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Quick Reaction</h3>
              <p className="text-sm text-gray-600">Or just tell us how you feel right now</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-50 border-2 border-green-200 rounded-xl hover:bg-green-100 transition-colors">
              <ThumbsUp className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-700">Love it!</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 border-2 border-red-200 rounded-xl hover:bg-red-100 transition-colors">
              <ThumbsDown className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-700">Needs work</span>
            </button>
          </div>
        </WebCard>

        {/* Additional Info */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-800 mb-2">Your Voice Matters</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Every piece of feedback helps us build a better product. We read every submission and use your insights to prioritize improvements and new features. Thank you for being part of our journey!
          </p>
        </div>
      </div>
    </WebLayout>
  );
}

function FeedbackTypeCard({ 
  icon, 
  title, 
  description, 
  selected, 
  onClick 
}: { 
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all text-left ${
        selected 
          ? 'border-blue-600 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <p className={`font-semibold mb-1 ${selected ? 'text-blue-600' : 'text-gray-800'}`}>
        {title}
      </p>
      <p className="text-xs text-gray-600">{description}</p>
    </button>
  );
}
