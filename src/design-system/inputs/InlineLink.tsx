import Link from '@/components/Link'
import { PropsWithChildren } from 'react'

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
      className={`hover:!text-primary-700 text-primary-500 inline-block underline transition-colors ${className}`}>
      {children}
    </Link>
  )
}
