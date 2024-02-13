import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  overLabel: string | React.ReactNode
  title: string | React.ReactNode
  description: string | React.ReactNode
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

export default function CTACard({
  overLabel,
  title,
  description,
  children,
  tag,
  className,
}: PropsWithChildren<Props>) {
  const Tag = tag ?? 'h2'
  return (
    <div
      className={twMerge(
        'flex flex-col rounded-lg bg-white px-8 py-6',
        className
      )}>
      <p className="font-medium text-secondary">{overLabel}</p>

      <Tag>{title}</Tag>

      <p>{description}</p>

      {children}
    </div>
  )
}