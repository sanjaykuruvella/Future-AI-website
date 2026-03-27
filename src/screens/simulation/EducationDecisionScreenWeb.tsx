import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Button } from '../../components/Button';
import { GraduationCap, ArrowLeft } from 'lucide-react';

export default function EducationDecisionScreenWeb() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '21',
    education: 'Bachelors',
    education_num: '13',
    careerGoal: 'Tech',
    country: 'India',
    expectedIncome: '< ₹5L',
    workclass: 'Private',
    marital_status: 'Never-married',
    occupation: 'Prof-specialty',
    relationship: 'Not-in-family',
    race: 'White',
    gender: 'Male',
    capital_gain: '0',
    capital_loss: '0',
    hours_per_week: '40',
    studyHours: 30,
    risk: 50,
    investment: 50
  });

  const isValid = formData.age && formData.education && formData.careerGoal && formData.country;

  return (
    <WebLayout maxWidth="full">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 w-10 h-10 bg-white rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center flex-1">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mr-4">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Education Decision</h1>
              <p className="text-gray-600">Provide your educational details</p>
            </div>
          </div>
        </div>

        <WebCard>
          <div className="p-8">
            <div className="space-y-6">
              {/* Age */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
                  placeholder="21"
                />
              </div>

              {/* Current Degree */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Current Degree</label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
                >
                  <option value="Bachelors">Bachelor's Degree</option>
                  <option value="Masters">Master's Degree</option>
                  <option value="Doctorate">PhD / Doctorate</option>
                  <option value="HS-grad">High School Grad</option>
                  <option value="Some-college">Some College</option>
                  <option value="Prof-school">Professional School</option>
                </select>
              </div>

              {/* Years Studied */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Education Number (Years of Study)</label>
                <input
                  type="number"
                  value={formData.education_num}
                  onChange={(e) => setFormData({ ...formData, education_num: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
                  placeholder="13"
                />
              </div>

              {/* Workclass for Context */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Workclass (Current/Target)</label>
                <select
                  value={formData.workclass}
                  onChange={(e) => setFormData({ ...formData, workclass: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
                >
                  <option value="Private">Private</option>
                  <option value="Self-emp-not-inc">Self-emp</option>
                  <option value="Federal-gov">Government</option>
                </select>
              </div>

              {/* Study Hours Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-base font-medium text-gray-900">Study Hours per Week</label>
                  <span className="text-base font-semibold text-purple-600">{formData.studyHours}h</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={formData.studyHours}
                  onChange={(e) => setFormData({ ...formData, studyHours: Number(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  style={{
                    background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((formData.studyHours - 5) / 55) * 100}%, #e5e7eb ${((formData.studyHours - 5) / 55) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5h</span>
                  <span>60h</span>
                </div>
              </div>

              {/* Career Goal */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Career Goal</label>
                <input
                  type="text"
                  value={formData.careerGoal}
                  onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
                  placeholder="Tech, Healthcare, Finance, etc."
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Country</label>
                <div className="flex items-center justify-between rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-fuchsia-50 px-4 py-3.5 shadow-sm">
                  <div>
                    <p className="text-base font-bold text-gray-900">{formData.country}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-700">Static Region</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-purple-700 shadow-sm">Locked</span>
                </div>
              </div>

              {/* Expected Income */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Expected Annual Income</label>
                <select
                  value={formData.expectedIncome}
                  onChange={(e) => setFormData({ ...formData, expectedIncome: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
                >
                  <option>&lt; ₹5L</option>
                  <option>₹5L - ₹10L</option>
                  <option>₹10L - ₹20L</option>
                  <option>₹20L - ₹50L</option>
                  <option>&gt; ₹50L</option>
                </select>
              </div>

              {/* Hidden ML features with defaults for education flow */}
              <div className="hidden">
                  <input type="text" value={formData.occupation} readOnly />
                  <input type="text" value={formData.gender} readOnly />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="px-8 py-3 text-base"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                    localStorage.setItem('pending_simulation', JSON.stringify({
                        category: 'Education',
                        input: `Education path: ${formData.education} in ${formData.careerGoal}`,
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
                            effort: formData.studyHours,
                            risk: formData.risk,
                            investment: formData.investment
                        }
                    }));
                    navigate('/simulation/processing');
                }}
                className="px-8 py-3 text-base font-semibold"
                disabled={!isValid}
              >
                Analyze Decision
              </Button>
            </div>
          </div>
        </WebCard>
      </div>
    </WebLayout>
  );
}
