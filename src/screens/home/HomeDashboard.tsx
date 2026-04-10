import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { BottomNav } from '../../components/BottomNav';
import {
  Sparkles, TrendingUp, Target, User,
  MessageCircle, BarChart3, History, AlertTriangle,
  Zap, Brain, ArrowRight, Activity
} from 'lucide-react';

export default function HomeDashboard() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="h-full flex flex-col bg-slate-50">
        <div className="flex-1 overflow-y-auto px-5 py-6 pb-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-800 tracking-tight">FutureVision</h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Alex • Premium</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate('/profile')}
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm"
              >
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <GlassCard className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">Future Score</p>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-black text-blue-600">87</span>
                <span className="text-[10px] text-gray-400 font-bold">/100</span>
              </div>
              <div className="flex items-center space-x-1 text-[10px] text-green-600 font-bold mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+5.2%</span>
              </div>
            </GlassCard>
            <GlassCard className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">Active Goals</p>
              <span className="text-2xl font-black text-emerald-600">12</span>
              <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
              </div>
            </GlassCard>
          </div>

          {/* AI Chat CTA - Large & Premium */}
          <GlassCard
            onClick={() => navigate('/ai-chat')}
            className="mb-6 bg-gradient-to-br from-gray-900 to-slate-800 border-none relative overflow-hidden active:scale-95 transition-transform"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative flex items-center space-x-4 py-1">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black text-white uppercase tracking-tight">AI Assistant</h3>
                <p className="text-[10px] text-blue-200 font-medium">Test decisions in real-time</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </div>
          </GlassCard>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <Button onClick={() => navigate('/simulation-intro')} className="py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
              <Zap className="w-4 h-4 mr-2" />
              <span className="text-xs font-bold uppercase tracking-tight">Simulate</span>
            </Button>
            <Button onClick={() => navigate('/quick-simulation')} variant="secondary" className="py-5 rounded-2xl border-gray-200 hover:bg-gray-100">
              <Target className="w-4 h-4 mr-2" />
              <span className="text-xs font-bold uppercase tracking-tight">Quick start</span>
            </Button>
          </div>

          {/* Mini Dashboard Grid */}
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Analytics & Trends</h3>
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button onClick={() => navigate('/analytics')} className="flex flex-col items-center space-y-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-[9px] font-black text-gray-600 uppercase">Metrics</span>
            </button>
            <button onClick={() => navigate('/analysis/trends')} className="flex flex-col items-center space-y-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <History className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-[9px] font-black text-gray-600 uppercase">History</span>
            </button>
            <button onClick={() => navigate('/analysis/growth')} className="flex flex-col items-center space-y-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-[9px] font-black text-gray-600 uppercase">Alerts</span>
            </button>
          </div>

          {/* Daily Insight Section */}
          <div className="mb-8">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Daily Insight</h3>
            <GlassCard className="border-purple-100 bg-gradient-to-br from-purple-50 to-white">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-800 mb-1 italic">"Financial upskilling focus has reduced long-term risk by 12%."</p>
                  <button onClick={() => navigate('/analytics')} className="text-[10px] font-black text-purple-600 uppercase tracking-tighter underline">Full Analysis</button>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Recent List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Recent Activity</h3>
              <button onClick={() => navigate('/analytics')} className="text-[10px] font-bold text-blue-600 uppercase">See all</button>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Career Tech Shift', time: '2h ago', level: 'High', color: 'blue' },
                { title: 'Mutual Fund Sim', time: 'Yesterday', level: 'Pos', color: 'emerald' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50" onClick={() => navigate('/analytics')}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color === 'blue' ? 'bg-blue-100' : 'bg-emerald-100'}`}>
                      <Activity className={`w-4 h-4 ${item.color === 'blue' ? 'text-blue-600' : 'text-emerald-600'}`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{item.title}</p>
                      <p className="text-[9px] text-gray-400 font-medium">{item.time}</p>
                    </div>
                  </div>
                  <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${item.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {item.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </MobileLayout>
  );
}