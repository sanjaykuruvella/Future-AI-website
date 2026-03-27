import { useNavigate } from 'react-router';
import { WebLayout } from '../components/WebLayout';
import { WebCard } from '../components/WebCard';
import { Sparkles } from 'lucide-react';

export default function DemoNavigationScreen() {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Authentication & Welcome',
      screens: [
        { path: '/', label: 'Landing Page (WEB)' },
        { path: '/splash', label: 'Splash Screen (WEB)' },
        { path: '/welcome', label: 'Welcome Screen (WEB)' },
        { path: '/login', label: 'Login (WEB)' },
        { path: '/signup', label: 'Sign Up (WEB)' },
      ]
    },
    {
      title: 'Onboarding Flow',
      screens: [
        { path: '/feature-intro-1', label: 'Feature Intro 1 (WEB)' },
        { path: '/feature-intro-2', label: 'Feature Intro 2 (WEB)' },
        { path: '/feature-intro-3', label: 'Feature Intro 3 (WEB)' },
      ]
    },
    {
      title: 'Main Dashboard & Home',
      screens: [
        { path: '/home', label: 'Home Dashboard (WEB)' },
        { path: '/quick-simulation', label: 'Quick Simulation Hub (WEB)' },
        { path: '/ai-chat', label: 'AI Assistant Chat (WEB)' },
      ]
    },
    {
      title: 'Simulation Engine',
      screens: [
        { path: '/simulation-intro', label: 'Simulation Intro (WEB)' },
        { path: '/simulation/category', label: 'Decision Category (WEB)' },
        { path: '/simulation/career', label: 'Career Decision (WEB)' },
        { path: '/simulation/finance', label: 'Finance Decision (WEB)' },
        { path: '/simulation/education', label: 'Education Decision (WEB)' },
        { path: '/simulation', label: 'Decision Simulation (WEB)' },
      ]
    },
    {
      title: 'Analysis & Results',
      screens: [
        { path: '/analytics', label: 'Analytics Dashboard (WEB)' },
        { path: '/analysis/trends', label: 'Trend Analysis (WEB)' },
        { path: '/analysis/growth', label: 'Growth Metrics (WEB)' },
      ]
    },
    {
      title: 'Profile & Settings',
      screens: [
        { path: '/profile', label: 'Profile (WEB)' },
        { path: '/settings', label: 'Settings (WEB)' },
      ]
    },
  ];

  return (
    <WebLayout showSidebar={false} maxWidth="2xl">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          FutureVision AI
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Complete Web Interface
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
          Complete Desktop Web Application - Career, Finance & Education Simulator
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">
            🌐 Web Optimized
          </div>
          <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
            ✓ Indian Rupees (₹)
          </div>
          <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-medium">
            🎨 Glassmorphism
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.screens.map((screen, screenIdx) => (
                <WebCard 
                  key={screenIdx} 
                  onClick={() => navigate(screen.path)}
                  hover
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{screen.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{screen.path}</p>
                    </div>
                    <div className="text-blue-600">→</div>
                  </div>
                </WebCard>
              ))}
            </div>
          </div>
        ))}
      </div>

      <WebCard className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none">
        <div className="text-center py-8">
          <h3 className="text-3xl font-bold mb-4">Start Exploring!</h3>
          <p className="text-xl text-blue-50 mb-6 max-w-2xl mx-auto">
            Click any screen above to see the full web interface in action
          </p>
          <button
            onClick={() => navigate('/home')}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </WebCard>
    </WebLayout>
  );
}
