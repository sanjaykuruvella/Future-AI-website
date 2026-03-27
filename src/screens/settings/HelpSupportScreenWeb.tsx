import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { HelpCircle, Book, MessageCircle, Mail, FileText, Video, ChevronRight, Loader2, CheckCircle2 } from 'lucide-react';
import { submitSupport } from '../../api/prediction';
import { useState } from 'react';

export default function HelpSupportScreenWeb() {
  const navigate = useNavigate();

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('Technical Issue');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : { user_id: 1 };

    try {
      const response = await submitSupport(user.user_id, subject, message, category);
      if (response.status) {
        setIsSubmitted(true);
        setSubject('');
        setMessage('');
      } else {
        setError(response.error || 'Failed to submit support request');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const faqs = [
    {
      question: "How does the AI prediction system work?",
      answer: "Our AI analyzes your decision parameters, historical data, and similar scenarios to generate predictions about potential outcomes. It uses advanced machine learning models trained on diverse decision patterns."
    },
    {
      question: "How accurate are the predictions?",
      answer: "While our AI provides data-driven insights, predictions are estimates based on available information. Accuracy varies by category and individual circumstances. We recommend using predictions as guidance rather than guarantees."
    },
    {
      question: "Is my data private and secure?",
      answer: "Yes, we use end-to-end encryption for all personal data. Your decisions and simulations are stored securely and never shared with third parties. You can delete your data anytime from Privacy Settings."
    },
    {
      question: "Can I export my simulation results?",
      answer: "Yes! You can download your simulation history, analytics reports, and prediction summaries as PDF or CSV files from the Analytics Dashboard."
    },
    {
      question: "How many simulations can I run?",
      answer: "There are no limits on the number of simulations you can run. Feel free to explore as many scenarios as you need to make informed decisions."
    },
  ];

  return (
    <WebLayout maxWidth="xl">
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings')}
          className="text-blue-600 hover:text-blue-700 mb-4 font-medium"
        >
          ← Back to Settings
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Help & Support</h1>
        <p className="text-gray-600">Get answers and reach out to our support team</p>
      </div>



      <div className="max-w-4xl mx-auto space-y-6">
        {/* FAQs */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Frequently Asked Questions</h3>
              <p className="text-sm text-gray-600">Quick answers to common questions</p>
            </div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </WebCard>

        {/* Contact Support */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Contact Support</h3>
              <p className="text-sm text-gray-600">Can't find what you're looking for? Send us a message</p>
            </div>
          </div>
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What do you need help with?"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question in detail..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option>Technical Issue</option>
                  <option>Account Question</option>
                  <option>Feature Request</option>
                  <option>Billing Question</option>
                  <option>Other</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold flex items-center justify-center space-x-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          )}
        </WebCard>



        {/* Contact Info */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-gray-800 mb-2">Still Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our support team is available 24/7 to assist you
          </p>
          <div className="flex justify-center space-x-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="font-semibold text-blue-600">support@futurevision.ai</p>
            </div>
            <div className="border-l border-gray-300"></div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Response Time</p>
              <p className="font-semibold text-gray-800">Within 2 hours</p>
            </div>
          </div>
        </div>
      </div>
    </WebLayout>
  );
}
