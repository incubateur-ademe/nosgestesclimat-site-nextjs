import {
  useCurrentSimulation,
  useRule,
  useSimulation,
} from '@/publicodes-state'
import { useEffect, useState } from 'react'
import { HookProps } from '../transport'

export function useMetro({
  answers,
  isPristine,
  updateCurrentSimulation,
}: HookProps) {
  const { engine } = useSimulation()

  const { situation } = useCurrentSimulation()

  const { setValue: setMetroHoursValue } = useRule(
    'transport . métro ou tram . heures par semaine'
  )

  const [shouldUpdateEngine, setShouldUpdateEngine] = useState(false)

  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.metro) {
      setMetroHoursValue(0)
    } else {
      setShouldUpdateEngine(true)
    }
  }, [answers, isPristine, setMetroHoursValue, engine])

  useEffect(() => {
    if (!shouldUpdateEngine) return

    const newSituation = { ...situation }
    delete newSituation['transport . métro ou tram . heures par semaine']

    updateCurrentSimulation({
      situation: newSituation,
    })

    engine.setSituation(newSituation)

    setShouldUpdateEngine(false)
  }, [shouldUpdateEngine, engine, situation, updateCurrentSimulation])
}
