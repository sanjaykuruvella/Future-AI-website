import { ReactNode } from 'react';
import { WebLayout } from './WebLayout';

interface WebWrapperProps {
  children: ReactNode;
  title?: string;
  maxWidth?: 'full' | 'lg' | 'xl' | '2xl';
}

/**
 * Wrapper component to adapt mobile screens to web layout
 * Used for screens that haven't been converted to full web versions yet
 */
export function WebWrapper({ children, title, maxWidth = 'xl' }: WebWrapperProps) {
  return (
    <WebLayout maxWidth={maxWidth}>
      {title && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        </div>
      )}
      <div className="bg-white/70 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-sm">
        {children}
      </div>
    </WebLayout>
  );
}
