import Main from '@/design-system/layout/Main'
import type { HTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export default function ContentLarge({
  children,
  className,
  tag = Main,
  ...props
}: HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    className?: string
    tag?: React.ElementType
  }>) {
  const Tag = tag

  return (
    <Tag
      className={twMerge(
        'flex w-full max-w-5xl flex-1 flex-col overflow-visible lg:mx-auto',
        className
      )}
      {...props}>
      {children}
    </Tag>
  )
}
