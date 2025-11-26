const API_BASE_URL = 'http://localhost:8200/api';

/**
 * Fetches products from the API
 * @param {number} page - Current page number
 * @param {number} perPage - Items per page
 * @returns {Promise<Object>} - API response with products and metadata
 */
export const fetchProducts = async (page = 1, perPage = 100) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?page=${page}&per_page=${perPage}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const jsonResponse = await response.json();
    const dbData = jsonResponse.data || jsonResponse;
    const meta = jsonResponse.meta || {};

    return {
      products: dbData.map(item => ({
        id: item.id,
        productName: item.productName || item.product_name,
        currentInventory: item.currentInventory || item.current_inventory,
        avgSalesPerWeek: Math.round(parseFloat(item.avgSalesPerWeek || item.avg_sales_per_week)),
        daysToReplenish: Math.round(parseFloat(item.daysToReplenish || item.days_to_replenish)),
      })),
      meta: {
        lastPage: meta.last_page || 1,
        total: meta.total || dbData.length,
        currentPage: meta.current_page || page
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
