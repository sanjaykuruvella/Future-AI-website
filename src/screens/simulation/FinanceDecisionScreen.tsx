import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { Button } from '../../components/Button';

export default function FinanceDecisionScreen() {
  const navigate = useNavigate();
  const [age, setAge] = useState('30');
  const [salaryLevel, setSalaryLevel] = useState('< ₹2.5L');
  const [investmentProfit, setInvestmentProfit] = useState('50000');
  const [financialLoss, setFinancialLoss] = useState('10000');
  const [employmentType, setEmploymentType] = useState('Salaried');
  const [workingHours, setWorkingHours] = useState(40);
  const [country, setCountry] = useState('India');

  const isValid = age && salaryLevel && employmentType && country;

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
              placeholder="30"
            />
          </div>

          {/* Salary Level */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Salary Level</label>
            <input
              type="text"
              value={salaryLevel}
              onChange={(e) => setSalaryLevel(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="< ₹2.5L"
            />
          </div>

          {/* Investment Profit */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Investment Profit</label>
            <input
              type="number"
              value={investmentProfit}
              onChange={(e) => setInvestmentProfit(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="50000"
            />
          </div>

          {/* Financial Loss */}
          <div>
            <label className="block text-base font-normal text-gray-900 mb-2">Financial Loss</label>
            <input
              type="number"
              value={financialLoss}
              onChange={(e) => setFinancialLoss(e.target.value)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900"
              placeholder="10000"
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
              placeholder="Salaried"
            />
          </div>

          {/* Working Hours Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-base font-normal text-gray-900">Working Hours</label>
              <span className="text-base font-medium text-green-500">{workingHours}h</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              value={workingHours}
              onChange={(e) => setWorkingHours(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
              style={{
                background: `linear-gradient(to right, #22c55e 0%, #22c55e ${(workingHours / 80) * 100}%, #e5e7eb ${(workingHours / 80) * 100}%, #e5e7eb 100%)`
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
              placeholder="India"
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