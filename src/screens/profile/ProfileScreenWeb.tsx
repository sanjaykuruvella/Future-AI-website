import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { User, Upload, TrendingUp, Target, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getPredictionsHistory } from '../../api/prediction';
import { updateProfile, getProfile } from '../../api/auth';
import { normalizeProfilePhoto, saveUserToStorage } from '../../utils/profilePhoto';

export default function ProfileScreenWeb() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const [joinDate, setJoinDate] = useState<string>("Feb 2026");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState<boolean>(false);
    const [hasError, setHasError] = useState<string | null>(null);
    const [photoLoadError, setPhotoLoadError] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const userData = JSON.parse(userStr);
            setUser(userData);
            setEditName(userData.name || "");
            setEditEmail(userData.email || "");

            // Calculate join date from user data
            if (userData.created_at) {
                setJoinDate(new Date(userData.created_at).toLocaleDateString());
            }

            // If we already have a profile photo in localStorage, show it right away
            if (userData.profile_photo) {
                setSelectedPhoto(normalizeProfilePhoto(userData.profile_photo));
            }

            // Fetch full profile from database (for the latest photo and user info)
            getProfile(userData.email).then(profileData => {
                if (profileData) {
                    const normalizedPhoto = normalizeProfilePhoto(profileData.profile_photo || userData.profile_photo);
                    if (normalizedPhoto) {
                        setSelectedPhoto(normalizedPhoto);
                        setPhotoLoadError(false);
                    }
                    const updatedUser = { ...userData, ...profileData, profile_photo: normalizedPhoto };
                    saveUserToStorage(updatedUser);
                    setUser(updatedUser);
                } else {
                    console.log("No profile data available in database for this user");
                }
            }).catch((err) => {
                console.error('Failed to fetch profile from database:', err);
                setHasError('Unable to load profile from database.');
            });

            // Always load predictions to compute success-rate and history data
            getPredictionsHistory(userData.user_id).then(data => {
                setHistory(data);
                if (!userData.created_at && data.length > 0) {
                    const earliestPrediction = data.reduce((earliest, current) => 
                        new Date(current.created_at) < new Date(earliest.created_at) ? current : earliest
                    );
                    setJoinDate(new Date(earliestPrediction.created_at).toLocaleDateString());
                }
            }).catch((err) => {
                console.error('Failed to load history:', err);
                setHistory([]);
                setHasError('Unable to load profile history at this time.');
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleSaveProfile = async () => {
        if (!user) return;

        const profilePhotoToSave = normalizeProfilePhoto(selectedPhoto || user.profile_photo || "");

        try {
            const updated = await updateProfile(user.user_id, editName, editEmail, profilePhotoToSave);
            if (updated?.status) {
                const updatedUser = {
                    ...user,
                    ...(updated?.user || {}),
                    name: updated?.user?.name || editName,
                    email: updated?.user?.email || editEmail,
                    profile_photo: normalizeProfilePhoto(updated?.user?.profile_photo || profilePhotoToSave),
                };
                setUser(updatedUser);
                saveUserToStorage(updatedUser);
                setIsEditing(false);
            }
        } catch (err) {
            console.error('Profile update error', err);
        }
    };

    const handlePhotoUpload = async (photoData: string) => {
        if (!user) return;

        const normalizedPhoto = normalizeProfilePhoto(photoData);
        setIsUploadingPhoto(true);
        setHasError(null);
        setSelectedPhoto(normalizedPhoto);
        setPhotoLoadError(false);

        try {
            const updated = await updateProfile(
                user.user_id,
                editName || user.name || "",
                editEmail || user.email || "",
                normalizedPhoto
            );

            if (updated?.status === false) {
                throw new Error(updated?.error || updated?.message || 'Failed to upload profile photo');
            }

            const updatedUser = {
                ...user,
                ...(updated?.user || {}),
                name: updated?.user?.name || editName || user.name,
                email: updated?.user?.email || editEmail || user.email,
                profile_photo: normalizeProfilePhoto(updated?.user?.profile_photo || normalizedPhoto),
            };
            setUser(updatedUser);
            saveUserToStorage(updatedUser);
        } catch (err: any) {
            console.error('Profile photo upload error', err);
            setHasError(err?.message || 'Unable to upload profile photo to database.');
        } finally {
            setIsUploadingPhoto(false);
        }
    };

    const handlePhotoSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setHasError('Profile photo must be less than 2MB');
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                handlePhotoUpload(reader.result);
            }
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const lastPrediction = history.length > 0 ? history[0] : null;
    const behavioralData = [
      { subject: 'Finance', value: lastPrediction ? Math.round(parseFloat(lastPrediction.financial_impact) || 50) : 50, fullMark: 100 },
      { subject: 'Career', value: lastPrediction ? Math.round(parseFloat(lastPrediction.success_probability) || 50) : 50, fullMark: 100 },
      { subject: 'Satisfaction', value: lastPrediction ? Math.round(parseFloat(lastPrediction.life_satisfaction) || 50) : 50, fullMark: 100 },
      { subject: 'Risk Level', value: lastPrediction ? (lastPrediction.risk_level === 'high' ? 30 : lastPrediction.risk_level === 'medium' ? 60 : 90) : 50, fullMark: 100 },
      { subject: 'Consistency', value: history.length > 5 ? 90 : history.length > 2 ? 70 : 50, fullMark: 100 }
    ];

  if (isLoading) {
    return (
      <WebLayout maxWidth="full">
        <div className="max-w-[1400px] mx-auto px-6 pb-16 pt-6">Loading profile... Please wait.</div>
      </WebLayout>
    );
  }

  if (hasError) {
    return (
      <WebLayout maxWidth="full">
        <div className="max-w-[1400px] mx-auto px-6 pb-16 pt-6 text-red-600">{hasError}</div>
      </WebLayout>
    );
  }

  return (
    <WebLayout maxWidth="full">
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">User Identity</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Profile Overview</h1>
            <p className="text-sm text-gray-600 mt-1">Manage personal details, avatar, and analytics in one place.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Profile Card */}
            <div className="mx-auto w-full max-w-md rounded-3xl bg-white border border-gray-200 shadow-lg p-6">
              <div className="relative mx-auto mb-4 flex items-center justify-center" style={{ width: 160, height: 160 }}>
                <div className="absolute left-0 top-0 rounded-full overflow-hidden bg-blue-500 shadow-2xl flex items-center justify-center" style={{ width: 144, height: 144, minWidth: 144, minHeight: 144 }}>
                  {(selectedPhoto || user?.profile_photo) && !photoLoadError ? (
                    <img
                      src={normalizeProfilePhoto(selectedPhoto || user?.profile_photo)}
                      alt="Profile"
                      className="absolute inset-0 rounded-full object-cover" style={{ width: "100%", height: "100%" }}
                      
                      onError={() => {
                        setPhotoLoadError(true);
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 rounded-full bg-blue-500 flex items-center justify-center">
                      <User className="w-14 h-14 text-white" />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-white text-slate-900 shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isUploadingPhoto}
                >
                  <Upload className="h-5 w-5" />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelection}
                  className="hidden"
                />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name || 'Your Name'}</h2>
                <p className="text-sm text-gray-600 mb-1">{user?.email || 'user@example.com'}</p>
                <p className="text-xs text-gray-500 mb-4">Joined {joinDate}</p>
                {isUploadingPhoto && (
                  <p className="text-xs text-blue-600 mb-4">Uploading photo to database...</p>
                )}
              </div>

              <div className="space-y-3">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Your Name"
                    />
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="Your Email"
                    />
                    <button
                      onClick={handleSaveProfile}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditName(user?.name || '');
                        setEditEmail(user?.email || '');
                      }}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <WebCard>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <StatItem icon={<Target className="w-5 h-5 text-blue-600" />} label="Predictions Made" value={history.length.toString()} />
                <StatItem icon={<TrendingUp className="w-5 h-5 text-green-600" />} label="Success Rate" value={`${history.length > 0 ? Math.round(history.reduce((acc, h) => acc + (parseFloat(h.success_probability) || 0), 0) / history.length) : 0}%`} />
                <StatItem icon={<Sparkles className="w-5 h-5 text-purple-600" />} label="Active Goals" value="3" />
              </div>
            </WebCard>
          </div>

          {/* Right Column - Activity & Analytics */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Analytics Overview */}
            <WebCard className="text-center bg-gradient-to-br from-blue-50 to-indigo-50">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Behavioral Analytics</h3>
              <p className="text-gray-600 mb-6">Your decision-making patterns and success metrics</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-600">Risk Assessment</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-green-600">92%</div>
                  <div className="text-sm text-gray-600">Goal Achievement</div>
                </div>
              </div>
              <div className="space-y-5 mt-auto">
                {behavioralData.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">{item.subject}</span>
                      <span className="text-sm font-black text-indigo-600">{item.value}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </WebCard>

            {/* Recent Activity */}
            <WebCard className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                <button 
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group"
                >
                  View All <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {history.length > 0 ? history.slice(0, 4).map((h, i) => (
                  <ActivityItem 
                      key={i}
                      icon={<Sparkles className="w-5 h-5 text-blue-600" />}
                      title={`Completed ${h.decision_input || 'Simulation'}`}
                      description={`Success rate: ${Math.round(h.success_probability)}%`}
                      time={new Date(h.created_at).toLocaleDateString()}
                  />
                )) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-50 space-y-3 pb-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 italic text-center">No recent activity found.</p>
                    </div>
                )}
              </div>
            </WebCard>
          </div>
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














