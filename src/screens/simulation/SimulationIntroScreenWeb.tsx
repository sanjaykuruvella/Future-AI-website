import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Sparkles, Brain, TrendingUp, Shield, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SimulationIntroScreenWeb() {
  const navigate = useNavigate();

  return (
    <WebLayout maxWidth="2xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600">AI-Powered Simulation Engine</span>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Predict Your Future with{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Precision
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our advanced simulation engine analyzes thousands of variables to predict the outcomes 
          of your life decisions with remarkable accuracy.
        </p>
      </div>

      {/* How It Works */}
      <WebCard className="mb-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">How Simulation Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <ProcessStep 
            number="1"
            icon={<span className="text-3xl">📋</span>}
            title="Choose Category"
            description="Select decision type"
          />
          <ProcessStep 
            number="2"
            icon={<span className="text-3xl">✍️</span>}
            title="Input Details"
            description="Describe your scenario"
          />
          <ProcessStep 
            number="3"
            icon={<span className="text-3xl">🎛️</span>}
            title="Set Variables"
            description="Adjust key factors"
          />
          <ProcessStep 
            number="4"
            icon={<span className="text-3xl">🤖</span>}
            title="AI Processing"
            description="Advanced analysis"
          />
          <ProcessStep 
            number="5"
            icon={<span className="text-3xl">📊</span>}
            title="View Results"
            description="Detailed predictions"
          />
        </div>
      </WebCard>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <FeatureCard
          icon={<Brain className="w-8 h-8 text-blue-600" />}
          title="Advanced AI Analysis"
          description="Machine learning models trained on millions of real-world outcomes"
          color="blue"
        />
        <FeatureCard
          icon={<TrendingUp className="w-8 h-8 text-green-600" />}
          title="Multi-Factor Predictions"
          description="Analyzes financial, emotional, social, and professional impacts"
          color="green"
        />
        <FeatureCard
          icon={<Shield className="w-8 h-8 text-purple-600" />}
          title="Risk Assessment"
          description="Identify potential risks and mitigation strategies"
          color="purple"
        />
        <FeatureCard
          icon={<Clock className="w-8 h-8 text-orange-600" />}
          title="Timeline Projections"
          description="See outcomes from 1 month to 10 years in the future"
          color="orange"
        />
        <FeatureCard
          icon={<span className="text-3xl">🎯</span>}
          title="Scenario Comparison"
          description="Compare multiple paths side-by-side"
          color="pink"
        />
        <FeatureCard
          icon={<span className="text-3xl">💡</span>}
          title="AI Recommendations"
          description="Get personalized suggestions to optimize outcomes"
          color="cyan"
        />
      </div>

      {/* What You'll Get */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <WebCard>
          <h3 className="text-xl font-bold text-gray-800 mb-6">What You'll Receive</h3>
          <div className="space-y-4">
            <BenefitItem text="Success probability percentage" />
            <BenefitItem text="Detailed financial impact (in ₹)" />
            <BenefitItem text="Timeline with key milestones" />
            <BenefitItem text="Risk vs. reward analysis" />
            <BenefitItem text="Alternative scenario suggestions" />
            <BenefitItem text="Personalized action plan" />
            <BenefitItem text="Long-term consequences map" />
            <BenefitItem text="AI-generated insights & coaching" />
          </div>
        </WebCard>

        <WebCard className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Example Simulation</h3>
          <div className="bg-white rounded-xl p-6 mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Career Change to Tech Industry</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Success Probability</span>
                <span className="font-bold text-green-600">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Income Change</span>
                <span className="font-bold text-blue-600">+45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Timeline</span>
                <span className="font-bold text-purple-600">6 months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Risk Level</span>
                <span className="font-bold text-orange-600">Medium</span>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-700">
              <strong>AI Recommendation:</strong> High probability of success. 
              Consider upskilling in Python and cloud technologies for optimal outcomes.
            </p>
          </div>
        </WebCard>
      </div>

      {/* CTA Section */}
      <WebCard className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to See Your Future?</h2>
        <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
          Start your simulation now and make decisions with confidence
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/simulation/category')}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-2"
          >
            <span>Start Full Simulation</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </WebCard>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-gray-200">
        <div className="text-center">
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            87%
          </p>
          <p className="text-gray-600">Average Accuracy</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            1M+
          </p>
          <p className="text-gray-600">Simulations Run</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            50K+
          </p>
          <p className="text-gray-600">Active Users</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            24/7
          </p>
          <p className="text-gray-600">AI Available</p>
        </div>
      </div>
    </WebLayout>
  );
}

function ProcessStep({ number, icon, title, description }: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl font-bold text-white">{number}</span>
      </div>
      <div className="mb-3">{icon}</div>
      <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  const bgColors: Record<string, string> = {
    blue: 'bg-blue-50/50',
    green: 'bg-green-50/50',
    purple: 'bg-purple-50/50',
    orange: 'bg-orange-50/50',
    pink: 'bg-pink-50/50',
    cyan: 'bg-cyan-50/50'
  };

  return (
    <WebCard className={bgColors[color]}>
      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
        {icon}
      </div>
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </WebCard>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center space-x-3">
      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
}
