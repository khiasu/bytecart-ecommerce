import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { SORT_OPTIONS } from '../utils/constants';

const ProductsContext = createContext(null);

const PRICE_BOUNDS = (() => {
  const prices = Array.isArray(productsData)
    ? productsData.map((p) => p?.price).filter((p) => typeof p === 'number' && !Number.isNaN(p))
    : [];

  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 1000;

  return { min, max };
})();

/**
 * ProductsProvider component
 * Manages products data, filtering, search, and sorting
 */
export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: null,
    searchQuery: '',
    sortBy: SORT_OPTIONS.FEATURED,
    priceRange: { min: PRICE_BOUNDS.min, max: PRICE_BOUNDS.max },
    rating: 0,
    inStockOnly: false,
  });

  // Load products and categories on mount
  useEffect(() => {
    try {
      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    }
  }, []);

  /**
   * Get all products
   * @returns {Array} All products
   */
  const getProducts = () => {
    return products;
  };

  /**
   * Get product by ID
   * @param {string} id - Product ID
   * @returns {Object|undefined} Product object
   */
  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  /**
   * Get featured products
   * @returns {Array} Featured products
   */
  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  /**
   * Search products by query
   * @param {string} query - Search query
   * @returns {Array} Filtered products
   */
  const searchProducts = (query) => {
    if (!query || query.trim() === '') {
      return products;
    }

    const lowerQuery = query.toLowerCase();
    return products.filter(product => {
      return (
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
      );
    });
  };

  /**
   * Filter products by category
   * @param {string} category - Category slug
   * @returns {Array} Filtered products
   */
  const filterByCategory = (category) => {
    if (!category) {
      return products;
    }
    return products.filter(product => product.category === category);
  };

  /**
   * Filter products by price range
   * @param {number} min - Minimum price
   * @param {number} max - Maximum price
   * @returns {Array} Filtered products
   */
  const filterByPriceRange = (min, max) => {
    return products.filter(product => product.price >= min && product.price <= max);
  };

  /**
   * Filter products by minimum rating
   * @param {number} minRating - Minimum rating (0-5)
   * @returns {Array} Filtered products
   */
  const filterByRating = (minRating) => {
    return products.filter(product => product.rating >= minRating);
  };

  /**
   * Sort products
   * @param {Array} productsToSort - Products to sort
   * @param {string} sortBy - Sort option
   * @returns {Array} Sorted products
   */
  const sortProducts = (productsToSort, sortBy) => {
    const sorted = [...productsToSort];

    switch (sortBy) {
      case SORT_OPTIONS.FEATURED:
        return sorted.sort((a, b) => {
          // Featured products first, then by rating
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
      
      case SORT_OPTIONS.PRICE_LOW_HIGH:
        return sorted.sort((a, b) => a.price - b.price);
      
      case SORT_OPTIONS.PRICE_HIGH_LOW:
        return sorted.sort((a, b) => b.price - a.price);
      
      case SORT_OPTIONS.RATING_HIGH_LOW:
        return sorted.sort((a, b) => b.rating - a.rating);
      
      case SORT_OPTIONS.NAME_A_Z:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      
      case SORT_OPTIONS.NAME_Z_A:
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      
      default:
        return sorted;
    }
  };

  /**
   * Get filtered and sorted products based on current filters
   * @returns {Array} Filtered and sorted products
   */
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Apply search query
    if (filters.searchQuery) {
      filtered = searchProducts(filters.searchQuery);
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(
        product =>
          product.price >= filters.priceRange.min &&
          product.price <= filters.priceRange.max
      );
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Apply in stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Apply sorting
    filtered = sortProducts(filtered, filters.sortBy);

    return filtered;
  };

  /**
   * Update filters
   * @param {Object} newFilters - New filter values
   */
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  /**
   * Reset all filters
   */
  const resetFilters = () => {
    setFilters({
      category: null,
      searchQuery: '',
      sortBy: SORT_OPTIONS.FEATURED,
      priceRange: { min: PRICE_BOUNDS.min, max: PRICE_BOUNDS.max },
      rating: 0,
      inStockOnly: false,
    });
  };

  /**
   * Get products by category slug
   * @param {string} slug - Category slug
   * @returns {Array} Products in category
   */
  const getProductsByCategory = (slug) => {
    return products.filter(product => product.category === slug);
  };

  /**
   * Get category by slug
   * @param {string} slug - Category slug
   * @returns {Object|undefined} Category object
   */
  const getCategoryBySlug = (slug) => {
    return categories.find(cat => cat.slug === slug);
  };

  const value = useMemo(
    () => ({
      // State
      products,
      categories,
      loading,
      filters,
      // Actions
      getProducts,
      getProductById,
      getFeaturedProducts,
      searchProducts,
      filterByCategory,
      filterByPriceRange,
      filterByRating,
      sortProducts,
      getFilteredProducts,
      updateFilters,
      resetFilters,
      getProductsByCategory,
      getCategoryBySlug,
      priceBounds: PRICE_BOUNDS,
    }),
    [products, categories, loading, filters]
  );

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}

/**
 * Custom hook to use products context
 * @returns {Object} Products context value
 */
export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return ctx;
}
