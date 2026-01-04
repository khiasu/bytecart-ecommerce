/**
 * Utility functions for price calculations and formatting
 */

/**
 * Format a number as a price string (Indian Rupees)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted price (e.g., "₹999.00")
 */
export const formatPrice = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0.00';
  }
  // Format with Indian number system (lakhs, crores)
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/**
 * Calculate discount percentage between original and current price
 * @param {number} originalPrice - Original price
 * @param {number} currentPrice - Current/sale price
 * @returns {number} Discount percentage (rounded)
 */
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) {
    return 0;
  }
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
};

/**
 * Calculate total price for a cart item
 * @param {number} price - Unit price
 * @param {number} quantity - Quantity
 * @returns {number} Total price (price × quantity)
 */
export const calculateItemTotal = (price, quantity) => {
  if (typeof price !== 'number' || typeof quantity !== 'number') {
    return 0;
  }
  return price * quantity;
};

/**
 * Calculate cart subtotal
 * @param {Array} items - Array of cart items with price and quantity
 * @returns {number} Subtotal amount
 */
export const calculateSubtotal = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return 0;
  }
  return items.reduce((sum, item) => {
    return sum + calculateItemTotal(item.price, item.quantity);
  }, 0);
};

/**
 * Calculate tax amount
 * @param {number} subtotal - Subtotal amount
 * @param {number} taxRate - Tax rate (e.g., 0.10 for 10%)
 * @returns {number} Tax amount
 */
export const calculateTax = (subtotal, taxRate) => {
  if (typeof subtotal !== 'number' || typeof taxRate !== 'number') {
    return 0;
  }
  return subtotal * taxRate;
};

/**
 * Calculate shipping cost
 * @param {number} subtotal - Subtotal amount
 * @param {number} freeThreshold - Threshold for free shipping
 * @param {number} shippingCost - Standard shipping cost
 * @returns {number} Shipping cost
 */
export const calculateShipping = (subtotal, freeThreshold, shippingCost) => {
  if (subtotal >= freeThreshold) {
    return 0;
  }
  return shippingCost;
};

/**
 * Calculate final total
 * @param {number} subtotal - Subtotal amount
 * @param {number} tax - Tax amount
 * @param {number} shipping - Shipping cost
 * @returns {number} Final total
 */
export const calculateTotal = (subtotal, tax, shipping) => {
  return subtotal + tax + shipping;
};
