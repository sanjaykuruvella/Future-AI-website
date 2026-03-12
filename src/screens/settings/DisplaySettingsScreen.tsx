import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Moon, Sun, Smartphone } from 'lucide-react';

export default function DisplaySettingsScreen() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');

  const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'auto', label: 'Auto', icon: Smartphone },
  ];

  const fontSizes = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
  ];

  return (
    <MobileLayout showBackButton onBack={() => navigate(-1)}>
      <div className="h-full flex flex-col px-6 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Display & Theme</h1>
          <p className="text-sm text-gray-600">Customize how the app looks</p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto">
          <GlassCard>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`py-3 px-2 rounded-xl text-xs font-medium transition-all ${
                    theme === t.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/70 text-gray-700 hover:bg-white'
                  }`}
                >
                  <t.icon className="w-5 h-5 mx-auto mb-1" />
                  {t.label}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Text Size</h3>
            <div className="space-y-2">
              {fontSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setFontSize(size.id)}
                  className={`w-full py-3 px-4 rounded-xl text-left transition-all ${
                    fontSize === size.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/70 text-gray-700 hover:bg-white'
                  }`}
                >
                  <span className={`font-medium ${
                    size.id === 'small' ? 'text-xs' : size.id === 'large' ? 'text-base' : 'text-sm'
                  }`}>
                    {size.label}
                  </span>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="bg-blue-50/50">
            <p className="text-xs text-gray-700">
              💡 Theme and display changes will apply immediately across the app
            </p>
          </GlassCard>
        </div>
      </div>
    </MobileLayout>
  );
}
