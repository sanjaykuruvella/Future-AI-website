import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { User, Loader2 } from 'lucide-react';
import { updateProfile } from '../../api/auth';

export default function AccountSettingsScreenWeb() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState({ text: '', isError: false });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const u = JSON.parse(userStr);
      setUser(u);
      setName(u.name || '');
      setEmail(u.email || '');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    setMsg({ text: '', isError: false });
    try {
      const res = await updateProfile(user.user_id, name, email, user.profile_photo);
      if (res.status === false) {
          setMsg({ text: res.error || res.message || 'Failed to update', isError: true });
      } else {
          // Update local storage
          const updatedUser = { ...user, name, email };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          setMsg({ text: 'Profile updated safely', isError: false });
          setTimeout(() => navigate('/settings'), 1000);
      }
    } catch (e: any) {
      setMsg({ text: e.message || 'An error occurred', isError: true });
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  return (
    <WebLayout maxWidth="xl">
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings')}
          className="text-blue-600 hover:text-blue-700 mb-4 font-medium"
        >
          ← Back to Settings
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your personal information and security</p>
      </div>

      <div className="max-w-[1200px] space-y-6">
        {msg.text && (
            <div className={`p-4 rounded-xl text-sm font-medium ${msg.isError ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                {msg.text}
            </div>
        )}

        {/* Profile Information */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Profile Information</h3>
              <p className="text-sm text-gray-600">Update your name and profile details</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
          </div>
        </WebCard>



        {/* Save Button */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={() => navigate('/settings')}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold disabled:opacity-70"
          >
            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>
    </WebLayout>
  );
}
