import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordScreenWeb() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 p-10 shadow-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h2>
            <p className="text-gray-600 mb-2">
              We've sent a password reset link to:
            </p>
            <p className="font-semibold text-gray-900 mb-6">{email}</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Didn't receive the email?</span>
                <br />
                Check your spam folder or try again in a few minutes.
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div>
          <button
            onClick={() => navigate('/login')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Login</span>
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
            Reset Your Password
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            No worries! We'll send you reset instructions to your email address.
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Secure Process</p>
                <p className="text-sm text-gray-600">Your data is protected with encryption</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Quick Reset</p>
                <p className="text-sm text-gray-600">Get back to your account in minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email Confirmation</p>
                <p className="text-sm text-gray-600">Check your inbox for the link</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Form */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 p-10 shadow-2xl">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h3>
            <p className="text-gray-600">Enter your email to receive a reset link</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Enter the email associated with your account
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-[1.02] transition-all"
            >
              Send Reset Link
            </button>

            {/* Back to Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Back to login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}