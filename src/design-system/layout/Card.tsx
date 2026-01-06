import type { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Card({
  children,
  className,
  tag,
  href,
  onClick,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<
    {
      className?: string
      href?: string /* Used only for links */
      tag?: React.ElementType
      onClick?: () => void
      style?: CSSProperties
      target?: string
    } & HTMLAttributes<HTMLDivElement>
  >) {
  const Tag = tag ?? ('div' as React.ElementType)
  const isInteractive = tag === 'button' || tag === 'a' || !!onClick

  return (
    <Tag
      onClick={onClick}
      className={twMerge(
        `flex list-none flex-col rounded-xl border-2 border-gray-500 bg-white p-4 transition-colors`,
        isInteractive
          ? 'focus:ring-primary-700 cursor-pointer focus:ring-2 focus:ring-offset-3 focus:outline-hidden'
          : '',
        className
      )}
      href={href}
      style={style}
      {...props}>
      {children}
    </Tag>
  )
}
