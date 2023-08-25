import Link from '@/components/Link'
import { ButtonSize } from '@/types/values'
import { PropsWithChildren } from 'react'
import { colorClassNames, sizeClassNames } from './Button'

type Props = {
  href: string
  className?: string
  color?: 'primary' | 'secondary' | 'text'
  size?: ButtonSize
  onClick?: () => void
} & PropsWithChildren

// Create a button component styled with tailwindcss
export default function ButtonLink({
  href,
  children,
  className = '',
  color = 'primary',
  size = 'md',
  onClick,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center ${sizeClassNames[size]} whitespace-nowrap rounded-md border-solid font-bold no-underline shadow-sm transition-colors ${colorClassNames[color]} focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 disabled:opacity-50 ${className}`}
      {...props}>
      {children}
    </Link>
  )
}
