import { Link } from 'react-router-dom'
import { RotateCcw, Clock, Package, AlertCircle } from 'lucide-react'

export default function Returns() {
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
            <li className="text-neutral-900 dark:text-neutral-100">Returns & Refunds</li>
          </ol>
        </nav>

        <div className="max-w-4xl">
          <h1 className="font-heading text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Returns & Refunds
          </h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
            <p className="text-neutral-700 dark:text-neutral-300">
              We want you to be completely satisfied with your purchase. If you're not happy, 
              our hassle-free return policy makes it easy to return or exchange items.
            </p>
          </div>

          <div className="grid gap-6 tablet:grid-cols-2 mb-10">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <RotateCcw className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  30-Day Return Policy
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Return within 30 days of delivery</li>
                <li>• Items must be unused and in original packaging</li>
                <li>• All tags and accessories included</li>
                <li>• Proof of purchase required</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <Package className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Non-Returnable Items
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Personal care products</li>
                <li>• Software and digital downloads</li>
                <li>• Customized or personalized items</li>
                <li>• Perishable goods</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Refund Process
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Refunds initiated within 2 business days</li>
                <li>• 5-7 days to reflect in your account</li>
                <li>• Original payment method used</li>
                <li>• Shipping charges non-refundable</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Exchange Policy
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Exchange for same product in different size/color</li>
                <li>• Price difference adjusted accordingly</li>
                <li>• Subject to availability</li>
                <li>• No additional shipping charges</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 border border-blue-200 p-6 dark:bg-blue-900/20 dark:border-blue-800 mb-8">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
              How to Initiate a Return
            </h3>
            <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>1. Log into your account and go to "My Orders"</li>
              <li>2. Select the order and click "Return Item"</li>
              <li>3. Choose the reason for return</li>
              <li>4. Schedule a pickup or drop-off location</li>
              <li>5. Pack the item with original packaging</li>
              <li>6. Wait for confirmation and refund processing</li>
            </ol>
          </div>

          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Return Conditions</h3>
            <ul className="space-y-2">
              <li>• Products must be in resalable condition</li>
              <li>• Return shipping charges may apply for some items</li>
              <li>• Damaged items must be reported within 48 hours</li>
              <li>• Final sale items cannot be returned</li>
            </ul>
          </div>
          <p>If you want, I can help you write a proper returns/refund policy tailored to your business.</p>
        </div>
      </div>
    </section>
  )
}
