import { useCurrentSimulation } from '@/publicodes-state'
import { useEffect, useRef, useState } from 'react'
import { safeGetSituation } from '../../helpers/safeGetSituation'
import { DottedName, Engine, Situation } from '../../types'

type Props = {
  engine: Engine
  everyRules: DottedName[]
}
/**
 * Use an internal state to update the engine situation and the simulation situation
 */
export function useEngineSituation({ engine, everyRules }: Props) {
  const { situation, updateCurrentSimulation } = useCurrentSimulation()

  const [isInitialized, setIsInitialized] = useState(false)

  // This is a hack to return a promise when updating the situation
  const resolveFunction: any = useRef(null)

  const [engineSituation, setEngineSituation] = useState(situation)

  const addToEngineSituation = (situationToAdd: Situation): Promise<void> => {
    return new Promise((resolve) => {
      resolveFunction.current = resolve
      setEngineSituation({ ...engineSituation, ...situationToAdd })
    })
  }

  useEffect(() => {
    const safeSituation = safeGetSituation({
      situation: engineSituation,
      everyRules,
    })
    engine.setSituation(safeSituation)

    setIsInitialized(true)

    updateCurrentSimulation({ situation: engineSituation })

    if (resolveFunction.current) {
      resolveFunction.current()
      resolveFunction.current = null
    }
  }, [engineSituation, engine, everyRules, updateCurrentSimulation])

  return { isInitialized, addToEngineSituation }
}
