'use client'

import getActions from '@/helpers/actions/getActions'
import {
  useCurrentSimulation,
  useEngine,
  useSimulation,
  useTempEngine,
} from '@/publicodes-state'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Actions from './actionsContent/Actions'
import AllerPlusLoin from './actionsContent/AllerPlusLoin'
import CategoryFilters from './actionsContent/CategoryFilters'
import OptionBar from './actionsContent/OptionBar'

export default function ActionsContent() {
  const { getCategory } = useEngine()

  const [radical, setRadical] = useState(true)

  const searchParams = useSearchParams()

  const category = searchParams.get('catégorie')

  const { actionChoices, progression } = useCurrentSimulation()

  const { rules, getSpecialRuleObject } = useTempEngine()

  const { safeEvaluate } = useSimulation()
  const actions = getActions({
    rules,
    radical,
    safeEvaluate,
    getSpecialRuleObject,
    actionChoices,
  })

  const actionsDisplayed = actions.filter((action: any) =>
    category ? getCategory(action.dottedName) === category : true
  )

  const isSimulationWellStarted = progression > 0.5

  return (
    <div
      className={`${
        isSimulationWellStarted ? '' : 'pointer-events-none opacity-70'
      } text-center`}
      aria-hidden={isSimulationWellStarted ? 'false' : 'true'}>
      <div className="relative">
        <CategoryFilters actions={actionsDisplayed} />

        <OptionBar
          setRadical={setRadical}
          radical={radical}
          actions={actionsDisplayed}
        />
      </div>

      <Actions
        actions={actionsDisplayed.reverse()}
        rules={rules}
        radical={radical}
      />

      <AllerPlusLoin />
    </div>
  )
}
