import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Target, TrendingUp, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { getPredictionsHistory } from '../../api/prediction';

export default function GoalsScreenWeb() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        navigate('/login');
        return;
      }
      const user = JSON.parse(userStr);
      try {
        const data = await getPredictionsHistory(user.user_id);
        setHistory(data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
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

  const getStat = (p: any, key: string) => {
    if (!p) return 0;
    if (p[key] !== undefined && p[key] !== null && p[key] !== 0) {
      return parseFloat(p[key]);
    }
    if (p.forecast_result) {
      try {
        const res = JSON.parse(p.forecast_result);
        if (res[key]) return parseFloat(res[key]);
      } catch (e) {}
    }
    return 0;
  };

  const calculateAvg = (key: string) => {
    if (!history.length) return 0;
    const total = history.reduce((acc, curr) => acc + getStat(curr, key), 0);
    return Math.round(total / history.length);
  };

  const avgSuccess = calculateAvg('success_probability');

  const goals = history.length > 0
    ? history.map((h, i) => {
        const success_prob = getStat(h, 'success_probability');
        const title = h.decision_input || 'Simulation Task';
        const isCareer = title.toLowerCase().includes('career') || title.toLowerCase().includes('job') || title.toLowerCase().includes('work');
        const isFinance = title.toLowerCase().includes('finan') || title.toLowerCase().includes('money') || title.toLowerCase().includes('invest');

        return {
          id: h.prediction_id || i,
          title: title,
          category: isCareer ? 'Career' : isFinance ? 'Finance' : 'Education',
          progress: Math.round(success_prob),
          targetDate: h.created_at || new Date().toISOString(),
          status: success_prob > 75 ? 'On Track' : success_prob > 40 ? 'At Risk' : 'Needs Review'
        };
      })
    : [
        { id: 1, title: 'Increase Savings Rate', category: 'Finance', progress: 65, targetDate: '2026-12-31', status: 'On Track' },
        { id: 2, title: 'Learn Advanced Machine Learning', category: 'Education', progress: 40, targetDate: '2026-08-15', status: 'At Risk' },
        { id: 3, title: 'Reach Senior Engineer Role', category: 'Career', progress: 85, targetDate: '2027-01-01', status: 'On Track' }
      ];

  const completedCount = history.filter(h => getStat(h, 'success_probability') >= 80).length;

    if (!history || history.length === 0) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 bg-white border border-dashed border-gray-200 rounded-3xl shadow-xl max-w-md mx-auto">
             <Target className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
             <h2 className="text-2xl font-black text-gray-800 mb-2">No Goals Set Yet</h2>
             <p className="text-sm text-gray-500 mb-6 font-medium">Run your first AI simulation to set objective milestones for your path updates.</p>
             <button onClick={() => navigate('/simulation-intro')} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/25 transition-all">Start Simulation</button>
          </div>
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout>
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">My Goals</h1>
          <p className="text-lg text-gray-500 font-medium">Set, track, and accomplish your long-term objectives.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WebCard className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{goals.length}</p>
                <p className="text-sm font-medium text-gray-600">Active Goals</p>
              </div>
            </div>
          </WebCard>

          <WebCard className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{history.length > 0 ? completedCount : 12}</p>
                <p className="text-sm font-medium text-gray-600">Completed (Success &gt; 80%)</p>
              </div>
            </div>
          </WebCard>

          <WebCard className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{history.length > 0 ? avgSuccess : 63}%</p>
                <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
              </div>
            </div>
          </WebCard>
        </div>

        <WebCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Current Objectives</h2>
          </div>
          
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition bg-gray-50/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
                      {goal.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">{goal.title}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${goal.status === 'On Track' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                    {goal.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900">{goal.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        goal.progress >= 75 ? 'bg-emerald-500' : 
                        goal.progress >= 40 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500 font-medium">
                  <Clock className="w-4 h-4 mr-1.5" />
                  Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </WebCard>
      </div>
    </WebLayout>
  );
}
