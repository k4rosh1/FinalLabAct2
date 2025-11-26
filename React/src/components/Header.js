import React from 'react';

const Header = ({ totalItems, reorderCount, hasPredicted, predicting, onPredict }) => {
  return (
    <header className="bg-white rounded-2xl shadow-xl p-8 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎯 Inventory Reorder Predictor
          </h1>
          <p className="text-gray-600 text-lg">
            Total Products: <span className="font-semibold text-indigo-600">{totalItems}</span>
            {hasPredicted && (
              <span className="ml-4">
                | Urgent Reorders: <span className="font-semibold text-red-600">{reorderCount}</span>
              </span>
            )}
          </p>
        </div>
        
        <button
          onClick={onPredict}
          disabled={predicting || hasPredicted}
          className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
            hasPredicted
              ? 'bg-green-500 text-white cursor-not-allowed'
              : predicting
              ? 'bg-yellow-500 text-white cursor-wait'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
          }`}
        >
          {predicting ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Analyzing...
            </span>
          ) : hasPredicted ? (
            <span className="flex items-center gap-2">
              ✓ Prediction Complete
            </span>
          ) : (
            <span className="flex items-center gap-2">
              🔮 Predict Reorders
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;