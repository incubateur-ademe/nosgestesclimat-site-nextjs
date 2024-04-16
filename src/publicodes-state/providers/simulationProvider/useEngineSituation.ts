import { useCurrentSimulation } from '@/publicodes-state'
import { useCallback, useEffect, useState } from 'react'
import { safeGetSituation } from '../../helpers/safeGetSituation'
import { DottedName, Engine, Situation } from '../../types'

type Props = {
  engine: Engine
  everyRules: DottedName[]
}
/**
 * Update the engine situation and the simulation situation
 */
export function useEngineSituation({ engine, everyRules }: Props) {
  const { situation, updateCurrentSimulation } = useCurrentSimulation()

  const [isInitialized, setIsInitialized] = useState(false)

  const addToEngineSituation = useCallback(
    (situationToAdd: Situation): Promise<void> => {
      const safeSituation = safeGetSituation({
        situation: situationToAdd,
        everyRules,
      })

      const newSituations = {
        ...situation,
        ...safeSituation,
      }
      console.log('newSituations', newSituations)
      engine.setSituation(newSituations)

      setIsInitialized(true)

      return updateCurrentSimulation({ situation: newSituations })
    },
    [situation, engine, everyRules, updateCurrentSimulation]
  )

  useEffect(() => {
    if (isInitialized) return
    setIsInitialized(true)

    const safeSituation = safeGetSituation({
      situation,
      everyRules,
    })

    engine.setSituation(safeSituation)
  }, [engine, situation, isInitialized, everyRules])

  return { isInitialized, addToEngineSituation }
}
