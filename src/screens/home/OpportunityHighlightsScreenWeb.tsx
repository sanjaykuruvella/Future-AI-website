import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { TrendingUp, Zap, Star, ArrowRight, CheckCircle2, AlertCircle, Clock, Briefcase, DollarSign, Brain } from 'lucide-react';

export default function OpportunityHighlightsScreenWeb() {
    const navigate = useNavigate();

    const opportunities = [
        {
            id: 1,
            priority: 'high',
            type: 'career',
            title: 'Tech Startup Job Offer',
            description: 'Senior Software Engineer at high-growth Series B fintech startup.',
            confidence: 92,
            timeframe: 'Decision window: 5 days',
            impact: '+35% Career Growth',
            potentialOutcome: '₹28 LPA Package, leadership potential, 0.5% early-stage equity.',
            risk: 'Low',
            tags: ['Growth', 'Leadership', 'Equity']
        },
        {
            id: 2,
            priority: 'high',
            type: 'finance',
            title: 'Blue Chip Portfolio Pivot',
            description: 'Rebalance portfolio towards emerging energy and tech sectors.',
            confidence: 88,
            timeframe: 'Market window: 12 days',
            impact: '+22% Projected Return',
            potentialOutcome: 'Enhanced dividend yield, better risk-adjusted long-term returns.',
            risk: 'Medium',
            tags: ['Stability', 'Wealth', 'Passive Income']
        },
        {
            id: 3,
            priority: 'medium',
            type: 'education',
            title: 'Executive AI Strategy Course',
            description: 'Certification in AI Applications for Business Leadership.',
            confidence: 76,
            timeframe: 'Enrollment: Ends Feb 28',
            impact: '+18% Market Value',
            potentialOutcome: 'Qualify for specialized AI Product Lead positions globally.',
            risk: 'Low',
            tags: ['Skills', 'Future-proof', 'Network']
        },
        {
            id: 4,
            priority: 'medium',
            type: 'personal',
            title: 'Health Reset Retreat',
            description: 'Integrated wellness and mental performance program.',
            confidence: 94,
            timeframe: 'Registration: Open',
            impact: '+40% Productivity Rise',
            potentialOutcome: 'Drastic reduction in burnout risk, improved cognitive clarity.',
            risk: 'None',
            tags: ['Wellness', 'Performance', 'Balance']
        }
    ];

    return (
        <WebLayout maxWidth="full">
            <div className="max-w-[1600px] mx-auto px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-3xl">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-green-200">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <div className="px-4 py-1.5 bg-green-100 rounded-full flex items-center space-x-2 border border-green-200">
                                <Zap className="w-4 h-4 text-green-600 fill-green-600" />
                                <span className="text-sm font-bold text-green-700">AI-CURATED OPPORTUNITIES</span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Success Opportunity Dashboard</h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Our AI continuously scans market trends, local opportunities, and your personal goals to highlight high-probability success paths tailored specifically for you.
                        </p>
                    </div>

                    <div className="flex-shrink-0 bg-white shadow-xl rounded-3xl p-6 border border-gray-100 flex items-center space-x-6">
                        <div className="text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Found</p>
                            <p className="text-3xl font-black text-blue-600">{opportunities.length}</p>
                        </div>
                        <div className="w-px h-12 bg-gray-100"></div>
                        <div className="text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Impact Potential</p>
                            <p className="text-3xl font-black text-green-600">High</p>
                        </div>
                    </div>
                </div>

                {/* Opportunity Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
                    {opportunities.map((opp) => (
                        <WebCard
                            key={opp.id}
                            className="bg-white hover:shadow-2xl hover:scale-[1.01] transition-all p-0 overflow-hidden border-none shadow-xl"
                        >
                            <div className="flex flex-col h-full">
                                {/* Top Bar with Category Icon */}
                                <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${opp.type === 'career' ? 'bg-blue-100 text-blue-600' :
                                                opp.type === 'finance' ? 'bg-green-100 text-green-600' :
                                                    'bg-purple-100 text-purple-600'
                                            }`}>
                                            {opp.type === 'career' ? <Briefcase className="w-6 h-6" /> :
                                                opp.type === 'finance' ? <DollarSign className="w-6 h-6" /> :
                                                    <Brain className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase">{opp.type}</p>
                                            <h3 className="text-xl font-bold text-gray-800">{opp.title}</h3>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-green-600">{opp.confidence}%</div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">AI Confidence</p>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-8 flex-1">
                                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">{opp.description}</p>

                                    <div className="grid grid-cols-2 gap-6 mb-8">
                                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                            <div className="flex items-center space-x-2 text-gray-500 mb-1">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-xs font-bold uppercase tracking-wider">Timeframe</span>
                                            </div>
                                            <p className="font-bold text-gray-800">{opp.timeframe}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                            <div className="flex items-center space-x-2 text-emerald-600 mb-1">
                                                <TrendingUp className="w-4 h-4" />
                                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Predicted Impact</span>
                                            </div>
                                            <p className="font-bold text-emerald-600">{opp.impact}</p>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 mb-8">
                                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Predicted Outcome Details</p>
                                        <p className="text-blue-900 font-medium">{opp.potentialOutcome}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {opp.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold ring-1 ring-gray-200">{tag}</span>
                                        ))}
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ring-1 ml-auto ${opp.risk === 'Low' ? 'bg-green-100 text-green-700 ring-green-200' : 'bg-amber-100 text-amber-700 ring-amber-200'
                                            }`}>
                                            Risk: {opp.risk}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => navigate('/simulation-intro')}
                                            className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                                        >
                                            <span>Detailed Simulation</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <button className="p-4 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-all">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </WebCard>
                    ))}
                </div>

                {/* AI Insight Footer */}
                <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[3rem] p-10 text-white mb-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
                        <div className="lg:col-span-3">
                            <div className="flex items-center space-x-3 mb-4">
                                <AlertCircle className="w-6 h-6 text-blue-400" />
                                <h3 className="text-2xl font-bold">Why am I seeing these?</h3>
                            </div>
                            <p className="text-xl text-blue-100/90 leading-relaxed">
                                Our AI cross-references your stored goals (e.g., "Financial Independence by 40", "Global Career Mobility") with
                                real-time market data indexes and your historical simulation performance. These opportunities represent the
                                mathematical intersection of your skills, desires, and luck-probability factors.
                            </p>
                        </div>
                        <div className="text-center lg:text-right">
                            <button className="px-8 py-4 bg-white text-blue-900 rounded-2xl font-black text-lg hover:shadow-2xl transition-all">
                                Refine Goals Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
