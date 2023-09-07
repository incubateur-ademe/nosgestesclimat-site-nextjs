import { useActions, useEngine } from '@/publicodes-state'
import { useMemo } from 'react'
import Action from './actions/Action'

export default function Actions() {
  const { orderedActions } = useActions()
  const { getCategory } = useEngine()

  const filteredSameCategoriesActions = useMemo(
    () =>
      orderedActions.reduce(
        (accumulator: string[], currentValue: string) =>
          accumulator.find(
            (action) => getCategory(action) === getCategory(currentValue)
          )
            ? accumulator
            : [...accumulator, currentValue],
        []
      ),
    [orderedActions, getCategory]
  )

  return (
    <div className="flex flex-col gap-8 rounded-lg bg-primaryLight p-12">
      {filteredSameCategoriesActions.map((action, index) =>
        index < 3 ? <Action key={action} action={action} /> : null
      )}
    </div>
  )
}
