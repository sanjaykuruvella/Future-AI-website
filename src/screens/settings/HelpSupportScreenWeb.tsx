import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { HelpCircle, Book, MessageCircle, Mail, FileText, Video, ChevronRight } from 'lucide-react';

export default function HelpSupportScreenWeb() {
  const navigate = useNavigate();

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
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                placeholder="What do you need help with?"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Describe your issue or question in detail..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900">
                <option>Technical Issue</option>
                <option>Account Question</option>
                <option>Feature Request</option>
                <option>Billing Question</option>
                <option>Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
            >
              Send Message
            </button>
          </form>
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
