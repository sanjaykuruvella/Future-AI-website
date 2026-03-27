import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { 
  Calendar, TrendingUp, TrendingDown, DollarSign, 
  Briefcase, Award, AlertCircle, CheckCircle, ArrowRight, Loader2 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getPredictionsHistory } from '../../api/prediction';

export default function TimelineProjectionScreenWeb() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<'6m' | '1y' | '3y' | '5y'>('1y');
  const [lastPrediction, setLastPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return navigate('/login');
        const user = JSON.parse(userStr);
        try {
            const data = await getPredictionsHistory(user.user_id);
            if (data.length > 0) setLastPrediction(data[0]);
        } catch (error) {
            console.error('Failed to fetch timeline:', error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchData();
  }, [navigate]);

  if (isLoading) {
    return (
        <WebLayout>
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        </WebLayout>
    );
  }

  const successRate = lastPrediction ? Math.round(lastPrediction.success_probability) : 75;
  const financial = lastPrediction ? Math.round(lastPrediction.financial_impact) : 50;
  
  const timelineData = [
    { month: 'Month 1', progress: 10, income: 45000, confidence: successRate * 0.9 },
    { month: 'Month 3', progress: 30, income: 45000 * (1 + (financial/400)), confidence: successRate * 0.92 },
    { month: 'Month 6', progress: 50, income: 45000 * (1 + (financial/200)), confidence: successRate * 0.95 },
    { month: 'Month 9', progress: 75, income: 45000 * (1 + (financial/130)), confidence: successRate * 0.98 },
    { month: 'Month 12', progress: 100, income: 45000 * (1 + (financial/100)), confidence: successRate }
  ];

  const milestones = [
    {
      month: 1,
      title: 'Initial Setup & Learning',
      description: 'Complete onboarding, initial training, and setup',
      status: 'positive',
      impact: 'Foundation building phase'
    },
    {
      month: 3,
      title: 'First Major Milestone',
      description: 'Complete first project or reach initial milestone',
      status: 'positive',
      impact: '₹52,000 monthly income'
    },
    {
      month: 6,
      title: 'Mid-Point Review',
      description: 'Performance evaluation and growth assessment',
      status: 'neutral',
      impact: 'Critical decision point'
    },
    {
      month: 9,
      title: 'Advanced Opportunities',
      description: 'Eligible for senior responsibilities',
      status: 'positive',
      impact: '₹92,000 monthly income'
    },
    {
      month: 12,
      title: 'Year-End Success',
      description: 'Full transformation completed',
      status: 'positive',
      impact: '₹1,12,000 monthly income'
    }
  ];

  return (
    <WebLayout maxWidth="5xl">
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-600">Timeline Projection</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Your Journey Over Time
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-4">
          Month-by-month prediction of how your decision will unfold
        </p>
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-sm text-blue-900">
            💡 <span className="font-semibold">How to read:</span> Track your predicted progress, income growth, and key milestones over time
          </span>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex items-center space-x-4 mb-8">
        <span className="text-sm font-semibold text-gray-700">View period:</span>
        <div className="flex items-center space-x-2">
          {(['6m', '1y', '3y', '5y'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period === '6m' ? '6 Months' : period === '1y' ? '1 Year' : period === '3y' ? '3 Years' : '5 Years'}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Chart */}
      <WebCard className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Progress & Income Projection</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '12px'
              }}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="progress" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Progress %"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="income" 
              stroke="#10b981" 
              strokeWidth={3}
              name="Income (₹)"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="confidence" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Confidence %"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center space-x-8 mt-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-blue-600 rounded"></div>
            <span className="text-gray-700">Progress %</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-green-600 rounded"></div>
            <span className="text-gray-700">Income (₹)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-purple-600 rounded border-2 border-purple-600" style={{ borderStyle: 'dashed' }}></div>
            <span className="text-gray-700">AI Confidence %</span>
          </div>
        </div>
      </WebCard>

      {/* Key Milestones */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Milestones & Events</h2>
        <div className="space-y-4">
          {milestones.map((milestone, idx) => (
            <WebCard 
              key={idx}
              className={
                milestone.status === 'positive' 
                  ? 'border-green-200 bg-green-50/30' 
                  : milestone.status === 'neutral'
                  ? 'border-orange-200 bg-orange-50/30'
                  : 'border-gray-200'
              }
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  milestone.status === 'positive' 
                    ? 'bg-green-500' 
                    : milestone.status === 'neutral'
                    ? 'bg-orange-500'
                    : 'bg-gray-400'
                }`}>
                  {milestone.status === 'positive' ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-gray-800">{milestone.title}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        Month {milestone.month}
                      </span>
                    </div>
                    <span className={`text-sm font-semibold ${
                      milestone.status === 'positive' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {milestone.impact}
                    </span>
                  </div>
                  <p className="text-gray-700">{milestone.description}</p>
                </div>
              </div>
            </WebCard>
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <WebCard className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-200">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Growth</p>
              <p className="text-2xl font-bold text-gray-800">533%</p>
              <p className="text-xs text-blue-600">From start to month 12</p>
            </div>
          </div>
        </WebCard>

        <WebCard className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-200">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Income Increase</p>
              <p className="text-2xl font-bold text-gray-800">+₹67k</p>
              <p className="text-xs text-green-600">Monthly by year end</p>
            </div>
          </div>
        </WebCard>

        <WebCard className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-200">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Key Milestones</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
              <p className="text-xs text-purple-600">Major milestones reached</p>
            </div>
          </div>
        </WebCard>
      </div>

      {/* Action */}
      <div className="flex items-center justify-center pt-6 border-t border-gray-100">
        <button
          onClick={() => navigate('/simulation/prediction-summary')}
          className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        >
          Back to Results
        </button>
      </div>
    </WebLayout>
  );
}
