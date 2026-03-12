import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { User, Mail, Calendar, MapPin, Edit, TrendingUp, Target, Award, Sparkles, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPredictionsHistory } from '../../api/prediction';

export default function ProfileScreenWeb() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            navigate('/login');
            return;
        }
        const userData = JSON.parse(userStr);
        setUser(userData);

        const fetchHistory = async () => {
            try {
                const data = await getPredictionsHistory(userData.user_id);
                setHistory(data);
            } catch (error) {
                console.error('Failed to fetch history:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, [navigate]);

    if (isLoading || !user) {
        return (
            <WebLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                </div>
            </WebLayout>
        );
    }

    const averageScore = history.length > 0 
        ? Math.round(history.reduce((acc, curr) => acc + curr.success_probability, 0) / history.length) 
        : 0;

  return (
    <WebLayout maxWidth="full">
      <div className="max-w-[1600px] mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <WebCard className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <User className="w-16 h-16 text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform border-2 border-gray-100">
                <Edit className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.username || user.name}</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>
            
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Pro Member
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Verified
              </div>
            </div>

            <button
              onClick={() => navigate('/settings')}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Edit Profile
            </button>
          </WebCard>

          {/* Quick Stats */}
          <WebCard>
            <h3 className="font-bold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <StatItem icon={<Sparkles className="w-5 h-5 text-blue-600" />} label="Future Score" value={`${averageScore}/100`} />
              <StatItem icon={<Target className="w-5 h-5 text-green-600" />} label="Active Goals" value="0" />
              <StatItem icon={<TrendingUp className="w-5 h-5 text-purple-600" />} label="Simulations" value={history.length.toString()} />
              <StatItem icon={<Award className="w-5 h-5 text-orange-600" />} label="Achievements" value="3" />
            </div>
          </WebCard>

          {/* Personal Info */}
          <WebCard>
            <h3 className="font-bold text-gray-800 mb-4">Personal Information</h3>
            <div className="space-y-3">
              <InfoItem icon={<Mail className="w-4 h-4 text-gray-500" />} label="Email" value={user.email} />
              <InfoItem icon={<Calendar className="w-4 h-4 text-gray-500" />} label="Joined" value="Feb 2026" />
              <InfoItem icon={<MapPin className="w-4 h-4 text-gray-500" />} label="Location" value="India" />
            </div>
          </WebCard>
        </div>

        {/* Right Column - Activity & Options */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <WebCard className="text-center bg-blue-50/50">
              <p className="text-3xl font-bold text-blue-600 mb-1">{averageScore}</p>
              <p className="text-sm text-gray-600">Future Score</p>
            </WebCard>
            <WebCard className="text-center bg-green-50/50">
              <p className="text-3xl font-bold text-green-600 mb-1">0</p>
              <p className="text-sm text-gray-600">Active Goals</p>
            </WebCard>
            <WebCard className="text-center bg-purple-50/50">
              <p className="text-3xl font-bold text-purple-600 mb-1">{history.length}</p>
              <p className="text-sm text-gray-600">Simulations</p>
            </WebCard>
            <WebCard className="text-center bg-orange-50/50">
              <p className="text-3xl font-bold text-orange-600 mb-1">0</p>
              <p className="text-sm text-gray-600">AI Insights</p>
            </WebCard>
          </div>

          {/* Recent Activity */}
          <WebCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {history.length > 0 ? history.slice(0, 3).map((h, i) => (
                <ActivityItem 
                    key={i}
                    icon={<Sparkles className="w-5 h-5 text-blue-600" />}
                    title={`Completed ${h.decision_input || 'Simulation'}`}
                    description={`Success rate: ${Math.round(h.success_probability)}%`}
                    time={new Date(h.created_at).toLocaleDateString()}
                />
              )) : (
                  <p className="text-gray-500 italic text-center py-4">No recent activity found.</p>
              )}
            </div>
          </WebCard>

          {/* Achievements */}
          <WebCard>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Achievement emoji="🎯" title="Goal Master" subtitle="Set 10+ goals" />
              <Achievement emoji="🧠" title="AI Explorer" subtitle="50 simulations" />
              <Achievement emoji="💰" title="Finance Pro" subtitle="Smart investor" />
              <Achievement emoji="🔥" title="Streak" subtitle="7 days active" />
            </div>
          </WebCard>
        </div>
      </div>
      </div>
    </WebLayout>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-3 text-sm">
      {icon}
      <div className="flex-1">
        <p className="text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function ActivityItem({ icon, title, description, time }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

function Achievement({ emoji, title, subtitle }: { emoji: string; title: string; subtitle: string }) {
  return (
    <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
      <div className="text-3xl mb-2">{emoji}</div>
      <p className="font-semibold text-gray-800 text-sm">{title}</p>
      <p className="text-xs text-gray-600">{subtitle}</p>
    </div>
  );
}
