import { ButtonSize } from '@/types/values'
import Link from 'next/link'
import { HtmlHTMLAttributes, PropsWithChildren } from 'react'
import { baseClassNames, colorClassNames, sizeClassNames } from './Button'

type Props = {
  href: string
  className?: string
  color?: 'primary' | 'secondary' | 'text'
  size?: ButtonSize
  onClick?: () => void
}

export default function ButtonLink({
  href,
  children,
  className = '',
  color = 'primary',
  size = 'md',
  onClick,
  ...props
}: PropsWithChildren<Props & HtmlHTMLAttributes<HTMLAnchorElement>>) {
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
