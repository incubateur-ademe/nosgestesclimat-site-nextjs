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
    <div className="mx-auto mb-20 mt-16 flex max-w-5xl flex-col gap-10 px-4 md:my-20 md:px-0">
      <h2 className="mb-0 text-center text-2xl md:text-3xl">{title}</h2>

      <div className="flex flex-col items-center gap-16 text-sm md:flex-row md:text-lg">
        {description}

        {illustration}
      </div>
    </div>
  )
}
