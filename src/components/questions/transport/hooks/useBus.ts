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
      updateCurrentSimulation({
        situationKeysToRemove: ['transport . bus . heures par semaine'],
      })
      setShouldUpdateEngine(true)
    }
  }, [answers, isPristine, setBusHoursValue, updateCurrentSimulation, engine])

  useEffect(() => {
    if (!shouldUpdateEngine) return

    if (situation['transport . bus . heures par semaine'] === 0) return
    console.log('setBusHoursValue')
    engine.setSituation(situation)

    setShouldUpdateEngine(false)
  }, [shouldUpdateEngine, engine, situation])
}
