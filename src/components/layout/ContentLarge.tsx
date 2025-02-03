import Main from '@/design-system/layout/Main'
import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export default function ContentLarge({
  children,
  className,
  tag = Main,
}: PropsWithChildren<{
  className?: string
  tag?: React.ElementType | string
}>) {
  const Tag = tag

  return (
    <Tag
      className={twMerge(
        'flex w-full max-w-5xl flex-1 flex-col overflow-visible px-4 lg:mx-auto',
        className
      )}>
      {children}
    </Tag>
  )
}
