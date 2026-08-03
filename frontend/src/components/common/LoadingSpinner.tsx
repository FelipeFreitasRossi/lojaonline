import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-gold rounded-full animate-spin"></div>
      <span className="sr-only">Carregando...</span>
    </div>
  );
};

export default LoadingSpinner;