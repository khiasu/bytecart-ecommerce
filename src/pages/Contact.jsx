import { Link } from 'react-router-dom'

export default function Contact() {
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
            <li className="text-neutral-900">Contact</li>
          </ol>
        </nav>

        <h1 className="font-heading text-3xl font-semibold text-neutral-900 mb-4">Contact</h1>
        <div className="max-w-3xl space-y-3 text-neutral-700">
          <p>
            For support or business inquiries, reach out using the details below.
          </p>
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
          <p className="text-sm text-neutral-500">Address: Chumoukedima, Nagaland, India</p>
        </div>
      </div>
    </section>
  )
}
