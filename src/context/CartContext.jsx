import { createContext, useContext, useMemo, useReducer, useEffect } from 'react';
import { 
  TAX_RATE, 
  FREE_SHIPPING_THRESHOLD, 
  SHIPPING_COST, 
  MAX_QUANTITY_PER_ITEM,
  CART_STORAGE_KEY 
} from '../utils/constants';
import { 
  calculateSubtotal, 
  calculateTax, 
  calculateShipping, 
  calculateTotal 
} from '../utils/calculations';

const CartContext = createContext(null);

/**
 * Cart reducer actions:
 * - ADD_TO_CART: Add item or increase quantity
 * - REMOVE_FROM_CART: Remove item completely
 * - UPDATE_QUANTITY: Update specific quantity
 * - CLEAR_CART: Empty entire cart
 * - LOAD_CART: Load cart from localStorage
 */
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity = 1 } = action.payload;
      
      // Check if product already exists in cart
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...state.items];
        const currentQuantity = updatedItems[existingItemIndex].quantity;
        const newQuantity = Math.min(currentQuantity + quantity, MAX_QUANTITY_PER_ITEM);
        
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity
        };
        
        return { ...state, items: updatedItems };
      } else {
        // Add new item
        const newItem = {
          ...product,
          quantity: Math.min(quantity, MAX_QUANTITY_PER_ITEM)
        };
        
        return { ...state, items: [...state.items, newItem] };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload;
      return {
        ...state,
        items: state.items.filter(item => item.id !== productId)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      // Validate quantity
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return {
          ...state,
          items: state.items.filter(item => item.id !== productId)
        };
      }
      
      const updatedItems = state.items.map(item => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: Math.min(quantity, MAX_QUANTITY_PER_ITEM)
          };
        }
        return item;
      });
      
      return { ...state, items: updatedItems };
    }
    
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    
    case 'LOAD_CART': {
      return { ...state, items: action.payload.items || [] };
    }
    
    default:
      return state;
  }
}

const initialState = {
  items: [],
};

/**
 * CartProvider component
 * Manages cart state with useReducer and syncs with localStorage
 */
export function CartProvider({ children }) {
  // Load initial state from localStorage
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    if (typeof window === 'undefined') {
      return initial;
    }
    
    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        return { items: parsed.items || [] };
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    
    return initial;
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state]);

  // Listen for storage events to sync across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const newCart = JSON.parse(e.newValue);
          dispatch({ type: 'LOAD_CART', payload: newCart });
        } catch (error) {
          console.error('Error syncing cart from storage:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /**
   * Add product to cart or increase quantity
   * @param {Object} product - Product object
   * @param {number} quantity - Quantity to add (default: 1)
   */
  const addToCart = (product, quantity = 1) => {
    // Check stock availability
    if (!product.inStock) {
      console.warn('Product is out of stock');
      return;
    }
    
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  /**
   * Remove product from cart completely
   * @param {string} productId - Product ID
   */
  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  /**
   * Update quantity of a cart item
   * @param {string} productId - Product ID
   * @param {number} quantity - New quantity
   */
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  /**
   * Get cart item count
   * @returns {number} Total number of items
   */
  const getCartCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Calculate cart totals
   * @returns {Object} Cart totals (subtotal, tax, shipping, total)
   */
  const getCartTotals = () => {
    const subtotal = calculateSubtotal(state.items);
    const tax = calculateTax(subtotal, TAX_RATE);
    const shipping = calculateShipping(subtotal, FREE_SHIPPING_THRESHOLD, SHIPPING_COST);
    const total = calculateTotal(subtotal, tax, shipping);
    
    return {
      subtotal,
      tax,
      shipping,
      total,
      itemCount: getCartCount()
    };
  };

  /**
   * Check if product is in cart
   * @param {string} productId - Product ID
   * @returns {boolean}
   */
  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  /**
   * Get quantity of product in cart
   * @param {string} productId - Product ID
   * @returns {number} Quantity (0 if not in cart)
   */
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = useMemo(
    () => ({
      // State
      items: state.items,
      // Actions
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      // Helpers
      getCartCount,
      getCartTotals,
      isInCart,
      getItemQuantity,
    }),
    [state]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Custom hook to use cart context
 * @returns {Object} Cart context value
 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
