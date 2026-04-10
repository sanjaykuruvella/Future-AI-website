import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Map, Share2, Download, Layers, Play, Info, Sparkles, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPredictionsHistory } from '../../api/prediction';

export default function ScenarioMapScreenWeb() {
    const navigate = useNavigate();
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) return navigate('/login');
            const user = JSON.parse(userStr);
            try {
                const data = await getPredictionsHistory(user.user_id);
                setHistory(data);
            } catch (error) {
                console.error('Failed to fetch scenarios:', error);
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
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                </div>
            </WebLayout>
        );
    }

    const scenarios = history.slice(0, 3).map((h, i) => ({
        id: h.id,
        label: h.decision_input?.split(':')[0] || `Sim #${h.id}`,
        score: Math.round(h.success_probability),
        color: i === 0 ? 'from-green-500 to-emerald-600' : i === 1 ? 'from-blue-500 to-indigo-600' : 'from-orange-500 to-red-600',
        description: h.decision_input || 'Custom Simulation Path',
        impact: h.success_probability > 70 ? 'High' : 'Medium',
        risk: h.risk_level
    }));

    // Fallback if no history
    const displayScenarios = scenarios.length > 0 ? scenarios : [
        { id: 1, label: 'Optimal Path', score: 94, color: 'from-green-500 to-emerald-600', description: 'Target Career Pivot', impact: 'High', risk: 'Low' }
    ];

    return (
        <WebLayout maxWidth="full">
            <div className="max-w-[1600px] mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                    <div className="flex items-center space-x-5">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-100">
                            <Map className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Scenario Outcome Mapping</h1>
                            <p className="text-gray-500 font-medium">Visualizing the ripples of your potential decisions across 10 years</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-sm">
                            <Share2 className="w-4 h-4" />
                            <span>Share Map</span>
                        </button>
                        <button className="flex items-center space-x-2 px-5 py-2.5 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-sm">
                            <Download className="w-4 h-4" />
                            <span>Export PDF</span>
                        </button>
                        <button className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:scale-[1.02] transition-all">
                            <Play className="w-4 h-4 fill-white" />
                            <span>Simulate All</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Main Map View - Left & Large */}
                    <div className="col-span-12 xl:col-span-8">
                        <WebCard className="bg-white/80 backdrop-blur-xl border-gray-100 shadow-2xl overflow-hidden relative min-h-[700px]">
                            {/* Background Graph Grid */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                            {/* Map Header */}
                            <div className="relative z-10 p-8 border-b border-gray-50 flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Growth Path</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Base Path</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Risk Path</span>
                                    </div>
                                </div>
                                <div className="px-4 py-2 bg-gray-100 rounded-2xl text-xs font-bold text-gray-400">
                                    ZOOM: 100%
                                </div>
                            </div>

                            {/* Visual Map Content (Conceptual Mock for the user to see the "MAP") */}
                            <div className="relative z-10 p-12 h-[600px] flex items-center justify-center">
                                {/* This would be an SVG or Canvas in a real implementation, but for AI design we use expressive CSS/JSX */}
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {/* Center Node */}
                                    <div className="z-20 w-32 h-32 bg-white rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center border-4 border-indigo-500 ring-8 ring-indigo-50 leading-tight">
                                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter mb-1">CURRENT</p>
                                        <p className="text-sm font-black text-gray-800 text-center px-4">Senior Developer</p>
                                    </div>

                                    {/* Branches */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            {/* SVG Connections for the "Map" feel */}
                                            <svg width="100%" height="100%" className="absolute inset-0">
                                                {displayScenarios.map((_, i) => (
                                                    <path 
                                                        key={i}
                                                        d={`M 50% 50% L 80% ${20 + (i * 30)}%`} 
                                                        stroke={i === 0 ? "#10b981" : i === 1 ? "#3b82f6" : "#ef4444"} 
                                                        strokeWidth="4" fill="none" strokeDasharray="8 4" opacity="0.3" 
                                                    />
                                                ))}
                                            </svg>

                                            {/* End Nodes */}
                                            {displayScenarios.map((s, i) => (
                                                <div key={s.id} className="absolute right-[10%]" style={{ top: `${15 + (i * 30)}%` }}>
                                                    <ScenarioNode
                                                        title={s.label}
                                                        year="+3 Years"
                                                        score={s.score}
                                                        color={i === 0 ? "green" : i === 1 ? "blue" : "red"}
                                                        onClick={() => navigate('/analytics')}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                </div>
                            </div>

                            {/* Map Footer Overlay */}
                            <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center justify-between">
                                <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-gray-100 flex items-center space-x-6">
                                    <div className="flex items-center space-x-2">
                                        <Info className="w-4 h-4 text-blue-500" />
                                        <span className="text-xs font-bold text-gray-700">Map updated 2 mins ago based on latest simulations</span>
                                    </div>
                                </div>
                                <div className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl flex items-center space-x-3 cursor-pointer hover:bg-indigo-700 transition-all">
                                    <span>Explore Alternate Timelines</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </WebCard>
                    </div>

                    {/* Side Panel - Lists & Details */}
                    <div className="col-span-12 xl:col-span-4 space-y-6">
                        {/* Path Details */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800 px-2 flex items-center space-x-2">
                                <Layers className="w-5 h-5 text-indigo-600" />
                                <span>Path Comparisons</span>
                            </h3>
                            {displayScenarios.map((s) => (
                                <WebCard key={s.id} hover className="group cursor-pointer">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center text-white`}>
                                                <TrendingUp className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{s.label}</h4>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.impact} Impact • {s.risk} Risk</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-black text-gray-800">{s.score}%</span>
                                            <p className="text-[8px] font-bold text-gray-400 uppercase">Match</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 italic">"{s.description}"</p>
                                </WebCard>
                            ))}
                        </div>

                        {/* AI Coaching Card */}
                        <div className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold">AI Path Insight</h3>
                            </div>
                            <p className="text-blue-100/90 text-sm leading-relaxed mb-8">
                                The <span className="text-white font-bold underline decoration-green-500">Optimal Path</span> has become 12% more likely after your recent skill assessment simulation. Moving into Fintech now (Q1-Q2 2026) positions you for maximum equity upside before the projected market saturation in 2028.
                            </p>
                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20">
                                Lock This Path Target
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}

function ScenarioNode({ title, year, score, color, onClick }: { title: string, year: string, score: number, color: string, onClick: () => void }) {
    const colorClasses: Record<string, string> = {
        green: 'border-green-500 ring-green-100 text-green-600',
        blue: 'border-blue-500 ring-blue-100 text-blue-600',
        red: 'border-red-500 ring-red-100 text-red-600'
    };

    return (
        <div
            onClick={onClick}
            className={`w-48 bg-white/90 backdrop-blur-xl border-t-4 p-5 rounded-3xl shadow-2xl ring-8 ring-opacity-50 transition-all hover:scale-105 cursor-pointer ${colorClasses[color]}`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest">{year}</span>
                <span className="text-lg font-black">{score}%</span>
            </div>
            <h4 className="text-sm font-bold text-gray-800 leading-tight mb-3">{title}</h4>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-gray-400 to-current`} style={{ width: `${score}%` }}></div>
            </div>
        </div>
    );
}
