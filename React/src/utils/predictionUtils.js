/**
 * Calculates if a product needs reordering based on inventory levels
 * @param {Object} product - Product object with inventory data
 * @returns {number} - Prediction score (0-1)
 */
export const calculatePrediction = (product) => {
  const avgSalesPerDay = product.avgSalesPerWeek / 7;
  const reorderPoint = avgSalesPerDay * product.daysToReplenish * 1.5;
  const score = product.currentInventory < reorderPoint ? 0.85 : 0.15;
  return score;
};

/**
 * Calculates days of supply remaining
 * @param {number} inventory - Current inventory level
 * @param {number} avgSalesPerWeek - Average weekly sales
 * @returns {number} - Days of supply
 */
export const calculateDaysOfSupply = (inventory, avgSalesPerWeek) => {
  return Math.round(inventory / (avgSalesPerWeek / 7));
};