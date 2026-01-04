import { Link } from 'react-router-dom'
import { Headphones, Mail, MessageCircle, Clock } from 'lucide-react'

export default function Support() {
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
            <li className="text-neutral-900 dark:text-neutral-100">Customer Support</li>
          </ol>
        </nav>

        <div className="max-w-4xl">
          <h1 className="font-heading text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
            Customer Support
          </h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
            <p className="text-neutral-700 dark:text-neutral-300">
              Our dedicated support team is here to help you with any questions or concerns. 
              We're committed to providing you with the best shopping experience.
            </p>
          </div>

          <div className="grid gap-6 tablet:grid-cols-2 mb-10">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <Headphones className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Phone Support
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Toll-free: 1800-XXX-XXXX</li>
                <li>• Monday - Saturday: 9 AM - 8 PM</li>
                <li>• Sunday: 10 AM - 6 PM</li>
                <li>• Average wait time: 2-3 minutes</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Email Support
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• support@techiehelp.com</li>
                <li>• Response within 24 hours</li>
                <li>• Attach order ID for faster service</li>
                <li>• Available 24/7</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Live Chat
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Available on website</li>
                <li>• Monday - Saturday: 10 AM - 8 PM</li>
                <li>• Instant responses</li>
                <li>• Screen sharing support available</li>
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-primary-600" />
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Response Times
                </h2>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Urgent issues: 2-4 hours</li>
                <li>• General inquiries: 24 hours</li>
                <li>• Technical support: 12-24 hours</li>
                <li>• Feedback: 48 hours</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl bg-green-50 border border-green-200 p-6 dark:bg-green-900/20 dark:border-green-800 mb-8">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
              Common Issues We Help With
            </h3>
            <ul className="grid gap-2 text-sm text-green-800 dark:text-green-200 tablet:grid-cols-2">
              <li>• Order tracking and status</li>
              <li>• Payment and billing questions</li>
              <li>• Product information and compatibility</li>
              <li>• Returns and exchanges</li>
              <li>• Account management</li>
              <li>• Technical troubleshooting</li>
              <li>• Shipping and delivery</li>
              <li>• Warranty claims</li>
            </ul>
          </div>

          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Before Contacting Us</h3>
            <ul className="space-y-2">
              <li>• Check your order status in "My Orders"</li>
              <li>• Review our FAQ section for quick answers</li>
              <li>• Have your order number ready</li>
              <li>• Include screenshots for technical issues</li>
            </ul>
          </div>
          <p>
            Email:{' '}
            <a className="text-primary-600 hover:text-primary-700" href="mailto:khiasu2vis@gmail.com">
              khiasu2vis@gmail.com
            </a>
          </p>
          <p>
            Phone:{' '}
            <a className="text-primary-600 hover:text-primary-700" href="tel:+919863765861">
              +91 98637 65861
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
