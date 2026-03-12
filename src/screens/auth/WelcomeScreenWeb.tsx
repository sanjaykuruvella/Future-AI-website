import { useNavigate } from 'react-router';
import { Sparkles, Brain, TrendingUp, Shield, ArrowRight } from 'lucide-react';

export default function WelcomeScreenWeb() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-6rem)]">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">AI-Powered Decision Making</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                See Your Future
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Before You Decide
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Make confident decisions with AI-powered consequence simulation. 
                Predict outcomes, avoid risks, and choose the path that leads to your best future.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-4">
              <FeatureItem 
                icon={<Brain className="w-6 h-6 text-blue-600" />}
                title="Advanced AI Analysis"
                description="Sophisticated algorithms analyze thousands of variables"
              />
              <FeatureItem 
                icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                title="Future Predictions"
                description="Visualize outcomes across career, finance, and life choices"
              />
              <FeatureItem 
                icon={<Shield className="w-6 h-6 text-purple-600" />}
                title="Privacy First"
                description="Your data is encrypted and never shared with third parties"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white/70 backdrop-blur-lg border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold text-lg hover:bg-white hover:shadow-lg transition-all"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-2xl">
                <div className="mb-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-full mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-green-700">Live Simulation</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Career Change Prediction</h3>
                  <p className="text-gray-600">Should I switch to Tech Industry?</p>
                </div>

                {/* Prediction Results */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Success Probability</span>
                    <span className="text-2xl font-bold text-green-600">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full" style={{ width: '78%' }}></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Income Increase</p>
                      <p className="text-xl font-bold text-blue-600">+45%</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">Timeline</p>
                      <p className="text-xl font-bold text-purple-600">6 months</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-200">
                  <div>
                    <p className="font-semibold text-gray-800">AI Recommendation</p>
                    <p className="text-sm text-gray-600">High success probability</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-gray-200">
          <StatItem number="50K+" label="Active Users" />
          <StatItem number="1M+" label="Simulations Run" />
          <StatItem number="85%" label="Accuracy Rate" />
          <StatItem number="24/7" label="AI Support" />
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-white/70 backdrop-blur-lg rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
        {number}
      </p>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  );
}