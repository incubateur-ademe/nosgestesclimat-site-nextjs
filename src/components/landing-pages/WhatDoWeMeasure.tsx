import type { WhatDoWeMeasureListItem } from '@/types/landing-page'
import type { ReactNode } from 'react'

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
    <div className="mx-auto mb-20 flex max-w-full flex-col gap-12 px-8 md:max-w-5xl md:px-0">
      <h2 className="text-center text-2xl md:text-3xl">{title}</h2>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
        {listItems.map(({ icon, title }, index) => (
          <li
            key={`list-item-${title}-${index}`}
            className="flex flex-col items-center gap-2 rounded-lg bg-heroLightBackground p-4">
            {icon}
            <span className="text-center text-base">{title}</span>
          </li>
        ))}
      </ul>
      <section className="mx-auto w-[800px] max-w-full">{description}</section>
    </div>
  )
}
