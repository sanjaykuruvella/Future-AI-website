import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { 
  TrendingUp, Award, Target, Sparkles, Calendar, Download,
  ArrowUpRight, ArrowDownRight, TrendingDown, Trophy, Star,
  Zap, Clock, CheckCircle2, Activity
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadialBarChart, RadialBar, PolarAngleAxis, ComposedChart
} from 'recharts';

type Period = 'week' | 'month' | 'quarter' | 'year';

export default function GrowthMetricsScreenWeb() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');

  const metrics = [
    {
      label: 'Decision Quality',
      current: 87,
      previous: 72,
      change: '+15',
      trend: 'up',
      icon: Target,
      color: 'blue',
      target: 95,
      description: 'Overall quality of decisions made'
    },
    {
      label: 'Success Rate',
      current: 82,
      previous: 76,
      change: '+6',
      trend: 'up',
      icon: TrendingUp,
      color: 'green',
      target: 90,
      description: 'Percentage of successful outcomes'
    },
    {
      label: 'Goal Alignment',
      current: 91,
      previous: 85,
      change: '+6',
      trend: 'up',
      icon: Sparkles,
      color: 'purple',
      target: 95,
      description: 'How well decisions align with goals'
    },
    {
      label: 'Risk Management',
      current: 78,
      previous: 65,
      change: '+13',
      trend: 'up',
      icon: Award,
      color: 'orange',
      target: 85,
      description: 'Effectiveness in managing risks'
    },
    {
      label: 'Decision Speed',
      current: 85,
      previous: 79,
      change: '+6',
      trend: 'up',
      icon: Zap,
      color: 'yellow',
      target: 90,
      description: 'Time taken to make decisions'
    },
    {
      label: 'Consistency',
      current: 88,
      previous: 82,
      change: '+6',
      trend: 'up',
      icon: Activity,
      color: 'pink',
      target: 92,
      description: 'Regularity in decision patterns'
    }
  ];

  // Monthly progress data
  const progressData = [
    { month: 'Oct', quality: 72, success: 76, alignment: 85, risk: 65, speed: 79, consistency: 82 },
    { month: 'Nov', quality: 75, success: 78, alignment: 86, risk: 68, speed: 80, consistency: 83 },
    { month: 'Dec', quality: 78, success: 79, alignment: 87, risk: 70, speed: 81, consistency: 84 },
    { month: 'Jan', quality: 82, success: 80, alignment: 89, risk: 73, speed: 82, consistency: 85 },
    { month: 'Feb', quality: 85, success: 81, alignment: 90, risk: 75, speed: 84, consistency: 87 },
    { month: 'Mar', quality: 87, success: 82, alignment: 91, risk: 78, speed: 85, consistency: 88 }
  ];

  // Radial chart data for current metrics
  const radialData = metrics.map(m => ({
    name: m.label,
    value: m.current,
    fill: `var(--color-${m.color})`
  }));

  const achievements = [
    {
      icon: Trophy,
      color: 'yellow',
      title: 'Decision Master',
      description: 'Made 15 successful predictions this month',
      date: 'Mar 1, 2026',
      points: 150,
      rarity: 'gold'
    },
    {
      icon: Zap,
      color: 'blue',
      title: 'Speed Demon',
      description: 'Improved decision speed by 25%',
      date: 'Feb 28, 2026',
      points: 100,
      rarity: 'silver'
    },
    {
      icon: Target,
      color: 'purple',
      title: 'Goal Achiever',
      description: 'Maintained 90%+ goal alignment for 3 months',
      date: 'Feb 15, 2026',
      points: 200,
      rarity: 'gold'
    },
    {
      icon: Star,
      color: 'green',
      title: 'Consistency Champion',
      description: 'Daily simulations for 30 consecutive days',
      date: 'Feb 10, 2026',
      points: 120,
      rarity: 'silver'
    },
    {
      icon: Award,
      color: 'orange',
      title: 'Risk Manager',
      description: 'Successfully navigated 10 high-risk scenarios',
      date: 'Jan 25, 2026',
      points: 80,
      rarity: 'bronze'
    },
    {
      icon: TrendingUp,
      color: 'pink',
      title: 'Growth Guru',
      description: '+10% improvement across all categories',
      date: 'Jan 15, 2026',
      points: 180,
      rarity: 'gold'
    }
  ];

  const milestones = [
    { title: '100 Simulations', current: 68, target: 100, percentage: 68 },
    { title: '50 Goals Completed', current: 42, target: 50, percentage: 84 },
    { title: '90% Success Rate', current: 82, target: 90, percentage: 91 },
    { title: '30 Day Streak', current: 30, target: 30, percentage: 100 }
  ];

  const colorMap: Record<string, string> = {
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#8b5cf6',
    orange: '#f59e0b',
    yellow: '#eab308',
    pink: '#ec4899'
  };

  const getRarityBadge = (rarity: string) => {
    const styles = {
      gold: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
      silver: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white',
      bronze: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
    };
    return styles[rarity as keyof typeof styles] || styles.bronze;
  };

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
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-xl p-1">
              {(['week', 'month', 'quarter', 'year'] as Period[]).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg transition-all text-sm font-medium capitalize ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {period}
                </button>
              ))}
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
                      <div className="text-4xl font-bold">84</div>
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
        <div className="grid grid-cols-3 gap-4">
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

        {/* Milestones Progress */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Milestones</h3>
          <div className="grid grid-cols-4 gap-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className="text-center mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">{milestone.title}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {milestone.current}/{milestone.target}
                  </p>
                </div>
                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${milestone.percentage}%` }}
                  />
                </div>
                <p className="text-center text-xs text-gray-600 mt-2">{milestone.percentage}% Complete</p>
                {milestone.percentage === 100 && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Recent Achievements</h3>
              <p className="text-sm text-gray-600">Unlock badges by reaching milestones</p>
            </div>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 rounded-xl text-white">
              <Trophy className="w-5 h-5" />
              <span className="font-bold">Total Points: 830</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all">
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`w-12 h-12 bg-${achievement.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <achievement.icon className={`w-6 h-6 text-${achievement.color}-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getRarityBadge(achievement.rarity)}`}>
                        {achievement.rarity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{achievement.date}</span>
                      <span className="flex items-center space-x-1 text-yellow-600 font-bold text-sm">
                        <Star className="w-4 h-4" />
                        <span>{achievement.points}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
