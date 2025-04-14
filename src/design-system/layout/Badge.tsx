import {
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

const colorClassNames = {
  primary: 'border-primary-300 text-primary-700 bg-primary-50',
  secondary: 'border-secondary-700 text-secondary-700 bg-secondary-50',
  green: 'border-green-300 text-green-700 bg-green-50',
  red: 'border-red-300 text-red-700 bg-red-50',
}
const sizeClassNames = {
  xs: 'text-xs py-0.5',
  sm: 'text-sm py-0.5',
  md: 'text-base py-1 ',
}
export default function Badge({
  children,
  color = 'primary',
  size = 'md',
  className,
  category,
  tag = 'div',
}: PropsWithChildren<{
  color?: 'primary' | 'secondary' | 'green' | 'red'
  size?: 'xs' | 'sm' | 'md'
  className?: string
  category?: string
  tag?: 'div' | 'span' | 'p'
}>) {
  const Tag = tag
  return (
    <Tag
      className={twMerge(
        'inline-block rounded-xl border-2 px-2 leading-none font-black whitespace-nowrap',
        sizeClassNames[size],
        category
          ? getBorderColor(category) + ' ' + getTextDarkColor(category)
          : colorClassNames[color],
        className
      )}>
      {children}{' '}
    </Tag>
  )
}
