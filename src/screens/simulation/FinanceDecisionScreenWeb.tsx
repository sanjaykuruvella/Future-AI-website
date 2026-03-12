import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Button } from '../../components/Button';
import { DollarSign, ArrowLeft } from 'lucide-react';

export default function FinanceDecisionScreenWeb() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '30',
    salaryLevel: '< ₹2.5L',
    capital_gain: '50000',
    capital_loss: '10000',
    workclass: 'Private',
    hours_per_week: '40',
    country: 'United-States',
    education: 'Bachelors',
    education_num: '13',
    marital_status: 'Married-civ-spouse',
    occupation: 'Exec-managerial',
    relationship: 'Husband',
    race: 'White',
    gender: 'Male'
  });

  const isValid = formData.age && formData.salaryLevel && formData.country;

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
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mr-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Finance Decision</h1>
              <p className="text-gray-600">Provide your financial details</p>
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
                  placeholder="30"
                />
              </div>

              {/* Salary Level */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Salary Level</label>
                <input
                  type="text"
                  value={formData.salaryLevel}
                  onChange={(e) => setFormData({ ...formData, salaryLevel: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
                  placeholder="< ₹2.5L"
                />
              </div>

              {/* Investment Profit */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Investment Profit / Capital Gain (₹)</label>
                <input
                  type="number"
                  value={formData.capital_gain}
                  onChange={(e) => setFormData({ ...formData, capital_gain: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
                  placeholder="50000"
                />
              </div>

              {/* Financial Loss */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Financial Loss / Capital Loss (₹)</label>
                <input
                  type="number"
                  value={formData.capital_loss}
                  onChange={(e) => setFormData({ ...formData, capital_loss: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
                  placeholder="10000"
                />
              </div>

              {/* Employment Type / Workclass */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Workclass / Employment Type</label>
                <select
                  value={formData.workclass}
                  onChange={(e) => setFormData({ ...formData, workclass: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
                >
                  <option value="Private">Private Company</option>
                  <option value="Self-emp-not-inc">Self-Employed</option>
                  <option value="Local-gov">Government Job</option>
                </select>
              </div>

              {/* Working Hours Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-base font-medium text-gray-900">Working Hours per Week</label>
                  <span className="text-base font-semibold text-green-600">{formData.hours_per_week}h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={formData.hours_per_week}
                  onChange={(e) => setFormData({ ...formData, hours_per_week: e.target.value })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  style={{
                    background: `linear-gradient(to right, #22c55e 0%, #22c55e ${(parseInt(formData.hours_per_week) / 80) * 100}%, #e5e7eb ${(parseInt(formData.hours_per_week) / 80) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0h</span>
                  <span>80h</span>
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
                  placeholder="United-States"
                />
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
                        category: 'Finance',
                        input: `Financial decision. Salary: ${formData.salaryLevel}`,
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
                            Country: formData.country
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
