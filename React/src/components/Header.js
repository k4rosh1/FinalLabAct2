// React/src/components/Header.js
import React from 'react';

const Header = ({ totalItems, reorderCount, hasPredicted, predicting, onPredict }) => {
  return (
    <div className="glass-panel">
      <div className="header-content">
        <h1 style={{ margin: '0 0 12px 0', fontSize: '2.5rem', fontWeight: '800', color: '#1e293b' }}>
          Inventory Intelligence
        </h1>
        
        <p style={{ margin: '0 0 32px 0', color: '#64748b', fontSize: '1.1rem' }}>
          Tracking <strong>{totalItems}</strong> Products
          {hasPredicted && (
            <>
              <span style={{ margin: '0 12px', color: '#cbd5e1' }}>|</span>
              <span style={{ color: '#dc2626', fontWeight: '600' }}>
                {reorderCount} Items Need Restocking
              </span>
            </>
          )}
        </p>

        <button 
          onClick={onPredict}
          disabled={predicting || hasPredicted}
          className="action-btn"
          style={{ fontSize: '1rem', padding: '14px 32px' }}
        >
          {predicting ? 'PROCESSING DATA...' : hasPredicted ? 'ANALYSIS COMPLETE' : 'RUN PREDICTION MODEL'}
        </button>
      </div>
    </div>
  );
};

export default Header;