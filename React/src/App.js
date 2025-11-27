// React/src/App.js
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import ProductTable from './components/ProductTable';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchProducts } from './services/productService';
import { calculatePrediction, calculateDaysOfSupply } from './utils/predictionUtils';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);
  const [hasPredicted, setHasPredicted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyReorder, setShowOnlyReorder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const { products: fetchedProducts, meta } = await fetchProducts(currentPage, ITEMS_PER_PAGE);
        setLastPage(meta.lastPage);
        setTotalItems(meta.total);

        const formattedProducts = fetchedProducts.map(product => ({
          ...product,
          daysOfSupply: calculateDaysOfSupply(product.currentInventory, product.avgSalesPerWeek),
          predictionScore: null,
          needsReorder: null
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [currentPage]);

  const handlePredict = async () => {
    setPredicting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const predictedProducts = products.map(product => {
      const predictionScore = calculatePrediction(product);
      return {
        ...product,
        predictionScore: predictionScore.toFixed(3),
        needsReorder: predictionScore > 0.5
      };
    });
    setProducts(predictedProducts);
    setHasPredicted(true);
    setPredicting(false);
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (showOnlyReorder && hasPredicted) filtered = filtered.filter(p => p.needsReorder);
    if (searchTerm) filtered = filtered.filter(p => p.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    if (hasPredicted) {
      return filtered.sort((a, b) => {
        if (a.needsReorder && !b.needsReorder) return -1;
        if (!a.needsReorder && b.needsReorder) return 1;
        return parseFloat(b.predictionScore) - parseFloat(a.predictionScore);
      });
    }
    return filtered;
  }, [products, showOnlyReorder, searchTerm, hasPredicted]);

  const reorderCount = products.filter(p => p.needsReorder).length;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="app-container">
      <Header
        totalItems={totalItems}
        reorderCount={reorderCount}
        hasPredicted={hasPredicted}
        predicting={predicting}
        onPredict={handlePredict}
      />

      <Controls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showOnlyReorder={showOnlyReorder}
        onFilterChange={setShowOnlyReorder}
        hasPredicted={hasPredicted}
      />

      <ProductTable
        products={filteredProducts}
        hasPredicted={hasPredicted}
      />

      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPrevious={() => setCurrentPage(p => Math.max(1, p - 1))}
        onNext={() => setCurrentPage(p => Math.min(lastPage, p + 1))}
      />
    </div>
  );
}

export default App;