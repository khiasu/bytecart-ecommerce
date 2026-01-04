import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@utils/helpers'

/**
 * Button
 *
 * Variants: primary, secondary, outline, ghost
 * Sizes: sm, md, lg
 * States: default, disabled, loading
 *
 * Usage:
 * ```jsx
 * import { Button } from '@components/common'
 *
 * <Button variant="primary" size="md" onClick={() => {}}>Buy Now</Button>
 * <Button variant="outline" loading ariaLabel="Adding to cart">Add to Cart</Button>
 * ```
 */
export default function Button({
  children,
  variant,
  size,
  onClick,
  disabled,
  loading,
  className,
  type,
  ariaLabel,
}) {
  const isDisabled = disabled || loading

  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-700 disabled:bg-primary-600/50',
    secondary:
      'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-700 disabled:bg-secondary-600/50',
    outline:
      'border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 active:bg-neutral-100 disabled:text-neutral-400',
    ghost:
      'bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 disabled:text-neutral-400',
  }

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      className={cn(base, variants[variant], sizes[size], className)}
      whileHover={isDisabled ? undefined : { y: -1 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          <span className="sr-only">Loading</span>
        </>
      ) : null}
      <span>{children}</span>
    </motion.button>
  )
}

Button.propTypes = {
  /** Button content */
  children: PropTypes.node.isRequired,
  /** Visual style */
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
  /** Size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Click handler */
  onClick: PropTypes.func,
  /** Disable interaction */
  disabled: PropTypes.bool,
  /** Shows spinner + disables interaction */
  loading: PropTypes.bool,
  /** Additional Tailwind classes */
  className: PropTypes.string,
  /** Button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Optional aria-label for icon-only or ambiguous labels */
  ariaLabel: PropTypes.string,
}

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  onClick: undefined,
  disabled: false,
  loading: false,
  className: '',
  type: 'button',
  ariaLabel: undefined,
}
