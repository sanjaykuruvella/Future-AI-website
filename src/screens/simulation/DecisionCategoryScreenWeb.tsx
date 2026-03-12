import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Sparkles, Briefcase, TrendingUp, GraduationCap, ArrowRight } from 'lucide-react';

export default function DecisionCategoryScreenWeb() {
  const navigate = useNavigate();

  return (
    <WebLayout maxWidth="2xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-semibold text-purple-600">Step 1 of 5 - Choose Category</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          What Decision Do You Want to Simulate?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
          Choose the category that best matches your decision. Our AI will provide specialized analysis for each area.
        </p>
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-sm text-blue-900">
            💡 <span className="font-semibold">How it works:</span> Select a category → Enter your decision → Get AI predictions in 2 minutes
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <CategoryCard
          icon={<Briefcase className="w-12 h-12 text-white" />}
          title="Career & Professional"
          description="Predict outcomes for job changes, promotions, career pivots, starting a business, and skill development decisions"
          gradient="from-blue-500 to-cyan-600"
          bgGradient="from-blue-500/10 to-cyan-500/10"
          borderColor="border-blue-200"
          onClick={() => navigate('/simulation/career')}
          examples={["Change jobs", "Ask for promotion", "Start business", "Career switch"]}
          timeEstimate="5-7 min"
        />

        <CategoryCard
          icon={<TrendingUp className="w-12 h-12 text-white" />}
          title="Finance & Money"
          description="See potential outcomes for investments, savings plans, loans, property purchases, and financial planning decisions"
          gradient="from-green-500 to-emerald-600"
          bgGradient="from-green-500/10 to-emerald-500/10"
          borderColor="border-green-200"
          onClick={() => navigate('/simulation/finance')}
          examples={["Invest in stocks", "Buy property", "Take loan", "Start SIP"]}
          timeEstimate="6-8 min"
        />

        <CategoryCard
          icon={<GraduationCap className="w-12 h-12 text-white" />}
          title="Education & Skills"
          description="Explore outcomes for degrees, certifications, online courses, skill development programs, and educational investments"
          gradient="from-purple-500 to-pink-600"
          bgGradient="from-purple-500/10 to-pink-500/10"
          borderColor="border-purple-200"
          onClick={() => navigate('/simulation/education')}
          examples={["Pursue MBA", "Learn coding", "Take course", "Study abroad"]}
          timeEstimate="5-7 min"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-gray-200">
        <StatCard number="1M+" label="Simulations Completed" sublabel="Users trust us" />
        <StatCard number="87%" label="Accuracy Rate" sublabel="AI precision" />
        <StatCard number="3" label="Decision Categories" sublabel="Career, Finance, Education" />
        <StatCard number="2 min" label="Average Time" sublabel="Quick & easy" />
      </div>
    </WebLayout>
  );
}

function CategoryCard({ icon, title, description, gradient, bgGradient, borderColor, onClick, examples, timeEstimate }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  bgGradient: string;
  borderColor: string;
  onClick: () => void;
  examples: string[];
  timeEstimate: string;
}) {
  return (
    <WebCard 
      onClick={onClick} 
      hover 
      className={`bg-gradient-to-br ${bgGradient} ${borderColor} group`}
    >
      <div className="flex flex-col h-full">
        <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{description}</p>
        
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Popular Examples:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-white/70 rounded-lg text-gray-700">
                {example}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-4 text-xs text-gray-500">
          ⏱️ Estimated time: {timeEstimate}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
          <span className="font-semibold text-gray-700">Start Simulation →</span>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </WebCard>
  );
}

function StatCard({ number, label, sublabel }: { number: string; label: string; sublabel: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
        {number}
      </p>
      <p className="text-sm text-gray-800 font-medium">{label}</p>
      <p className="text-xs text-gray-500 mt-1">{sublabel}</p>
    </div>
  );
}
