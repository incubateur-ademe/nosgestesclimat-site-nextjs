import { useCurrentSimulation } from '@/publicodes-state'
import { useEffect, useState } from 'react'
import { safeGetSituation } from '../../helpers/safeGetSituation'
import { DottedName, Engine } from '../../types'

type Props = {
  engine: Engine
  everyRules: DottedName[]
}
/**
 * It listen on change to the current simulation situation and update the engine if needed
 */
export function useSetSituation({ engine, everyRules }: Props) {
  const { situation } = useCurrentSimulation()

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const safeSituation = safeGetSituation({
      situation,
      everyRules,
    })
    engine.setSituation(safeSituation)
    setIsInitialized(true)
  }, [situation, engine, everyRules])

  return { isInitialized }
}
