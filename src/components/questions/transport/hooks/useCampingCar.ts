import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useCampingCar({ answers, isPristine }: HookProps) {
  const { setValue: setCampingCarValue } = useRule(
    'transport . vacances . camping car . propriétaire'
  )
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.campingCar) {
      setCampingCarValue('non')
    } else {
      setCampingCarValue('oui')
    }
  }, [answers, isPristine, setCampingCarValue])
}
