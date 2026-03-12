import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Button } from '../../components/Button';
import { GitBranch, CheckCircle2, AlertTriangle, TrendingUp, ArrowRight, Layers, Brain, XCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPredictionsHistory } from '../../api/prediction';

export default function AlternateScenarioScreenWeb() {
    const navigate = useNavigate();
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);

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
                if (data.length > 0) {
                    setSelectedId(data[0].prediction_id);
                }
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
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                </div>
            </WebLayout>
        );
    }

    const scenarios = history.map(h => ({
        id: h.prediction_id,
        title: h.decision_input || 'Simulation Result',
        score: Math.round(h.success_probability),
        confidence: h.success_probability > 75 ? 'Very High' : h.success_probability > 50 ? 'High' : 'Moderate',
        timeframe: h.timeline,
        description: `Predicted outcome with ${h.timeline} timeline and ${Math.round(h.life_satisfaction)}% satisfaction.`,
        pros: [
            `Financial impact: +${Math.round(h.financial_impact)}%`,
            `Future readiness score: ${Math.round(h.future_comparison)}`,
            `Timeline efficiency: ${h.timeline}`
        ],
        cons: [
            `Alternative risk: ${Math.round(h.alternative_scenario)}%`,
            `Baseline deviation: ${Math.round(100 - h.future_comparison)}%`
        ],
        impacts: {
            financial: `${Math.round(h.financial_impact)}%`,
            life_satisfaction: `${Math.round(h.life_satisfaction)}%`,
            readiness: `${Math.round(h.future_comparison)}%`,
            risk: `${Math.round(h.alternative_scenario)}%`
        },
    }));

    const currentScenario = scenarios.find(s => s.id === selectedId) || scenarios[0];

    return (
        <WebLayout maxWidth="full">
            <div className="max-w-[1600px] mx-auto px-6">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <GitBranch className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Alternate Scenarios</h1>
                        <p className="text-gray-600">Compare multiple decision paths and their AI-predicted outcomes</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    {/* Left Side - Scenario List */}
                    <div className="col-span-12 lg:col-span-4 space-y-4">
                        <h2 className="text-xl font-bold text-gray-800 px-2 py-2 border-b border-gray-100 flex items-center justify-between">
                            <span>Potential Paths</span>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{scenarios.length} Scenarios</span>
                        </h2>
                        {scenarios.map((scenario) => (
                            <WebCard
                                key={scenario.id}
                                onClick={() => setSelectedId(scenario.id)}
                                className={`cursor-pointer transition-all border-l-4 ${selectedId === scenario.id
                                        ? 'border-l-blue-600 bg-white shadow-xl scale-[1.02]'
                                        : 'border-l-transparent hover:border-l-gray-300 opacity-70 hover:opacity-100'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className={`font-bold ${selectedId === scenario.id ? 'text-blue-700' : 'text-gray-800'}`}>
                                        {scenario.title}
                                    </h3>
                                    <div className={`px-2 py-1 rounded-lg text-xs font-bold ${scenario.score > 80 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {scenario.score}% Match
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2">{scenario.description}</p>
                            </WebCard>
                        ))}

                        <WebCard className="bg-gradient-to-br from-gray-50 to-white border-dashed border-gray-300">
                            <button className="w-full flex flex-col items-center justify-center py-4 space-y-2 text-gray-500 hover:text-blue-600 transition-all">
                                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100">
                                    <span className="text-2xl font-light">+</span>
                                </div>
                                <span className="text-sm font-semibold">Generate New Scenario</span>
                            </button>
                        </WebCard>
                    </div>

                    {/* Right Side - Detailed Comparison */}
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        <WebCard className="bg-white shadow-2xl overflow-hidden">
                            {/* Hero Detail Section */}
                            <div className="bg-gradient-to-r from-gray-900 to-blue-900 p-8 text-white">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <div className="flex items-center space-x-3 mb-3">
                                            <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-md rounded-full text-xs font-bold border border-blue-400/30">SCENARIO {currentScenario.id}</span>
                                            <span className="px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full text-xs font-bold border border-green-400/30">ACCURACY: {currentScenario.confidence}</span>
                                        </div>
                                        <h2 className="text-4xl font-bold mb-4">{currentScenario.title}</h2>
                                        <p className="text-blue-100/80 text-lg max-w-2xl">{currentScenario.description}</p>
                                    </div>
                                    <div className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 min-w-[200px]">
                                        <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Success Probability</p>
                                        <div className="text-6xl font-black text-white">{currentScenario.score}%</div>
                                        <div className="w-full h-2 bg-white/20 rounded-full mt-4 overflow-hidden">
                                            <div className="h-full bg-blue-400" style={{ width: `${currentScenario.score}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Metrics & Impact */}
                            <div className="p-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                                    {Object.entries(currentScenario.impacts).map(([key, value]) => (
                                        <div key={key} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                            <p className="text-xs font-bold text-gray-400 uppercase mb-2">{key.replace('_', ' ')}</p>
                                            <p className="text-xl font-bold text-gray-800">{value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {/* Pros & Cons */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="flex items-center space-x-2 font-bold text-green-700 mb-4">
                                                <CheckCircle2 className="w-5 h-5" />
                                                <span>Key Benefits</span>
                                            </h3>
                                            <div className="space-y-3">
                                                {currentScenario.pros.map((pro, i) => (
                                                    <div key={i} className="flex items-start space-x-3 bg-green-50/50 p-4 rounded-xl border border-green-100">
                                                        <div className="mt-1 w-2 h-2 rounded-full bg-green-500"></div>
                                                        <span className="text-gray-700 font-medium">{pro}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="flex items-center space-x-2 font-bold text-red-700 mb-4">
                                                <XCircle className="w-5 h-5" />
                                                <span>Potential Risks</span>
                                            </h3>
                                            <div className="space-y-3">
                                                {currentScenario.cons.map((con, i) => (
                                                    <div key={i} className="flex items-start space-x-3 bg-red-50/50 p-4 rounded-xl border border-red-100">
                                                        <div className="mt-1 w-2 h-2 rounded-full bg-red-500"></div>
                                                        <span className="text-gray-700 font-medium">{con}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12 pt-8 border-t border-gray-100">
                                    <div className="flex items-center space-x-2 text-gray-500">
                                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                                        <span className="text-sm italic">Predictions based on current market trends and individual goals profile.</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Button
                                            onClick={() => navigate('/analytics')}
                                            variant="outline"
                                            className="px-8 py-3"
                                        >
                                            Close Comparison
                                        </Button>
                                        <Button
                                            onClick={() => navigate('/simulation/processing')}
                                            className="px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center space-x-2"
                                        >
                                            <span>Deep Simulation</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </WebCard>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
