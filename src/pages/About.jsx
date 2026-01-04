import { Link } from 'react-router-dom'

export default function About() {
  return (
    <section className="py-10">
      <div className="container">
        <nav className="mb-6 text-sm text-neutral-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-primary-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-900">About</li>
          </ol>
        </nav>

        <h1 className="font-heading text-3xl font-semibold text-neutral-900 mb-4">About ByteCart</h1>
        <div className="max-w-3xl space-y-4 text-neutral-700">
          <p>
            ByteCart is a demo e-commerce experience showcasing a modern storefront UI built with React,
            TailwindCSS, and client-side state.
          </p>
          <p>
            Browse products, filter by category/price/rating, add items to cart, and place a test order.
          </p>
          <p className="text-sm text-neutral-500">
            This project uses localStorage for cart, orders, and newsletter subscription.
          </p>
        </div>
      </div>
    </section>
  )
}
