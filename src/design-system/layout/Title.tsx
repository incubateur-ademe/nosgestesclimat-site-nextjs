import { JSX, PropsWithChildren } from 'react'

import Separator from './Separator'

type Props = {
  title?: string | JSX.Element
  subtitle?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

export default function Title({
  title,
  subtitle,
  tag = 'h1',
  className,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const Tag = tag
  return (
    <div className="relative mb-4 pb-4">
      <Tag className={`mb-1 ${className}`} {...props}>
        {title ?? children}
      </Tag>

      {subtitle && <p className="mb-0 text-slate-500">{subtitle}</p>}

      <Separator className="absolute bottom-0 left-0" />
    </div>
  )
}
