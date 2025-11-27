// React/src/components/ProductTable.js
import React from 'react';

const ProductTable = ({ products, hasPredicted }) => {
  return (
    <div className="glass-panel">
      <table className="products-table">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Product Name</th>
            <th style={{ textAlign: 'right' }}>Stock</th>
            <th style={{ textAlign: 'right' }}>Sales/Wk</th>
            <th style={{ textAlign: 'center' }}>Status</th>
            {hasPredicted && <th style={{ width: '25%' }}>Prediction Confidence</th>}
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td style={{ fontWeight: '500' }}>{product.productName}</td>
                <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '1rem' }}>
                  {product.currentInventory}
                </td>
                <td style={{ textAlign: 'right', color: '#64748b' }}>
                  {product.avgSalesPerWeek}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {!hasPredicted ? (
                    <span className="badge badge-pending">PENDING</span>
                  ) : product.needsReorder ? (
                    <span className="badge badge-reorder">Restock</span>
                  ) : (
                    <span className="badge badge-ok">Healthy</span>
                  )}
                </td>
                {hasPredicted && (
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', width: '35px' }}>
                        {(product.predictionScore * 100).toFixed(0)}%
                      </span>
                      <div className="confidence-wrapper">
                        <div 
                          className="confidence-fill"
                          style={{ 
                            width: `${product.predictionScore * 100}%`,
                            backgroundColor: product.needsReorder ? '#dc2626' : '#16a34a'
                          }}
                        />
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={hasPredicted ? 5 : 4} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;