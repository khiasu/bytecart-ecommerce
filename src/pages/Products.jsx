import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { ProductGrid } from '@components/product';
import ProductFilters from '@components/product/ProductFilters';
import { useProducts } from '@contexts/ProductsContext';
import Button from '@components/common/Button';

export default function Products() {
  const [searchParams] = useSearchParams();
  const { updateFilters } = useProducts();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Handle category query parameter
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      updateFilters({ category });
    }
  }, [searchParams, updateFilters]);

  return (
    <section className="py-10">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-neutral-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-primary-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-900">Products</li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-3xl font-semibold text-neutral-900">
            All Products
          </h1>
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFiltersOpen(true)}
            className="tablet:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Mobile Filter Overlay */}
        {isFiltersOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 tablet:hidden"
            onClick={() => setIsFiltersOpen(false)}
            aria-hidden="true"
          />
        )}

        <div className="flex gap-6">
          {/* Filter Sidebar - Desktop Only */}
          <div className="hidden tablet:block">
            <ProductFilters
              isOpen={isFiltersOpen}
              onClose={() => setIsFiltersOpen(false)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <ProductGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
