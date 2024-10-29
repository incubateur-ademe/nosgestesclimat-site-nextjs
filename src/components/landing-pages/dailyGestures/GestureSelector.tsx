'use client'

import { baseClassNames, sizeClassNames } from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
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
                  'border-2 border-primary-100 bg-primary-100 text-primary-700',
                  selectedCategory === categoryName &&
                    'border-primary-700 bg-primary-200 text-primary-900'
                )}
                onClick={() => setSelectedCategory(categoryName)}>
                {categoryName}
              </button>
            </li>
          ))}
        </ul>

        <ul className="flex flex-1 flex-col gap-4">
          {gestures[selectedCategory].gestureList.map((gesture, index) => (
            <li key={`gesture-${index}`} className="flex items-baseline gap-1">
              <span className="mr-2 h-4 w-4">
                <Emoji className="block w-4">💡</Emoji>
              </span>
              {gesture}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center md:justify-start">
        <Image
          src={gestures[selectedCategory].imageSrc}
          alt=""
          width="300"
          height="300"
          className="max-h-64 w-auto object-cover"
        />
      </div>
    </>
  )
}
