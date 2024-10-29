'use client'

import type { WhatDoWeMeasureListItem } from '@/types/landing-page'
import type { ReactNode } from 'react'
import 'slick-carousel/slick/slick.css'

export default function WhatDoWeMeasure({
  title,
  listItems,
  description,
}: {
  title: ReactNode
  listItems: WhatDoWeMeasureListItem[]
  description: ReactNode
}) {
  return (
    <div className="mb-20 flex max-w-full flex-col gap-11 md:mx-auto md:max-w-5xl md:px-0">
      <h2 className="px-4 text-center text-2xl md:px-0 md:text-3xl">{title}</h2>

      <ul className="hidden grid-cols-1 gap-5 md:grid md:grid-cols-2 lg:grid-cols-5">
        {listItems.map(({ icon, title }, index) => (
          <li
            key={`list-item-${title}-${index}`}
            className="flex flex-col items-center gap-2 rounded-xl bg-heroLightBackground p-4">
            {icon}
            <span className="text-center">{title}</span>
          </li>
        ))}
      </ul>

      <div className="flex overflow-x-auto md:hidden">
        <div className="flex gap-4 px-[calc(50vw-6.5rem)]">
          {listItems.map(({ icon, title }, index) => (
            <li
              key={`list-item-${title}-${index}`}
              className="!flex !h-40 !w-52 shrink-0 flex-col items-center justify-center gap-2 rounded-xl bg-heroLightBackground p-4">
              <div className="flex justify-center">{icon}</div>
              <p className="mb-0 !flex justify-center text-center text-sm">
                {title}
              </p>
            </li>
          ))}
        </div>
      </div>
      <section className="mx-auto w-[800px] max-w-full px-4 text-sm md:px-0 md:text-lg">
        {description}
      </section>
    </div>
  )
}
