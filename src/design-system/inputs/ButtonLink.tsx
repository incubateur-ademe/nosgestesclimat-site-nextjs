import Link from '@/components/Link'
import { ButtonSize } from '@/types/values'
import { HtmlHTMLAttributes, PropsWithChildren } from 'react'
import { baseClassNames, colorClassNames, sizeClassNames } from './Button'

type Props = {
  href: string
  className?: string
  color?: 'primary' | 'secondary' | 'text'
  size?: ButtonSize
  title?: string
  onClick?: () => void
}

export default function ButtonLink({
  href,
  children,
  className = '',
  color = 'primary',
  size = 'md',
  title,
  onClick,
  ...props
}: PropsWithChildren<Props & HtmlHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={title}
      className={`${baseClassNames} ${sizeClassNames[size]} ${colorClassNames[color]} ${className}`}
      {...props}>
      {children}
    </Link>
  )
}
