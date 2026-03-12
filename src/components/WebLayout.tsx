import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Sparkles, Home, Target, Settings, User, Bell, Search, BarChart3 } from 'lucide-react';

interface WebLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showSidebar?: boolean;
  maxWidth?: 'full' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function WebLayout({ 
  children, 
  showHeader = true, 
  showSidebar = true,
  maxWidth = 'full',
  className = '' 
}: WebLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const maxWidthClasses = {
    full: 'max-w-full',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl'
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
      {/* Top Navigation Bar */}
      {showHeader && (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div className="max-w-screen-2xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo & Brand */}
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/home')}>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    FutureVision AI
                  </h1>
                  <p className="text-xs text-gray-500">Consequence Simulator</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search simulations, insights, goals..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-100/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => navigate('/notifications')}
                  className="relative w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-medium">3</span>
                </button>
                <button 
                  onClick={() => navigate('/profile')}
                  className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center hover:shadow-lg transition-all"
                >
                  <User className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      <div className="flex">
        {/* Sidebar Navigation */}
        {showSidebar && (
          <aside className="hidden lg:block w-72 min-h-screen bg-white/50 backdrop-blur-xl border-r border-gray-200/50">
            <nav className="sticky top-20 p-6 space-y-2">
              <NavItem 
                icon={<Home className="w-5 h-5" />}
                label="Dashboard"
                onClick={() => navigate('/home')}
                active={isActive('/home')}
              />
              <NavItem 
                icon={<Sparkles className="w-5 h-5" />}
                label="New Simulation"
                onClick={() => navigate('/simulation-intro')}
                active={isActive('/simulation-intro')}
              />
              
              <div className="pt-4 pb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">Analytics</p>
              </div>
              
              <NavItem 
                icon={<BarChart3 className="w-5 h-5" />}
                label="Analytics Dashboard"
                onClick={() => navigate('/analytics')}
                active={isActive('/analytics')}
              />
              <NavItem 
                icon={<span className="w-5 h-5 flex items-center justify-center text-purple-600">📈</span>}
                label="Trend Analysis"
                onClick={() => navigate('/analysis/trends')}
                active={isActive('/analysis/trends')}
              />
              <NavItem 
                icon={<span className="w-5 h-5 flex items-center justify-center text-green-600">📊</span>}
                label="Growth Metrics"
                onClick={() => navigate('/analysis/growth')}
                active={isActive('/analysis/growth')}
              />
              
              <div className="pt-4 pb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">Account</p>
              </div>
              
              <NavItem 
                icon={<Settings className="w-5 h-5" />}
                label="Settings"
                onClick={() => navigate('/settings')}
                active={isActive('/settings')}
              />
              <NavItem 
                icon={<User className="w-5 h-5" />}
                label="Profile"
                onClick={() => navigate('/profile')}
                active={isActive('/profile')}
              />
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 ${className}`}>
          <div className={`${maxWidthClasses[maxWidth]} mx-auto px-6 py-8`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}

function NavItem({ icon, label, onClick, active = false }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}