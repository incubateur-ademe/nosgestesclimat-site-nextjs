import { ReactNode } from 'react'

export default function WhatItIs({
  title,
  description,
  illustration,
}: {
  title: ReactNode
  description: ReactNode
  illustration: ReactNode
}) {
  return (
    <div className="mx-auto mb-20 mt-24 flex max-w-6xl flex-col gap-12 px-8 md:px-0">
      <h2 className="text-center text-2xl md:text-3xl">{title}</h2>

      <div className="flex flex-col items-center gap-16 md:flex-row">
        <p>{description}</p>

        {illustration}
      </div>
    </div>
  )
}
