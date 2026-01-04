import { Link } from 'react-router-dom'

export default function SizeGuide() {
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
            <li className="text-neutral-900">Size Guide</li>
          </ol>
        </nav>

        <h1 className="font-heading text-3xl font-semibold text-neutral-900 mb-4">Size Guide</h1>
        <div className="max-w-3xl space-y-3 text-neutral-700">
          <p>This store focuses on electronics, so a size guide is optional.</p>
          <p>If you sell wearables or accessories with sizes, add your sizing chart here.</p>
        </div>
      </div>
    </section>
  )
}
