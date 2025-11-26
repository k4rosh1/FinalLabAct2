import React from 'react';

const Pagination = ({ currentPage, lastPage, onPrevious, onNext }) => {
  return (
    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
      >
        ← Previous
      </button>
      
      <span className="text-gray-700 font-medium">
        Page <span className="font-bold text-indigo-600">{currentPage}</span> of <span className="font-bold">{lastPage}</span>
      </span>
      
      <button
        onClick={onNext}
        disabled={currentPage === lastPage}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;