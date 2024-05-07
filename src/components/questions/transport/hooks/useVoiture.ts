import { useRule } from '@/publicodes-state'
import { useEffect } from 'react'
import { HookProps } from '../transport'

export function useVoiture({ answers, isPristine }: HookProps) {
  const { setValue: setVoitureKmValue } = useRule('transport . voiture . km')

  useEffect(() => {
    if (isPristine) {
      return
    }
    if (!answers.voiture) {
      setVoitureKmValue(0)
    }
  }, [answers, isPristine, setVoitureKmValue])
}
