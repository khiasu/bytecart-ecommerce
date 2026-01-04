import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@components/common/Button'
import { cn } from '@utils/helpers'

/**
 * HeroSection
 *
 * 3-slide promotional hero with CTA buttons.
 *
 * Usage:
 * ```jsx
 * import HeroSection from '@components/organisms/HeroSection/HeroSection'
 *
 * <HeroSection />
 * ```
 */
export default function HeroSection() {
  const navigate = useNavigate()
  const slides = useMemo(
    () => [
      {
        id: 'slide-1',
        eyebrow: 'New Arrivals',
        title: 'Upgrade your tech essentials',
        description:
          'Explore curated accessories and gadgets built for performance and style.',
        primaryCta: { label: 'Shop Now', to: '/products' },
        secondaryCta: { label: 'View Offers', to: '/products' },
        gradient: 'from-primary-600 via-primary-700 to-neutral-900',
      },
      {
        id: 'slide-2',
        eyebrow: 'Limited-Time Deals',
        title: 'Save big on top-rated products',
        description:
          'Grab exclusive discounts on bestsellers—quality you can trust, prices you will love.',
        primaryCta: { label: 'Browse Deals', to: '/products' },
        secondaryCta: { label: 'My Cart', to: '/cart' },
        gradient: 'from-neutral-900 via-primary-700 to-primary-600',
      },
      {
        id: 'slide-3',
        eyebrow: 'Fast Delivery',
        title: 'Shopping made simple & secure',
        description:
          'Smooth checkout, reliable support, and a premium experience across all devices.',
        primaryCta: { label: 'Explore Products', to: '/products' },
        secondaryCta: { label: 'Track Orders', to: '/orders' },
        gradient: 'from-primary-700 via-neutral-900 to-secondary-700',
      },
    ],
    [],
  )

  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length)
    }, 6500)

    return () => window.clearInterval(id)
  }, [slides.length])

  const current = slides[active]

  return (
    <section className="relative overflow-hidden">
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br',
          current.gradient,
        )}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 50%), radial-gradient(circle at 80% 40%, rgba(255,255,255,0.25), transparent 55%), radial-gradient(circle at 50% 90%, rgba(255,255,255,0.2), transparent 45%)',
        }}
        aria-hidden="true"
      />

      <div className="container relative py-16 tablet:py-20">
        <div className="grid items-center gap-10 desktop:grid-cols-12">
          <div className="desktop:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-sm font-medium tracking-wide text-white/80">
                  {current.eyebrow}
                </p>
                <h1 className="mt-3 font-heading text-4xl font-semibold leading-tight text-white tablet:text-5xl">
                  {current.title}
                </h1>
                <p className="mt-4 max-w-xl text-base text-white/80 tablet:text-lg">
                  {current.description}
                </p>

                <div className="mt-8 flex flex-col gap-3 tablet:flex-row">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate(current.primaryCta.to)}
                    ariaLabel={current.primaryCta.label}
                    className="shadow-soft"
                  >
                    {current.primaryCta.label}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate(current.secondaryCta.to)}
                    ariaLabel={current.secondaryCta.label}
                    className="border-white/30 bg-white/10 text-white hover:bg-white/15"
                  >
                    {current.secondaryCta.label}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="desktop:col-span-5">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 text-white shadow-soft backdrop-blur">
              <p className="text-sm text-white/80">Today’s Highlight</p>
              <p className="mt-2 font-heading text-2xl font-semibold">
                Premium UI. Professional UX.
              </p>
              <p className="mt-3 text-sm text-white/80">
                This project is built with a scalable component library and a clean
                design system.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="text-xl font-semibold">3</div>
                  <div className="mt-1 text-xs text-white/80">Slides</div>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="text-xl font-semibold">6+</div>
                  <div className="mt-1 text-xs text-white/80">Components</div>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="text-xl font-semibold">100%</div>
                  <div className="mt-1 text-xs text-white/80">Responsive</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={cn(
                  'h-2.5 w-10 rounded-full transition duration-200',
                  idx === active ? 'bg-white' : 'bg-white/30 hover:bg-white/45',
                )}
                onClick={() => setActive(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-pressed={idx === active}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition duration-200 hover:bg-white/15"
              onClick={() => setActive((prev) => (prev - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition duration-200 hover:bg-white/15"
              onClick={() => setActive((prev) => (prev + 1) % slides.length)}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
