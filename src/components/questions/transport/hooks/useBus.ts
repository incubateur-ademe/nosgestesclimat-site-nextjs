import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useBus({ answers, isPristine, deleteSituation }: HookProps) {
  const { setValue: setBusHoursValue } = useRule(
    'transport . bus . heures par semaine'
  )
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.bus) {
      setBusHoursValue(0)
    } else {
      deleteSituation(['transport . bus . heures par semaine'])
    }
  }, [answers, isPristine, setBusHoursValue, deleteSituation])
}
