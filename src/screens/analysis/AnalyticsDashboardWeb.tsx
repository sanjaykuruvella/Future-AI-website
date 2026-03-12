import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import {
  TrendingUp, BarChart3, Activity, Target,
  ArrowUpRight, ArrowDownRight, Brain, ShieldCheck,
  Zap, Loader2
} from 'lucide-react';
import {
  AreaChart, Area, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip
} from 'recharts';
import { getPredictionsHistory, getPredictionInsights } from '../../api/prediction';

export default function AnalyticsDashboardWeb() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<any[]>([]);
  const [insights, setInsights] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        navigate('/login');
        return;
      }
      const user = JSON.parse(userStr);
      const userId = user.user_id;

      try {
        const [historyData, insightsData] = await Promise.all([
          getPredictionsHistory(userId),
          getPredictionInsights(userId)
        ]);
        setHistory(historyData);
        setInsights(insightsData);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
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

  // Summary stats with extra visual data
  const stats = [
    {
      label: 'Total Simulations',
      value: history.length,
      change: history.length > 0 ? `+${Math.min(history.length, 12)}%` : '0%',
      trend: 'up',
      icon: BarChart3,
      color: 'blue',
      chartData: history.slice(0, 7).reverse().map(h => ({ v: h.success_probability }))
    },
    {
      label: 'Success Rate',
      value: `${insights?.weekly_summary?.avg_success || 0}%`,
      change: insights?.weekly_summary?.status || 'No data',
      trend: 'up',
      icon: TrendingUp,
      color: 'emerald',
      chartData: history.slice(0, 7).reverse().map(h => ({ v: h.success_probability }))
    },
    {
      label: 'Financial Impact',
      value: history[0]?.financial_impact ? Math.round(history[0].financial_impact) : 0,
      change: '+15',
      trend: 'up',
      icon: Target,
      color: 'purple',
      chartData: history.slice(0, 7).reverse().map(h => ({ v: h.financial_impact }))
    },
    {
      label: 'Life Satisfaction',
      value: history[0]?.life_satisfaction ? Math.round(history[0].life_satisfaction) : 0,
      change: 'Record',
      trend: 'up',
      icon: Zap,
      color: 'orange',
      chartData: history.slice(0, 7).reverse().map(h => ({ v: h.life_satisfaction }))
    }
  ];



  // Category breakdown for Radar Chart
  const categoryData = [
    { subject: 'Career', value: 85, fullMark: 100 },
    { subject: 'Finance', value: 72, fullMark: 100 },
    { subject: 'Growth', value: 94, fullMark: 100 },
    { subject: 'Wellness', value: 65, fullMark: 100 },
    { subject: 'Impact', value: 78, fullMark: 100 }
  ];

  // Helper for legend (using the original name mapping)
  const legendData = [
    { name: 'Career', value: 35, color: '#3b82f6' },
    { name: 'Finance', value: 28, color: '#10b981' },
    { name: 'Growth', value: 25, color: '#8b5cf6' },
    { name: 'Wellness', value: 12, color: '#f59e0b' }
  ];




  return (
    <WebLayout maxWidth="full">
      <div className="w-full px-8 space-y-10 pb-16 pt-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 text-sm font-black text-blue-600 uppercase tracking-widest mb-1.5">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              <span>Elite Intelligence Terminal</span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Performance Analysis</h1>
            <p className="text-lg text-gray-500 mt-1 font-medium">Real-time optimization of your adaptive decision matrix</p>
          </div>
        </div>

        {/* Level 1: Key Performance Indicators (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <WebCard key={i} className="group overflow-hidden relative border-none shadow-2xl shadow-gray-200/40 p-8">
              <div className={`absolute top-0 right-0 w-40 h-40 bg-${stat.color === 'emerald' ? 'emerald' : stat.color}-500/5 rounded-full -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700`} />

              <div className="relative flex flex-col h-full justify-between">
                <div className="flex items-start justify-between mb-10">
                  <div>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                    <div className="flex items-baseline space-x-3">
                      <span className="text-5xl font-black text-gray-900 tracking-tighter">{stat.value}</span>
                      <div className={`flex items-center text-xs font-black ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-0.5" /> : <ArrowDownRight className="w-4 h-4 mr-0.5" />}
                        {stat.change}
                      </div>
                    </div>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${
                    stat.color === 'blue' ? 'bg-blue-600 shadow-blue-500/25' :
                    stat.color === 'emerald' ? 'bg-emerald-600 shadow-emerald-500/25' :
                    stat.color === 'purple' ? 'bg-purple-600 shadow-purple-500/25' : 'bg-orange-600 shadow-orange-500/25'
                  }`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="h-20 w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stat.chartData}>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={
                          stat.color === 'blue' ? '#2563eb' :
                          stat.color === 'emerald' ? '#059669' :
                          stat.color === 'purple' ? '#9333ea' : '#ea580c'
                        }
                        strokeWidth={4}
                        fillOpacity={0.2}
                        fill={
                          stat.color === 'blue' ? '#3b82f6' :
                          stat.color === 'emerald' ? '#10b981' :
                          stat.color === 'purple' ? '#a855f7' : '#f97316'
                        }
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </WebCard>
          ))}
        </div>

        {/* Level 2: Advanced Visualizations (Full-Width Decision Focus) */}
        <div className="grid grid-cols-1 gap-10">
          <WebCard className="border-none shadow-2xl shadow-gray-200/40 p-12">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h3 className="text-4xl font-black text-gray-900 tracking-tighter">Decision Balance</h3>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-2">Dynamic Equilibrium Profile</p>
              </div>
              <div className="w-20 h-20 bg-blue-50 rounded-[32px] flex items-center justify-center shadow-inner">
                <Brain className="w-10 h-10 text-blue-600" />
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="w-full lg:w-[45%] h-[500px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoryData}>
                    <PolarGrid stroke="#e2e8f0" strokeWidth={1} />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ fill: '#64748b', fontSize: 14, fontWeight: 900 }}
                    />
                    <PolarRadiusAxis 
                      angle={30} 
                      domain={[0, 100]} 
                      tick={false} 
                      axisLine={false} 
                    />
                    <Radar
                      name="Elite Profile"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={6}
                      fill="#3b82f6"
                      fillOpacity={0.2}
                      animationDuration={3500}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 30px -5px rgb(0 0 0 / 0.1)' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full lg:w-[55%] space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {legendData.map((c, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between group cursor-default">
                        <div className="flex items-center space-x-4">
                          <div className="w-6 h-6 rounded-xl shadow-md" style={{ backgroundColor: c.color }} />
                          <span className="text-base font-black text-gray-700 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{c.name} Focus</span>
                        </div>
                        <span className="text-lg font-black text-gray-900">{c.value}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full rounded-full transition-all duration-1500 group-hover:opacity-80" style={{ width: `${c.value}%`, backgroundColor: c.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-blue-50/50 rounded-[32px] border border-blue-100/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full -mr-12 -mt-12 blur-2xl" />
                  <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-3">AI Contextual Analysis</p>
                  <p className="text-xl text-blue-900 font-medium leading-relaxed italic">
                    "Your high focus on <span className="font-black">Career</span> is yielding dividends, but consider 15% more allocation to <span className="font-black">Wellness</span> to sustain long-term growth and maintain peak cognitive performance."
                  </p>
                </div>
              </div>
            </div>
          </WebCard>
        </div>

        {/* Level 3: Holistic Intelligence Matrix */}
        <div className="grid grid-cols-1 gap-10">
          <WebCard className="border-none shadow-2xl shadow-gray-200/40 p-12 h-full">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h3 className="text-4xl font-black text-gray-900 tracking-tighter">Architecture Efficiency</h3>
                <p className="text-lg text-gray-400 font-bold uppercase tracking-widest mt-1">Global benchmark comparison</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { label: 'Decision Logic', score: 87, color: 'blue', icon: Brain, status: 'Optimal', tip: 'Exceptional consistency in logical loops.' },
                { label: 'Risk Mitigation', score: 72, color: 'purple', icon: ShieldCheck, status: 'Active', tip: 'Solid avoidance of systemic failure.' },
                { label: 'Goal Alignment', score: 94, color: 'emerald', icon: Target, status: 'Elite', tip: 'Absolute focus on target objectives.' },
                { label: 'Efficiency', score: 82, color: 'orange', icon: Zap, status: 'Maximized', tip: 'Rapid transition from data to action.' }
              ].map((m, i) => (
                <div key={i} className="group p-10 bg-gray-50/50 rounded-[48px] border border-gray-100/50 hover:bg-white hover:shadow-4xl hover:scale-[1.05] transition-all duration-700">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-2xl bg-white ${
                      m.color === 'blue' ? 'text-blue-600 shadow-blue-500/15' :
                      m.color === 'emerald' ? 'text-emerald-600 shadow-emerald-500/15' :
                      m.color === 'purple' ? 'text-purple-600 shadow-purple-500/15' : 'text-orange-600 shadow-orange-500/15'
                    }`}>
                      <m.icon className="w-8 h-8" />
                    </div>
                    <span className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] ${
                      m.status === 'Optimal' ? 'bg-blue-100 text-blue-600' :
                      m.status === 'Elite' ? 'bg-emerald-100 text-emerald-600' :
                      m.status === 'Improving' || m.status === 'Active' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  
                  <div className="mb-10">
                    <div className="flex justify-between items-baseline mb-3">
                      <p className="text-2xl font-black text-gray-900 tracking-tight">{m.label}</p>
                      <span className={`text-3xl font-black ${
                        m.color === 'blue' ? 'text-blue-600' :
                        m.color === 'emerald' ? 'text-emerald-600' :
                        m.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                      }`}>{m.score}%</span>
                    </div>
                    <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden p-1.5 shadow-inner">
                      <div className={`h-full rounded-full transition-all duration-[2000ms] ease-out ${
                        m.color === 'blue' ? 'bg-blue-600 shadow-lg shadow-blue-500/40' :
                        m.color === 'emerald' ? 'bg-emerald-600 shadow-lg shadow-emerald-500/40' :
                        m.color === 'purple' ? 'bg-purple-600 shadow-lg shadow-purple-500/40' : 'bg-orange-600 shadow-lg shadow-orange-500/40'
                      }`} style={{ width: `${m.score}%` }} />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 font-bold italic mb-10 leading-relaxed min-h-[40px]">
                    "{m.tip}"
                  </p>

                  <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">Global Percentile</p>
                      <span className="text-lg font-black text-gray-900">Top {100 - m.score}%</span>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${
                       m.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                       m.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                       m.color === 'purple' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </WebCard>
        </div>
      </div>
    </WebLayout>
  );
}
