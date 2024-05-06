import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useMetro({
  answers,
  isPristine,
  updateCurrentSimulation,
}: HookProps) {
  const { setValue: setMetroHoursValue } = useRule(
    'transport . métro ou tram . heures par semaine'
  )
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.metro) {
      setMetroHoursValue(0)
    } else {
      updateCurrentSimulation({
        situationKeysToRemove: [
          'transport . métro ou tram . heures par semaine',
        ],
      })
    }
  }, [answers, isPristine, setMetroHoursValue, updateCurrentSimulation])
}
