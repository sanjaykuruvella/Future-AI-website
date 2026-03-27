import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { apiRequest } from '../../api/config';
import { WebCard } from '../../components/WebCard';
import { getPredictionsHistory } from '../../api/prediction';
import {
  Sparkles, TrendingUp, Target, MessageCircle, BarChart3,
  History, AlertTriangle, Calendar, Zap, Brain,
  ArrowRight, Activity
} from 'lucide-react';
import {
  AreaChart, Area, ResponsiveContainer
} from 'recharts';

export default function HomeDashboardWeb() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { name: 'User' };

  const [stats, setStats] = useState({
    future_score: 0,
    active_goals: 0,
    simulation_count: 0,
    ai_insights: 0,
    trend: '+0 this week'
  });
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
         const data = await apiRequest<any>(`/home_data/${user.user_id}`);
         if (data && !data.error) {
             setStats(data);
         }
         const historyData = await getPredictionsHistory(user.user_id);
         setHistory(Array.isArray(historyData) ? historyData : []);
      } catch (err) {
         console.error(err);
      } finally {
         setIsLoading(false);
      }
    };
    if (user && user.user_id) {
         fetchStats();
    }
  }, [user.user_id]);

  // Mock data for mini-charts
  const activeGoals = history.length > 0 ? history.length : Math.max(stats.active_goals ?? 0, stats.simulation_count ?? 0);
  const pathCompletion = activeGoals > 0 ? Math.round((stats.future_score ?? 0) * 1) : 0;

  const scoreData = [
    { value: 65 }, { value: 72 }, { value: 68 }, { value: 78 }, { value: 82 }, { value: 85 }, { value: 87 }
  ];

  const simulationData = [
    { value: 4 }, { value: 6 }, { value: 3 }, { value: 8 }, { value: 5 }, { value: 7 }, { value: 6 }
  ];

  if (isLoading) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <Sparkles className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-bold">Loading your insights...</p>
          </div>
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout maxWidth="full">
      <div className="max-w-[1800px] mx-auto px-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, {user.name}!</h1>
            <p className="text-lg text-gray-600 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Thursday, March 5, 2026 • Let's explore your future today
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/simulation-intro')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/25 transition-all flex items-center"
            >
              <Zap className="w-5 h-5 mr-2" />
              New Simulation
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600/5 to-purple-600/5 border border-blue-100 rounded-2xl p-4 mb-8 flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-blue-900 leading-relaxed">
            <span className="font-semibold underline decoration-blue-300">AI Recommendation:</span> Your career analysis shows the next 3 months are perfect for upskilling. We've updated your path with new certification recommendations.
          </p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <WebCard className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-100/50">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Future Score</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stats.future_score}</span>
                    <span className="text-sm text-gray-400 font-medium">/ 100</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="h-16 w-full opacity-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scoreData}>
                    <defs>
                      <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#scoreGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center space-x-1 text-sm text-green-600 mt-2 font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>{stats.trend}</span>
              </div>
            </div>
          </WebCard>

          <WebCard className="bg-gradient-to-br from-pink-500 to-fuchsia-500 border-transparent text-white">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-pink-100 mb-1">Active Goals</p>
                  <span className="text-4xl font-bold text-white">{activeGoals}</span>
                </div>
                <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-800/40">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="space-y-3 mt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-pink-100 font-medium">Path Completion</span>
                    <span className="text-white font-bold">{pathCompletion}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-pink-900/40 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${pathCompletion}%` }} />
                  </div>
                </div>
                <p className="text-xs text-pink-100">
                  {activeGoals === 0 ? "No active goals yet" : `${activeGoals} goals tracking your path`}
                </p>
              </div>
            </div>
          </WebCard>

          <WebCard className="bg-gradient-to-br from-orange-500/5 to-amber-500/5 border-orange-100/50">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Simulations</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-orange-600">{stats.simulation_count}</span>
                    <span className="text-sm text-gray-400 font-medium">this mo.</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="h-16 w-full opacity-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={simulationData}>
                    <Area type="step" dataKey="value" stroke="#f59e0b" strokeWidth={2} fill="#fef3c7" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="text-xs text-orange-600 font-medium mt-2">Highest activity in 3 months</p>
            </div>
          </WebCard>

          <WebCard className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border-purple-100/50">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">AI Insights</p>
                  <span className="text-4xl font-bold text-purple-600">{stats.ai_insights}</span>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-md text-[10px] font-bold">CAREER</span>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded-md text-[10px] font-bold">FINANCE</span>
                <span className="px-2 py-1 bg-pink-100 text-pink-600 rounded-md text-[10px] font-bold">LIFESTYLE</span>
              </div>

              <p className="text-xs text-gray-500 mt-2">Generated from {stats.simulation_count} simulations</p>
            </div>
          </WebCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Chat CTA */}
            <WebCard
              onClick={() => navigate('/ai-chat')}
              className="group overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 border-none text-white relative"
              hover
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-500" />
              <div className="relative flex items-center space-x-8">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 flex items-center">
                    Chat with AI Assistant
                    <Sparkles className="w-5 h-5 ml-2 text-blue-300 animate-pulse" />
                  </h3>
                  <p className="text-blue-100 text-lg mb-4 opacity-90 leading-relaxed">Ask questions about any decision - get instant, personalized advice with real-time consequence testing.</p>
                  <div className="flex items-center text-sm font-bold bg-white/10 w-fit px-4 py-2 rounded-lg border border-white/20">
                    Try: "Should I change my career?"
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </WebCard>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <WebCard
                onClick={() => navigate('/simulation-intro')}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200"
                hover
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">New Simulation</h3>
                    <p className="text-sm text-gray-600">Detailed analysis • 5-10 min</p>
                  </div>
                </div>
              </WebCard>

              <WebCard
                onClick={() => navigate('/quick-simulation')}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200"
                hover
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Quick Start</h3>
                    <p className="text-sm text-gray-600">Fast predictions • 2 min</p>
                  </div>
                </div>
              </WebCard>
            </div>

            {/* Analytics Grid */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Your Analytics</h2>
              <p className="text-sm text-gray-600 mb-4">View detailed reports of your simulations and progress</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <WebCard onClick={() => navigate('/analytics')} hover className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-medium text-gray-800">Analytics</p>
                  <p className="text-xs text-gray-500 mt-1">View insights</p>
                </WebCard>

                <WebCard onClick={() => navigate('/analysis/trends')} hover className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <History className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-medium text-gray-800">Trends</p>
                  <p className="text-xs text-gray-500 mt-1">{stats.simulation_count} predictions</p>
                </WebCard>



                <WebCard onClick={() => navigate('/quick-simulation')} hover className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-medium text-gray-800">Quick Sim</p>
                  <p className="text-xs text-gray-500 mt-1">Start now</p>
                </WebCard>
              </div>
            </div>

            {/* Recent Simulations Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Recent Simulations</h2>
                  <p className="text-sm text-gray-500">Your latest decision predictions and their outcomes</p>
                </div>
                <button onClick={() => navigate('/analytics')} className="px-4 py-2 text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 font-semibold transition-all">
                  View All Analysis
                </button>
              </div>

              <div className="space-y-4">
                {stats.simulation_count === 0 ? (
                  <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                    <Zap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="font-bold text-gray-800 mb-1">No Simulations Yet</p>
                    <p className="text-xs text-gray-500 mb-4">Start a simulation to see predictions and insights.</p>
                    <button onClick={() => navigate('/simulation-intro')} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-xs shadow-md">
                      Start First Simulation
                    </button>
                  </div>
                ) : (
                [
                  {
                    title: 'Career Change to Tech Industry',
                    prob: '87%',
                    time: '2 hours ago',
                    impact: 'HIGH',
                    color: 'blue',
                    icon: Sparkles
                  },
                  {
                    title: 'Investment in Mutual Funds',
                    prob: '₹12.5L est.',
                    time: 'Yesterday',
                    impact: 'POSITIVE',
                    color: 'emerald',
                    icon: Activity
                  },
                ].map((sim, i) => (
                  <WebCard key={i} hover onClick={() => navigate('/analytics')} className="p-4 border-gray-100 hover:border-blue-200 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${sim.color === 'blue' ? 'bg-blue-100' :
                            sim.color === 'emerald' ? 'bg-emerald-100' : 'bg-orange-100'
                          }`}>
                          <sim.icon className={`w-7 h-7 ${sim.color === 'blue' ? 'text-blue-600' :
                              sim.color === 'emerald' ? 'text-emerald-600' : 'text-orange-600'
                            }`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors uppercase text-sm tracking-tight">{sim.title}</h3>
                          <p className="text-xs text-gray-500 font-medium whitespace-pre-wrap">
                            Outcome probability: <span className={`font-bold ${sim.color === 'blue' ? 'text-blue-600' :
                                sim.color === 'emerald' ? 'text-emerald-600' : 'text-orange-600'
                              }`}>{sim.prob}</span> • {sim.time}
                          </p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-[10px] font-black border ${sim.color === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          sim.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            'bg-orange-50 text-orange-600 border-orange-100'
                        }`}>
                        {sim.impact}
                      </div>
                    </div>
                  </WebCard>
                ))
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Daily Insight - Premium Look */}
            <WebCard className="bg-white border-2 border-purple-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-12 -mt-12 opacity-50" />
              <div className="relative">
                <div className="flex items-center space-x-3 mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-800 tracking-tight">DAILY INSIGHT</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Powered by FutureVision AI</p>
                  </div>
                </div>
                <div className="bg-purple-50/50 rounded-xl p-4 mb-5 border border-purple-100">
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    {stats.simulation_count === 0 
                      ? "Welcome to FutureVision AI! Run your first simulation to generate actionable insights for your balance path."
                      : `"Your focus on personal data simulations and strategy updates is building momentum. Keep exploring scenarios for optimal results."`}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/analytics')}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center group"
                >
                  Deep Dive Analysis
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </WebCard>

            {/* Quick Metrics Dashboard Vertical */}
            <WebCard className="bg-gray-50/50 border-gray-100">
              <h3 className="font-black text-gray-800 mb-6 text-sm tracking-widest uppercase">Growth Opportunities</h3>
              <div className="space-y-6">
                {[
                  { label: 'Market Readiness', value: stats.career || 0, color: 'blue' },
                  { label: 'Risk Mitigation', value: stats.finance || 0, color: 'purple' },
                  { label: 'Goal Alignment', value: stats.balance || 0, color: 'emerald' }
                ].map((m, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                      <span className="text-gray-500">{m.label}</span>
                      <span className={`${m.color === 'blue' ? 'text-blue-600' : m.color === 'purple' ? 'text-purple-600' : 'text-emerald-600'}`}>{m.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${m.color === 'blue' ? 'bg-blue-500' : m.color === 'purple' ? 'bg-purple-500' : 'bg-emerald-500'
                        }`} style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-6 text-center font-medium">Data refreshing in 2h 45m</p>
            </WebCard>

            {/* Risk Alerts - Urgent Look */}
            <WebCard className="bg-red-50 border-red-100 border-2">
              <div className="flex items-center space-x-3 mb-4 text-red-600">
                <AlertTriangle className="w-6 h-6 animate-bounce" />
                <h3 className="font-black tracking-tight text-red-900">PRIORITY ALERTS (3)</h3>
              </div>
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-white/80 rounded-xl border border-red-200">
                  <p className="text-xs font-bold text-red-900">BUDGET OVERSPEND RISK</p>
                  <p className="text-[10px] text-red-700">Projected deficit in May based on current trends.</p>
                </div>
                <div className="p-3 bg-white/80 rounded-xl border border-orange-200 text-orange-900">
                  <p className="text-xs font-bold">CAREER STAGNATION</p>
                  <p className="text-[10px] text-orange-700">Lack of new skill inputs in the last 14 days.</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/priority-alerts')}
                className="w-full py-2 bg-red-600 text-white rounded-lg font-black text-xs hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
              >
                RESOLVE ALERTS NOW
              </button>
            </WebCard>
          </div>
        </div>
      </div>
    </WebLayout>
  );
}