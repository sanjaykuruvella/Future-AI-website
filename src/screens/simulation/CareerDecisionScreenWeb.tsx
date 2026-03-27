import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Briefcase, ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';

export default function CareerDecisionScreenWeb() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    currentRole: '',
    targetRole: '',
    currentSalary: '',
    expectedSalary: '',
    yearsExperience: '',
    industry: '',
    skills: '',
    // ML Features
    age: '25',
    workclass: 'Private',
    education: 'Bachelors',
    education_num: '13',
    marital_status: 'Never-married',
    occupation: 'Prof-specialty',
    relationship: 'Not-in-family',
    race: 'White',
    gender: 'Male',
    capital_gain: '0',
    capital_loss: '0',
    hours_per_week: '40',
    country: 'India',
    effort: 50,
    risk: 50,
    investment: 50
  });

  const careerTypes = [
    { id: 'job-change', label: 'Change Jobs', desc: 'Switch to a new company or role' },
    { id: 'promotion', label: 'Seek Promotion', desc: 'Advance in current organization' },
    { id: 'career-switch', label: 'Career Pivot', desc: 'Change to different industry/field' },
    { id: 'entrepreneurship', label: 'Start Business', desc: 'Launch your own venture' },
    { id: 'freelance', label: 'Go Freelance', desc: 'Become independent consultant' },
    { id: 'upskill', label: 'Skill Development', desc: 'Learn new skills for advancement' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('pending_simulation', JSON.stringify({
        category: 'Career',
        input: `Decision: ${selectedType}. Target: ${formData.targetRole}. Skills: ${formData.skills}`,
        features: {
            Age: parseInt(formData.age),
            Workclass: formData.workclass,
            Education: formData.education,
            Education_Number: parseInt(formData.education_num),
            Marital_Status: formData.marital_status,
            Occupation: formData.occupation,
            Relationship: formData.relationship,
            Race: formData.race,
            Gender: formData.gender,
            Capital_Gain: parseInt(formData.capital_gain),
            Capital_Loss: parseInt(formData.capital_loss),
            Hours_Per_Week: parseInt(formData.hours_per_week),
            Country: formData.country,
            effort: formData.effort,
            risk: formData.risk,
            investment: formData.investment
        }
    }));
    navigate('/simulation/processing');
  };

  return (
    <WebLayout maxWidth="full">
      <div className="max-w-[1400px] mx-auto px-6">
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600">Career Decision • Step 2 of 5</span>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all shadow-sm border border-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Career Decision Details</h1>
            <p className="text-gray-600">Tell us about your career decision to simulate</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Decision Type */}
        <WebCard>
          <h2 className="text-xl font-bold text-gray-800 mb-6">What type of career decision?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 bg-white'
                }`}
              >
                <p className="font-semibold text-gray-800 mb-1">{type.label}</p>
                <p className="text-sm text-gray-600">{type.desc}</p>
              </button>
            ))}
          </div>
        </WebCard>

        {/* Current Situation */}
        <WebCard className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Current Situation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Role/Position
              </label>
              <input
                type="text"
                value={formData.currentRole}
                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                placeholder="e.g., Software Engineer"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Industry
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g., Technology, Finance"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Monthly Salary (₹)
              </label>
              <input
                type="number"
                value={formData.currentSalary}
                onChange={(e) => setFormData({ ...formData, currentSalary: e.target.value })}
                placeholder="e.g., 80000"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                placeholder="e.g., 5"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                required
              />
            </div>
          </div>
        </WebCard>

        {/* Target Situation */}
        <WebCard className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Target/Desired Situation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Role/Position
              </label>
              <input
                type="text"
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                placeholder="e.g., Senior Software Engineer"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Monthly Salary (₹)
              </label>
              <input
                type="number"
                value={formData.expectedSalary}
                onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                placeholder="e.g., 120000"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Skills (comma separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="e.g., Python, React, AWS, Leadership"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50"
                required
              />
            </div>
          </div>
        </WebCard>

        {/* AI ML Context - Critical for prediction */}
        <WebCard className="border-amber-200 bg-amber-50/30">
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span>AI Personal Context (For Accurate Prediction)</span>
          </h2>
          <p className="text-sm text-gray-600 mb-6">These fields are used by our machine learning model trained on global socio-economic data.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Workclass</label>
              <select
                value={formData.workclass}
                onChange={(e) => setFormData({ ...formData, workclass: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                required
              >
                <option value="Private">Private</option>
                <option value="Self-emp-not-inc">Self-emp (Non-Inc)</option>
                <option value="Self-emp-inc">Self-emp (Inc)</option>
                <option value="Federal-gov">Federal Gov</option>
                <option value="Local-gov">Local Gov</option>
                <option value="State-gov">State Gov</option>
                <option value="Without-pay">Without Pay</option>
                <option value="Never-worked">Never Worked</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Education</label>
              <select
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                required
              >
                <option value="Bachelors">Bachelors</option>
                <option value="Some-college">Some College</option>
                <option value="11th">11th</option>
                <option value="HS-grad">HS Grad</option>
                <option value="Prof-school">Prof School</option>
                <option value="Assoc-acdm">Assoc Acdm</option>
                <option value="Assoc-voc">Assoc Voc</option>
                <option value="9th">9th</option>
                <option value="7th-8th">7th-8th</option>
                <option value="12th">12th</option>
                <option value="Masters">Masters</option>
                <option value="1st-4th">1st-4th</option>
                <option value="10th">10th</option>
                <option value="Doctorate">Doctorate</option>
                <option value="5th-6th">5th-6th</option>
                <option value="Preschool">Preschool</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Occupation</label>
              <select
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                required
              >
                <option value="Tech-support">Tech Support</option>
                <option value="Craft-repair">Craft-repair</option>
                <option value="Other-service">Other-service</option>
                <option value="Sales">Sales</option>
                <option value="Exec-managerial">Exec-managerial</option>
                <option value="Prof-specialty">Prof-specialty</option>
                <option value="Handlers-cleaners">Handlers-cleaners</option>
                <option value="Machine-op-inspct">Machine-op-inspct</option>
                <option value="Adm-clerical">Adm-clerical</option>
                <option value="Farming-fishing">Farming-fishing</option>
                <option value="Transport-moving">Transport-moving</option>
                <option value="Priv-house-serv">Priv-house-serv</option>
                <option value="Protective-serv">Protective-serv</option>
                <option value="Armed-Forces">Armed-Forces</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Hours Per Week</label>
              <input
                type="number"
                value={formData.hours_per_week}
                onChange={(e) => setFormData({ ...formData, hours_per_week: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Marital Status</label>
              <select
                value={formData.marital_status}
                onChange={(e) => setFormData({ ...formData, marital_status: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                <option value="Never-married">Never-married</option>
                <option value="Married-civ-spouse">Married-civ-spouse</option>
                <option value="Divorced">Divorced</option>
                <option value="Married-spouse-absent">Married-spouse-absent</option>
                <option value="Separated">Separated</option>
                <option value="Married-AF-spouse">Married-AF-spouse</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex justify-between mb-1 items-baseline">
                <label className="text-xs font-bold text-gray-500">Effort Commitment</label>
                <span className="text-xs font-black text-blue-600">{formData.effort}%</span>
              </div>
              <input type="range" min="10" max="100" value={formData.effort} onChange={(e) => setFormData({ ...formData, effort: Number(e.target.value) })} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            </div>

            <div>
              <div className="flex justify-between mb-1 items-baseline">
                <label className="text-xs font-bold text-gray-500">Risk Factor (Exposure)</label>
                <span className="text-xs font-black text-rose-600">{formData.risk}%</span>
              </div>
              <input type="range" min="10" max="100" value={formData.risk} onChange={(e) => setFormData({ ...formData, risk: Number(e.target.value) })} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-rose-600" />
            </div>

            <div>
              <div className="flex justify-between mb-1 items-baseline">
                <label className="text-xs font-bold text-gray-500">Investment Target</label>
                <span className="text-xs font-black text-emerald-600">{formData.investment}%</span>
              </div>
              <input type="range" min="10" max="100" value={formData.investment} onChange={(e) => setFormData({ ...formData, investment: Number(e.target.value) })} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
            </div>
          </div>
        </WebCard>

        {/* AI Insights Preview */}
        <WebCard className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">What AI Will Analyze</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  <span>Success probability based on market conditions and your profile</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  <span>Expected salary increase and financial timeline</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  <span>Skill gaps and learning recommendations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  <span>Risk factors and mitigation strategies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  <span>Alternative career paths comparison</span>
                </li>
              </ul>
            </div>
          </div>
        </WebCard>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6">
          <button
            type="button"
            onClick={() => navigate('/simulation/category')}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
          >
            ← Back to Categories
          </button>
          
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <span>Continue to Context</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
      </div>
    </WebLayout>
  );
}
