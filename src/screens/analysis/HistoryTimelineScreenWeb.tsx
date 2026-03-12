import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Briefcase, DollarSign, GraduationCap, Home, Clock, Filter, Search, ChevronRight, Activity, Target, CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPredictionsHistory } from '../../api/prediction';

export default function HistoryTimelineScreenWeb() {
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

    const mapToTimeline = (h: any) => {
        const date = new Date(h.created_at);
        return {
            id: h.prediction_id,
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            title: h.decision_input || 'Simulation Result',
            category: h.decision_input?.toLowerCase().includes('career') ? 'career' : 
                      h.decision_input?.toLowerCase().includes('finan') ? 'finance' : 'education',
            icon: h.decision_input?.toLowerCase().includes('career') ? Briefcase : 
                  h.decision_input?.toLowerCase().includes('finan') ? DollarSign : GraduationCap,
            color: h.success_probability > 70 ? 'from-green-500 to-green-600' : 
                   h.success_probability > 40 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600',
            bgColor: h.success_probability > 70 ? 'bg-green-100' : 
                     h.success_probability > 40 ? 'bg-blue-100' : 'bg-orange-100',
            textColor: h.success_probability > 70 ? 'text-green-700' : 
                       h.success_probability > 40 ? 'text-blue-700' : 'text-orange-700',
            score: Math.round(h.success_probability),
            status: 'completed',
            description: `Simulation outcome with ${h.timeline} timeline and ${Math.round(h.life_satisfaction)}% life satisfaction.`,
            outcomes: [
                `Impact: ${Math.round(h.financial_impact)}%`,
                `Comparison: ${Math.round(h.future_comparison)}%`,
                `Timeline: ${h.timeline}`
            ],
        };
    };

    const timeline = history.map(mapToTimeline);

    return (
        <WebLayout maxWidth="full">
            <div className="max-w-[1600px] mx-auto px-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Simulation History</h1>
                        <p className="text-gray-600">Track your decision-making journey and outcome predictions</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search history..."
                                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                        </div>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                            <Filter className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Filter</span>
                        </button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <WebCard className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="flex items-center justify-between mb-3">
                            <Clock className="w-6 h-6" />
                            <span className="text-2xl font-bold">{timeline.length}</span>
                        </div>
                        <p className="text-blue-100 text-sm">Total Simulations</p>
                    </WebCard>
                    <WebCard className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                        <div className="flex items-center justify-between mb-3">
                            <Activity className="w-6 h-6" />
                            <span className="text-2xl font-bold">
                                {history.length > 0 
                                    ? Math.round(history.reduce((acc, curr) => acc + curr.success_probability, 0) / history.length) 
                                    : 0}%
                            </span>
                        </div>
                        <p className="text-purple-100 text-sm">Average Score</p>
                    </WebCard>
                    <WebCard className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                        <div className="flex items-center justify-between mb-3">
                            <CheckCircle2 className="w-6 h-6" />
                            <span className="text-2xl font-bold">{history.length}</span>
                        </div>
                        <p className="text-green-100 text-sm">Completed Paths</p>
                    </WebCard>
                    <WebCard className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
                        <div className="flex items-center justify-between mb-3">
                            <Target className="w-6 h-6" />
                            <span className="text-2xl font-bold">0</span>
                        </div>
                        <p className="text-orange-100 text-sm">Pending Decisions</p>
                    </WebCard>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Timeline View */}
                    <div className="col-span-12">
                        <div className="relative">
                            {/* Vertical line through entire timeline */}
                            <div className="absolute left-[3.5rem] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-orange-500/20 rounded-full"></div>

                            <div className="space-y-8">
                                {timeline.map((item, index) => (
                                    <div key={item.id} className="relative flex items-start">
                                        {/* Time Indicator */}
                                        <div className="w-28 pt-6 pr-8 text-right flex-shrink-0">
                                            <p className="text-xs font-bold text-gray-500 uppercase">{item.date.split(',')[1]}</p>
                                            <p className="text-sm font-semibold text-gray-800">{item.date.split(',')[0]}</p>
                                        </div>

                                        {/* Timeline Node */}
                                        <div className="relative mt-5 z-10">
                                            <div className={`w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-gray-50 ring-4 ring-${item.category === 'career' ? 'blue' : item.category === 'finance' ? 'green' : 'purple'}-500/20`}>
                                                <item.icon className={`w-6 h-6 ${item.textColor}`} />
                                            </div>
                                        </div>

                                        {/* Content Card */}
                                        <div className="flex-1 ml-10">
                                            <WebCard
                                                hover
                                                onClick={() => navigate('/analytics')}
                                                className={`transition-all ${item.status === 'pending' ? 'ring-2 ring-blue-500 shadow-blue-500/10' : ''}`}
                                            >
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${item.status === 'pending' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                                                }`}>
                                                                {item.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            {item.outcomes.map((outcome, i) => (
                                                                <div key={i} className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                                                                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${item.color}`}></div>
                                                                    <span>{outcome}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="w-full md:w-48 flex-shrink-0">
                                                        <div className="text-center md:text-right mb-4">
                                                            <div className={`text-4xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                                                                {item.score}%
                                                            </div>
                                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Confidence Score</p>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                                                                    style={{ width: `${item.score}%` }}
                                                                ></div>
                                                            </div>
                                                            <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 transition-all">
                                                                <span>View Details</span>
                                                                <ChevronRight className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </WebCard>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
