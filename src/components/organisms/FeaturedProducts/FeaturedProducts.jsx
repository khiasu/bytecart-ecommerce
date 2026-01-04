import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button';
import { ProductGrid } from '@components/product';
import { useProducts } from '@contexts/ProductsContext';

/**
 * FeaturedProducts
 *
 * Displays featured products from ProductsContext using ProductGrid.
 */
export default function FeaturedProducts() {
  const navigate = useNavigate();
  const { getFeaturedProducts, loading } = useProducts();

  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-4 tablet:flex-row tablet:items-end">
          <div>
            <h2 className="font-heading text-3xl font-bold text-neutral-900">
              Featured Products
            </h2>
            <p className="mt-2 text-neutral-600">
              Handpicked items just for you
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/products')}>
            View All
          </Button>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="text-center text-neutral-600 py-12">
              Loading products...
            </div>
          ) : (
            <ProductGrid 
              products={featuredProducts}
              showFilters={false}
              showSort={false}
              showCount={false}
            />
          )}
        </div>
      </div>
    </section>
  );
}
