import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Briefcase, DollarSign, GraduationCap, Clock, Search, Activity, Target, CheckCircle2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPredictionsHistory } from '../../api/prediction';

export default function HistoryTimelineScreenWeb() {
    const navigate = useNavigate();
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = ['career', 'finance', 'education'];

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

    const mapToTimeline = (h: any) => {
        let date = new Date(h.created_at);
        if (isNaN(date.getTime())) {
            date = new Date(); // fallback to current date
        }
        
        const success_prob = getStat(h, 'success_probability');
        const fin_impact = getStat(h, 'financial_impact');
        const life_sat = getStat(h, 'life_satisfaction');
        const future_comp = getStat(h, 'future_comparison');

        const title = h.decision_input || 'Simulation Result';
        const isCareer = title.toLowerCase().includes('career') || title.toLowerCase().includes('job') || title.toLowerCase().includes('work');
        const isFinance = title.toLowerCase().includes('finan') || title.toLowerCase().includes('money') || title.toLowerCase().includes('invest');

        const category = isCareer ? 'career' : isFinance ? 'finance' : 'education';

        return {
            id: h.prediction_id,
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            title: title,
            category: category,
            icon: category === 'career' ? Briefcase : category === 'finance' ? DollarSign : GraduationCap,
            color: success_prob > 70 ? 'from-green-500 to-green-600' : 
                   success_prob > 40 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600',
            bgColor: success_prob > 70 ? 'bg-green-100' : 
                     success_prob > 40 ? 'bg-blue-100' : 'bg-orange-100',
            textColor: success_prob > 70 ? 'text-green-700' : 
                       success_prob > 40 ? 'text-blue-700' : 'text-orange-700',
            score: Math.round(success_prob),
            status: 'completed',
            description: `Simulation outcome with ${h.timeline || 'standard'} timeline and ${Math.round(life_sat)}% life satisfaction.`,
            outcomes: [
                `Impact: ${Math.round(fin_impact)}%`,
                `Comparison: ${Math.round(future_comp)}%`,
                `Timeline: ${h.timeline || 'TBD'}`
            ],
        };
    };

    const sortedHistory = [...history].sort((a: any, b: any) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return isNaN(dateA) || isNaN(dateB) ? 0 : dateB - dateA;
    });

    const timeline = sortedHistory.map(mapToTimeline);

    const filteredTimeline = timeline.filter(item => {
        const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <WebLayout maxWidth="full">
            <div className="max-w-[1400px] mx-auto px-6 pb-16 pt-6">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center space-x-3 text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                            <span>Temporal Archive</span>
                        </div>
                        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">Simulation History</h1>
                        <p className="text-lg text-gray-500 mt-2 font-medium">Trace your trajectory through past AI predictions and simulated outcomes.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search history..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-gray-700 placeholder-gray-400"
                            />
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            <button 
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                                    selectedCategory === null 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                                    : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                                    className={`px-4 py-2.5 rounded-xl font-bold text-sm capitalize transition-all ${
                                        selectedCategory === cat 
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                                        : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <WebCard className="bg-gradient-to-br from-indigo-500 to-blue-600 border-none shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-1">Simulations</p>
                                <span className="text-4xl font-black text-white">{timeline.length}</span>
                            </div>
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                <Clock className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </WebCard>

                    <WebCard className="bg-gradient-to-br from-purple-500 to-indigo-600 border-none shadow-xl shadow-purple-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-bold uppercase tracking-wider mb-1">Avg Score</p>
                                <span className="text-4xl font-black text-white">
                                    {history.length > 0 
                                        ? Math.round(history.reduce((acc, curr) => acc + getStat(curr, 'success_probability'), 0) / history.length) 
                                        : 0}%
                                </span>
                            </div>
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                <Activity className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </WebCard>

                    <WebCard className="bg-gradient-to-br from-emerald-500 to-teal-600 border-none shadow-xl shadow-emerald-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <p className="text-emerald-100 text-sm font-bold uppercase tracking-wider mb-1">Paths</p>
                                <span className="text-4xl font-black text-white">{history.length}</span>
                            </div>
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                <CheckCircle2 className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </WebCard>

                    <WebCard className="bg-gradient-to-br from-orange-400 to-rose-500 border-none shadow-xl shadow-orange-500/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm font-bold uppercase tracking-wider mb-1">Pending</p>
                                <span className="text-4xl font-black text-white">0</span>
                            </div>
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                <Target className="w-7 h-7 text-white" />
                            </div>
                        </div>
                    </WebCard>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Timeline View */}
                    <div className="col-span-1 relative pl-0">

                        <div className="space-y-12 pb-16">
                            {filteredTimeline.length > 0 ? filteredTimeline.map((item) => (
                                <div key={item.id} className="relative flex flex-col md:flex-row items-start group">
                                    {/* Time Indicator */}
                                    <div className="w-full md:w-32 pt-1 md:pr-10 text-left md:text-right flex-shrink-0 mb-4 md:mb-0 hidden md:block">
                                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{item.date.split(',')[1]}</p>
                                        <p className="text-base font-bold text-gray-900">{item.date.split(',')[0]}</p>
                                    </div>

                                    {/* Content Card */}
                                    <div className="flex-1 w-full pl-0 md:pl-6 mt-[-0.5rem] md:mt-0">
                                        <div className="md:hidden mb-3">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.date}</p>
                                        </div>
                                        <WebCard
                                            hover
                                            onClick={() => navigate('/analytics')}
                                            className={`transition-all duration-300 border-none shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 bg-white/80 p-6 md:p-8 ${item.status === 'pending' ? 'ring-2 ring-indigo-500 shadow-indigo-500/10' : ''}`}
                                        >
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                                <div className="flex-1 w-full">
                                                    <div className="flex items-center justify-between mb-3 w-full">
                                                        <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                                                        <div className={`w-12 h-12 rounded-2xl shadow-md flex items-center justify-center flex-shrink-0 ${item.textColor} ${item.bgColor}`}>
                                                            <item.icon className="w-5 h-5 flex-shrink-0" />
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-500 font-medium leading-relaxed max-w-2xl mb-6">
                                                        {item.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 md:gap-4">
                                                        {item.outcomes.map((outcome, i) => (
                                                            <div key={i} className="flex items-center space-x-2 text-sm font-bold text-gray-600 bg-gray-100/80 rounded-xl px-4 py-2">
                                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${item.color}`}></div>
                                                                <span>{outcome}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="w-full lg:w-48 flex-shrink-0 bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col items-center justify-center text-center">
                                                    <div className="mb-3">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Success Probability</p>
                                                        <div className={`text-4xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                                                            {item.score}%
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner mb-4">
                                                        <div
                                                            className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                                                            style={{ width: `${item.score}%` }}
                                                        ></div>
                                                    </div>

                                                </div>
                                            </div>
                                        </WebCard>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Activity className="w-10 h-10 text-gray-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No History Found</h3>
                                    <p className="text-gray-500">You haven't run any simulations yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
