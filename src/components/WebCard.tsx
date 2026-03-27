import { ReactNode } from 'react';

interface WebCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function WebCard({ children, className = '', onClick, hover = false }: WebCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white backdrop-blur-none border border-gray-200 rounded-2xl p-6 shadow-sm
        ${hover ? 'hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
