import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { 
  TrendingUp, TrendingDown, Minus, Calendar, Download, 
  Filter, BarChart3, LineChart, PieChart, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { LineChart as RechartsLine, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';
type ChartType = 'line' | 'area' | 'bar';

export default function TrendAnalysisScreenWeb() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [chartType, setChartType] = useState<ChartType>('area');

  // Monthly trend data
  const monthlyData = [
    { month: 'Oct 2025', career: 65, finance: 58, education: 72, health: 68, overall: 66 },
    { month: 'Nov 2025', career: 68, finance: 62, education: 75, health: 70, overall: 69 },
    { month: 'Dec 2025', career: 72, finance: 65, education: 78, health: 72, overall: 72 },
    { month: 'Jan 2026', career: 75, finance: 68, education: 80, health: 74, overall: 74 },
    { month: 'Feb 2026', career: 82, finance: 70, education: 82, health: 76, overall: 78 },
    { month: 'Mar 2026', career: 87, finance: 72, education: 85, health: 78, overall: 81 }
  ];

  // Weekly data (last 7 days)
  const weeklyData = [
    { day: 'Mon', career: 84, finance: 70, education: 83, health: 76, overall: 78 },
    { day: 'Tue', career: 85, finance: 71, education: 84, health: 77, overall: 79 },
    { day: 'Wed', career: 86, finance: 71, education: 84, health: 77, overall: 80 },
    { day: 'Thu', career: 87, finance: 72, education: 85, health: 78, overall: 81 },
    { day: 'Fri', career: 87, finance: 72, education: 85, health: 78, overall: 81 },
    { day: 'Sat', career: 87, finance: 72, education: 85, health: 78, overall: 81 },
    { day: 'Sun', career: 87, finance: 72, education: 85, health: 78, overall: 81 }
  ];

  // Decision quality by category
  const categoryData = [
    { name: 'Career', value: 87, color: '#3b82f6' },
    { name: 'Finance', value: 72, color: '#10b981' },
    { name: 'Education', value: 85, color: '#8b5cf6' },
    { name: 'Health', value: 78, color: '#f59e0b' }
  ];

  // Performance radar
  const radarData = [
    { category: 'Decision Speed', value: 85, fullMark: 100 },
    { category: 'Risk Assessment', value: 78, fullMark: 100 },
    { category: 'Goal Alignment', value: 91, fullMark: 100 },
    { category: 'Success Rate', value: 82, fullMark: 100 },
    { category: 'Consistency', value: 88, fullMark: 100 },
    { category: 'Adaptability', value: 75, fullMark: 100 }
  ];

  const trends = [
    {
      category: 'Career Decisions',
      trend: 'up',
      change: '+12%',
      current: 87,
      previous: 75,
      description: 'Success rate improving over time',
      color: 'blue',
      decisions: 23,
      avgConfidence: 89
    },
    {
      category: 'Financial Choices',
      trend: 'stable',
      change: '+2%',
      current: 72,
      previous: 70,
      description: 'Consistent decision quality',
      color: 'green',
      decisions: 15,
      avgConfidence: 76
    },
    {
      category: 'Education Path',
      trend: 'up',
      change: '+13%',
      current: 85,
      previous: 72,
      description: 'Strong upward momentum',
      color: 'purple',
      decisions: 18,
      avgConfidence: 87
    },
    {
      category: 'Life Balance',
      trend: 'up',
      change: '+10%',
      current: 78,
      previous: 68,
      description: 'Significant improvement',
      color: 'orange',
      decisions: 12,
      avgConfidence: 80
    }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return TrendingUp;
    if (trend === 'down') return TrendingDown;
    return Minus;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendBg = (trend: string) => {
    if (trend === 'up') return 'bg-green-100';
    if (trend === 'down') return 'bg-red-100';
    return 'bg-gray-100';
  };

  const getCurrentData = () => {
    switch (timeRange) {
      case '7d':
        return weeklyData;
      case '30d':
      case '90d':
      case '1y':
      case 'all':
      default:
        return monthlyData;
    }
  };

  const renderChart = () => {
    const data = getCurrentData();
    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: 0, bottom: 0 }
    };

    const colors = {
      career: '#3b82f6',
      finance: '#10b981',
      education: '#8b5cf6',
      health: '#f59e0b',
      overall: '#6366f1'
    };

    switch (chartType) {
      case 'line':
        return (
          <RechartsLine {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={timeRange === '7d' ? 'day' : 'month'} stroke="#6b7280" />
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
            <Line type="monotone" dataKey="career" stroke={colors.career} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            <Line type="monotone" dataKey="finance" stroke={colors.finance} strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="education" stroke={colors.education} strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="health" stroke={colors.health} strokeWidth={3} dot={{ r: 5 }} />
          </RechartsLine>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorCareer" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.career} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colors.career} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorFinance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.finance} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colors.finance} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEducation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.education} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colors.education} stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.health} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colors.health} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={timeRange === '7d' ? 'day' : 'month'} stroke="#6b7280" />
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
            <Area type="monotone" dataKey="career" stroke={colors.career} fillOpacity={1} fill="url(#colorCareer)" strokeWidth={2} />
            <Area type="monotone" dataKey="finance" stroke={colors.finance} fillOpacity={1} fill="url(#colorFinance)" strokeWidth={2} />
            <Area type="monotone" dataKey="education" stroke={colors.education} fillOpacity={1} fill="url(#colorEducation)" strokeWidth={2} />
            <Area type="monotone" dataKey="health" stroke={colors.health} fillOpacity={1} fill="url(#colorHealth)" strokeWidth={2} />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={timeRange === '7d' ? 'day' : 'month'} stroke="#6b7280" />
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
            <Bar dataKey="career" fill={colors.career} radius={[8, 8, 0, 0]} />
            <Bar dataKey="finance" fill={colors.finance} radius={[8, 8, 0, 0]} />
            <Bar dataKey="education" fill={colors.education} radius={[8, 8, 0, 0]} />
            <Bar dataKey="health" fill={colors.health} radius={[8, 8, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <WebLayout maxWidth="full">
      <div className="space-y-6 max-w-[1600px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Trend Analysis</h1>
            <p className="text-gray-600">Track your decision-making patterns and performance over time</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-xl hover:shadow-lg transition-all">
            <Download className="w-5 h-5 text-gray-700" />
            <span className="font-medium text-gray-700">Export Report</span>
          </button>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8" />
              <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-bold">+15%</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">81</div>
            <p className="text-white/80 text-sm">Overall Score</p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-bold text-green-600">+12%</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">68</div>
            <p className="text-gray-600 text-sm">Total Simulations</p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-sm font-bold text-green-600">+8%</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">84%</div>
            <p className="text-gray-600 text-sm">Success Rate</p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-bold text-purple-600">Active</span>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-1">156</div>
            <p className="text-gray-600 text-sm">Day Streak</p>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Performance Trends</h3>
              <p className="text-sm text-gray-600">Decision quality across all categories</p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Chart Type Selector */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded-lg transition-all ${
                    chartType === 'line' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <LineChart className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={() => setChartType('area')}
                  className={`p-2 rounded-lg transition-all ${
                    chartType === 'area' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-2 rounded-lg transition-all ${
                    chartType === 'bar' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-gray-700" />
                </button>
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center space-x-2">
                {(['7d', '30d', '90d', '1y', 'all'] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                      timeRange === range
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : range === '1y' ? '1 Year' : 'All Time'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-96" style={{ minHeight: '384px', width: '100%' }}>
            <ResponsiveContainer width="100%" height={384}>
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Charts Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Category Distribution */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Category Distribution</h3>
            <div className="h-80" style={{ minHeight: '320px', width: '100%' }}>
              <ResponsiveContainer width="100%" height={320}>
                <RechartsPie>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Radar */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Analysis</h3>
            <div className="h-80" style={{ minHeight: '320px', width: '100%' }}>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                  <Radar name="Score" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} strokeWidth={2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Trend Cards */}
        <div className="grid grid-cols-2 gap-4">
          {trends.map((trend, index) => {
            const TrendIcon = getTrendIcon(trend.trend);
            return (
              <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-${trend.color}-100 rounded-xl flex items-center justify-center`}>
                      <BarChart3 className={`w-6 h-6 text-${trend.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{trend.category}</h3>
                      <p className="text-sm text-gray-600">{trend.description}</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-xl ${getTrendBg(trend.trend)}`}>
                    <TrendIcon className={`w-5 h-5 ${getTrendColor(trend.trend)}`} />
                    <span className={`font-bold ${getTrendColor(trend.trend)}`}>{trend.change}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Current</p>
                    <p className="text-2xl font-bold text-gray-800">{trend.current}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Decisions</p>
                    <p className="text-2xl font-bold text-gray-800">{trend.decisions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Confidence</p>
                    <p className="text-2xl font-bold text-gray-800">{trend.avgConfidence}%</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-800">{trend.current}%</span>
                  </div>
                  <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`absolute h-full bg-gradient-to-r from-${trend.color}-500 to-${trend.color}-600 transition-all duration-500 rounded-full`}
                      style={{ width: `${trend.current}%` }}
                    />
                    <div
                      className="absolute h-full border-r-2 border-gray-400"
                      style={{ left: `${trend.previous}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Previous: {trend.previous}</span>
                    <span>Target: 95</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-gray-700 mb-3">
                Your decision-making has improved significantly over the past 6 months. Career decisions show the strongest upward trend (+12%), driven by better risk assessment and goal alignment. Financial decisions remain stable but could benefit from more frequent reviews. Consider scheduling weekly financial check-ins to boost this metric.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  +15% Overall Growth
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Consistent Performance
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  Above Average Progress
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebLayout>
  );
}
