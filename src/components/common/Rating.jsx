import PropTypes from 'prop-types'
import { Star } from 'lucide-react'
import { cn } from '@utils/helpers'

/**
 * Rating
 *
 * Star rating display (0-5).
 *
 * Usage:
 * ```jsx
 * import { Rating } from '@components/common'
 *
 * <Rating rating={4.5} reviews={128} size="md" />
 * ```
 */
export default function Rating({ rating, reviews, size = 'md', className = '' }) {
  const normalized = Math.max(0, Math.min(5, Number(rating) || 0))

  const sizes = {
    sm: { star: 'h-3.5 w-3.5', text: 'text-xs' },
    md: { star: 'h-4 w-4', text: 'text-sm' },
    lg: { star: 'h-5 w-5', text: 'text-sm' },
    xs: { star: 'h-3 w-3', text: 'text-xs' },
  }

  const fullStars = Math.floor(normalized)
  const hasHalf = normalized - fullStars >= 0.5

  // Get the correct size object, fallback to md if invalid size
  const currentSize = sizes[size] || sizes.md

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center gap-0.5" aria-label={`Rating ${normalized} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const index = i + 1
          const filled = index <= fullStars
          const half = index === fullStars + 1 && hasHalf

          if (half) {
            return (
              <span key={index} className="relative inline-flex">
                <Star
                  className={cn(currentSize.star, 'text-neutral-300')}
                  aria-hidden="true"
                />
                <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star
                    className={cn(currentSize.star, 'fill-amber-400 text-amber-400')}
                    aria-hidden="true"
                  />
                </span>
              </span>
            )
          }

          return (
            <Star
              key={index}
              className={cn(
                currentSize.star,
                filled ? 'fill-amber-400 text-amber-400' : 'text-neutral-300',
              )}
              aria-hidden="true"
            />
          )
        })}
      </div>

      <div className={cn(currentSize.text, 'text-neutral-600')}>
        <span className="font-medium text-neutral-900">{normalized.toFixed(1)}</span>
        {typeof reviews === 'number' ? (
          <span className="text-neutral-500 ml-2">({reviews})</span>
        ) : null}
      </div>
    </div>
  )
}

Rating.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  reviews: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
}
