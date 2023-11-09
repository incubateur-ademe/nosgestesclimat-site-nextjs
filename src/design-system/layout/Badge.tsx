import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  color?: 'default' | 'green' | 'red'
  className?: string
}

const colorClassNames = {
  default: 'text-primary-500 bg-primary-200 border-primary-700 ',
  green: 'text-green-800 bg-green-100 border-green-200 ',
  red: 'text-red-800 bg-red-100 border-red-200 ',
}

export default function Badge({
  children,
  className,
  color = 'default',
}: PropsWithChildren<Props>) {
  return (
    <div
      className={twMerge(
        `whitespace-nowrap rounded-md border-[1px] border-solid px-2 py-1 text-sm ${colorClassNames[color]}`,
        className
      )}>
      {children}
    </div>
  )
}
