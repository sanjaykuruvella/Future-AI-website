import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import { WebCard } from '../../components/WebCard';
import { Palette, Sun, Moon, Monitor, Contrast } from 'lucide-react';

export default function DisplaySettingsScreenWeb() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    animations: true,
    highContrast: false,
  });

  return (
    <WebLayout maxWidth="xl">
      <div className="mb-8">
        <button
          onClick={() => navigate('/settings')}
          className="text-blue-600 hover:text-blue-700 mb-4 font-medium"
        >
          ← Back to Settings
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Display Settings</h1>
        <p className="text-gray-600">Customize theme and appearance preferences</p>
      </div>

      <div className="max-w-[1200px] space-y-6">
        {/* Theme Selection */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Theme</h3>
              <p className="text-sm text-gray-600">Choose your preferred color scheme</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <ThemeOption
              icon={<Sun className="w-6 h-6" />}
              title="Light"
              description="Bright theme"
              selected={settings.theme === 'light'}
              onClick={() => setSettings({ ...settings, theme: 'light' })}
            />
            <ThemeOption
              icon={<Moon className="w-6 h-6" />}
              title="Dark"
              description="Dark theme"
              selected={settings.theme === 'dark'}
              onClick={() => setSettings({ ...settings, theme: 'dark' })}
            />
            <ThemeOption
              icon={<Monitor className="w-6 h-6" />}
              title="Auto"
              description="System default"
              selected={settings.theme === 'auto'}
              onClick={() => setSettings({ ...settings, theme: 'auto' })}
            />
          </div>
        </WebCard>

        {/* Font Size */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">Aa</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Font Size</h3>
              <p className="text-sm text-gray-600">Adjust text size for better readability</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Small</span>
                <span className="text-sm font-semibold text-gray-800">{settings.fontSize}</span>
                <span className="text-sm text-gray-600">Large</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={settings.fontSize === 'small' ? 0 : settings.fontSize === 'medium' ? 1 : 2}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  const size = value === 0 ? 'small' : value === 1 ? 'medium' : 'large';
                  setSettings({ ...settings, fontSize: size });
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Small</p>
                  <p className="text-sm">Example Text</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Medium</p>
                  <p className="text-base">Example Text</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-1">Large</p>
                  <p className="text-lg">Example Text</p>
                </div>
              </div>
            </div>
          </div>
        </WebCard>

        {/* Visual Preferences */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Contrast className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Visual Preferences</h3>
              <p className="text-sm text-gray-600">Additional display options</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Animations</p>
                  <p className="text-sm text-gray-600">Enable smooth transitions and effects</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.animations}
                  onChange={() => setSettings({ ...settings, animations: !settings.animations })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  <Contrast className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">High Contrast</p>
                  <p className="text-sm text-gray-600">Increase color contrast for visibility</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={() => setSettings({ ...settings, highContrast: !settings.highContrast })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </WebCard>

        {/* Color Preview */}
        <WebCard>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Color Scheme Preview</h3>
              <p className="text-sm text-gray-600">See how your theme looks</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6 rounded-2xl">
            <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">Sample Card</h4>
              <p className="text-gray-600 mb-4">This is how your content will appear with the current theme settings.</p>
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-xl transition-all font-medium">
                Sample Button
              </button>
            </div>
          </div>
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

function ThemeOption({ 
  icon, 
  title, 
  description, 
  selected, 
  onClick 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 transition-all ${
        selected 
          ? 'border-blue-600 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
        selected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
      }`}>
        {icon}
      </div>
      <p className={`font-semibold mb-1 ${selected ? 'text-blue-600' : 'text-gray-800'}`}>
        {title}
      </p>
      <p className="text-xs text-gray-600">{description}</p>
    </button>
  );
}
