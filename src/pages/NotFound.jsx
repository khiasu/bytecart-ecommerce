import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="py-16">
      <div className="container">
        <h1 className="font-heading text-3xl font-semibold text-neutral-900">
          Page not found
        </h1>
        <p className="mt-2 text-neutral-600">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          Go to Home
        </Link>
      </div>
    </section>
  )
}
