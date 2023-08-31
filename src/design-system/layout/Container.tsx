import { JSX, PropsWithChildren } from 'react'

export default function Container({
  children,
  className,
  tag,
  maxWidth,
}: PropsWithChildren<{
  className?: string
  tag?: () => JSX.Element
  maxWidth?: string
}>) {
  const Tag = tag ?? 'div'

  const maxWidthClass = maxWidth ? `max-w-${maxWidth} mx-auto` : ''

  return <Tag className={`${maxWidthClass} ${className || ''}`}>{children}</Tag>
}
