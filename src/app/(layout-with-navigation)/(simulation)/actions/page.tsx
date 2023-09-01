'use client'

import { useEngine, useForm, useUser } from '@/publicodes-state'
import { useState } from 'react'

import ActionsTutorial from './_components/ActionsTutorial'
import CategoryFilters from './_components/categoryFilters/CategoryFilters'
import PetrolFilter from './_components/PetrolFilter'
import SimulationMissing from './_components/SimulationMissing'
import getActions from './_helpers/getActions'

export default function ActionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [radical, setRadical] = useState(true)
  const [focusedAction, focusAction] = useState('')

  const metric = (searchParams.métrique || '') as string

  const category = searchParams.catégorie

  const { progression } = useForm()

  const { user } = useUser()
  const { rules, getRuleObject } = useEngine()
  /*
  const tutorials = useSelector((state: AppState) => state.tutorials)
*/
  const tutorials = {}

  const actions = getActions({
    metric,
    focusedAction,
    rules,
    radical,
    getRuleObject,
    user,
  })

  const filterByCategory = (actions: any) =>
    actions.filter((action: any) =>
      category ? action.dottedName.split(' . ')[0] === category : true
    )

  const actionsDisplayed = filterByCategory(actions)

  //TODO this is quite a bad design
  // we'd better check if the test is finished
  // but is it too restrictive ?
  const isSimulationWellStarted = progression > 0.5

  return (
    <div className="pb-4 my-4 mx-auto">
      {!isSimulationWellStarted && <SimulationMissing />}

      {isSimulationWellStarted && (tutorials as any).actions !== 'skip' && (
        <ActionsTutorial />
      )}

      <div
        className={
          isSimulationWellStarted ? '' : 'pointer-events-none opacity-70'
        }
        aria-hidden={isSimulationWellStarted ? 'false' : 'true'}>
        <PetrolFilter />

        <CategoryFilters actions={actionsDisplayed} />

        {/*
        <OptionsBar
          setRadical={setRadical}
          radical={radical}
          finalActions={finalActions}
        />

        <Actions
          actions={finalActions.reverse()}
          rules={rules}
          bilan={bilan}
          focusAction={focusAction}
          focusedAction={focusedAction}
          radical={radical}
        />
             */}
      </div>
    </div>
  )
}
