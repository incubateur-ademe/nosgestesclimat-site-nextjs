import { WhatDoWeMeasureListItem } from '@/types/landing-page'
import { ReactNode } from 'react'

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
    <div className="mx-auto mb-20 mt-24 flex max-w-full flex-col gap-12 px-8 md:max-w-6xl md:px-0">
      <h2 className="text-center text-2xl md:text-3xl">{title}</h2>

      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
        {listItems.map(({ icon, title }, index) => (
          <li
            key={`list-item-${title}-${index}`}
            className="flex flex-col items-center gap-4 rounded-lg bg-primary-50 p-4">
            {icon}
            <span className="text-center">{title}</span>
          </li>
        ))}
      </ul>
      <section className="mx-auto w-[800px] max-w-full">{description}</section>
    </div>
  )
}
