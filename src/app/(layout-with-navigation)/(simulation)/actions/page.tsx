'use client'

import { useForm, useTempEngine, useUser } from '@/publicodes-state'
import { useState } from 'react'
import ActionsTutorial from './_components/ActionsTutorial'
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
  const [radical, setRadical] = useState(true)
  const metric = (searchParams.métrique || '') as string

  const category = searchParams.catégorie

  const { progression } = useForm()

  const { tutorials, getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const { rules, getRuleObject } = useTempEngine()

  if (!currentSimulation) return

  const actionChoices = currentSimulation.actionChoices

  const actions = getActions({
    metric,
    rules,
    radical,
    getRuleObject,
    actionChoices,
  })

  const actionsDisplayed = actions.filter((action: any) =>
    category ? action.dottedName.split(' . ')[0] === category : true
  )

  //TODO this is quite a bad design
  // we'd better check if the test is finished
  // but is it too restrictive ?
  const isSimulationWellStarted = progression > 0.5

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
      </div>
    </div>
  )
}
