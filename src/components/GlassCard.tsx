import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 ${
        onClick ? 'cursor-pointer hover:bg-white/80 transition-all hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
