import { Link } from 'react-router-dom'

const items = [
  {
    q: 'Is this a real store?',
    a: 'This project is a demo storefront. Orders are stored locally in your browser.'
  },
  {
    q: 'How do orders work?',
    a: 'Placing an order saves it to localStorage and you can view it on the Orders page.'
  },
  {
    q: 'Can I pay for real?',
    a: 'No. Payment details are only validated on the client for demo purposes.'
  },
  {
    q: 'Why are images placeholders?',
    a: 'The site uses placeholder images for demo products and categories.'
  }
]

export default function FAQ() {
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
            <li className="text-neutral-900">FAQ</li>
          </ol>
        </nav>

        <h1 className="font-heading text-3xl font-semibold text-neutral-900 mb-6">FAQ</h1>
        <div className="max-w-3xl space-y-4">
          {items.map((it) => (
            <div key={it.q} className="rounded-xl border border-neutral-200 bg-white p-5">
              <h3 className="font-semibold text-neutral-900">{it.q}</h3>
              <p className="mt-2 text-sm text-neutral-600">{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
