import { useNavigate, useLocation } from 'react-router';
import { MobileLayout } from '../../components/MobileLayout';
import { GlassCard } from '../../components/GlassCard';
import { Button } from '../../components/Button';
import { CheckCircle2 } from 'lucide-react';

export default function CheckYourEmailScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';

  const handleResendEmail = () => {
    // Logic to resend email
    alert('Email resent successfully!');
  };

  return (
    <MobileLayout showBackButton onBack={() => navigate('/login')}>
      <div className="h-full flex flex-col items-center justify-center px-6">
        <div className="text-center mb-8">
          {/* Green checkmark icon */}
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h1>
          <p className="text-sm text-gray-600 px-4">
            We've sent password reset instructions to your email
          </p>
        </div>

        {/* Info box */}
        <GlassCard className="w-full mb-6 bg-blue-50/80 border-blue-100">
          <div>
            <p className="text-sm font-medium text-gray-900 mb-1">
              Didn't receive the email?
            </p>
            <p className="text-xs text-gray-600">
              Check your spam folder or try again
            </p>
          </div>
        </GlassCard>

        {/* Buttons */}
        <div className="w-full space-y-3">
          <Button 
            onClick={() => navigate('/login')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Back to Login
          </Button>
          
          <Button 
            onClick={handleResendEmail}
            variant="secondary"
            className="w-full"
          >
            Resend Email
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
