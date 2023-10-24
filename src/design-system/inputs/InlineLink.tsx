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
      className={`inline-block text-primary underline transition-colors hover:!text-primaryDark ${className}`}>
      {children}
    </Link>
  )
}
