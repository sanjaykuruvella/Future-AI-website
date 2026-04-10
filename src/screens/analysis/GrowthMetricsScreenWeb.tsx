import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { 
  TrendingUp, Award, Target, Sparkles, Calendar,
  ArrowUpRight, ArrowDownRight,
  Zap,
  Trophy, Star,
  Loader2
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getPredictionsHistory } from '../../api/prediction';

export default function GrowthMetricsScreenWeb() {
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
  const avgLifeSat = calculateAvg('life_satisfaction');
  const avgImpact = calculateAvg('financial_impact');

  const metrics = [
    {
      label: 'Decision Quality',
      current: avgSuccess > 0 ? Math.min(avgSuccess + 5, 100) : 75,
      previous: avgSuccess > 0 ? Math.max(avgSuccess - 3, 0) : 72,
      change: '+5',
      trend: 'up',
      icon: Target,
      color: 'blue',
      target: 95,
      description: 'Overall quality of decisions made'
    },
    {
      label: 'Success Rate',
      current: avgSuccess > 0 ? avgSuccess : 80,
      previous: avgSuccess > 0 ? Math.max(avgSuccess - 6, 0) : 76,
      change: '+6',
      trend: 'up',
      icon: TrendingUp,
      color: 'green',
      target: 90,
      description: 'Percentage of successful outcomes'
    },
    {
      label: 'Goal Alignment',
      current: avgLifeSat > 0 ? avgLifeSat : 85,
      previous: avgLifeSat > 0 ? Math.max(avgLifeSat - 4, 0) : 81,
      change: '+4',
      trend: 'up',
      icon: Sparkles,
      color: 'purple',
      target: 95,
      description: 'How well decisions align with goals'
    },
    {
      label: 'Financial Impact',
      current: avgImpact > 0 ? avgImpact : 78,
      previous: avgImpact > 0 ? Math.max(avgImpact - 8, 0) : 70,
      change: '+8',
      trend: 'up',
      icon: Award,
      color: 'orange',
      target: 85,
      description: 'Effectiveness in managing finances'
    }
  ];

  // Map historical data for chart
  const progressData = history.length > 0
    ? history.slice().reverse().map(h => {
        const date = new Date(h.created_at);
        return {
          month: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          quality: Math.round(getStat(h, 'success_probability') * 0.9 + 10),
          success: Math.round(getStat(h, 'success_probability')),
          alignment: Math.round(getStat(h, 'life_satisfaction'))
        };
      })
    : [
        { month: 'Oct', quality: 72, success: 76, alignment: 85 },
        { month: 'Nov', quality: 75, success: 78, alignment: 86 },
        { month: 'Dec', quality: 78, success: 79, alignment: 87 }
      ];

    if (!history || history.length === 0) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 bg-white border border-dashed border-gray-200 rounded-3xl shadow-xl max-w-md mx-auto">
             <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
             <h2 className="text-2xl font-black text-gray-800 mb-2">No Growth Metrics</h2>
             <p className="text-sm text-gray-500 mb-6 font-medium">Run your first simulation to accurately evaluate live alignment setups.</p>
             <button onClick={() => navigate('/simulation-intro')} className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-green-500/25 transition-all">Start Simulation</button>
          </div>
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout maxWidth="full">
      <div className="space-y-6 max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Growth Metrics</h1>
                <p className="text-gray-600">Track your personal development journey</p>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Growth Score */}
        <div className="bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Trophy className="w-6 h-6" />
                  <p className="text-white/90 text-sm font-medium">Overall Growth Score</p>
                </div>
                <div className="flex items-end space-x-4 mb-3">
                  <div className="text-6xl font-bold">+10%</div>
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full mb-2">
                    <ArrowUpRight className="w-5 h-5" />
                    <span className="font-bold">Compared to last month</span>
                  </div>
                </div>
                <p className="text-white/80 max-w-2xl">
                  Excellent progress! You're improving across all categories with consistent upward momentum. Keep up the great work!
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full border-8 border-white/30 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-xl flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold">{avgSuccess > 0 ? avgSuccess : 84}</div>
                      <div className="text-sm text-white/80">Score</div>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="w-6 h-6 text-yellow-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Progress Over Time */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Progress Over Time</h3>
            <div className="h-80" style={{ minHeight: '320px', width: '100%' }}>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAlignment" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Area type="monotone" dataKey="quality" stroke="#3b82f6" fillOpacity={1} fill="url(#colorQuality)" name="Quality" />
                  <Area type="monotone" dataKey="success" stroke="#10b981" fillOpacity={1} fill="url(#colorSuccess)" name="Success" />
                  <Area type="monotone" dataKey="alignment" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorAlignment)" name="Alignment" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Current Metrics Comparison */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Current vs Previous</h3>
            <div className="h-80" style={{ minHeight: '320px', width: '100%' }}>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="label" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 11 }} />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="previous" fill="#cbd5e1" name="Previous" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="current" fill="url(#barGradient)" name="Current" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Metrics Grid */}
        <div className="grid grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                    <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{metric.label}</h3>
                    <p className="text-xs text-gray-600">{metric.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-end space-x-2 mb-3">
                <span className="text-3xl font-bold text-gray-800">{metric.current}</span>
                <div className={`flex items-center space-x-1 mb-1 ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span className="text-sm font-bold">{metric.change}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Previous: {metric.previous}</span>
                  <span>Target: {metric.target}</span>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 transition-all duration-500`}
                    style={{ width: `${(metric.current / metric.target) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Growth Insights</h3>
              <p className="text-sm text-gray-700 mb-4">
                Outstanding progress! You're on track to achieve your targets ahead of schedule. Your Risk Management score has shown the most significant improvement (+13%), indicating better decision-making under uncertainty. To maintain this momentum, focus on completing 3 more simulations this week to hit your 100-simulation milestone.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-gray-700">Best Performer</span>
                  </div>
                  <p className="text-sm font-bold text-gray-800">Goal Alignment</p>
                  <p className="text-xs text-gray-600">91/95 (96%)</p>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span className="text-xs font-medium text-gray-700">Most Improved</span>
                  </div>
                  <p className="text-sm font-bold text-gray-800">Risk Management</p>
                  <p className="text-xs text-gray-600">+13 points</p>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-gray-700">Next Milestone</span>
                  </div>
                  <p className="text-sm font-bold text-gray-800">100 Simulations</p>
                  <p className="text-xs text-gray-600">32 remaining</p>
                </div>
                <div className="bg-white/70 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-medium text-gray-700">Streak</span>
                  </div>
                  <p className="text-sm font-bold text-gray-800">30 Days</p>
                  <p className="text-xs text-gray-600">Keep it up!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebLayout>
  );
}
