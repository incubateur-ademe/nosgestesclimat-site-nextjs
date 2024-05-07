import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useBus({ answers, isPristine }: HookProps) {
  const { setValue: setBusHoursValue } = useRule(
    'transport . bus . heures par semaine'
  )

  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.bus) {
      setBusHoursValue(0)
    }
  }, [answers, isPristine, setBusHoursValue])
}
