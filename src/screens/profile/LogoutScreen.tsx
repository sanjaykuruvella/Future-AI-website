import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { LogOut } from 'lucide-react';

export default function LogoutScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MobileLayout>
      <div className="h-screen flex flex-col items-center justify-center px-8">
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping opacity-75">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full"></div>
          </div>
          <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <LogOut className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Signing Out
          </h1>
          <p className="text-gray-600 text-lg">
            See you next time!
          </p>
        </div>

        <div className="mt-12 flex space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </MobileLayout>
  );
}
