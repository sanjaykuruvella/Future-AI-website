import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { AlertTriangle, Shield, TrendingUp, Zap, ArrowRight, BarChart3, Info, CheckCircle2, Brain, Loader2 } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList } from 'recharts';
import { useState, useEffect } from 'react';
import { getPredictionsHistory } from '../../api/prediction';

export default function RiskVsRewardScreenWeb() {
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
                console.error('Failed to fetch data:', error);
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
                    <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
                </div>
            </WebLayout>
        );
    }

    // Helper to extract data from both table columns and JSON strings
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

    const scatterData = history.map((h, i) => ({
        name: h.decision_input?.split(':')[0] || `Sim #${h.prediction_id || i}`,
        risk: h.risk_level === 'High' ? 80 : h.risk_level === 'Medium' ? 50 : 20,
        reward: Math.round(getStat(h, 'success_probability')),
        category: h.category || 'Simulation',
        color: i === 0 ? '#8b5cf6' : '#3b82f6',
        fullData: h
    }));

    // Fallback data if history is empty
    const displayData = scatterData.length > 0 ? scatterData : [
        { name: 'Current Goal', risk: 20, reward: 35, category: 'Career', color: '#3b82f6' },
        { name: 'Target Setup', risk: 65, reward: 88, category: 'Career', color: '#8b5cf6' },
    ];

    const latest = history[0];
    const analysis = [
        {
            title: 'Primary Simulation Analysis',
            description: latest 
                ? `Your last decision "${latest.decision_input?.split(':')[0] || 'Simulation'}" has a ${Math.round(getStat(latest, 'success_probability'))}% success potential. Risk level is classified as ${latest.risk_level || 'Low'}.`
                : 'Run a simulation to see AI risk analysis here.',
            icon: Shield,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            title: latest?.risk_level === 'High' ? 'Alert: High Volatility' : 'Strategic Position',
            description: latest?.risk_level === 'High' 
                ? 'The AI detected significant variance in potential outcomes. Ensure you have a contingency plan and sufficient resource runway.'
                : 'Your positioning indicates a balanced approach with manageable risk variables.',
            icon: latest?.risk_level === 'High' ? AlertTriangle : TrendingUp,
            color: latest?.risk_level === 'High' ? 'text-red-600' : 'text-purple-600',
            bgColor: latest?.risk_level === 'High' ? 'bg-red-100' : 'bg-purple-100'
        }
    ];

    return (
        <WebLayout maxWidth="full">
            <div className="max-w-[1600px] mx-auto px-6 text-gray-800">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                    <div className="flex items-center space-x-5">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-xl shadow-red-100">
                            <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight">Risk vs. Reward Matrix</h1>
                            <p className="text-gray-500 font-medium">Mathematical positioning of your potential futures based on AI predictive data</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Optimized For</span>
                            <span className="text-sm font-bold text-blue-600">Growth-Conservative Balance</span>
                        </div>
                        <button className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl">
                            Run Multi-Scenario Test
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-10">
                    {/* Main Chart Card */}
                    <div className="col-span-12 xl:col-span-8">
                        <WebCard className="bg-white p-0 overflow-hidden shadow-2xl border-none">
                            <div className="bg-gray-50 p-8 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-xl font-bold flex items-center space-x-2">
                                    <Brain className="w-5 h-5 text-indigo-600" />
                                    <span>Decision Matrix Visualization</span>
                                </h2>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span className="text-xs font-bold text-gray-400 uppercase">Career</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                        <span className="text-xs font-bold text-gray-400 uppercase">Finance</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                                        <span className="text-xs font-bold text-gray-400 uppercase">Education</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 h-[600px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            type="number"
                                            dataKey="risk"
                                            name="risk"
                                            unit="%"
                                            domain={[0, 100]}
                                            label={{ value: 'RISK FACTOR (%)', position: 'bottom', offset: -10, fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
                                            stroke="#e2e8f0"
                                            tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }}
                                        />
                                        <YAxis
                                            type="number"
                                            dataKey="reward"
                                            name="reward"
                                            unit="%"
                                            domain={[0, 100]}
                                            label={{ value: 'REWARD POTENTIAL (%)', angle: -90, position: 'left', offset: 0, fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
                                            stroke="#e2e8f0"
                                            tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }}
                                        />
                                        <ZAxis type="number" range={[400, 1000]} />
                                        <Tooltip
                                            cursor={{ strokeDasharray: '3 3' }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const d = payload[0].payload;
                                                    return (
                                                        <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-2xl border border-gray-800">
                                                            <p className="font-bold text-lg mb-2">{d.name}</p>
                                                            <div className="space-y-1">
                                                                <p className="text-xs flex justify-between gap-8"><span className="text-gray-400">Risk:</span> <span className="text-red-400 font-bold">{d.risk}%</span></p>
                                                                <p className="text-xs flex justify-between gap-8"><span className="text-gray-400">Reward:</span> <span className="text-green-400 font-bold">{d.reward}%</span></p>
                                                                <p className="text-xs flex justify-between gap-8"><span className="text-gray-400">Type:</span> <span className="text-blue-400 font-bold">{d.category}</span></p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        {/* Quadrant Lines */}
                                        <ReferenceLine x={50} stroke="#cbd5e1" strokeWidth={1} label={{ value: 'MODERATE RISK', position: 'insideTopLeft', fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                                        <ReferenceLine y={50} stroke="#cbd5e1" strokeWidth={1} label={{ value: 'MODERATE REWARD', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />

                                        <Scatter name="Potentials" data={displayData}>
                                            {displayData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                                            ))}
                                            <LabelList dataKey="name" position="top" offset={10} style={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} />
                                        </Scatter>
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-gray-900 p-8 flex items-center justify-between gap-8">
                                <div className="flex-1 flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                        <Info className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        <span className="text-white font-bold">Quadrant Analysis:</span> Top-left is your "Sweet Spot" (Low Risk, High Reward). Bottom-right is the "Danger Zone" (High Risk, Low Reward). Your profile currently avoids the danger zone well.
                                    </p>
                                </div>
                                <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center space-x-2">
                                    <span>Re-run Monte Carlo Simulation</span>
                                </button>
                            </div>
                        </WebCard>
                    </div>

                    {/* Side Panels */}
                    <div className="col-span-12 xl:col-span-4 space-y-6">
                        <h3 className="text-xl font-bold flex items-center space-x-2 px-2">
                            <Zap className="w-5 h-5 text-orange-500" />
                            <span>AI Risk Assessment</span>
                        </h3>

                        {analysis.map((item, i) => (
                            <WebCard key={i} className="group hover:shadow-xl transition-all border-none shadow-lg">
                                <div className="flex items-start space-x-4">
                                    <div className={`w-12 h-12 ${item.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                        <item.icon className={`w-6 h-6 ${item.color}`} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </WebCard>
                        ))}

                        <WebCard className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white border-none shadow-2xl p-8">
                            <h4 className="text-lg font-bold mb-4 flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-blue-300" />
                                <span>Risk Mitigation Plan</span>
                            </h4>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-300 flex-shrink-0" />
                                    <p className="text-sm text-blue-100">Establish 12-month emergency fund before <i>Startup Offer</i> pivot.</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-300 flex-shrink-0" />
                                    <p className="text-sm text-blue-100">Hedge <i>Crypto</i> exposure by diversifying 80% in Blue Chips.</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-300 flex-shrink-0" />
                                    <p className="text-sm text-blue-100">Complete certifications during <i>Current Job</i> to lower pivot risk.</p>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-white text-blue-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center space-x-2">
                                <span>Execute Plan</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </WebCard>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
