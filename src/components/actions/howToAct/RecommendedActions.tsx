'use client'

import { useActions, useEngine } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { useMemo } from 'react'
import RecommendedAction from './RecommendedAction'

export default function RecommendedActions() {
  const { orderedActions: orderedActionDottedNames } = useActions()
  const { getCategory } = useEngine()

  const filteredSameCategoriesActionDottedNames = useMemo(
    () =>
      orderedActionDottedNames
        .reduce(
          (accumulator: string[], currentActionDottedName: DottedName) =>
            accumulator.find(
              (actionDottedName) =>
                getCategory(actionDottedName) ===
                getCategory(currentActionDottedName)
            )
              ? accumulator
              : [...accumulator, currentActionDottedName],
          []
        )
        .slice(0, 3),
    [orderedActionDottedNames, getCategory]
  )

  return (
    <div className="max-w-screen overflow-auto">
      <ul className="flex flex-row gap-4">
        {filteredSameCategoriesActionDottedNames.map(
          (actionDottedName, index) => (
            <RecommendedAction
              actionDottedName={actionDottedName}
              key={`recommended-actionDottedName-${index}`}
            />
          )
        )}
      </ul>
    </div>
  )
}
