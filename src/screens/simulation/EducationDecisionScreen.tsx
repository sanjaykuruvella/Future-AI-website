import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { Button } from '../../components/Button';

export default function EducationDecisionScreen() {
  const navigate = useNavigate();
  const [age, setAge] = useState('21');
  const [currentDegree, setCurrentDegree] = useState('High School');
  const [yearsStudied, setYearsStudied] = useState('15');
  const [studyHours, setStudyHours] = useState(30);
  const [careerGoal, setCareerGoal] = useState('Tech');
  const [country, setCountry] = useState('India');
  const [expectedIncome, setExpectedIncome] = useState('< $50k');

  const isValid = age && currentDegree && careerGoal && country && expectedIncome;

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
              placeholder="21"
            />
          </div>

          {/* Current Degree */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Current Degree</label>
            <input
              type="text"
              value={currentDegree}
              onChange={(e) => setCurrentDegree(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="High School"
            />
          </div>

          {/* Years Studied */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Years Studied</label>
            <input
              type="number"
              value={yearsStudied}
              onChange={(e) => setYearsStudied(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="15"
            />
          </div>

          {/* Study Hours Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-base font-normal text-gray-900">Study Hours</label>
              <span className="text-base font-medium text-purple-600">{studyHours}h</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={studyHours}
              onChange={(e) => setStudyHours(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              style={{
                background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((studyHours - 5) / 55) * 100}%, #e5e7eb ${((studyHours - 5) / 55) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>

          {/* Career Goal */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Career Goal</label>
            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="Tech"
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

          {/* Expected Income */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Expected Income</label>
            <input
              type="text"
              value={expectedIncome}
              onChange={(e) => setExpectedIncome(e.target.value)}
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
