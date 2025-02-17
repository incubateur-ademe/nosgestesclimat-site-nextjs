import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import Link from '../Link'

export function StyledLink({
  children,
  href,
  className,
  onClick,
}: PropsWithChildren<{
  href: string
  className?: string
  onClick?: () => void
}>) {
  return (
    <Link
      href={href}
      className={twMerge(
        'text-primary-700 hover:text-primary-800 underline transition-colors',
        className
      )}
      onClick={onClick}>
      {children}
    </Link>
  )
}
