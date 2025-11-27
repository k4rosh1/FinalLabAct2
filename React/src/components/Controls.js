// React/src/components/Controls.js
import React from 'react';

const Controls = ({ searchTerm, onSearchChange, showOnlyReorder, onFilterChange, hasPredicted }) => {
  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="custom-input"
          />
        </div>
        
        {hasPredicted && (
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', color: '#475569', fontWeight: '500' }}>
            <input
              type="checkbox"
              checked={showOnlyReorder}
              onChange={(e) => onFilterChange(e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: '#764ba2' }}
            />
            Show Critical Only
          </label>
        )}
      </div>
    </div>
  );
};

export default Controls;