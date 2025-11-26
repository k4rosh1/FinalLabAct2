import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading Products...</h2>
      </div>
    </div>
  );
};

export default LoadingSpinner;