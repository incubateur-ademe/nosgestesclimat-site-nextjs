import Main from '@/design-system/layout/Main'
import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
}
export default function ContentLarge({
  children,
  className,
}: PropsWithChildren<Props>) {
  return (
    <Main
      className={twMerge(
        'flex w-full max-w-5xl flex-1 flex-col overflow-visible lg:mx-auto',
        className
      )}>
      {children}
    </Main>
  )
}
