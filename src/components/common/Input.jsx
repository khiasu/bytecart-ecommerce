import PropTypes from 'prop-types'
import { cn } from '@utils/helpers'

/**
 * Input
 *
 * Types: text, email, search, number
 * States: default, focus, error, disabled
 *
 * Usage:
 * ```jsx
 * import { Input } from '@components/common'
 * import { Search } from 'lucide-react'
 *
 * <Input type="search" placeholder="Search..." icon={Search} />
 * <Input type="email" placeholder="Email" error="Email is required" />
 * ```
 */
export default function Input({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  error = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  className = '',
  name = '',
  id,
  autoComplete,
}) {
  const hasError = Boolean(error)
  const describedById = hasError && id ? `${id}-error` : undefined

  const wrapperBase = 'w-full'

  const inputBase =
    'h-11 w-full rounded-lg border bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-100'

  const inputState = hasError
    ? 'border-semantic-error focus:border-semantic-error focus:ring-red-100'
    : 'border-neutral-200 focus:border-primary-500 focus:ring-primary-100'

  const withLeftIcon = Icon && iconPosition === 'left' ? 'pl-10' : ''
  const withRightIcon = Icon && iconPosition === 'right' ? 'pr-10' : ''

  return (
    <div className={cn(wrapperBase, className)}>
      <div className="relative">
        {Icon && iconPosition === 'left' ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-neutral-400">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : null}

        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={hasError || undefined}
          aria-describedby={describedById}
          className={cn(inputBase, inputState, withLeftIcon, withRightIcon)}
        />

        {Icon && iconPosition === 'right' ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 inline-flex items-center text-neutral-400">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      {hasError ? (
        <p
          id={describedById}
          className="mt-2 text-sm text-semantic-error"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'search', 'number']),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  /** Error string enables error styles + message */
  error: PropTypes.string,
  /** Lucide icon component, e.g. `Search` */
  icon: PropTypes.elementType,
  /** Icon position */
  iconPosition: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  autoComplete: PropTypes.string,
}
