import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'
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
        'mb-8 w-full max-w-6xl overflow-visible px-4 pt-4 lg:mx-auto',
        className
      )}>
      {children}
    </Main>
  )
}
