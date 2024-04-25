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
  const { situation } = useCurrentSimulation()

  const [isInitialized, setIsInitialized] = useState(false)

  const addToEngineSituation = useCallback(
    (situationToAdd: Situation): Situation => {
      const safeSituation = safeGetSituation({
        situation: situationToAdd,
        everyRules,
      })

      engine.setSituation({ ...situation, ...safeSituation })

      return safeSituation
    },
    [everyRules, situation, engine]
  )

  useEffect(() => {
    if (isInitialized) return

    engine.setSituation(situation)
    setIsInitialized(true)
  }, [engine, situation, isInitialized])

  return { isInitialized, addToEngineSituation }
}
