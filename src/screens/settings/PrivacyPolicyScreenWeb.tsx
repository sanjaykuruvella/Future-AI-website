import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Shield } from 'lucide-react';

export default function PrivacyPolicyScreenWeb() {
  const navigate = useNavigate();

  return (
    <WebLayout maxWidth="xl">
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings')}
          className="text-blue-600 hover:text-blue-700 mb-4 font-medium"
        >
          ← Back to Settings
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy & Policy</h1>
        <p className="text-gray-600">Your privacy and data security are important to us.</p>
      </div>

      <div className="max-w-[1200px] space-y-6">
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Privacy Policy Information</h3>
              <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
            <h4 className="font-semibold text-gray-900 border-b pb-2">1. Data Collection</h4>
            <p>We collect personal information such as your name, email address, and demographic data to provide you with tailored simulations. We may also collect usage data directly related to how you interact with our tools.</p>
            
            <h4 className="font-semibold text-gray-900 border-b pb-2 pt-4">2. Use of Information</h4>
            <p>Your information is primarily used to train personalized AI insights and prediction models. We do not sell your data to any third-party marketing services.</p>
            
            <h4 className="font-semibold text-gray-900 border-b pb-2 pt-4">3. Data Security</h4>
            <p>We implement industry-standard encryption protocols to safeguard your personal data. You may request account deletion at any time to permanently wipe your records from our systems.</p>
            
            <h4 className="font-semibold text-gray-900 border-b pb-2 pt-4">4. Cookie Policy</h4>
            <p>We use essential cookies to maintain user sessions and preferences. Using our application implies your continuous consent to this policy.</p>
          </div>
        </WebCard>
      </div>
    </WebLayout>
  );
}
