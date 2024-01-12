import React, { PropsWithChildren } from 'react'

type Props = {
  overLabel: string | React.ReactNode
  title: string | React.ReactNode
  description: string | React.ReactNode
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function CTACard({
  overLabel,
  title,
  description,
  children,
  tag,
}: PropsWithChildren<Props>) {
  const Tag = tag ?? 'h2'
  return (
    <div className="rounded-lg bg-white px-8 py-6">
      <p className="font-medium text-secondary">{overLabel}</p>

      <Tag>{title}</Tag>

      <p>{description}</p>

      <div>{children}</div>
    </div>
  )
}
