'use client'

import { useCustomActions } from '@/hooks/actions/useCustomActions'
import {
  useCurrentSimulation,
  useEngine,
  useSimulation,
  useTempEngine,
  useUser,
} from '@/publicodes-state'
import { useState } from 'react'
import ActionsTutorial from './_components/ActionsTutorial'
import AllerPlusLoin from './_components/AllerPlusLoin'
import OptionBar from './_components/OptionBar'
import SimulationMissing from './_components/SimulationMissing'
import Actions from './_components/actions/Actions'
import CategoryFilters from './_components/categoryFilters/CategoryFilters'
import getActions from './_helpers/getActions'

export default function ActionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { getCategory } = useEngine()
  const [radical, setRadical] = useState(true)

  const category = searchParams.catégorie

  const { tutorials } = useUser()

  const { actionChoices, progression } = useCurrentSimulation()

  const { rules, getRuleObject } = useTempEngine()

  const { safeEvaluate } = useSimulation()

  const customActions = useCustomActions()

  if (!rules) {
    return null
  }

  const actions = getActions({
    rules,
    radical,
    safeEvaluate,
    getRuleObject,
    actionChoices,
  })

  const actionsDisplayed = actions.filter((action: any) =>
    category ? getCategory(action.dottedName) === category : true
  )

  // TODO this is quite a bad design
  // we'd better check if the test is finished
  // but is it too restrictive ?
  const isSimulationWellStarted = progression > 0.5

  const actionsIncludingCustomNGCActions = [
    ...actionsDisplayed,
    ...customActions,
  ]

  return (
    <div className="mx-auto my-4 pb-4">
      {!isSimulationWellStarted && (
        <SimulationMissing progression={progression} />
      )}

      {isSimulationWellStarted && !(tutorials as any).actions && (
        <ActionsTutorial />
      )}

      <div
        className={`${
          isSimulationWellStarted ? '' : 'pointer-events-none opacity-70'
        } text-center`}
        aria-hidden={isSimulationWellStarted ? 'false' : 'true'}>
        <div className="relative">
          <CategoryFilters actions={actionsIncludingCustomNGCActions} />

          <OptionBar
            setRadical={setRadical}
            radical={radical}
            actions={actionsIncludingCustomNGCActions}
          />
        </div>

        <Actions
          actions={actionsIncludingCustomNGCActions.reverse()}
          rules={rules}
          radical={radical}
        />

        <AllerPlusLoin />
      </div>
    </div>
  )
}
