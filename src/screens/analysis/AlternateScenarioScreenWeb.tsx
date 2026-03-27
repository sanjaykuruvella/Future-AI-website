import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { Loader2, GitBranch, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAlternateScenarios } from '../../api/prediction';

export default function AlternateScenarioScreenWeb() {
    const navigate = useNavigate();
    const [scenarios, setScenarios] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchScenarios = async () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                navigate('/login');
                return;
            }
            const user = JSON.parse(userStr);
            try {
                const data = await getAlternateScenarios(user.user_id);
                setScenarios(data);
            } catch (error) {
                console.error('Failed to fetch scenarios:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchScenarios();
    }, [navigate]);

    if (isLoading) {
        return (
            <WebLayout maxWidth="full">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                </div>
            </WebLayout>
        );
    }



        if (scenarios.length === 0) {
        return (
            <WebLayout maxWidth="full">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center p-8 bg-slate-900 border border-dashed border-slate-800 rounded-3xl shadow-xl max-w-md mx-auto">
                        <GitBranch className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-pulse" />
                        <h2 className="text-xl font-bold text-slate-100 mb-2">No alternate scenarios</h2>
                        <p className="text-xs text-slate-400 mb-6 font-medium">Explore alternative options by running simulations setup first paths.</p>
                        <button onClick={() => navigate('/simulation-intro')} className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-xs shadow-md">Start Simulation</button>
                    </div>
                </div>
            </WebLayout>
        );
    }

    return (
        <WebLayout maxWidth="full">
            <div className="w-full min-h-screen bg-[#0a0a0f] text-slate-200 relative pb-32 pt-8">
                <div className="max-w-[800px] mx-auto px-6">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-10 relative">
                        <div className="w-full flex items-center mb-6">
                            <button 
                                onClick={() => navigate('/simulation/prediction-summary')}
                                className="px-4 py-2 hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-2 font-bold text-slate-200 hover:text-white"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="hidden sm:inline">Back to Results</span>
                                <span className="sm:hidden">Back</span>
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center flex-1 px-4 sm:px-10 mt-[-2rem]">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl items-center justify-center flex mb-4 shadow-lg shadow-orange-500/30">
                                <GitBranch className="w-6 h-6 text-slate-100" />
                            </div>
                            <h1 className="text-3xl font-semibold text-slate-100 tracking-tight text-center">Alternate Scenarios</h1>
                            <p className="text-sm text-slate-400 mt-2 text-center">Compare different decision paths</p>
                        </div>
                    </div>

                    {/* Scenarios List */}
                    <div className="space-y-6">
                        {scenarios.map((scenario, index) => {
                            // Alternate colors for variety
                            const colorClass = index % 3 === 0 ? 'text-orange-400' : index % 3 === 1 ? 'text-blue-400' : 'text-yellow-400';
                            const gradientClass = index % 3 === 0 ? 'from-orange-500 to-red-500' : index % 3 === 1 ? 'from-blue-500 to-cyan-500' : 'from-yellow-400 to-orange-500';
                            
                            return (
                                <div key={index} className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-slate-800">
                                    <div className="flex justify-between items-end mb-3">
                                        <h3 className="text-xl font-medium text-slate-200">{scenario.title}</h3>
                                        <div className="flex flex-col items-center">
                                            <span className={`text-2xl font-bold ${colorClass} leading-none`}>{scenario.score}</span>
                                            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mt-1">score</span>
                                        </div>
                                    </div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full mb-6 overflow-hidden shadow-inner border border-slate-900/50">
                                        <div className={`bg-gradient-to-r ${gradientClass} h-full rounded-full`} style={{ width: `${scenario.score}%` }}></div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-emerald-950/60 rounded-2xl p-4 border border-emerald-500/20">
                                            <h4 className="text-sm font-bold text-emerald-400 mb-2">Pros</h4>
                                            <p className="text-sm text-emerald-50 leading-relaxed font-medium">
                                                {typeof scenario.pros === 'string' ? scenario.pros : scenario.pros?.[0] || 'Good outcome potential'}
                                            </p>
                                        </div>
                                        <div className="bg-rose-950/60 rounded-2xl p-4 border border-rose-500/20">
                                            <h4 className="text-sm font-bold text-rose-400 mb-2">Cons</h4>
                                            <p className="text-sm text-rose-50 leading-relaxed font-medium">
                                                {typeof scenario.cons === 'string' ? scenario.cons : scenario.cons?.[0] || 'Unknown risks'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                </div>
            </div>
        </WebLayout>
    );
}
