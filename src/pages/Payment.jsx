import { Link } from 'react-router-dom'
import { Shield, CreditCard, Smartphone, Banknote, Clock } from 'lucide-react'

export default function Payment() {
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
            <li className="text-neutral-900">Payment Methods</li>
          </ol>
        </nav>

        <div className="max-w-4xl">
          <h1 className="font-heading text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Payment Methods
          </h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
            <p className="text-neutral-700 dark:text-neutral-300">
              We offer secure and convenient payment options to make your shopping experience seamless. 
              All transactions are protected with industry-standard encryption.
            </p>
          </div>

          <div className="grid gap-6 tablet:grid-cols-2 mb-10">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Credit & Debit Cards
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Visa, Mastercard, RuPay</li>
                <li>• Secure 3D authentication</li>
                <li>• Instant processing</li>
                <li>• EMI options available</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  UPI & Mobile Wallets
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Google Pay, PhonePe, Paytm</li>
                <li>• BHIM UPI integration</li>
                <li>• QR code payments</li>
                <li>• No additional fees</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <Banknote className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Net Banking
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• All major Indian banks</li>
                <li>• Secure OTP verification</li>
                <li>• Real-time confirmation</li>
                <li>• Transaction history</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Cash on Delivery
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Pay when you receive</li>
                <li>• Available for orders under ₹10,000</li>
                <li>• No extra charges</li>
                <li>• Verify before paying</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl bg-primary-50 border border-primary-200 p-6 dark:bg-primary-900/20 dark:border-primary-800">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400 mt-1" />
              <div>
                <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">
                  Security Guarantee
                </h3>
                <p className="text-sm text-primary-800 dark:text-primary-200">
                  Your payment information is encrypted and secure. We never store your card details 
                  and comply with PCI DSS standards for payment security.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-neutral-600 dark:text-neutral-400">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Payment Policies</h3>
            <ul className="space-y-2">
              <li>• All prices are inclusive of applicable taxes</li>
              <li>• International payments may incur additional conversion fees</li>
              <li>• Refunds are processed to the original payment method</li>
              <li>• Payment confirmation sent via email and SMS</li>
            </ul>
          </div>
          <p>For a real store, integrate Razorpay/Stripe and store no sensitive card data on your server.</p>
        </div>
      </div>
    </section>
  )
}
