'use client'

import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useEngine, useForm, useUser } from '@/publicodes-state'
import { NGCRules } from '@/types/model'
import { useMemo, useState } from 'react'

import { useClientTranslation } from '@/hooks/useClientTranslation'
import ActionsTutorial from './_components/ActionsTutorial'
import SimulationMissing from './_components/SimulationMissing'
import { getCarbonFootprint } from './_helpers/getCarbonFootprint'
import useActions from './_hooks/useActions'

export default function Actions({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { t, i18n } = useClientTranslation()

  const [radical, setRadical] = useState(true)
  const [focusedAction, focusAction] = useState('')

  const locale = useLocale()

  const { progression, categories } = useForm()

  const { user } = useUser()
  const { getValue } = useEngine()

  const metric = searchParams.métrique || ''
  const category = searchParams.catégorie

  const { data: rules } = useRules({
    lang: locale || 'fr',
    region: user?.region?.code || 'FR',
  }) as unknown as NGCRules

  /*
  const tutorials = useSelector((state: AppState) => state.tutorials)
*/
  const tutorials = {}

  const actions = useMemo(
    () =>
      useActions({
        metric,
        focusedAction,
        rules,
        radical,
        getValue,
        user,
      }),
    [metric, focusedAction, rules, radical, getValue, user]
  )

  const { targets, interestingActions } = actions

  const bilan = targets.find((t) => t.dottedName === 'bilan')

  const filterByCategory = (actions: any) =>
    actions.filter((action: any) =>
      category ? action.dottedName.split(' . ')[0] === category : true
    )

  const finalActions = filterByCategory(interestingActions)

  const countByCategory = finalActions.reduce(
    (accumulator: any, action: any) => {
      const category = action.dottedName.split(' . ')[0]

      return { ...accumulator, [category]: (action[category] || 0) + 1 }
    },
    {}
  )

  //TODO this is quite a bad design
  // we'd better check if the test is finished
  // but is it too restrictive ?
  const isSimulationWellStarted = progression > 0.5

  const [value, unit] = getCarbonFootprint({ t, i18n }, bilan.nodeValue)
  console.log(value, unit)
  return (
    <div className="pb-4 my-4 mx-auto">
      {!isSimulationWellStarted && <SimulationMissing />}

      {isSimulationWellStarted && (tutorials as any).actions !== 'skip' && (
        <ActionsTutorial value={value} unit={unit} />
      )}
      {/*
      <div
        className={
          isSimulationWellStarted ? '' : 'pointer-events-none opacity-70'
        }
        aria-hidden={isSimulationWellStarted ? 'false' : 'true'}>
        <MetricFilters selected={metric} />

        <CategoryFilters
          categories={categories}
          metric={metric}
          selected={category}
          countByCategory={countByCategory}
        />

        <ActionsOptionsBar {...{ setRadical, radical, finalActions }} />

        <AllActions
          {...{
            actions: finalActions.reverse(),
            bilan,
            rules,
            focusedAction,
            focusAction,
            radical,
          }}
        />
        
      </div>
      */}
    </div>
  )
}
