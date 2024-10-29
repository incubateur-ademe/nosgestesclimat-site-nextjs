import type { ReactNode } from 'react'

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
    <div className="mx-auto my-20 flex max-w-5xl flex-col gap-10 px-8 md:px-0">
      <h2 className="mb-0 text-center text-2xl md:text-3xl">{title}</h2>

      <div className="flex flex-col items-center gap-16 md:flex-row">
        {description}

        {illustration}
      </div>
    </div>
  )
}
