import {
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  color?: 'default' | 'green' | 'red'
  className?: string
  category?: string
}

export default function Badge({
  children,
  className,
  category,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={twMerge(
        'whitespace-nowrap rounded-lg border-2 bg-white px-2 py-1 font-black leading-none',
        category ? getBorderColor(category ?? '') : 'text-primary-700',
        category ? getTextDarkColor(category ?? '') : 'border-primary-300',
        className
      )}>
      {children}{' '}
    </div>
  )
}
