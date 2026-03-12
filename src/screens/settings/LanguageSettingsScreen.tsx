import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Check } from 'lucide-react';

export default function LanguageSettingsScreen() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('US');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const regions = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'EU', name: 'European Union', flag: '🇪🇺' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="h-full flex flex-col px-6 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Language & Region</h1>
          <p className="text-sm text-gray-600">Choose your preferred language</p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto">
          <GlassCard>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">App Language</h3>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`w-full py-3 px-4 rounded-xl flex items-center justify-between transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/70 text-gray-700 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </div>
                  {selectedLanguage === lang.code && (
                    <Check className="w-5 h-5 text-white" />
                  )}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Region</h3>
            <div className="space-y-2">
              {regions.map((region) => (
                <button
                  key={region.code}
                  onClick={() => setSelectedRegion(region.code)}
                  className={`w-full py-3 px-4 rounded-xl flex items-center justify-between transition-all ${
                    selectedRegion === region.code
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/70 text-gray-700 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{region.flag}</span>
                    <span className="text-sm font-medium">{region.name}</span>
                  </div>
                  {selectedRegion === region.code && (
                    <Check className="w-5 h-5 text-white" />
                  )}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="bg-blue-50/50">
            <p className="text-xs text-gray-700">
              💡 Changing language or region will update date formats, currency, and content throughout the app
            </p>
          </GlassCard>
        </div>
      </div>
    </MobileLayout>
  );
}
