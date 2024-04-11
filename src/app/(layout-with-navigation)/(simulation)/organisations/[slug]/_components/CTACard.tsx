import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  overLabel: string | React.ReactNode
  title: string | React.ReactNode
  description: string | React.ReactNode
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  id?: string
}

export default function CTACard({
  overLabel,
  title,
  description,
  children,
  tag,
  className,
  id,
}: PropsWithChildren<Props>) {
  const Tag = tag ?? 'h2'
  return (
    <div
      className={twMerge(
        'flex flex-col rounded-xl bg-white px-8 py-6',
        className
      )}
      id={id}>
      <p className="font-medium text-secondary-700">{overLabel}</p>

      <Tag>{title}</Tag>

      <p className="mb-12">{description}</p>

      {children}
    </div>
  )
}
