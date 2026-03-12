import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Save, Share2, FileText, CheckCircle2 } from 'lucide-react';

export default function SaveSimulationScreen() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [title, setTitle] = useState('Career Change to Tech Startup');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      navigate('/analytics');
    }, 1500);
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="min-h-screen flex flex-col px-6 py-12">
        {!saved ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Save className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Save Simulation</h1>
              <p className="text-gray-600">Keep this prediction for future reference</p>
            </div>

            <GlassCard className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Simulation Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Give this simulation a name"
              />
            </GlassCard>

            <GlassCard className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Add any notes or thoughts about this decision..."
              />
            </GlassCard>

            <GlassCard className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">What will be saved:</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Prediction score and timeline</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Detailed outcomes and analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>AI recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Risk vs reward analysis</span>
                </div>
              </div>
            </GlassCard>

            <div className="space-y-3">
              <Button onClick={handleSave} className="w-full">
                <Save className="w-5 h-5 mr-2" />
                Save Simulation
              </Button>
              <Button variant="secondary" className="w-full">
                <Share2 className="w-5 h-5 mr-2" />
                Share with Advisor
              </Button>
              <Button variant="secondary" className="w-full">
                <FileText className="w-5 h-5 mr-2" />
                Export as PDF
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Saved Successfully!</h2>
            <p className="text-gray-600 text-center">
              Your simulation has been saved to your history
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
