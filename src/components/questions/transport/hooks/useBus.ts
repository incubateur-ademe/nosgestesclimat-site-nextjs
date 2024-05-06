import {
  useCurrentSimulation,
  useRule,
  useSimulation,
} from '@/publicodes-state'
import { useEffect, useState } from 'react'
import { HookProps } from '../transport'

export function useBus({
  answers,
  isPristine,
  updateCurrentSimulation,
}: HookProps) {
  const { engine } = useSimulation()

  const { situation } = useCurrentSimulation()

  const { setValue: setBusHoursValue } = useRule(
    'transport . bus . heures par semaine'
  )

  const [shouldUpdateEngine, setShouldUpdateEngine] = useState(false)

  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.bus) {
      setBusHoursValue(0)
    } else {
      setShouldUpdateEngine(true)
    }
  }, [answers, isPristine, setBusHoursValue, engine])

  useEffect(() => {
    if (!shouldUpdateEngine) return

    const newSituation = { ...situation }
    delete newSituation['transport . bus . heures par semaine']

    updateCurrentSimulation({
      situation: newSituation,
    })

    engine.setSituation(newSituation)

    setShouldUpdateEngine(false)
  }, [shouldUpdateEngine, engine, situation, updateCurrentSimulation])
}
