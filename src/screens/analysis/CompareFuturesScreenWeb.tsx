import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCompareFutures } from '../../api/prediction';

export default function CompareFuturesScreenWeb() {
    const navigate = useNavigate();
    const [compareData, setCompareData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComparison = async () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                navigate('/login');
                return;
            }
            const user = JSON.parse(userStr);
            try {
                const data = await getCompareFutures(user.user_id);
                setCompareData(data);
            } catch (error) {
                console.error('Failed to fetch comparison:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchComparison();
    }, [navigate]);

    if (isLoading) {
        return (
            <WebLayout maxWidth="full">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full" />
                </div>
            </WebLayout>
        );
    }

    // Fallbacks if data empty
    const data = compareData || {
        optionA: "Optimised Path",
        optionB: "Current Setup",
        scoreA: 85,
        scoreB: 50,
        rows: []
    };

    const s1 = { title: data.optionA, score: data.scoreA };
    const s2 = { title: data.optionB, score: data.scoreB };
    const compareMetrics = data.rows || [];

        if (!compareData || (compareData.rows && compareData.rows.length === 0)) {
        return (
            <WebLayout maxWidth="full">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center p-8 bg-white border border-dashed border-gray-200 rounded-3xl shadow-xl max-w-md mx-auto">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ArrowRight className="w-8 h-8 text-gray-400 rotate-45" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">No Comparisons Yet</h2>
                        <p className="text-sm text-gray-500 mb-6 font-medium">Run your first AI simulation to see side-by-side decision updates comparing your pathways.</p>
                        <button onClick={() => navigate('/simulation-intro')} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/25 transition-all">Start Simulation</button>
                    </div>
                </div>
            </WebLayout>
        );
    }

    return (
        <WebLayout maxWidth="full">
            <div className="w-full min-h-screen bg-slate-50/80 text-slate-800 relative pb-32 pt-8">
                <div className="max-w-[700px] mx-auto px-6">
                    <div className="flex flex-col items-center mb-10 relative">
                        <div className="w-full flex justify-start items-start mb-6 -ml-4">
                            <button 
                                onClick={() => navigate('/simulation/prediction-summary')}
                                className="px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2 font-bold text-gray-800"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="hidden sm:inline">Back to Results</span>
                                <span className="sm:hidden">Back</span>
                            </button>
                        </div>
                        <div className="mt-[-2rem]">
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight text-center">Compare Futures</h1>
                            <p className="text-sm text-gray-500 mt-1 text-center font-medium">Side-by-side decision analysis</p>
                        </div>
                    </div>

                    {/* Top Cards */}
                    <div className="grid grid-cols-2 gap-5 mb-10">
                        {/* Option A - Vibrance Orange */}
                        <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-[2.5rem] p-6 text-center shadow-xl shadow-orange-500/20 text-white transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12 blur-xl group-hover:scale-110 transition-transform duration-500" />
                            <p className="text-xs font-bold uppercase tracking-widest text-orange-100/90 mb-2">Option A</p>
                            <h2 className="text-xl font-extrabold leading-tight mb-4 min-h-[3.5rem] flex items-center justify-center line-clamp-2">{s1.title}</h2>
                            <div className="text-6xl font-black text-white tracking-tighter drop-shadow-md">{s1.score || 0}</div>
                        </div>

                        {/* Option B - Vibrance Blue */}
                        <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-indigo-700 rounded-[2.5rem] p-6 text-center shadow-xl shadow-indigo-500/20 text-white transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12 blur-xl group-hover:scale-110 transition-transform duration-500" />
                            <p className="text-xs font-bold uppercase tracking-widest text-blue-100/90 mb-2">Option B</p>
                            <h2 className="text-xl font-extrabold leading-tight mb-4 min-h-[3.5rem] flex items-center justify-center line-clamp-2">{s2.title}</h2>
                            <div className="text-6xl font-black text-white tracking-tighter drop-shadow-md">{s2.score || 0}</div>
                        </div>
                    </div>

                    {/* Metrics List */}
                    <div className="space-y-4">
                        {compareMetrics.map((metric: any, idx: number) => {
                            const val1Str = metric.valA || '-';
                            const val2Str = metric.valB || '-';
                            const winner = metric.isWinnerA ? 1 : 2;

                            return (
                                <div key={idx} className="bg-white rounded-2xl py-6 px-8 shadow-md shadow-gray-200/40 border border-gray-100/80 flex items-center justify-between hover:scale-[1.01] transition-all duration-200">
                                    <div className="w-24 text-left">
                                        <span className={`text-xl font-black ${winner === 1 ? 'text-orange-600' : 'text-gray-400'}`}>{val1Str}</span>
                                    </div>
                                    
                                    <div className="flex flex-col items-center flex-1 px-4">
                                        {winner === 1 ? (
                                            <ArrowLeft className="w-5 h-5 text-orange-500 mb-0.5 animate-pulse" strokeWidth={3} />
                                        ) : winner === 2 ? (
                                            <ArrowRight className="w-5 h-5 text-indigo-500 mb-0.5 animate-pulse" strokeWidth={3} />
                                        ) : (
                                            <div className="w-5 h-5 mb-0.5"></div>
                                        )}
                                        <span className="text-xs text-gray-400 font-bold text-center uppercase tracking-widest">{metric.label}</span>
                                    </div>

                                    <div className="w-24 text-right">
                                        <span className={`text-xl font-black ${winner === 2 ? 'text-indigo-600' : 'text-gray-400'}`}>{val2Str}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* AI Verdict Box */}
                    {data.verdict && (
                        <div className="mt-10 p-6 bg-gradient-to-br from-indigo-50 via-white to-orange-50/50 border border-gray-100 rounded-3xl shadow-lg border-dashed">
                            <h3 className="text-xl font-black text-gray-800 mb-2 flex items-center justify-center gap-2">
                                💡 <span className="bg-gradient-to-r from-orange-600 to-indigo-600 bg-clip-text text-transparent">AI Verdict</span>
                            </h3>
                            <p className="text-sm text-gray-600 font-bold text-center leading-relaxed px-4">{data.verdict}</p>
                        </div>
                    )}
                </div>
            </div>
        </WebLayout>
    );
}
