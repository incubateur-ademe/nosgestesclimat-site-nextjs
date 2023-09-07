import TransClient from '@/components/translation/TransClient'
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
    <div className="px-12">
      <h3 className="text-center text-xl">
        <TransClient>Comment réduire mon empreinte&nbsp;?</TransClient>
      </h3>
      <p className="text-center text-lg italic">
        <TransClient>
          Les 3 actions au plus fort impact pour vous&nbsp;:
        </TransClient>
      </p>
      <div className="flex flex-col gap-8 ">
        {filteredSameCategoriesActions.map((action, index) =>
          index < 3 ? <Action key={action} action={action} /> : null
        )}
      </div>
    </div>
  )
}
