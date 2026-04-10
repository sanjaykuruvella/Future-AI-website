import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { User, Calendar, TrendingUp, BookOpen, Upload } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getPredictionsHistory } from '../../api/prediction';
import { getProfile, updateProfile } from '../../api/auth';
import { normalizeProfilePhoto, saveUserToStorage } from '../../utils/profilePhoto';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const joinDate = 'Feb 2026';
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);

      // If local profile_photo already exists, display it immediately
      if (userData.profile_photo) {
        setUser((prev: any) => ({ ...prev, profile_photo: normalizeProfilePhoto(userData.profile_photo) }));
      }

      // Fetch full profile from database (for the latest photo and user info)
      getProfile(userData.email).then(profileData => {
        if (profileData) {
          const normalizedPhoto = normalizeProfilePhoto(profileData.profile_photo || userData.profile_photo);
          const updatedUser = {
            ...userData,
            ...profileData,
            profile_photo: normalizedPhoto,
          };
          saveUserToStorage(updatedUser);
          setUser(updatedUser);
        }
      }).catch((err) => {
        console.error('Failed to fetch profile from database:', err);
      });

      // Load predictions history
      getPredictionsHistory(userData.user_id).then(data => {
        setHistory(data);
      }).catch(() => {
        setHistory([]);
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handlePhotoSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      console.error('Profile photo must be less than 2MB');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string' && user) {
        const normalizedPhoto = normalizeProfilePhoto(reader.result);
        try {
          const updated = await updateProfile(
            user.user_id,
            user.name || '',
            user.email || '',
            normalizedPhoto
          );

          if (updated?.status === false) {
            throw new Error(updated?.error || updated?.message || 'Failed to update profile photo');
          }

          const updatedUser = {
            ...user,
            ...(updated?.user || {}),
            profile_photo: normalizeProfilePhoto(updated?.user?.profile_photo || normalizedPhoto),
          };
          setUser(updatedUser);
          saveUserToStorage(updatedUser);
        } catch (err) {
          console.error('Failed to save profile photo from app:', err);
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };
  const quickStats = [
    { label: 'Avg Score', value: history.length > 0 ? Math.round(history.reduce((sum, pred) => sum + (parseFloat(pred.success_probability) || 0), 0) / history.length) : 0, color: 'from-blue-600 to-purple-600' },
    { label: 'Predictions', value: history.length, color: 'from-green-600 to-blue-600' },
    { label: 'Days Active', value: '45', color: 'from-purple-600 to-pink-600' },
  ];

  const menuItems = [
    { icon: Calendar, label: 'Analytics', route: '/analytics', color: 'from-green-500 to-green-600' },
    { icon: TrendingUp, label: 'Trend Analysis', route: '/analysis/trends', color: 'from-purple-500 to-purple-600' },
    { icon: BookOpen, label: 'Growth Metrics', route: '/analysis/growth', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate('/home')}>
      <div className="h-full flex flex-col px-6 py-8">
        {/* Profile Header */}
        <GlassCard className="mb-6 text-center">
          <div className="relative mx-auto mb-4" style={{ width: 160, height: 160 }}>
            <div className="absolute left-0 top-0 rounded-full overflow-hidden bg-blue-500 shadow-2xl flex items-center justify-center" style={{ width: 144, height: 144, minWidth: 144, minHeight: 144 }}>
              {user?.profile_photo ? (
                <img
                  src={normalizeProfilePhoto(user.profile_photo)}
                  alt="Profile"
                  className="absolute inset-0 rounded-full object-cover" style={{ width: "100%", height: "100%" }}
                  
                />
              ) : (
                <div className="absolute inset-0 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="w-14 h-14 text-white" />
                </div>
              )}
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-blue-500 bg-white text-slate-900 shadow-lg transition hover:scale-105"
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
            <h2 className="text-xl font-bold text-gray-800 mb-1">{user?.name || 'User'}</h2>
            <p className="text-sm text-gray-600 mb-1">{user?.email || 'user@email.com'}</p>
            <p className="text-sm text-gray-500 mb-4">Joined {joinDate}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
            {quickStats.map((stat, index) => (
              <div key={index}>
                <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Profile Menu */}
        <div className="flex-1 space-y-3 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Your Progress</h3>
          {menuItems.map((item, index) => (
            <GlassCard
              key={index}
              onClick={() => navigate(item.route)}
              className="cursor-pointer hover:bg-white/90"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-800 text-sm">{item.label}</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
















