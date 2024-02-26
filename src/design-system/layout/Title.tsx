import { JSX, PropsWithChildren } from 'react'

import { twMerge } from 'tailwind-merge'
import Separator from './Separator'

type Props = {
  title?: string | JSX.Element
  subtitle?: string | JSX.Element
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  hasSeparator?: boolean
  className?: string
}

export default function Title({
  title,
  subtitle,
  tag = 'h1',
  hasSeparator = true,
  className = '',
  children,
  ...props
}: PropsWithChildren<Props>) {
  const Tag = tag
  return (
    <div className="relative">
      <div className={hasSeparator ? 'mb-4' : 'mb-8'}>
        <Tag className={twMerge('mb-2', className)} {...props}>
          {title ?? children}
        </Tag>

        {subtitle && <p className="mb-0 text-slate-500">{subtitle}</p>}
      </div>
      {hasSeparator ? <Separator className="mb-4 mt-0" /> : null}
    </div>
  )
}
