'use client'

import { useActions, useEngine } from '@/publicodes-state'
import { useMemo } from 'react'
import RecommendedAction from './RecommendedAction'

export default function RecommendedActions() {
  const { orderedActions } = useActions()
  const { getCategory } = useEngine()

  const filteredSameCategoriesActions = useMemo(
    () =>
      orderedActions
        .reduce(
          (accumulator: string[], currentValue: string) =>
            accumulator.find(
              (action) => getCategory(action) === getCategory(currentValue)
            )
              ? accumulator
              : [...accumulator, currentValue],
          []
        )
        .slice(0, 3),
    [orderedActions, getCategory]
  )

  return (
    <div className="max-w-screen overflow-scroll">
      <ul className="flex flex-row gap-4">
        {filteredSameCategoriesActions.map((action, index) => (
          <RecommendedAction
            actionDottedName={action}
            key={`recommended-action-${index}`}
          />
        ))}
      </ul>
    </div>
  )
}
