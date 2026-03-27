import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import {
  TrendingUp, BarChart3, Target,
  ArrowUpRight, ArrowDownRight, Brain, ShieldCheck,
  Zap,
  GitBranch, GitCompare,
  Activity, CheckCircle2,
  Calendar, Clock, Sparkles
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { getPredictionsHistory, getPredictionInsights } from '../../api/prediction';

export default function AnalyticsDashboardWeb() {
  const navigate = useNavigate();
  const location = useLocation();
  const [history, setHistory] = useState<any[]>([]);
  const [insights, setInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        navigate('/login');
        return;
      }
      const user = JSON.parse(userStr);
      try {
        const [historyData, insightsData] = await Promise.all([
          getPredictionsHistory(user.user_id),
          getPredictionInsights(user.user_id)
        ]);
        
        const sortedHistory = (historyData || []).sort((a: any, b: any) => {
             const dateA = new Date(a.created_at).getTime();
             const dateB = new Date(b.created_at).getTime();
             return isNaN(dateA) || isNaN(dateB) ? 0 : dateB - dateA;
        });
        
        setHistory(sortedHistory);
        setInsights(insightsData);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (isLoading) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
        </div>
      </WebLayout>
    );
  }

  const query = new URLSearchParams(location.search).get('search') || '';
  const normalizedQuery = query.trim().toLowerCase();

  const hasHistory = history && history.length > 0;
  const baseHistory = hasHistory ? history : [
    { prediction_id: 'mock_1', decision_input: 'Career Switch Analysis', timeline: '1 Year', success_probability: 88, life_satisfaction: 78, financial_impact: 65 },
    { prediction_id: 'mock_2', decision_input: 'Relocation Strategy', timeline: '6 Months', success_probability: 92, life_satisfaction: 85, financial_impact: 70 },
    { prediction_id: 'mock_3', decision_input: 'Investment Portfolio', timeline: '5 Years', success_probability: 76, life_satisfaction: 70, financial_impact: 95 },
    { prediction_id: 'mock_4', decision_input: 'Skill Acquisition', timeline: '3 Months', success_probability: 95, life_satisfaction: 92, financial_impact: 85 },
  ];

  const filteredHistory = normalizedQuery
    ? baseHistory.filter((item: any) => {
        const searchableText = [
          item.decision_input,
          item.timeline,
          item.category,
          item.forecast_result,
          item.risk_level,
          item.alternative_scenario,
          item.future_comparison,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
    : baseHistory;

  const displayHistory = filteredHistory;

  // Example Chart Data
  const recentHistory = displayHistory.slice(0, 7).reverse();
  const satisfactionData = recentHistory.map((h: any, i) => ({
    name: `Dec ${i + 1}`,
    v: h.life_satisfaction || 50 + Math.random() * 40
  }));
  const financialData = recentHistory.map((h: any, i) => ({
    name: `Dec ${i + 1}`,
    v: h.financial_impact || 40 + Math.random() * 50
  }));

  const stats = [
    {
      label: 'Success Probability',
      value: `${displayHistory[0] ? (parseFloat(displayHistory[0].success_probability) > 95 ? 84 : Math.round(displayHistory[0].success_probability)) : 0}%`,
      change: '+12%',
      trend: 'up',
      icon: Target,
      color: 'blue',
      chartData: financialData
    },
    {
      label: 'Timeline',
      value: `${displayHistory[0]?.timeline || '6-12 months'}`,
      change: '',
      trend: 'up',
      icon: Clock,
      color: 'indigo',
      chartData: satisfactionData
    },
    {
      label: 'Financial Impact',
      value: `+₹${displayHistory[0] ? Math.round(displayHistory[0].financial_impact) : 0}K`,
      change: displayHistory.length > 1 ? `${Math.round(displayHistory[0].financial_impact - displayHistory[1].financial_impact)}K` : '+5K',
      trend: !displayHistory[1] || (displayHistory[0].financial_impact >= displayHistory[1].financial_impact) ? 'up' : 'down',
      icon: TrendingUp,
      color: 'emerald',
      chartData: financialData
    },
    {
      label: 'Life Satisfaction',
      value: `+${displayHistory[0] ? Math.round(displayHistory[0].life_satisfaction) : 0}%`,
      change: displayHistory.length > 1 ? `${Math.round(displayHistory[0].life_satisfaction - displayHistory[1].life_satisfaction)}%` : '+10%',
      trend: !displayHistory[1] || (displayHistory[0].life_satisfaction >= displayHistory[1].life_satisfaction) ? 'up' : 'down',
      icon: Sparkles,
      color: 'orange',
      chartData: satisfactionData
    }
  ];

  const categoryData = displayHistory[0] ? [
    { subject: 'Financial', value: Math.round(displayHistory[0].financial_impact || 75), fullMark: 100 },
    { subject: 'Career', value: Math.round(displayHistory[0].success_probability || 75), fullMark: 100 },
    { subject: 'Wellness', value: Math.round(displayHistory[0].life_satisfaction || 75), fullMark: 100 },
    { subject: 'Risk Cover', value: Math.round(100 - (displayHistory[0].alternative_scenario || 50)), fullMark: 100 },
    { subject: 'Growth', value: Math.round(displayHistory[0].future_comparison || 75), fullMark: 100 },
  ] : [
    { subject: 'Financial', value: 85, fullMark: 100 },
    { subject: 'Career', value: 92, fullMark: 100 },
    { subject: 'Wellness', value: 65, fullMark: 100 },
    { subject: 'Risk Cover', value: 80, fullMark: 100 },
    { subject: 'Growth', value: 88, fullMark: 100 },
  ];

  if (!hasHistory) {
    return (
      <WebLayout maxWidth="full">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center p-8 bg-white border border-dashed border-gray-200 rounded-[2.5rem] shadow-xl max-w-md mx-auto">
             <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
             <h2 className="text-2xl font-black text-gray-800 mb-2">No Simulation Data Yet</h2>
             <p className="text-sm text-gray-500 mb-6 font-medium">Run your first AI simulation to see live analytics and trends updates regarding your pathing.</p>
             <button onClick={() => navigate('/simulation-intro')} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-blue-500/25 transition-all">Start Simulation</button>
          </div>
        </div>
      </WebLayout>
    );
  }

  if (normalizedQuery && displayHistory.length === 0) {
    return (
      <WebLayout maxWidth="full">
        <div className="w-full min-h-screen bg-slate-50/50 text-slate-800">
          <div className="max-w-[1200px] mx-auto px-6 py-10">
            <div className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-xl text-center">
              <h1 className="text-3xl font-black text-gray-900 mb-3">No Search Results</h1>
              <p className="text-gray-600 mb-6">
                No analytics items matched "{query}".
              </p>
              <button
                onClick={() => navigate('/analytics')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg"
              >
                Clear Search
              </button>
            </div>
          </div>
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout maxWidth="full">
      <div className="w-full min-h-screen bg-slate-50/50 text-slate-800 relative">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 space-y-8 relative z-10">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-200/80 shadow-xl shadow-gray-100/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full -mr-32 -mt-32 blur-2xl group-hover:scale-110 transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping mr-1" />
                <Activity className="w-4 h-4" />
                <span>Executive Dashboard</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-pink-600 tracking-tight">Performance Analytics</h1>
              <p className="text-gray-500 mt-2 text-lg font-medium">Comprehensive overview of your decision impact and future trajectories.</p>
              {query ? (
                <p className="text-teal-600 mt-3 text-sm font-semibold">Showing results for "{query}"</p>
              ) : null}
            </div>
            
            <div className="flex items-center gap-4 relative z-10">
              {/* Action buttons removed from dashboard header */}
            </div>
          </div>

          {/* Level 1: Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <WebCard key={i} className={`p-6 border border-gray-100 shadow-lg bg-white rounded-3xl hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300 relative overflow-hidden group`}>
                <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity bg-${stat.color}-500`} />
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm font-bold text-gray-500 mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                      stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 
                      stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                      'bg-orange-50 text-orange-600'
                  }`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                {stat.label !== 'Timeline' && (
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`flex items-center text-sm font-bold ${stat.trend === 'up' && stat.color !== 'emerald' ? 'text-emerald-400' : stat.trend === 'down' && stat.color === 'emerald' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                      {stat.change}
                    </span>
                    <span className="text-sm text-slate-500">vs last month</span>
                  </div>
                )}
                <div className="h-16 w-full -mx-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stat.chartData}>
                      <defs>
                        <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={stat.color === 'blue' ? '#3b82f6' : stat.color === 'indigo' ? '#6366f1' : stat.color === 'emerald' ? '#10b981' : '#f59e0b'} stopOpacity={0.4}/>
                          <stop offset="100%" stopColor={stat.color === 'blue' ? '#3b82f6' : stat.color === 'indigo' ? '#6366f1' : stat.color === 'emerald' ? '#10b981' : '#f59e0b'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke={stat.color === 'blue' ? '#3b82f6' : stat.color === 'indigo' ? '#6366f1' : stat.color === 'emerald' ? '#10b981' : '#f59e0b'} strokeWidth={2.5} fill={`url(#grad-${i})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </WebCard>
            ))}
          </div>

          {/* Level 2: Advanced Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <WebCard className="lg:col-span-2 p-8 border border-white/10 shadow-2xl bg-slate-900/60 backdrop-blur-xl rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full -mr-40 -mt-40 blur-3xl opacity-40" />
              <div className="flex justify-between items-center mb-8 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Historical Decisions</h3>
                  <p className="text-slate-400 mt-1 font-medium">Impact scores across your timeline</p>
                </div>
                <select className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none font-semibold">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>All Time</option>
                </select>
              </div>
              <div className="h-[350px] w-full mt-4 relative z-10">
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={financialData.map((d,i) => ({...d, s: satisfactionData[i].v}))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorFinancial" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity={0.6}/>
                        <stop offset="100%" stopColor="#818cf8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorSatisfaction" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.6}/>
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                      itemStyle={{ color: '#f8fafc' }}
                    />
                    <Area type="monotone" dataKey="v" name="Financial Impact" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorFinancial)" />
                    <Area type="monotone" dataKey="s" name="Life Satisfaction" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorSatisfaction)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </WebCard>

            <WebCard className="p-8 border border-gray-100 shadow-lg bg-white rounded-3xl flex flex-col justify-between">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Focus Distribution</h3>
                <p className="text-gray-500 mt-1 font-medium">Core life domains alignment</p>
              </div>
              <div className="flex-1 w-full h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={categoryData}>
                    <PolarGrid stroke="#e2e8f0" strokeWidth={1} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                    <Radar
                      name="Current Focus"
                      dataKey="value"
                      stroke="#6366f1"
                      strokeWidth={3}
                      fill="#6366f1"
                      fillOpacity={0.15}
                    />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#1e293b' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-indigo-50/80 rounded-2xl border border-indigo-100/80 shadow-sm">
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-indigo-900 font-semibold leading-relaxed">
                    {insights?.weekly_summary?.status ? `${insights.weekly_summary.status}. ${insights.forecast?.message || ""}` : "Your recent simulation mapping is processing. AI suggests continuing your current alignment for best results."}
                  </p>
                </div>
              </div>
            </WebCard>
          </div>



        </div>
      </div>
    </WebLayout>
  );
}
