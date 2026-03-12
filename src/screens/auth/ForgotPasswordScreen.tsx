import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Mail } from 'lucide-react';

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    navigate('/login');
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="h-full flex flex-col items-center justify-center px-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
          <p className="text-sm text-gray-600">Enter your email to reset your password</p>
        </div>

        <GlassCard className="w-full mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full" disabled={!email.includes('@')}>
              Send Reset Link
            </Button>
          </div>
        </GlassCard>

        <GlassCard className="w-full bg-blue-50/50">
          <p className="text-xs text-gray-700 text-center">
            We'll send you an email with instructions to reset your password
          </p>
        </GlassCard>
      </div>
    </MobileLayout>
  );
}