import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { User, Calendar, TrendingUp, BookOpen } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getPredictionsHistory } from '../../api/prediction';
import { getProfile, updateProfile } from '../../api/auth';
import { normalizeProfilePhoto } from '../../utils/profilePhoto';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [photoLoadError, setPhotoLoadError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);

      // If local profile_photo already exists, display it immediately
      if (userData.profile_photo) {
        setUser(prev => ({ ...prev, profile_photo: normalizeProfilePhoto(userData.profile_photo) }));
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
          localStorage.setItem('user', JSON.stringify(updatedUser));
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
          <div className="relative mx-auto mb-4 w-36 h-36">
            <div className="relative w-full h-full rounded-full bg-blue-500 shadow-2xl flex items-center justify-center">
              {user?.profile_photo ? (
                <img
                  src={normalizeProfilePhoto(user.profile_photo)}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center">
                  <User className="w-14 h-14 text-white" />
                </div>
              )}

              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-10 h-10 bg-white rounded-full border-2 border-blue-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-500" fill="currentColor">
                  <path d="M12 5a3 3 0 0 1 3 3h2a1 1 0 0 1 0 2h-2a3 3 0 0 1-6 0H7a1 1 0 0 1 0-2h2a3 3 0 0 1 3-3zm-4 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H8z" />
                </svg>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
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

                        const updatedUser = { ...user, profile_photo: normalizedPhoto };
                        setUser(updatedUser);
                        localStorage.setItem('user', JSON.stringify(updatedUser));
                      } catch (err) {
                        console.error('Failed to save profile photo from app:', err);
                      }
                    }
                  };
                  reader.readAsDataURL(file);
                }}
                className="hidden"
              />
            </div>
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
