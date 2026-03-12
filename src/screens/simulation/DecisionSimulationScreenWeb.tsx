import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { 
  Sparkles, Brain, BarChart3, Target, DollarSign,
  Briefcase, GraduationCap, AlertTriangle,
  ArrowRight, CheckCircle2
} from 'lucide-react';

export default function DecisionSimulationScreenWeb() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [decisionInput, setDecisionInput] = useState('');
  const [currentSituation, setCurrentSituation] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [timeline, setTimeline] = useState('6months');

  const categories = [
    { id: 'career', icon: Briefcase, label: 'Career', color: 'from-blue-500 to-cyan-500', description: 'Job changes, promotions, career pivots' },
    { id: 'finance', icon: DollarSign, label: 'Finance', color: 'from-green-500 to-emerald-500', description: 'Investments, purchases, savings' },
    { id: 'education', icon: GraduationCap, label: 'Education', color: 'from-purple-500 to-pink-500', description: 'Courses, degrees, certifications' }
  ];

  const handleSimulate = () => {
    if (decisionInput && selectedCategory) {
      localStorage.setItem('pending_simulation', JSON.stringify({
        category: selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1),
        input: decisionInput,
        features: {
            Age: 30, // Default values for free-text simulation
            Workclass: 'Private',
            Education: 'Bachelors',
            Education_Number: 13,
            Marital_Status: 'Never-married',
            Occupation: 'Prof-specialty',
            Relationship: 'Not-in-family',
            Race: 'White',
            Gender: 'Male',
            Capital_Gain: 0,
            Capital_Loss: 0,
            Hours_Per_Week: 40,
            Country: 'United-States'
        }
      }));
      navigate('/simulation/processing');
    }
  };

  return (
    <WebLayout maxWidth="full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Decision Simulation Engine</h1>
        <p className="text-gray-600">Powered by AI • Predict outcomes before you decide</p>
      </div>

      {/* Category Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Select Decision Category</h2>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <WebCard
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              hover
              className={`cursor-pointer transition-all ${
                selectedCategory === category.id
                  ? 'ring-2 ring-blue-500 bg-blue-50/50'
                  : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{category.label}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
                {selectedCategory === category.id && (
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                )}
              </div>
            </WebCard>
          ))}
        </div>
      </div>

      {/* Decision Input Form */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 space-y-6">
          <WebCard>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Describe Your Decision</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What decision are you considering?
                </label>
                <textarea
                  value={decisionInput}
                  onChange={(e) => setDecisionInput(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="Example: I'm considering transitioning from software engineering to product management. I have 5 years of experience as a backend developer and want to move into a more strategic role..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Situation
                </label>
                <textarea
                  value={currentSituation}
                  onChange={(e) => setCurrentSituation(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="Current role, salary, location, responsibilities..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired Outcome
                </label>
                <textarea
                  value={desiredOutcome}
                  onChange={(e) => setDesiredOutcome(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="What success looks like, target salary, work-life balance goals..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="3months">3 Months</option>
                  <option value="6months">6 Months</option>
                  <option value="1year">1 Year</option>
                  <option value="2years">2 Years</option>
                  <option value="5years">5 Years</option>
                  <option value="10years">10 Years</option>
                </select>
              </div>
            </div>
          </WebCard>
        </div>

        {/* Right Sidebar - Tips */}
        <div className="space-y-4">
          <WebCard className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200">
            <div className="flex items-start space-x-3 mb-4">
              <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">AI Simulation Tips</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Be specific with numbers (salary, age, timeline)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Include your constraints and priorities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Mention risk tolerance and goals</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Add context about your situation</span>
                  </li>
                </ul>
              </div>
            </div>
          </WebCard>

          <WebCard>
            <h3 className="font-semibold text-gray-800 mb-3">What You'll Get</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">Probability analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">Multiple scenarios</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700">AI recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm text-gray-700">Risk assessment</span>
              </div>
            </div>
          </WebCard>

          <button
            onClick={handleSimulate}
            disabled={!decisionInput || !selectedCategory}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            <Brain className="w-5 h-5" />
            <span>Run AI Simulation</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </WebLayout>
  );
}
