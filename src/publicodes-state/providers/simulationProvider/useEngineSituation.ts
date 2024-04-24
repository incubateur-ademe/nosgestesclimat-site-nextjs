import { useCurrentSimulation } from '@/publicodes-state'
import { useCallback, useEffect, useRef, useState } from 'react'
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

  const resolveFunction: any = useRef(null)

  const addToEngineSituation = useCallback(
    (situationToAdd: Situation): Promise<void> => {
      return new Promise((resolve) => {
        resolveFunction.current = resolve
        const safeSituation = safeGetSituation({
          situation: situationToAdd,
          everyRules,
        })
        console.log('addToEngineSituation')
        const newSituations = {
          ...situation,
          ...safeSituation,
        }

        engine.setSituation(newSituations)

        setIsInitialized(true)

        updateCurrentSimulation({ situation: newSituations })
      })
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
    console.log('Situation updated')
    if (resolveFunction.current) {
      resolveFunction.current()
      resolveFunction.current = null
    }
    engine.setSituation(safeSituation)
  }, [engine, situation, isInitialized, everyRules])

  return { isInitialized, addToEngineSituation }
}
