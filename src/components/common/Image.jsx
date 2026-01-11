import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { cn } from '@utils/helpers'

/**
 * Image
 *
 * Lazy loads with the native `loading="lazy"` attribute.
 * Shows a placeholder until loaded and a fallback on error.
 *
 * Usage:
 * ```jsx
 * import { Image } from '@components/common'
 *
 * <Image src={url} alt="Product" aspectRatio="1/1" className="rounded-xl" />
 * ```
 */
export default function Image({ src, alt, className = '', aspectRatio }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
  }, [src])

  const ratioStyle = useMemo(() => {
    if (!aspectRatio) return undefined
    return { aspectRatio }
  }, [aspectRatio])

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-neutral-100',
        className,
      )}
      style={ratioStyle}
    >
      {!isLoaded && !hasError ? (
        <div
          className="absolute inset-0 animate-pulse bg-neutral-200"
          aria-hidden="true"
        />
      ) : null}

      {hasError ? (
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-sm text-neutral-500">Image unavailable</span>
        </div>
      ) : null}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  /** CSS aspect-ratio string e.g. "1/1", "16/9" */
  aspectRatio: PropTypes.string,
}
