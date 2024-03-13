import Link from '@/components/Link'
import { ButtonSize } from '@/types/values'
import { HtmlHTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { baseClassNames, colorClassNames, sizeClassNames } from './Button'

type Props = {
  href: string
  className?: string
  color?: 'primary' | 'secondary' | 'text'
  size?: ButtonSize
  title?: string
  onClick?: () => void
  target?: string
}

export default function ButtonLink({
  href,
  children,
  className = '',
  color = 'primary',
  size = 'md',
  title,
  onClick,
  target = '_self',
  ...props
}: PropsWithChildren<Props & HtmlHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={title}
      className={twMerge(
        `${baseClassNames} ${sizeClassNames[size]} ${colorClassNames[color]}`,
        className
      )}
      target={target}
      {...props}>
      {children}
    </Link>
  )
}
