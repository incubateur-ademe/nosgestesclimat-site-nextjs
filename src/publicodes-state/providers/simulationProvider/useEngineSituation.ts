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
        situation: { ...situation, ...situationToAdd },
        everyRules,
      })

      engine.setSituation(safeSituation)

      return safeSituation
    },
    [everyRules, situation, engine]
  )

  useEffect(() => {
    if (isInitialized) return

    const safeSituation = safeGetSituation({
      situation: situation,
      everyRules,
    })
    engine.setSituation(safeSituation)
    setIsInitialized(true)
  }, [engine, situation, isInitialized, everyRules])

  return { isInitialized, addToEngineSituation }
}
