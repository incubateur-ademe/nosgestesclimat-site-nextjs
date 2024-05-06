import {
  useCurrentSimulation,
  useRule,
  useSimulation,
} from '@/publicodes-state'
import { useEffect, useState } from 'react'
import { HookProps } from '../transport'

export function useVoiture({
  answers,
  isPristine,
  updateCurrentSimulation,
}: HookProps) {
  const { engine } = useSimulation()

  const { situation } = useCurrentSimulation()

  const { setValue: setVoitureKmValue } = useRule('transport . voiture . km')

  const [shouldUpdateEngine, setShouldUpdateEngine] = useState(false)

  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.voiture) {
      setVoitureKmValue(0)
    } else {
      setShouldUpdateEngine(true)
    }
  }, [answers, isPristine, setVoitureKmValue, engine])

  useEffect(() => {
    if (!shouldUpdateEngine) return

    const newSituation = { ...situation }
    delete newSituation['transport . voiture . km']

    updateCurrentSimulation({
      situation: newSituation,
    })

    engine.setSituation(newSituation)

    setShouldUpdateEngine(false)
  }, [shouldUpdateEngine, engine, situation, updateCurrentSimulation])
}
