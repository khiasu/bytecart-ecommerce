import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { cn } from '@utils/helpers'

/**
 * Card
 *
 * Clean container with border/shadow. Optional hover effect.
 *
 * Usage:
 * ```jsx
 * import { Card } from '@components/common'
 *
 * <Card hoverable className="p-6">Content</Card>
 * <Card onClick={() => {}} hoverable role="button" tabIndex={0}>Clickable</Card>
 * ```
 */
export default function Card({ children, className, hoverable, onClick }) {
  const isInteractive = Boolean(onClick)

  const base =
    'rounded-xl border border-neutral-200 bg-white shadow-soft transition duration-200'

  const hover = hoverable
    ? 'hover:-translate-y-0.5 hover:shadow-md'
    : ''

  return (
    <motion.div
      className={cn(base, hover, className)}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        if (!isInteractive) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(e)
        }
      }}
      whileHover={hoverable ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
}

Card.defaultProps = {
  className: '',
  hoverable: false,
  onClick: undefined,
}
