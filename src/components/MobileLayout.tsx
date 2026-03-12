import { ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

export function MobileLayout({ children, showBackButton, onBack, className = '' }: MobileLayoutProps) {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 flex items-center justify-center p-4 overflow-hidden">
      <div className={`w-full max-w-md h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden relative ${className}`}>
        {showBackButton && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-lg flex items-center justify-center shadow-lg hover:bg-white transition-all"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}