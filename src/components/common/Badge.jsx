import PropTypes from 'prop-types'
import { cn } from '@utils/helpers'

/**
 * Badge
 *
 * Variants: default, success, warning, error, info
 * Sizes: sm, md, lg
 *
 * Usage:
 * ```jsx
 * import { Badge } from '@components/common'
 *
 * <Badge variant="success">In Stock</Badge>
 * <Badge variant="warning" size="sm">-30%</Badge>
 * ```
 */
export default function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const base =
    'inline-flex items-center rounded-full font-medium leading-none transition duration-200'

  const variants = {
    default: 'bg-neutral-100 text-neutral-700',
    success: 'bg-secondary-50 text-secondary-700',
    warning: 'bg-amber-50 text-amber-700',
    error: 'bg-red-50 text-red-700',
    info: 'bg-primary-50 text-primary-700',
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-sm',
  }

  return <span className={cn(base, variants[variant], sizes[size], className)}>{children}</span>
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
}
