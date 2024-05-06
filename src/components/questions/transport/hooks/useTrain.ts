import {
  useCurrentSimulation,
  useRule,
  useSimulation,
} from '@/publicodes-state'
import { useEffect, useState } from 'react'
import { HookProps } from '../transport'

export function useTrain({
  answers,
  isPristine,
  updateCurrentSimulation,
}: HookProps) {
  const { engine } = useSimulation()

  const { situation } = useCurrentSimulation()

  const { setValue: setTrainKmValue } = useRule('transport . train . km')

  const [shouldUpdateEngine, setShouldUpdateEngine] = useState(false)

  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.train) {
      setTrainKmValue(0)
    } else {
      setShouldUpdateEngine(true)
    }
  }, [answers, isPristine, setTrainKmValue, engine])

  useEffect(() => {
    if (!shouldUpdateEngine) return

    const newSituation = { ...situation }
    delete newSituation['transport . train . km']

    updateCurrentSimulation({
      situation: newSituation,
    })

    engine.setSituation(newSituation)

    setShouldUpdateEngine(false)
  }, [shouldUpdateEngine, engine, situation, updateCurrentSimulation])
}
