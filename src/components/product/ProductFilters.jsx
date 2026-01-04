import { useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { useProducts } from '@contexts/ProductsContext';
import { SORT_OPTIONS } from '@utils/constants';
import Button from '@components/common/Button';
import Badge from '@components/common/Badge';

/**
 * ProductFilters
 * 
 * Sidebar with category, price range, rating, and stock filters.
 */
export default function ProductFilters({ isOpen, onClose }) {
  const { categories, filters, updateFilters, resetFilters } = useProducts();
  const [priceRange, setPriceRange] = useState({
    min: filters.priceRange?.min || 0,
    max: filters.priceRange?.max || 1000,
  });

  const handleCategoryToggle = (categorySlug) => {
    updateFilters({
      category: filters.category === categorySlug ? null : categorySlug,
    });
  };

  const handlePriceRangeChange = (field, value) => {
    const newRange = { ...priceRange, [field]: parseFloat(value) || 0 };
    setPriceRange(newRange);
    updateFilters({ priceRange: newRange });
  };

  const handleRatingFilter = (rating) => {
    updateFilters({ rating: filters.rating === rating ? 0 : rating });
  };

  const handleInStockToggle = () => {
    // This would filter products, but we'll handle it in the grid
    updateFilters({ inStockOnly: !filters.inStockOnly });
  };

  const activeFiltersCount = [
    filters.category,
    filters.rating > 0,
    filters.priceRange?.min > 0 || filters.priceRange?.max < 1000,
    filters.inStockOnly,
  ].filter(Boolean).length;

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        tablet:relative tablet:z-auto tablet:shadow-none tablet:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full tablet:translate-x-0'}
      `}
    >
      <div className="h-full overflow-y-auto p-6">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 tablet:hidden">
          <h2 className="font-heading text-xl font-semibold text-neutral-900">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden tablet:block mb-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-neutral-900">
              Filters
            </h2>
            {activeFiltersCount > 0 && (
              <Badge variant="default" size="sm">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="font-semibold text-neutral-900 mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 p-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={filters.category === category.slug}
                  onChange={() => handleCategoryToggle(category.slug)}
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-semibold text-neutral-900 mb-3">Price Range</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                min="0"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                min="0"
              />
            </div>
            <p className="text-xs text-neutral-500">
              ${priceRange.min} - ${priceRange.max}
            </p>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-neutral-900 mb-3">Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 p-2 rounded-lg"
              >
                <input
                  type="checkbox"
                  checked={filters.rating === rating}
                  onChange={() => handleRatingFilter(rating)}
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-neutral-700">
                  {rating}★ & up
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* In Stock Toggle */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 p-2 rounded-lg">
            <input
              type="checkbox"
              checked={filters.inStockOnly || false}
              onChange={handleInStockToggle}
              className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-700">In Stock Only</span>
          </label>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            className="w-full"
            onClick={resetFilters}
          >
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
}

ProductFilters.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

ProductFilters.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

