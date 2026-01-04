import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { getAllOrders, createOrder, updateOrderStatus } from '../services/orderService';

const OrdersContext = createContext(null);

/**
 * OrdersProvider component
 * Manages orders state and provides order management functions
 */
export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load orders from localStorage on mount
  useEffect(() => {
    loadOrders();
  }, []);

  /**
   * Load orders from localStorage
   */
  const loadOrders = () => {
    try {
      const allOrders = getAllOrders();
      setOrders(allOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  /**
   * Place a new order
   * @param {Object} orderData - Order data
   * @returns {Promise<Object>} Created order
   */
  const placeOrder = async (orderData) => {
    setLoading(true);
    try {
      const newOrder = createOrder(orderData);
      loadOrders(); // Reload orders to include the new one
      return newOrder;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} status - New status
   */
  const updateStatus = (orderId, status) => {
    try {
      updateOrderStatus(orderId, status);
      loadOrders(); // Reload orders
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   * @returns {Object|null} Order or null
   */
  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId) || null;
  };

  /**
   * Get orders by status
   * @param {string} status - Order status
   * @returns {Array} Filtered orders
   */
  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  const value = useMemo(
    () => ({
      orders,
      loading,
      placeOrder,
      updateStatus,
      getOrderById,
      getOrdersByStatus,
      refreshOrders: loadOrders,
    }),
    [orders, loading]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

/**
 * Custom hook to use orders context
 * @returns {Object} Orders context value
 */
export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error('useOrders must be used within OrdersProvider');
  }
  return ctx;
}

