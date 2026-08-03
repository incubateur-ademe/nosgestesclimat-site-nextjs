import {
  getBorderColor,
  getTextDarkColor,
} from '@/helpers/getCategoryColorClass'
import { Badge as BadgePrimitive } from '@/components/ui/badge'
import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'green'
  | 'red'
  | 'purple'
  | 'yellow'
  | 'blue'
  | 'orange'
  | 'light'

export default function Badge({
  children,
  color = 'primary',
  size = 'md',
  className,
  category,
  tag = 'div',
  border = true,
  ...props
}: PropsWithChildren<{
  color?: BadgeColor
  size?: 'xs' | 'sm' | 'md'
  className?: string
  category?: string
  tag?: 'div' | 'span' | 'p' | 'h2' | 'h3' | 'h4'
  border?: boolean
  ['data-testid']?: string
}>) {
  const { 'data-testid': dataTestId, ...restProps } = props
  const Tag = tag
  return (
    <BadgePrimitive
      asChild
      variant={category ? undefined : color}
      size={size}
      borderless={!border}
      className={twMerge(
        category
          ? `${getBorderColor(category)} ${getTextDarkColor(category)}`
          : '',
        className
      )}
      {...restProps}>
      <Tag data-testid={dataTestId}>{children} </Tag>
    </BadgePrimitive>
  )
}
