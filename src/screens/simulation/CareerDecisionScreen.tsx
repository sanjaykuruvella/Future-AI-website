import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';

export default function CareerDecisionScreen() {
  const navigate = useNavigate();
  const [age, setAge] = useState('25');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [jobRole, setJobRole] = useState('Engineer');
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [workingHours, setWorkingHours] = useState(40);
  const [country, setCountry] = useState('India');
  const [gender, setGender] = useState('');
  const [incomeLevel, setIncomeLevel] = useState('');

  const isValid = age && employmentType && jobRole && maritalStatus && country && gender && incomeLevel;

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen flex flex-col px-6 py-8 pb-24 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Details</h1>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto">
          {/* Age */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="25"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Employment Type</label>
            <input
              type="text"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="Full-time"
            />
          </div>

          {/* Job Role */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Job Role</label>
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="Engineer"
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Marital Status</label>
            <input
              type="text"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="Single"
            />
          </div>

          {/* Working Hours Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-base font-normal text-gray-900">Working Hours</label>
              <span className="text-base font-medium text-blue-500">{workingHours}h</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={workingHours}
              onChange={(e) => setWorkingHours(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((workingHours - 10) / 70) * 100}%, #e5e7eb ${((workingHours - 10) / 70) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="USA"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-3">Gender</label>
            <div className="flex gap-4">
              <button
                onClick={() => setGender('male')}
                className={`flex items-center space-x-2 transition-all ${
                  gender === 'male' ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  gender === 'male' ? 'border-blue-600' : 'border-gray-400'
                }`}>
                  {gender === 'male' && <div className="w-3 h-3 rounded-full bg-blue-600"></div>}
                </div>
                <span className="text-base">Male</span>
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex items-center space-x-2 transition-all ${
                  gender === 'female' ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  gender === 'female' ? 'border-blue-600' : 'border-gray-400'
                }`}>
                  {gender === 'female' && <div className="w-3 h-3 rounded-full bg-blue-600"></div>}
                </div>
                <span className="text-base">Female</span>
              </button>
            </div>
          </div>

          {/* Income Level */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Income Level</label>
            <input
              type="text"
              value={incomeLevel}
              onChange={(e) => setIncomeLevel(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="< $50k"
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={() => navigate('/simulation/processing')}
            className="w-full py-4 text-base font-semibold"
            disabled={!isValid}
          >
            Analyze Decision
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
