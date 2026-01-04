import { Laptop, MonitorSmartphone, PlugZap, Watch } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Card from '@components/common/Card'

/**
 * CategoryHighlights
 */
export default function CategoryHighlights() {
  const navigate = useNavigate()

  const categories = [
    { title: 'Laptops', subtitle: 'Work & gaming essentials', icon: Laptop },
    {
      title: 'Accessories',
      subtitle: 'Cables, hubs, and more',
      icon: PlugZap,
    },
    {
      title: 'Smart Devices',
      subtitle: 'Headphones, speakers, wearables',
      icon: Watch,
    },
    {
      title: 'Displays',
      subtitle: 'Monitors for productivity',
      icon: MonitorSmartphone,
    },
  ]

  return (
    <section className="py-12">
      <div className="container">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-neutral-900">
            Shop by category
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Browse popular categories curated for a fast shopping experience.
          </p>
        </div>

        <div className="mt-8 grid gap-4 tablet:grid-cols-2 desktop:grid-cols-4">
          {categories.map((c) => {
            const Icon = c.icon
            return (
              <Card
                key={c.title}
                hoverable
                onClick={() => navigate('/products')}
                className="p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-neutral-100 text-neutral-900">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600">{c.subtitle}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
