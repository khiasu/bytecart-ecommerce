import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@components/common/Button'
import ProductGrid from '@components/product/ProductGrid'
import { useProducts } from '@contexts/ProductsContext'
import { calculateDiscount } from '@utils/calculations'

export default function Offers() {
  const navigate = useNavigate()
  const { products } = useProducts()

  const discountedProducts = useMemo(() => {
    if (!Array.isArray(products)) return []

    return products
      .filter(
        (p) =>
          typeof p?.originalPrice === 'number' &&
          typeof p?.price === 'number' &&
          p.originalPrice > p.price,
      )
      .map((p) => ({ ...p, discount: calculateDiscount(p.originalPrice, p.price) }))
      .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
  }, [products])

  return (
    <section className="py-10">
      <div className="container">
        <nav className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-900 dark:text-neutral-100">Offers</li>
          </ol>
        </nav>

        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
              Offers & Deals
            </h1>
            <p className="mt-2 max-w-2xl text-neutral-700 dark:text-neutral-300">
              Explore limited-time price drops on popular products. Discounts apply automatically at checkout.
            </p>
          </div>

          <div className="flex flex-col gap-2 mobile:flex-row">
            <Button variant="outline" onClick={() => navigate('/products')}>
              Browse All Products
            </Button>
            <Button onClick={() => navigate('/products?sort=price_asc')}>Shop by Price</Button>
          </div>
        </div>

        <div className="mt-8">
          {discountedProducts.length ? (
            <ProductGrid
              products={discountedProducts}
              showFilters={false}
              showSort={false}
              showCount
            />
          ) : (
            <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center text-neutral-700 shadow-soft dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300">
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                No active offers right now.
              </p>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Check back soon or browse all products.
              </p>
              <div className="mt-5">
                <Button variant="outline" onClick={() => navigate('/products')}>
                  Browse Products
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-4 tablet:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Offer availability</p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Deals are updated regularly and may change without prior notice.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Price protection</p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              If a listed offer ends, the checkout price will reflect the current product price.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Need help?</p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Have a question about an offer? Visit the support page for contact details.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
