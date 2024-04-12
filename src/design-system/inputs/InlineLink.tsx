import Link from '@/components/Link'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  href: string
  className?: string
  title?: string
  onClick?: () => void
  target?: string
} & PropsWithChildren

export default function InlineLink({
  children,
  href,
  className,
  title,
  onClick,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      title={title}
      onClick={onClick}
      className={twMerge(
        `inline-block text-primary-700 underline transition-colors hover:!text-primary-700`,
        className
      )}
      {...props}>
      {children}
    </Link>
  )
}
