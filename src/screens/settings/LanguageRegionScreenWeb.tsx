import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Globe, MapPin, Clock, Calendar } from 'lucide-react';

export default function LanguageRegionScreenWeb() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    language: 'en',
    region: 'IN',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: 'INR',
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const regions = [
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  ];

  return (
    <WebLayout maxWidth="xl">
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings')}
          className="text-blue-600 hover:text-blue-700 mb-4 font-medium"
        >
          ← Back to Settings
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Language & Region</h1>
        <p className="text-gray-600">Customize language and location preferences</p>
      </div>

      <div className="max-w-[1200px] space-y-6">
        {/* Language Selection */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Language</h3>
              <p className="text-sm text-gray-600">Choose your preferred language</p>
            </div>
          </div>
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSettings({ ...settings, language: lang.code })}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  settings.language === lang.code
                    ? 'bg-blue-50 border-2 border-blue-600'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className={`font-medium ${
                    settings.language === lang.code ? 'text-blue-600' : 'text-gray-800'
                  }`}>
                    {lang.name}
                  </span>
                </div>
                {settings.language === lang.code && (
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </WebCard>

        {/* Region Selection */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Region</h3>
              <p className="text-sm text-gray-600">Select your location</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {regions.map((region) => (
              <button
                key={region.code}
                onClick={() => setSettings({ ...settings, region: region.code })}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  settings.region === region.code
                    ? 'bg-purple-50 border-2 border-purple-600'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">{region.flag}</span>
                <span className={`font-medium text-sm ${
                  settings.region === region.code ? 'text-purple-600' : 'text-gray-800'
                }`}>
                  {region.name}
                </span>
              </button>
            ))}
          </div>
        </WebCard>

        {/* Date & Time Format */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Date & Time Format</h3>
              <p className="text-sm text-gray-600">Customize how dates and times appear</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
              <select
                value={settings.dateFormat}
                onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY (05/03/2026)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (03/05/2026)</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD (2026-03-05)</option>
                <option value="DD MMM YYYY">DD MMM YYYY (05 Mar 2026)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Format</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSettings({ ...settings, timeFormat: '12h' })}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    settings.timeFormat === '12h'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  12-hour (2:30 PM)
                </button>
                <button
                  onClick={() => setSettings({ ...settings, timeFormat: '24h' })}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    settings.timeFormat === '24h'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  24-hour (14:30)
                </button>
              </div>
            </div>
          </div>
        </WebCard>

        {/* Time Zone */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Time Zone</h3>
              <p className="text-sm text-gray-600">Set your local time zone</p>
            </div>
          </div>
          <select
            value={settings.timezone}
            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="Asia/Kolkata">India Standard Time (IST)</option>
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
            <option value="Europe/London">Greenwich Mean Time (GMT)</option>
            <option value="Europe/Paris">Central European Time (CET)</option>
            <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
            <option value="Australia/Sydney">Australian Eastern Time (AET)</option>
          </select>
        </WebCard>

        {/* Currency */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">₹</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Currency</h3>
              <p className="text-sm text-gray-600">Default currency for financial simulations</p>
            </div>
          </div>
          <select
            value={settings.currency}
            onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            <option value="INR">₹ Indian Rupee (INR)</option>
            <option value="USD">$ US Dollar (USD)</option>
            <option value="EUR">€ Euro (EUR)</option>
            <option value="GBP">£ British Pound (GBP)</option>
            <option value="JPY">¥ Japanese Yen (JPY)</option>
            <option value="AUD">A$ Australian Dollar (AUD)</option>
            <option value="CAD">C$ Canadian Dollar (CAD)</option>
          </select>
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
            Save Changes
          </button>
        </div>
      </div>
    </WebLayout>
  );
}
