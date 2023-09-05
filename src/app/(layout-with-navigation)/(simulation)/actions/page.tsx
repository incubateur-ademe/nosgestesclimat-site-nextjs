'use client'

import { useEngine, useForm, useUser } from '@/publicodes-state'

import { useState } from 'react'
import ActionsTutorial from './_components/ActionsTutorial'
import PetrolFilter from './_components/PetrolFilter'
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

  const { user, tutorials } = useUser()
  const { rules, getRuleObject } = useEngine()

  const actions = getActions({
    metric,
    focusedAction: '',
    rules,
    radical,
    getRuleObject,
    user,
  })

  console.log(actions.length)

  const filterByCategory = (actions: any) =>
    actions.filter((action: any) =>
      category ? action.dottedName.split(' . ')[0] === category : true
    )

  const actionsDisplayed = filterByCategory(actions)

  //TODO this is quite a bad design
  // we'd better check if the test is finished
  // but is it too restrictive ?
  const isSimulationWellStarted = progression > 0.5
  console.log(actionsDisplayed.length)

  return (
    <div className="mx-auto my-4 pb-4">
      {!isSimulationWellStarted && <SimulationMissing />}

      {isSimulationWellStarted && !(tutorials as any).actions && (
        <ActionsTutorial />
      )}

      <div
        className={`${
          isSimulationWellStarted ? '' : 'pointer-events-none opacity-70'
        } text-center`}
        aria-hidden={isSimulationWellStarted ? 'false' : 'true'}>
        <PetrolFilter />

        <CategoryFilters actions={actionsDisplayed} />

        <Actions
          actions={actionsDisplayed.reverse()}
          rules={rules}
          radical={radical}
          setRadical={setRadical}
        />
      </div>
    </div>
  )
}
