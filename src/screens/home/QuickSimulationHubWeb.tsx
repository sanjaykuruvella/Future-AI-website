import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Briefcase, TrendingUp, GraduationCap, Sparkles, Target } from 'lucide-react';

export default function QuickSimulationHubWeb() {
  const navigate = useNavigate();

  return (
    <WebLayout maxWidth="2xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">⚡ Quick Simulation Hub</h1>
            <p className="text-gray-600">Get AI predictions in under 2 minutes - no complex forms!</p>
          </div>
        </div>
        <div className="mt-4 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm text-green-900">
            <span className="font-semibold">✨ Perfect for:</span> When you need fast answers without filling out lengthy forms. Just pick a category, answer a few questions, and get instant predictions!
          </p>
        </div>
      </div>

      {/* Description */}
      <WebCard className="mb-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">🚀 How It Works - Super Simple!</h2>
            <p className="text-gray-600 leading-relaxed">
              Pick one of the three categories below to start. Answer 3-5 quick questions about your decision, 
              and our AI will instantly show you the likely outcomes, risks, rewards, and smart recommendations. 
              All simulations are tailored to Indian context with amounts in ₹.
            </p>
            <p className="text-sm text-blue-700 mt-3 font-medium">
              💡 Tip: You can run multiple simulations to compare different choices!
            </p>
          </div>
        </div>
      </WebCard>

      {/* Simulation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Career Simulation */}
        <WebCard 
          onClick={() => navigate('/simulation/career')}
          hover
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-200 group"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">💼 Career Decisions</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Should you switch jobs? Ask for a raise? Start a business? Get clear predictions about salary growth, success rates, and career impact.
            </p>
            <div className="text-xs text-gray-500 mb-4">
              ⏱️ Takes 2-3 minutes • 📊 Includes salary projections
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
              <span>Start Now →</span>
            </div>
          </div>
        </WebCard>

        {/* Finance Simulation */}
        <WebCard 
          onClick={() => navigate('/simulation/finance')}
          hover
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200 group"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">💰 Finance & Investments</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Invest in stocks or mutual funds? Buy property? Take a loan? See potential returns, risks, and smart money moves - all in Indian ₹.
            </p>
            <div className="text-xs text-gray-500 mb-4">
              ⏱️ Takes 2-3 minutes • 💵 Shows ROI & break-even
            </div>
            <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
              <span>Start Now →</span>
            </div>
          </div>
        </WebCard>

        {/* Education Simulation */}
        <WebCard 
          onClick={() => navigate('/simulation/education')}
          hover
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200 group"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">🎓 Education & Learning</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Pursue an MBA? Learn to code? Take a certification? Discover the return on investment, career boost, and long-term value of your education.
            </p>
            <div className="text-xs text-gray-500 mb-4">
              ⏱️ Takes 2-3 minutes • 📈 Shows career impact
            </div>
            <div className="flex items-center justify-center space-x-2 text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
              <span>Start Now →</span>
            </div>
          </div>
        </WebCard>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <WebCard className="text-center bg-blue-50/50">
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            87%
          </p>
          <p className="text-gray-600 font-medium">AI Prediction Accuracy</p>
          <p className="text-xs text-gray-500 mt-1">Based on real outcomes</p>
        </WebCard>
        <WebCard className="text-center bg-green-50/50">
          <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            &lt;2 min
          </p>
          <p className="text-gray-600 font-medium">Completion Time</p>
          <p className="text-xs text-gray-500 mt-1">Super fast results</p>
        </WebCard>
        <WebCard className="text-center bg-purple-50/50">
          <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            50K+
          </p>
          <p className="text-gray-600 font-medium">Simulations Done</p>
          <p className="text-xs text-gray-500 mt-1">Users trust us daily</p>
        </WebCard>
      </div>

      {/* How It Works */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📋 How Quick Simulation Works</h2>
        <p className="text-gray-600 mb-6">Follow these 4 simple steps to get your predictions</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StepCard 
            number="1"
            title="Pick a Category"
            description="Click Career, Finance, or Education above"
          />
          <StepCard 
            number="2"
            title="Answer Questions"
            description="Fill in just 3-5 quick questions"
          />
          <StepCard 
            number="3"
            title="AI Does Magic"
            description="We analyze 1000s of scenarios instantly"
          />
          <StepCard 
            number="4"
            title="See Your Future"
            description="Get predictions, risks & recommendations"
          />
        </div>
      </div>

      {/* CTA */}
      <WebCard className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none">
        <div className="text-center py-4">
          <h3 className="text-2xl font-bold mb-2">🔬 Want Even More Detailed Analysis?</h3>
          <p className="mb-6 text-blue-50">
            Try our Full Simulation Engine for comprehensive, multi-factor predictions with timeline projections and comparison tools
          </p>
          <button 
            onClick={() => navigate('/simulation-intro')}
            className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
          >
            Go to Full Simulation (takes 5-10 min)
          </button>
        </div>
      </WebCard>
    </WebLayout>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl font-bold text-white">{number}</span>
      </div>
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}