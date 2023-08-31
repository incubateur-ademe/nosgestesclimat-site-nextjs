import Link from 'next/link'
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
      className={`text-primary hover:!text-primaryDark transition-colors underline inline-block ${className}`}>
      {children}
    </Link>
  )
}
