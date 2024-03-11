import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useVoiture({
  answers,
  isPristine,
  deleteSituation,
}: HookProps) {
  const { setValue: setVoitureKmValue } = useRule('transport . voiture . km')
  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.voiture) {
      setVoitureKmValue(0)
    } else {
      deleteSituation(['transport . voiture . km'])
    }
  }, [answers, isPristine, setVoitureKmValue, deleteSituation])
}
