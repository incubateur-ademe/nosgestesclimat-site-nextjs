import { ElementType, PropsWithChildren } from 'react'

export default function Card({
  children,
  className,
  tag,
  href,
  onClick,
  ...props
}: PropsWithChildren & {
  className?: string
  href?: string /* Used only for links */
  tag?: ElementType | string
  onClick?: () => void
}) {
  const Tag = tag || 'div'

  return (
    <Tag
      onClick={onClick}
      className={`flex bg-white rounded-md border-[1px] border-solid border-gray-200 shadow-sm p-4 list-none ${className}`}
      href={href}
      {...props}>
      {children}
    </Tag>
  )
}
