import React from 'react';

const Controls = ({ searchTerm, onSearchChange, showOnlyReorder, onFilterChange, hasPredicted }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex flex-wrap gap-4 items-center justify-between">
      <input
        type="text"
        placeholder="🔍 Search products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 min-w-[250px] px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
      />
      
      {hasPredicted && (
        <label className="flex items-center gap-2 cursor-pointer bg-indigo-50 px-4 py-3 rounded-lg hover:bg-indigo-100 transition-colors">
          <input
            type="checkbox"
            checked={showOnlyReorder}
            onChange={(e) => onFilterChange(e.target.checked)}
            className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
          />
          <span className="font-medium text-gray-700">Show Only Reorder Needed</span>
        </label>
      )}
    </div>
  );
};

export default Controls;
