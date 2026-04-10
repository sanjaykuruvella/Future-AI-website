import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Optional typing validation
    if (value && !emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSignUp = () => {
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name)) {
      toast.error('Full Name must contain only letters (no spaces)');
      return;
    }

    // Required submission validation
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }

    navigate('/home');
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="h-full flex flex-col items-center justify-center px-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-sm text-gray-600">Start your future simulation journey</p>
        </div>

        <GlassCard className="w-full mb-6">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 bg-white/50 border ${name && !/^[a-zA-Z]+$/.test(name) ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} rounded-xl focus:outline-none focus:ring-2 text-sm`}
                  placeholder="John Doe"
                  id="name"
                  name="name"
                />
              </div>
              {name && !/^[a-zA-Z]+$/.test(name) && (
                <p className="text-red-500 text-xs mt-1">Full Name must contain only letters (no spaces)</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-white/50 border ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} rounded-xl focus:outline-none focus:ring-2 text-sm`}
                  placeholder="you@example.com"
                  id="email"
                  name="email"
                />
              </div>
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="••••••••"
                  id="password"
                  name="password"
                />
              </div>
            </div>

            <Button onClick={handleSignUp} className="w-full mt-4">
              Create Account
            </Button>
          </div>
        </GlassCard>

        <p className="text-xs text-gray-600">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-blue-600 font-medium">
            Sign in
          </button>
        </p>
      </div>
    </MobileLayout>
  );
}