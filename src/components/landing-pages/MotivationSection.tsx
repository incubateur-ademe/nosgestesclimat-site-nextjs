import Separator from '@/design-system/layout/Separator'
import type { ReactNode } from 'react'

export default function MotivationSection({
  title,
  description,
  motivationItems,
}: {
  title: ReactNode
  description: ReactNode
  motivationItems?: {
    title: ReactNode
    icon: ReactNode
    description: ReactNode
  }[]
}) {
  return (
    <section className="w-full pb-10 pt-16 md:py-20">
      <div className="mx-auto flex max-w-full flex-col gap-4 px-4 md:max-w-5xl md:px-0">
        <h2 className="!mb-0 text-center text-2xl md:text-3xl">{title}</h2>

        <Separator className="mx-auto my-0" />

        <div className="text-center text-sm md:mx-auto md:max-w-[850px] md:text-lg">
          {description}
        </div>

        {motivationItems && (
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {motivationItems.map((item, index) => (
              <li
                key={`motivation-item-${index}`}
                className="flex flex-col gap-2 text-center">
                <div className="flex justify-center">{item.icon}</div>

                <h3 className="mb-0 text-sm font-bold md:text-lg">
                  {item.title}
                </h3>

                <div className="text-[13px] md:text-base">
                  {item.description}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
