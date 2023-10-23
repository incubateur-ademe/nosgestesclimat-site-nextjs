import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Badge({
  children,
  className,
}: { className?: string } & PropsWithChildren) {
  return (
    <div
      className={twMerge(
        'whitespace-nowrap rounded-md border-[1px] border-solid border-primaryBorder bg-primaryLight px-2 py-1 text-sm text-primary',
        className
      )}>
      {children}
    </div>
  )
}
