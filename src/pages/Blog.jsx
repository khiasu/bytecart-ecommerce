import { Link } from 'react-router-dom'

const posts = [
  {
    title: 'Welcome to ByteCart',
    excerpt: 'A quick tour of the storefront experience and features.'
  },
  {
    title: 'How filtering works',
    excerpt: 'Category, price, rating, and stock filters to help shoppers find products.'
  },
  {
    title: 'Orders in a demo app',
    excerpt: 'How this project stores orders locally for demonstration.'
  }
]

export default function Blog() {
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
            <li className="text-neutral-900">Blog</li>
          </ol>
        </nav>

        <h1 className="font-heading text-3xl font-semibold text-neutral-900 mb-6">Blog</h1>
        <div className="max-w-3xl space-y-4">
          {posts.map((p) => (
            <article key={p.title} className="rounded-xl border border-neutral-200 bg-white p-5">
              <h2 className="font-semibold text-neutral-900">{p.title}</h2>
              <p className="mt-2 text-sm text-neutral-600">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
