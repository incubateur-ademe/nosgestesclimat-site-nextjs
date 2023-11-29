import Link from '@/components/Link'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  href: string
  className?: string
  title?: string
} & PropsWithChildren

export default function InlineLink({
  children,
  href,
  className,
  title,
}: Props) {
  return (
    <Link
      href={href}
      title={title}
      className={twMerge(
        `inline-block text-primary-500 underline transition-colors hover:!text-primary-700`,
        className
      )}>
      {children}
    </Link>
  )
}
