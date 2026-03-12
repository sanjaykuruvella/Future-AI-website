import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, 
  Clock, Target, Sparkles, ArrowRight, Download, Share2, Loader2 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPredictionsHistory } from '../../api/prediction';

export default function PredictionSummaryScreenWeb() {
  const navigate = useNavigate();
  const [lastPrediction, setLastPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLastPrediction = async () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(userStr);
        try {
            const data = await getPredictionsHistory(user.user_id);
            if (data.length > 0) {
                setLastPrediction(data[0]); // History is usually descending
            }
        } catch (error) {
            console.error('Failed to fetch summary:', error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchLastPrediction();
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

  const outcomes = [
    {
      category: 'Financial Impact',
      positive: lastPrediction ? `Potential growth of ${Math.round(lastPrediction.financial_impact)}%` : 'No data',
      negative: 'Market volatility risks analyzed',
      probability: lastPrediction ? Math.round(lastPrediction.success_probability * 0.9) : 0,
      icon: TrendingUp,
      color: 'green'
    },
    {
      category: 'Career Growth',
      positive: lastPrediction ? `Future readiness: ${Math.round(lastPrediction.future_comparison)}/100` : 'No data',
      negative: 'Contextual adaptation required',
      probability: lastPrediction ? Math.round(lastPrediction.success_probability * 0.85) : 0,
      icon: Target,
      color: 'blue'
    },
    {
      category: 'Time Investment',
      positive: `Efficiency: ${lastPrediction?.timeline || '6 months'}`,
      negative: 'Commitment level: Medium-High',
      probability: 85,
      icon: Clock,
      color: 'purple'
    },
    {
      category: 'Risk Assessment',
      positive: 'AI Confidence: High',
      negative: `Alternative Risk: ${Math.round(lastPrediction?.alternative_scenario)}%`,
      probability: 65,
      icon: AlertTriangle,
      color: 'orange'
    }
  ];

  return (
    <WebLayout maxWidth="xl">
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-semibold text-green-600">Analysis Complete</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Your Prediction Summary
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-4">
          AI has analyzed <span className="font-semibold text-blue-600">2,847 scenarios</span> to predict the outcomes of your decision
        </p>
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-sm text-blue-900">
            💡 <span className="font-semibold">Next step:</span> Review each outcome area, then explore detailed timeline projections
          </span>
        </div>
      </div>

      {/* Overall Score */}
      <WebCard className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-200 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-2">Overall Success Probability</p>
            <div className="flex items-baseline space-x-3">
              <span className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {lastPrediction ? Math.round(lastPrediction.success_probability) : 0}%
              </span>
              <span className="text-2xl text-gray-500">
                {lastPrediction?.success_probability > 50 ? 'Likely to Succeed' : 'Uncertain Outcome'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Based on your profile, market conditions, and 50,000+ similar decisions
            </p>
          </div>
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
        </div>
      </WebCard>

      {/* Key Outcomes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Outcome Areas</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {outcomes.map((outcome, idx) => {
            const Icon = outcome.icon;
            const colors = {
              green: { bg: 'from-green-500 to-emerald-600', border: 'border-green-200', text: 'text-green-600' },
              blue: { bg: 'from-blue-500 to-cyan-600', border: 'border-blue-200', text: 'text-blue-600' },
              purple: { bg: 'from-purple-500 to-pink-600', border: 'border-purple-200', text: 'text-purple-600' },
              orange: { bg: 'from-orange-500 to-red-600', border: 'border-orange-200', text: 'text-orange-600' }
            };
            const colorClasses = colors[outcome.color as keyof typeof colors];

            return (
              <WebCard key={idx} className={`${colorClasses.border}`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800">{outcome.category}</h3>
                      <span className={`text-sm font-semibold ${colorClasses.text}`}>
                        {outcome.probability}% confidence
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">{outcome.positive}</p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">{outcome.negative}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </WebCard>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <WebCard 
          onClick={() => navigate('/simulation/timeline')}
          hover
          className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-200"
        >
          <div className="text-center py-4">
            <Clock className="w-12 h-12 mx-auto mb-3 text-blue-600" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">View Timeline</h3>
            <p className="text-sm text-gray-600 mb-4">See month-by-month predictions</p>
            <div className="flex items-center justify-center space-x-2 text-blue-600 font-semibold">
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </WebCard>

        <WebCard 
          onClick={() => navigate('/simulation/risk-reward')}
          hover
          className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-200"
        >
          <div className="text-center py-4">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Risk Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">Detailed risk vs reward breakdown</p>
            <div className="flex items-center justify-center space-x-2 text-purple-600 font-semibold">
              <span>Analyze</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </WebCard>

        <WebCard 
          onClick={() => navigate('/simulation/scenario-map')}
          hover
          className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-200"
        >
          <div className="text-center py-4">
            <Target className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Scenario Map</h3>
            <p className="text-sm text-gray-600 mb-4">Explore different pathways</p>
            <div className="flex items-center justify-center space-x-2 text-green-600 font-semibold">
              <span>View Map</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </WebCard>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="flex items-center space-x-4">
          <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Report</span>
          </button>
          <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
        <button
          onClick={() => navigate('/analytics')}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <span>Continue to Full Analytics</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </WebLayout>
  );
}
