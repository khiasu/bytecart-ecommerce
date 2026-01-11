import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import ProductCard from './ProductCard';
import Button from '@components/common/Button';
import { useProducts } from '@contexts/ProductsContext';
import { SORT_OPTIONS } from '@utils/constants';

/**
 * ProductGrid
 * 
 * Displays products in a responsive grid with filtering, sorting, and loading states.
 */
export default function ProductGrid({ 
  products: customProducts = null,
  showFilters = true,
  showSort = true,
  showCount = true,
}) {
  const { 
    getFilteredProducts, 
    filters, 
    updateFilters, 
    loading,
    categories 
  } = useProducts();

  // Use custom products or filtered products from context
  const products = useMemo(() => {
    if (customProducts) {
      return customProducts;
    }
    return getFilteredProducts();
  }, [customProducts, getFilteredProducts]);

  // Handle sort change
  const handleSortChange = (e) => {
    updateFilters({ sortBy: e.target.value });
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    updateFilters({ 
      category: filters.category === category ? null : category 
    });
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-4 tablet:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-neutral-200 rounded-xl h-[400px]"></div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
        <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">
          No products found
        </h3>
        <p className="text-neutral-600 mb-6">
          Try adjusting your filters or search query.
        </p>
        <Button 
          variant="outline" 
          onClick={() => updateFilters({ 
            category: null, 
            searchQuery: '',
            sortBy: SORT_OPTIONS.PRICE_LOW_HIGH 
          })}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full mobile:px-3 tablet:px-6">
      {/* Filters and Sort Bar */}
      {(showFilters || showSort) && (
        <div className="mb-6 flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4">
          {/* Category Filters */}
          {showFilters && categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleCategoryFilter(null)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${!filters.category
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }
                `}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => handleCategoryFilter(category.slug)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${filters.category === category.slug
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }
                  `}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}

          {/* Sort Dropdown */}
          {showSort && (
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-sm text-neutral-600">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={handleSortChange}
                className="px-4 py-2 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              >
                <option value={SORT_OPTIONS.FEATURED}>Featured</option>
                <option value={SORT_OPTIONS.PRICE_LOW_HIGH}>Price: Low to High</option>
                <option value={SORT_OPTIONS.PRICE_HIGH_LOW}>Price: High to Low</option>
                <option value={SORT_OPTIONS.RATING_HIGH_LOW}>Rating: High to Low</option>
                <option value={SORT_OPTIONS.NAME_A_Z}>Name: A to Z</option>
                <option value={SORT_OPTIONS.NAME_Z_A}>Name: Z to A</option>
              </select>
            </div>
          )}
        </div>
      )}

      {/* Product Count */}
      {showCount && (
        <p className="text-sm text-neutral-600 mb-6">
          Showing {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 mobile:gap-4 tablet:grid-cols-3 desktop:grid-cols-4 tablet:gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array,
  showFilters: PropTypes.bool,
  showSort: PropTypes.bool,
  showCount: PropTypes.bool,
};

