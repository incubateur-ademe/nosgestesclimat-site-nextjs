'use client'

import Trans from '@/components/translation/Trans'
import { baseClassNames, sizeClassNames } from '@/design-system/inputs/Button'
import type { GesturesType } from '@/types/landing-page'
import Image from 'next/image'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function GestureSelector({
  gestures,
}: {
  gestures: GesturesType
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Object.keys(gestures)[0]
  )
  return (
    <>
      <div className="text-left">
        <ul className="mb-8 flex gap-1">
          {Object.keys(gestures).map((categoryName: string) => (
            <li key={categoryName}>
              <button
                className={twMerge(
                  baseClassNames,
                  sizeClassNames.xs,
                  'border-2 border-primary-100 bg-primary-50 text-primary-800 transition-colors hover:bg-primary-100',
                  selectedCategory === categoryName &&
                    'border-primary-500 bg-primary-100 text-primary-800'
                )}
                onClick={() => setSelectedCategory(categoryName)}>
                <Trans>{categoryName}</Trans>
              </button>
            </li>
          ))}
        </ul>

        <ul className="flex flex-1 flex-col gap-6">
          {gestures[selectedCategory].gestureList.map((gesture, index) => (
            <li
              key={`gesture-${index}`}
              className="flex items-baseline gap-1 text-sm font-bold text-primary-600 md:text-lg">
              <Trans>{gesture}</Trans>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex w-80 max-w-full justify-center md:justify-start">
        <Image
          src={gestures[selectedCategory].imageSrc}
          alt=""
          width="420"
          height="300"
          className="h-64 w-auto"
        />
      </div>
    </>
  )
}
