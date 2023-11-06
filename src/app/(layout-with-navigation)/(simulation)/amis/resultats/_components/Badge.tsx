import { PropsWithChildren } from 'react'

export default function Badge({
  children,
  className,
}: { className?: string } & PropsWithChildren) {
  return (
    <div
      className={`bg-primary-100 text-primary-500 border-primary-800 whitespace-nowrap rounded-md border-[1px] border-solid px-2 py-1 text-sm ${className}`}>
      {children}
    </div>
  )
}
