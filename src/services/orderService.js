/**
 * Order Service
 * Handles order creation and retrieval using localStorage
 */

const ORDERS_STORAGE_KEY = 'bytecart_orders';

/**
 * Generate a unique order ID
 * @returns {string} Order ID
 */
function generateOrderId() {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

/**
 * Get all orders from localStorage
 * @returns {Array} Array of orders
 */
export function getAllOrders() {
  try {
    const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!ordersJson) {
      return [];
    }
    return JSON.parse(ordersJson);
  } catch (error) {
    console.error('Error loading orders from localStorage:', error);
    return [];
  }
}

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 * @returns {Object|null} Order object or null if not found
 */
export function getOrderById(orderId) {
  const orders = getAllOrders();
  return orders.find(order => order.id === orderId) || null;
}

/**
 * Create a new order
 * @param {Object} orderData - Order data (items, shipping, payment, totals)
 * @returns {Object} Created order with ID and timestamp
 */
export function createOrder(orderData) {
  const orders = getAllOrders();
  
  const newOrder = {
    id: generateOrderId(),
    ...orderData,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  orders.unshift(newOrder); // Add to beginning of array
  
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return newOrder;
  } catch (error) {
    console.error('Error saving order to localStorage:', error);
    throw new Error('Failed to create order');
  }
}

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} status - New status
 * @returns {Object|null} Updated order or null if not found
 */
export function updateOrderStatus(orderId, status) {
  const orders = getAllOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) {
    return null;
  }
  
  orders[orderIndex] = {
    ...orders[orderIndex],
    status,
    updatedAt: new Date().toISOString(),
  };
  
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return orders[orderIndex];
  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Failed to update order');
  }
}

/**
 * Get orders by status
 * @param {string} status - Order status
 * @returns {Array} Array of orders with matching status
 */
export function getOrdersByStatus(status) {
  const orders = getAllOrders();
  return orders.filter(order => order.status === status);
}

