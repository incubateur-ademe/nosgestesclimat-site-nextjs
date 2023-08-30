import { JSX } from 'react'

import Separator from './Separator'

type Props = {
  title: string | JSX.Element
  subtitle?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

export default function Title({
  title,
  subtitle,
  tag = 'h1',
  className,
  ...props
}: Props) {
  const Tag = tag
  return (
    <div className="relative mb-4 pb-5">
      <Tag className={`mb-1 text-primaryDark ${className}`} {...props}>
        {title}
      </Tag>

      {subtitle && <p className="text-slate-500">{subtitle}</p>}

      <Separator className="absolute bottom-0 left-0 hidden lg:block" />
    </div>
  )
}
