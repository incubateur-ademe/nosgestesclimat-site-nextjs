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
      engine.setSituation(newSituations)

      setIsInitialized(true)

      return updateCurrentSimulation({ situation: newSituations })
    },
    [situation, engine, everyRules, updateCurrentSimulation]
  )

  useEffect(() => {
    if (isInitialized) return
    setIsInitialized(true)

    engine.setSituation(situation)
  }, [engine, situation, isInitialized])

  return { isInitialized, addToEngineSituation }
}
