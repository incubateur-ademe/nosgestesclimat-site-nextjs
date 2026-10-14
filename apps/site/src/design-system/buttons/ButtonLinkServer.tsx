import Link from '@/design-system/links/Link'
import type { ButtonSize } from '@/types/values'
import { twMerge } from 'cn'
import type { LinkProps } from 'next/link'
import type { HtmlHTMLAttributes, PropsWithChildren } from 'react'
import { baseClassNames, colorClassNames, sizeClassNames } from './buttonStyles'

interface Props {
  href: string
  className?: string
  color?: 'primary' | 'secondary' | 'text' | 'success'
  size?: ButtonSize
  title?: string
  target?: string
  prefetch?: LinkProps['prefetch']
  disabled?: boolean
}

export default function ButtonLinkServer({
  href,
  children,
  className = '',
  color = 'primary',
  size = 'md',
  title,
  target = '_self',
  disabled,
  ...props
}: PropsWithChildren<Props & HtmlHTMLAttributes<HTMLAnchorElement>>) {
  const classNames = twMerge(
    `${baseClassNames} ${sizeClassNames[size]} ${colorClassNames[color]}`,
    disabled && 'cursor-not-allowed opacity-50!',
    className
  )

  // An anchor without href is neither focusable nor clickable
  if (disabled) {
    return (
      <a aria-disabled title={title} className={classNames} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      title={title}
      className={classNames}
      target={target}
      {...props}>
      {children}
    </Link>
  )
}
