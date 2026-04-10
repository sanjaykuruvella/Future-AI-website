import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { Mail, Lock, Fingerprint, Globe, WifiOff, Wifi, User } from 'lucide-react';
import { useBackendStatus } from '../../hooks/useBackendStatus';

import { getProfilePhoto, loginUser } from '../../api/auth';
import { normalizeProfilePhoto, saveUserToStorage } from '../../utils/profilePhoto';
import { toast } from 'sonner';

export default function LoginScreen() {
  const isConnected = useBackendStatus();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savedPhoto, setSavedPhoto] = useState('');
  const [isFetchingPhoto, setIsFetchingPhoto] = useState(false);

  useEffect(() => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setSavedPhoto('');
      setIsFetchingPhoto(false);
      return;
    }

    let isActive = true;
    const timeoutId = window.setTimeout(async () => {
      setIsFetchingPhoto(true);
      try {
        const profile = await getProfilePhoto(trimmedEmail);
        if (!isActive) return;
        setSavedPhoto(normalizeProfilePhoto(profile?.profile_photo));
      } catch {
        if (!isActive) return;
        setSavedPhoto('');
      } finally {
        if (isActive) {
          setIsFetchingPhoto(false);
        }
      }
    }, 300);

    return () => {
      isActive = false;
      window.clearTimeout(timeoutId);
    };
  }, [email]);
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      if (response.status) {
        const previousUserStr = localStorage.getItem('user');
        const previousUser = previousUserStr ? JSON.parse(previousUserStr) : null;
        const previousPhoto =
          previousUser?.email === response.user?.email
            ? normalizeProfilePhoto(previousUser?.profile_photo)
            : '';
        const loginPhoto = normalizeProfilePhoto(response.user?.profile_photo);
        const mergedUser = {
          ...previousUser,
          ...response.user,
          profile_photo: loginPhoto || previousPhoto || '',
        };
        saveUserToStorage(mergedUser);
        toast.success(response.message || 'Login Successful');
        navigate('/home');
      } else {
        toast.error(response.message || 'Login failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error occurred during login. Please ensure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="h-full flex flex-col items-center justify-center px-6">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
            {savedPhoto ? (
              <img src={savedPhoto} alt="Saved profile" className="h-full w-full object-cover" />
            ) : (
              <User className="h-9 w-9 text-white" />
            )}
          </div>
          <div className="flex justify-center mb-4">
            {isConnected ? (
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
                <Wifi className="w-3 h-3" />
                <span>Backend Online</span>
              </div>
            ) : isConnected === false ? (
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold border border-red-200">
                <WifiOff className="w-3 h-3" />
                <span>Backend Offline</span>
              </div>
            ) : (
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold border border-gray-200">
                <Globe className="w-3 h-3 animate-spin" />
                <span>Checking...</span>
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-600">{isFetchingPhoto ? 'Checking saved profile photo...' : 'Sign in to continue your journey'}</p>
        </div>

        <GlassCard className="w-full mb-6">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="you@example.com"
                  autoComplete="new-password"
                  id="email"
                  name="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  id="password"
                  name="password"
                />
              </div>
            </div>

            <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>

            <button
              onClick={() => navigate('/forgot-password')}
              className="w-full text-sm text-blue-600 hover:text-blue-700 mt-2"
            >
              Forgot Password?
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white/70 text-gray-500">Or</span>
              </div>
            </div>

            <Button variant="secondary" className="w-full flex items-center justify-center space-x-2">
              <Fingerprint className="w-4 h-4" />
              <span className="text-sm">Sign in with Face ID</span>
            </Button>
          </div>
        </GlassCard>

        <p className="text-xs text-gray-600">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-blue-600 font-medium">
            Sign up
          </button>
        </p>
      </div>
    </MobileLayout>
  );
}





