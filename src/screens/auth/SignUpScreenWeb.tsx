import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, User, Mail, Lock, Eye, EyeOff, Check, ArrowLeft } from 'lucide-react';
import { registerUser } from '../../api/auth';
import { toast } from 'sonner';

export default function SignUpScreenWeb() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      toast.error('Full Name must contain only letters and spaces');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.\-\_])[A-Za-z\d@$!%*?&\.\-\_]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error('Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerUser(formData.name, formData.email, formData.password);
      if (response.status) {
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success(response.message || 'Registration Successful');
        navigate('/home');
      } else {
        toast.error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error occurred during registration. Please ensure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center space-x-3 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FutureVision AI
              </h1>
              <p className="text-sm text-gray-600">Consequence Simulator</p>
            </div>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Start Your Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Make better decisions with AI-powered insights and predictions for your future.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Unlimited AI Simulations</p>
                <p className="text-sm text-gray-600">Run scenarios for any life decision</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Personalized Insights</p>
                <p className="text-sm text-gray-600">AI learns your goals and preferences</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">24/7 AI Assistant</p>
                <p className="text-sm text-gray-600">Get guidance whenever you need it</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Detailed Analytics</p>
                <p className="text-sm text-gray-600">Track outcomes and optimize decisions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Privacy First</p>
                <p className="text-sm text-gray-600">Your data is encrypted and secure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 p-10 shadow-2xl">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h3>
            <p className="text-gray-600">Start making better decisions today</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border ${formData.name && !/^[a-zA-Z]+$/.test(formData.name) ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-900`}
                  placeholder="John Doe"
                  required
                  id="name"
                  name="name"
                />
              </div>
              {formData.name && !/^[a-zA-Z]+$/.test(formData.name) && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  Full Name must contain only letters (no spaces)
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border ${formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-blue-500'} rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-gray-900`}
                  placeholder="you@example.com"
                  required
                  id="email"
                  name="email"
                />
              </div>
              {formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  placeholder="Create a strong password"
                  required
                  id="password"
                  name="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="mt-3 space-y-2">
                <p className={`text-sm flex items-center gap-2 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-500'}`}>
                  <Check className={`w-4 h-4 ${formData.password.length >= 8 ? 'opacity-100' : 'opacity-50'}`} />
                  Minimum 8 characters
                </p>
                <p className={`text-sm flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-500'}`}>
                  <Check className={`w-4 h-4 ${/[A-Z]/.test(formData.password) ? 'opacity-100' : 'opacity-50'}`} />
                  At least 1 uppercase letter
                </p>
                <p className={`text-sm flex items-center gap-2 ${/\d/.test(formData.password) ? 'text-green-500' : 'text-gray-500'}`}>
                  <Check className={`w-4 h-4 ${/\d/.test(formData.password) ? 'opacity-100' : 'opacity-50'}`} />
                  At least 1 number
                </p>
                <p className={`text-sm flex items-center gap-2 ${/[@$!%*?&\.\-\_]/.test(formData.password) ? 'text-green-500' : 'text-gray-500'}`}>
                  <Check className={`w-4 h-4 ${/[@$!%*?&\.\-\_]/.test(formData.password) ? 'opacity-100' : 'opacity-50'}`} />
                  At least 1 special character
                </p>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Log in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}