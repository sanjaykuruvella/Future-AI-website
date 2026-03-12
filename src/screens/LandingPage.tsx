import { useNavigate } from 'react-router';
import { 
  Sparkles, Brain, TrendingUp, Target, MessageCircle, 
  BarChart3, Shield, Zap, ArrowRight, CheckCircle2,
  Star, LineChart, Briefcase, DollarSign, GraduationCap
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning algorithms analyze your decisions and predict multiple outcome scenarios with high accuracy.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Life Path Visualization',
      description: 'Interactive timelines and visual graphs show how your decisions shape your future across career, finance, and personal growth.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MessageCircle,
      title: 'AI Chat Assistant',
      description: '24/7 intelligent assistant ready to guide you through complex decisions with personalized insights and recommendations.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive metrics and trend analysis to track your decision-making patterns and success rate over time.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Target,
      title: 'Goal Alignment',
      description: 'Ensure every decision aligns with your long-term goals through intelligent scoring and compatibility analysis.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Identify potential risks and opportunities before making critical life decisions with detailed risk matrices.',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '500K+', label: 'Simulations Run' },
    { value: '94%', label: 'Accuracy Rate' },
    { value: '4.9/5', label: 'User Rating' }
  ];

  const useCases = [
    {
      icon: Briefcase,
      title: 'Career Decisions',
      description: 'Should I accept this job offer? Change careers? Pursue higher education?',
      examples: ['Job Changes', 'Promotions', 'Skill Development', 'Entrepreneurship']
    },
    {
      icon: DollarSign,
      title: 'Financial Choices',
      description: 'Investment decisions, major purchases, budgeting strategies, and more.',
      examples: ['Investments', 'Real Estate', 'Savings Plans', 'Business Ventures']
    },
    {
      icon: GraduationCap,
      title: 'Education Path',
      description: 'Which course to take? Online vs traditional? Study abroad?',
      examples: ['Degree Programs', 'Certifications', 'Online Courses', 'Study Plans']
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      text: 'FutureVision AI helped me make the best career decision of my life. The AI predictions were incredibly accurate!',
      rating: 5
    },
    {
      name: 'Rahul Verma',
      role: 'Entrepreneur',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      text: 'The financial simulation feature saved me from making a costly investment mistake. Worth every penny!',
      rating: 5
    },
    {
      name: 'Ananya Patel',
      role: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      text: 'I use this daily for both personal and professional decisions. The AI chat assistant is like having a life coach.',
      rating: 5
    }
  ];


  const steps = [
    { icon: Target, title: 'Describe Your Decision', desc: 'Tell us what choice you\'re facing' },
    { icon: Brain, title: 'AI Analyzes Options', desc: 'Our AI processes your situation' },
    { icon: LineChart, title: 'View Predictions', desc: 'See multiple outcome scenarios' },
    { icon: CheckCircle2, title: 'Make Informed Choice', desc: 'Decide with confidence' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FutureVision AI
                </h1>
                <p className="text-xs text-gray-600">Decision Intelligence</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-gray-900 transition-colors">Testimonials</a>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/login')}
                className="text-gray-700 hover:text-gray-900 transition-colors px-4 py-2"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-8">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700 font-medium">Powered by Advanced AI</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Predict Your Future
              </span>
              <br />
              <span className="text-gray-900">Before You Decide</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              AI-powered consequence simulator that helps you visualize outcomes, assess risks, and make better life decisions across career, finance, and personal growth.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button 
                onClick={() => navigate('/signup')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all font-semibold text-lg flex items-center space-x-2"
              >
                <span>Start Free Simulation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-white border border-gray-300 text-gray-900 rounded-2xl hover:bg-gray-50 transition-all font-semibold text-lg shadow-sm"
              >
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-8 max-w-3xl mx-auto pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl rounded-full"></div>
            <div className="relative bg-white rounded-3xl border border-gray-200 p-8 shadow-2xl">
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                  <Brain className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-gray-900 font-semibold mb-2">AI Analysis</h3>
                  <p className="text-sm text-gray-600">Deep learning models analyze your decision context</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                  <LineChart className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="text-gray-900 font-semibold mb-2">Outcome Prediction</h3>
                  <p className="text-sm text-gray-600">Visualize multiple scenarios and probabilities</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <Target className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-gray-900 font-semibold mb-2">Smart Recommendations</h3>
                  <p className="text-sm text-gray-600">Get personalized action plans and insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to make confident decisions</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:scale-105 transition-all"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple process, powerful results</p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < 3 && (
                  <div className="absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 hidden lg:block"></div>
                )}
                <div className="relative bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-lg hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-bold text-blue-600 mb-2">STEP {index + 1}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Perfect For Every Decision</h2>
            <p className="text-xl text-gray-600">From career moves to financial planning</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all"
              >
                <useCase.icon className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-6">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Loved by Decision Makers</h2>
            <p className="text-xl text-gray-600">See what our users have to say</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Make Better Decisions?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of users making smarter life choices with AI
              </p>
              <button 
                onClick={() => navigate('/signup')}
                className="group px-8 py-4 bg-white text-blue-600 rounded-2xl hover:shadow-2xl transition-all font-semibold text-lg flex items-center space-x-2 mx-auto"
              >
                <span>Start Your Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-sm text-blue-100 mt-4">No credit card required • 5 free simulations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B0F1A] text-gray-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">FutureVision AI</h2>
            </div>
            <p className="text-gray-400 text-xl font-medium">Making better decisions with AI-powered insights.</p>
          </div>
          
          <div className="w-full h-px bg-white/5 mb-8" />
          
          <div className="flex items-center justify-between">
            <div /> {/* Spacer for left side */}
            <p className="text-sm font-medium text-gray-400">© 2026 FutureVision AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
