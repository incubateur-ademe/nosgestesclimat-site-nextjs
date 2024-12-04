'use client'

import type { WhatDoWeMeasureListItem } from '@/types/landing-page'
import type { ReactNode } from 'react'
import 'slick-carousel/slick/slick.css'
import { twMerge } from 'tailwind-merge'

const getGridColsClassname = (numberItems: number) => {
  switch (numberItems) {
    case 1:
      return 'lg:grid-cols-1'
    case 2:
      return 'lg:grid-cols-2'
    case 3:
      return 'lg:grid-cols-3'
    case 4:
      return 'lg:grid-cols-4'
    case 5:
      return 'lg:grid-cols-5'
    case 6:
      return 'lg:grid-cols-6'
    default:
      return ''
  }
}

export default function WhatDoWeMeasure({
  title,
  listItems,
  description,
  shouldDescriptionBeBeforeList,
  shouldUseDescriptionMaxWidth,
}: {
  title: ReactNode
  listItems: WhatDoWeMeasureListItem[]
  description: ReactNode
  shouldDescriptionBeBeforeList?: boolean
  shouldUseDescriptionMaxWidth?: boolean
}) {
  return (
    <div className="mb-16 flex max-w-full flex-col gap-10 md:mx-auto md:mb-20 md:max-w-5xl md:px-0">
      <h2 className="mb-0 px-4 text-center text-2xl md:px-0 md:text-3xl">
        {title}
      </h2>

      <section
        className={twMerge(
          'mx-auto w-[800px] max-w-full px-4 text-sm md:px-0 md:text-lg',
          shouldDescriptionBeBeforeList ? '' : 'hidden'
        )}>
        {description}
      </section>

      <ul
        className={twMerge(
          `order hidden grid-cols-1 gap-5 md:grid md:grid-cols-2 ${getGridColsClassname(listItems.length)}`,
          shouldUseDescriptionMaxWidth ? 'max-w-[800px]' : ''
        )}>
        {listItems.map(({ icon, title }, index) => (
          <li
            key={`list-item-${title}-${index}`}
            className="flex flex-col items-center gap-2 rounded-xl border-2 border-heroLightBackground bg-[#F7FBFF] p-4">
            {icon}
            <span className="text-center">{title}</span>
          </li>
        ))}
      </ul>

      <div className="flex overflow-x-auto md:hidden">
        <div className="flex gap-5 px-[calc(50vw-6.5rem)]">
          {listItems.map(({ icon, title }, index) => (
            <li
              key={`list-item-${title}-${index}`}
              className="!flex !h-40 !w-52 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-heroLightBackground bg-[#F7FBFF] p-4">
              <div className="flex justify-center">{icon}</div>
              <p className="mb-0 !flex justify-center text-center text-sm">
                {title}
              </p>
            </li>
          ))}
        </div>
      </div>
      <section
        className={twMerge(
          'mx-auto w-[800px] max-w-full px-4 text-sm md:px-0 md:text-lg',
          shouldDescriptionBeBeforeList ? 'hidden' : ''
        )}>
        {description}
      </section>
    </div>
  )
}
