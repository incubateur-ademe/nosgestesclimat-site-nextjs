'use client'

import { baseClassNames, sizeClassNames } from '@/design-system/inputs/Button'
import Emoji from '@/design-system/utils/Emoji'
import { GesturesType } from '@/types/landing-page'
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

      <ul className="flex min-w-[360px] flex-col gap-6">
        {gestures[selectedCategory].map((gesture, index) => (
          <li key={`gesture-${index}`}>
            <span className="mr-2">
              <Emoji>💡</Emoji>
            </span>
            {gesture}
          </li>
        ))}
      </ul>
    </div>
  )
}
