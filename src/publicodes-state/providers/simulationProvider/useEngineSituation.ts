import { useCurrentSimulation } from '@/publicodes-state'
import { Situation } from '@/publicodes-state/types'
import Engine from 'publicodes'
import { useCallback, useEffect, useState } from 'react'
import { safeGetSituation } from '../../helpers/safeGetSituation'

type Props = {
  engine: Engine
  waterEngine: Engine
  everyRules: string[]
}
/**
 * Update the engine situation and the simulation situation
 */
export function useEngineSituation({ engine, waterEngine, everyRules }: Props) {
  const { situation } = useCurrentSimulation()

  const [isInitialized, setIsInitialized] = useState(false)

  const addToEngineSituation = useCallback(
    (situationToAdd: Situation): Situation => {
      const safeSituation = safeGetSituation({
        situation: { ...situation, ...situationToAdd },
        everyRules,
      })

      engine.setSituation(safeSituation)

      waterEngine.setSituation({ ...safeSituation, métrique: "'eau'" })

      return safeSituation
    },
    [everyRules, situation, engine, waterEngine]
  )

  useEffect(() => {
    if (isInitialized) return

    const safeSituation = safeGetSituation({
      situation: situation,
      everyRules,
    })
    engine.setSituation(safeSituation)

    waterEngine.setSituation({ ...safeSituation, métrique: "'eau'" })

    setIsInitialized(true)
  }, [engine, situation, isInitialized, everyRules, waterEngine])

  return { isInitialized, addToEngineSituation }
}
