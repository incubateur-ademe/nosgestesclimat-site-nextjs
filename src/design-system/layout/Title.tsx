import type { JSX, PropsWithChildren } from 'react'

import { twMerge } from 'tailwind-merge'
import Separator from './Separator'

export interface TitleProps {
  title?: string | JSX.Element
  subtitle?: string | JSX.Element
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  hasSeparator?: boolean
  className?: string
  containerClassName?: string
}

export default function Title({
  title,
  subtitle,
  tag = 'h1',
  hasSeparator = true,
  className = '',
  containerClassName,
  children,
  ...props
}: PropsWithChildren<TitleProps>) {
  const Tag = tag
  return (
    <div className={twMerge('relative', containerClassName)}>
      <div className="mb-6">
        <Tag className={twMerge('mb-2', className)} {...props}>
          {title ?? children}
        </Tag>

        {subtitle && <p className="mb-0 text-slate-500">{subtitle}</p>}
      </div>
      {hasSeparator ? <Separator className="mt-0 mb-6" /> : null}
    </div>
  )
}
