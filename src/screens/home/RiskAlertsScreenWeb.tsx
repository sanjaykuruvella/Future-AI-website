import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { AlertTriangle, AlertCircle, XCircle, ArrowLeft, ShieldAlert, Bell, History, Info, Lightbulb, Loader2, CheckCircle2 } from 'lucide-react';
import { getPredictionInsights } from '../../api/prediction';
import { useState, useEffect } from 'react';

export default function RiskAlertsScreenWeb() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : { user_id: 1 };

      try {
        const response = await getPredictionInsights(user.user_id);
        if (response.alerts) {
          setAlerts(response.alerts);
        }
      } catch (err: any) {
        setError('Failed to load alerts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'risk': return XCircle;
      case 'warning': return AlertTriangle;
      case 'wellbeing': return AlertCircle;
      default: return Info;
    }
  };

  const getLevelColor = (level: string) => {
    if (level === 'high') return 'from-red-600 to-red-700';
    if (level === 'medium') return 'from-orange-500 to-orange-600';
    return 'from-blue-500 to-blue-600';
  };

  const getLevelBg = (level: string) => {
    if (level === 'high') return 'bg-red-50 border-red-200';
    if (level === 'medium') return 'bg-orange-50 border-orange-200';
    return 'bg-blue-50 border-blue-200';
  };

  const getStatusBadge = (level: string) => {
    if (level === 'high') return 'bg-red-100 text-red-700 border-red-200';
    if (level === 'medium') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  return (
    <WebLayout maxWidth="xl">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 rounded-full mb-4 text-sm font-bold border border-red-200">
              <ShieldAlert className="w-4 h-4" />
              <span>Priority Action Required</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Priority Alerts Center</h1>
            <p className="text-lg text-gray-600">AI-detected risks and bottlenecks that require your immediate attention.</p>
          </div>

          <div className="flex items-center space-x-4">
             <div className="text-right hidden md:block">
                <p className="text-sm text-gray-500 font-medium">Last Updated</p>
                <p className="text-sm font-bold text-gray-800">14 mins ago</p>
             </div>
             <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
                <Bell className="w-6 h-6 text-gray-600" />
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              Active Alerts ({alerts.length})
            </h2>
            <button className="text-sm font-semibold text-blue-600 hover:underline">Mark all as seen</button>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-2xl border border-gray-100">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Analyzing your simulations...</p>
            </div>
          ) : alerts.length === 0 ? (
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-12 text-center border border-gray-100">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">You're All Clear!</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No major risks detected in your recent simulations. Keep up the good work!
              </p>
            </div>
          ) : (
            alerts.map((alert, index) => {
              const Icon = getAlertIcon(alert.type);
              const level = alert.type === 'risk' ? 'high' : alert.type === 'warning' ? 'medium' : 'low';
              
              return (
                <WebCard key={index} className={`${getLevelBg(level)} border shadow-sm group mb-6`} hover>
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${getLevelColor(level)} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-black border uppercase tracking-widest ${getStatusBadge(level)}`}>
                            {level === 'high' ? 'CRITICAL' : level === 'medium' ? 'WARNING' : 'INFO'}
                          </span>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{alert.type}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-400 flex items-center">
                          <History className="w-3 h-3 mr-1" />
                          Just now
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900">{alert.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{alert.message}</p>
                      
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm mb-4">
                        <div className="flex items-center space-x-2 mb-2 text-blue-700">
                          <Lightbulb className="w-4 h-4 font-bold" />
                          <p className="text-xs font-black uppercase tracking-widest">AI Recommendation</p>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed italic">{alert.recommendation}</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => navigate('/quick-simulation')}
                          className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all"
                        >
                          Resolve Now
                        </button>
                        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </WebCard>
              );
            })
          )}
        </div>

        <div className="space-y-6">
          <WebCard className="bg-gradient-to-br from-blue-600 to-indigo-700 border-none text-white">
            <div className="p-2">
               <h3 className="text-xl font-bold mb-4 flex items-center">
                  <ShieldAlert className="w-5 h-5 mr-2" />
                  Alert Security
               </h3>
               <p className="text-blue-100 text-sm leading-relaxed mb-6 opacity-90">
                  Priority alerts are generated by analyzing your recent 50+ simulations against real-time market data and historical patterns.
               </p>
               <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-xl border border-white/20">
                    <Info className="w-5 h-5 text-blue-200" />
                    <p className="text-xs font-medium">Auto-resolve disabled for high priority</p>
                  </div>
               </div>
            </div>
          </WebCard>

          <WebCard className="bg-gray-50 border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Alert Settings</h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                  <span className="text-sm font-medium text-gray-700">Push Notifications</span>
                  <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
               </div>
               <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                  <span className="text-sm font-medium text-gray-700">Email Digest</span>
                  <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
               </div>
            </div>
          </WebCard>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
             <h4 className="font-bold text-blue-900 mb-2">Need help?</h4>
             <p className="text-sm text-blue-700 mb-4">Chat with our AI consultant to understand these alerts in detail.</p>
             <button 
               onClick={() => navigate('/ai-chat')}
               className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm"
             >
                Start AI Consultation
             </button>
          </div>
        </div>
      </div>
    </WebLayout>
  );
}
