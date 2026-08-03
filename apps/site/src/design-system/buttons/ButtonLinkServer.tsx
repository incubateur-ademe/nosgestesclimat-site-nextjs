import { cn } from '@/lib/utils'
import type { ButtonSize } from '@/types/values'
import Link from 'next/link'
import type { HtmlHTMLAttributes, PropsWithChildren } from 'react'
import { buttonVariants } from './buttonStyles'

interface Props {
  href: string
  className?: string
  color?: 'primary' | 'secondary' | 'text' | 'success'
  size?: ButtonSize
  title?: string
  target?: string
}

export default function ButtonLinkServer({
  href,
  children,
  className = '',
  color = 'primary',
  size = 'md',
  title,
  target = '_self',
  ...props
}: PropsWithChildren<Props & HtmlHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <Link
      href={href}
      title={title}
      className={cn(buttonVariants({ color, size }), className)}
      target={target}
      prefetch={false}
      {...props}>
      {children}
    </Link>
  )
}
