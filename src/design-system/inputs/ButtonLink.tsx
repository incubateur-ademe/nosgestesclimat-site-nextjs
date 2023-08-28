import Link from '@/components/Link'
import { ButtonSize } from '@/types/values'
import { PropsWithChildren } from 'react'
import { baseClassNames, colorClassNames, sizeClassNames } from './Button'

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
      className={`${baseClassNames} ${sizeClassNames[size]} ${colorClassNames[color]} ${className}`}
      {...props}>
      {children}
    </Link>
  )
}
