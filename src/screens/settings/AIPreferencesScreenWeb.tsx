import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Brain, Zap, Target, TrendingUp, MessageSquare, Shield } from 'lucide-react';

export default function AIPreferencesScreenWeb() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    simulationDepth: 'medium',
    creativityLevel: 60,
    riskTolerance: 'moderate',
    personalizedInsights: true,
    autoSuggestions: true,
    learningFromHistory: true,
    ethicalFilters: true,
    explainPredictions: true,
  });

  return (
    <WebLayout maxWidth="xl">
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings')}
          className="text-blue-600 hover:text-blue-700 mb-4 font-medium"
        >
          ← Back to Settings
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Preferences</h1>
        <p className="text-gray-600">Customize AI behavior and recommendations</p>
      </div>

      <div className="max-w-[1200px] space-y-6">
        {/* Simulation Settings */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Simulation Depth</h3>
              <p className="text-sm text-gray-600">Control how detailed AI predictions are</p>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => setSettings({ ...settings, simulationDepth: 'quick' })}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all ${
                settings.simulationDepth === 'quick'
                  ? 'bg-blue-50 border-2 border-blue-600'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Zap className={`w-5 h-5 ${settings.simulationDepth === 'quick' ? 'text-blue-600' : 'text-gray-600'}`} />
                <div className="text-left">
                  <p className={`font-semibold ${settings.simulationDepth === 'quick' ? 'text-blue-600' : 'text-gray-800'}`}>
                    Quick Analysis
                  </p>
                  <p className="text-sm text-gray-600">Fast results with core insights (30 seconds)</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => setSettings({ ...settings, simulationDepth: 'medium' })}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all ${
                settings.simulationDepth === 'medium'
                  ? 'bg-blue-50 border-2 border-blue-600'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Target className={`w-5 h-5 ${settings.simulationDepth === 'medium' ? 'text-blue-600' : 'text-gray-600'}`} />
                <div className="text-left">
                  <p className={`font-semibold ${settings.simulationDepth === 'medium' ? 'text-blue-600' : 'text-gray-800'}`}>
                    Balanced Analysis
                  </p>
                  <p className="text-sm text-gray-600">Recommended - Detailed insights (1-2 minutes)</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => setSettings({ ...settings, simulationDepth: 'deep' })}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all ${
                settings.simulationDepth === 'deep'
                  ? 'bg-blue-50 border-2 border-blue-600'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <TrendingUp className={`w-5 h-5 ${settings.simulationDepth === 'deep' ? 'text-blue-600' : 'text-gray-600'}`} />
                <div className="text-left">
                  <p className={`font-semibold ${settings.simulationDepth === 'deep' ? 'text-blue-600' : 'text-gray-800'}`}>
                    Deep Analysis
                  </p>
                  <p className="text-sm text-gray-600">Comprehensive predictions (3-5 minutes)</p>
                </div>
              </div>
            </button>
          </div>
        </WebCard>

        {/* AI Creativity Level */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">AI Creativity Level</h3>
              <p className="text-sm text-gray-600">Balance between conservative and innovative suggestions</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Conservative</span>
              <span className="text-sm font-semibold text-gray-800">{settings.creativityLevel}%</span>
              <span className="text-sm text-gray-600">Innovative</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.creativityLevel}
              onChange={(e) => setSettings({ ...settings, creativityLevel: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-sm text-gray-700">
                {settings.creativityLevel < 33 && (
                  <><span className="font-semibold">Conservative Mode:</span> AI will focus on proven, traditional approaches with lower risk.</>
                )}
                {settings.creativityLevel >= 33 && settings.creativityLevel < 67 && (
                  <><span className="font-semibold">Balanced Mode:</span> AI will suggest a mix of proven strategies and innovative ideas.</>
                )}
                {settings.creativityLevel >= 67 && (
                  <><span className="font-semibold">Innovative Mode:</span> AI will explore creative, unconventional solutions with higher potential.</>
                )}
              </p>
            </div>
          </div>
        </WebCard>

        {/* Risk Tolerance */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Risk Tolerance</h3>
              <p className="text-sm text-gray-600">Set your comfort level with risky decisions</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSettings({ ...settings, riskTolerance: 'low' })}
              className={`p-4 rounded-xl border-2 transition-all ${
                settings.riskTolerance === 'low'
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                settings.riskTolerance === 'low' ? 'bg-green-600' : 'bg-gray-100'
              }`}>
                <span className="text-2xl">{settings.riskTolerance === 'low' ? '🛡️' : '🔒'}</span>
              </div>
              <p className={`font-semibold mb-1 ${settings.riskTolerance === 'low' ? 'text-green-600' : 'text-gray-800'}`}>
                Conservative
              </p>
              <p className="text-xs text-gray-600">Safe & stable</p>
            </button>
            <button
              onClick={() => setSettings({ ...settings, riskTolerance: 'moderate' })}
              className={`p-4 rounded-xl border-2 transition-all ${
                settings.riskTolerance === 'moderate'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                settings.riskTolerance === 'moderate' ? 'bg-blue-600' : 'bg-gray-100'
              }`}>
                <span className="text-2xl">{settings.riskTolerance === 'moderate' ? '⚖️' : '📊'}</span>
              </div>
              <p className={`font-semibold mb-1 ${settings.riskTolerance === 'moderate' ? 'text-blue-600' : 'text-gray-800'}`}>
                Moderate
              </p>
              <p className="text-xs text-gray-600">Balanced approach</p>
            </button>
            <button
              onClick={() => setSettings({ ...settings, riskTolerance: 'high' })}
              className={`p-4 rounded-xl border-2 transition-all ${
                settings.riskTolerance === 'high'
                  ? 'border-orange-600 bg-orange-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                settings.riskTolerance === 'high' ? 'bg-orange-600' : 'bg-gray-100'
              }`}>
                <span className="text-2xl">{settings.riskTolerance === 'high' ? '🚀' : '📈'}</span>
              </div>
              <p className={`font-semibold mb-1 ${settings.riskTolerance === 'high' ? 'text-orange-600' : 'text-gray-800'}`}>
                Aggressive
              </p>
              <p className="text-xs text-gray-600">High risk/reward</p>
            </button>
          </div>
        </WebCard>

        {/* AI Features */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">AI Features</h3>
              <p className="text-sm text-gray-600">Enable or disable AI capabilities</p>
            </div>
          </div>
          <div className="space-y-4">
            <ToggleOption
              icon="💡"
              title="Personalized Insights"
              description="AI learns from your preferences and goals"
              checked={settings.personalizedInsights}
              onChange={() => setSettings({ ...settings, personalizedInsights: !settings.personalizedInsights })}
            />
            <ToggleOption
              icon="✨"
              title="Auto Suggestions"
              description="Get proactive recommendations for decisions"
              checked={settings.autoSuggestions}
              onChange={() => setSettings({ ...settings, autoSuggestions: !settings.autoSuggestions })}
            />
            <ToggleOption
              icon="📚"
              title="Learning from History"
              description="AI improves based on your past decisions"
              checked={settings.learningFromHistory}
              onChange={() => setSettings({ ...settings, learningFromHistory: !settings.learningFromHistory })}
            />
            <ToggleOption
              icon="🛡️"
              title="Ethical Filters"
              description="Filter out potentially harmful suggestions"
              checked={settings.ethicalFilters}
              onChange={() => setSettings({ ...settings, ethicalFilters: !settings.ethicalFilters })}
            />
            <ToggleOption
              icon="📖"
              title="Explain Predictions"
              description="Get detailed explanations for AI recommendations"
              checked={settings.explainPredictions}
              onChange={() => setSettings({ ...settings, explainPredictions: !settings.explainPredictions })}
            />
          </div>
        </WebCard>

        {/* Save Button */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={() => navigate('/settings')}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </WebLayout>
  );
}

function ToggleOption({ 
  icon, 
  title, 
  description, 
  checked, 
  onChange 
}: { 
  icon: string;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
          <span className="text-lg">{icon}</span>
        </div>
        <div>
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}
