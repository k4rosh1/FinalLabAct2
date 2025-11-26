import React from 'react';

const ProductTable = ({ products, hasPredicted }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                Current Inventory
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                Sales/Week
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                Lead Time (Days)
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                Days of Supply
              </th>
              {hasPredicted && (
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">
                  Prediction
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`transition-all duration-300 ${
                    product.needsReorder
                      ? 'bg-red-50 hover:bg-red-100'
                      : index % 2 === 0
                      ? 'bg-white hover:bg-gray-50'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                      {product.currentInventory}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700 font-medium">
                    {product.avgSalesPerWeek}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700 font-medium">
                    {product.daysToReplenish}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full font-semibold ${
                      product.daysOfSupply < 7
                        ? 'bg-red-100 text-red-800'
                        : product.daysOfSupply < 14
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.daysOfSupply}
                    </span>
                  </td>
                  {hasPredicted && (
                    <td className="px-6 py-4 text-center">
                      {product.needsReorder ? (
                        <span className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg font-bold shadow-md">
                          ⚠️ REORDER NOW
                        </span>
                      ) : (
                        <span className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg font-bold shadow-md">
                          ✓ Stock OK
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={hasPredicted ? 6 : 5}
                  className="px-6 py-12 text-center text-gray-500 text-lg"
                >
                  No products found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;