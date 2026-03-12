import { useNavigate, useLocation } from 'react-router';
import { Home, Target, Settings } from 'lucide-react';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/quick-simulation', icon: Target, label: 'Simulate' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-lg px-2 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}