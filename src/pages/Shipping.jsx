import { Link } from 'react-router-dom'
import { Truck, Clock, MapPin, Package } from 'lucide-react'

export default function Shipping() {
  return (
    <section className="py-10">
      <div className="container">
        <nav className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/" className="hover:text-primary-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-900 dark:text-neutral-100">Shipping & Delivery</li>
          </ol>
        </nav>

        <div className="max-w-4xl">
          <h1 className="font-heading text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Shipping & Delivery
          </h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
            <p className="text-neutral-700 dark:text-neutral-300">
              We provide reliable and timely delivery across India. Track your orders in real-time 
              and enjoy free shipping on eligible orders.
            </p>
          </div>

          <div className="grid gap-6 tablet:grid-cols-2 mb-10">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Standard Delivery
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• 5-7 business days</li>
                <li>• Free on orders above ₹999</li>
                <li>• ₹50 for orders below ₹999</li>
                <li>• Available across India</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Express Delivery
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• 2-3 business days</li>
                <li>• ₹150 flat rate</li>
                <li>• Available in major cities</li>
                <li>• Priority processing</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Same Day Delivery
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Within 24 hours</li>
                <li>• ₹250 flat rate</li>
                <li>• Select metro cities only</li>
                <li>• Order before 2 PM</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <Package className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  International Shipping
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• 10-15 business days</li>
                <li>• Rates calculated at checkout</li>
                <li>• Customs duties may apply</li>
                <li>• Tracking included</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 dark:bg-amber-900/20 dark:border-amber-800 mb-8">
            <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
              Important Shipping Information
            </h3>
            <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
              <li>• Delivery times may vary during peak seasons and holidays</li>
              <li>• Orders are not delivered on Sundays and public holidays</li>
              <li>• Someone must be available to receive the package</li>
              <li>• Incorrect addresses may cause delivery delays</li>
            </ul>
          </div>

          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Shipping Policies</h3>
            <ul className="space-y-2">
              <li>• All orders are processed within 24-48 hours</li>
              <li>• You'll receive tracking details via email and SMS</li>
              <li>• Multiple orders may be combined for shipping</li>
              <li>• Shipping charges are non-refundable</li>
            </ul>
          </div>
          <p>Free shipping is applied in the cart/checkout when subtotal crosses the configured threshold.</p>
          <p className="text-sm text-neutral-500">You can adjust shipping rules in `src/utils/constants.js`.</p>
        </div>
      </div>
    </section>
  )
}
